-- ============================================================
-- student-resale 初始数据库 Schema
-- ============================================================

-- 启用 UUID 扩展
create extension if not exists "uuid-ossp";

-- ============================================================
-- 用户资料表（关联 Supabase Auth）
-- ============================================================
create table public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text not null,
  avatar_url  text,
  school      text not null default '',
  rating      numeric(3,2) not null default 5.00,
  items_count integer not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

comment on table public.profiles is '用户公开资料，与 auth.users 一一对应';

-- ============================================================
-- 商品表
-- ============================================================
create type item_condition as enum ('全新', '仅拆封', '轻微使用', '明显使用');
create type delivery_method as enum ('自取', '邮寄', '均可');
create type category_slug   as enum ('textbooks', 'electronics', 'furniture', 'clothing', 'transport');

create table public.items (
  id              uuid primary key default uuid_generate_v4(),
  seller_id       uuid not null references public.profiles(id) on delete cascade,
  title           text not null,
  description     text not null default '',
  price           numeric(10,2) not null check (price >= 0),
  original_price  numeric(10,2) check (original_price >= 0),
  images          text[] not null default '{}',
  category        category_slug not null,
  condition       item_condition not null,
  delivery_method delivery_method not null default '均可',
  location        text not null default '',
  view_count      integer not null default 0,
  is_sold         boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

comment on table public.items is '二手商品列表';
create index items_category_idx  on public.items(category);
create index items_seller_idx    on public.items(seller_id);
create index items_created_idx   on public.items(created_at desc);

-- ============================================================
-- 收藏表
-- ============================================================
create table public.favorites (
  user_id    uuid not null references public.profiles(id) on delete cascade,
  item_id    uuid not null references public.items(id)    on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, item_id)
);

comment on table public.favorites is '用户收藏的商品';

-- ============================================================
-- 自动更新 updated_at 的触发器
-- ============================================================
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger items_updated_at before update on public.items
  for each row execute function public.set_updated_at();

-- ============================================================
-- 新用户注册时自动创建 profile
-- ============================================================
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name, school, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'school', ''),
    null
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- Row Level Security（RLS）
-- ============================================================

-- profiles: 所有人可查，只能修改自己
alter table public.profiles enable row level security;
create policy "profiles_select_all"   on public.profiles for select using (true);
create policy "profiles_update_own"   on public.profiles for update using (auth.uid() = id);

-- items: 所有人可查，已登录才能发布，只能修改自己的
alter table public.items enable row level security;
create policy "items_select_all"      on public.items for select using (true);
create policy "items_insert_auth"     on public.items for insert with check (auth.uid() = seller_id);
create policy "items_update_own"      on public.items for update using (auth.uid() = seller_id);
create policy "items_delete_own"      on public.items for delete using (auth.uid() = seller_id);

-- favorites: 只能操作自己的收藏
alter table public.favorites enable row level security;
create policy "favorites_select_own"  on public.favorites for select using (auth.uid() = user_id);
create policy "favorites_insert_own"  on public.favorites for insert with check (auth.uid() = user_id);
create policy "favorites_delete_own"  on public.favorites for delete using (auth.uid() = user_id);

-- ============================================================
-- Storage Bucket（在 Supabase Dashboard 手动创建或用此脚本）
-- ============================================================
-- 在 Supabase Dashboard > Storage 中创建名为 "item-images" 的 public bucket
-- 或者用 Supabase CLI：
--   supabase storage create item-images --public
