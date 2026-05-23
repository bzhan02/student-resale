# 闲置帮 · Student Resale

专为中国留学生打造的二手物品交易平台。

## 技术栈

- **框架**: Next.js 16 (App Router)
- **UI**: shadcn/ui + Tailwind CSS v4
- **后端**: Supabase (PostgreSQL + Auth + Storage)
- **语言**: TypeScript

## 快速开始

### 1. 克隆并安装依赖

```bash
git clone https://github.com/bzhan02/student-resale.git
cd student-resale
pnpm install
```

### 2. 配置 Supabase

1. 前往 [supabase.com](https://supabase.com) 创建新项目
2. 在 **SQL Editor** 中执行 `supabase/migrations/001_initial_schema.sql`
3. 在 **Storage** 中创建名为 `item-images` 的 **Public** Bucket
4. 复制 `.env.local.example` 为 `.env.local`，填入你的 URL 和 anon key：

```bash
cp .env.local.example .env.local
```

### 3. 启动开发服务器

```bash
pnpm dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 项目结构

```
app/
  auth/         # 登录/注册页面
  categories/   # 分类浏览
  items/[id]/   # 商品详情
  favorites/    # 收藏夹
  nearby/       # 附近商品
  profile/      # 个人主页
  publish/      # 发布商品
components/     # 业务组件
lib/
  supabase.ts          # 浏览器端 Supabase 客户端
  supabase-server.ts   # 服务端 Supabase 客户端
  auth-context.tsx     # 全局认证状态
  database.types.ts    # 数据库类型定义
  mock-data.ts         # 开发用 mock 数据（将逐步替换）
supabase/
  migrations/   # 数据库迁移 SQL
```

## 待完善功能

- [ ] 商品详情页接入真实数据库
- [ ] 收藏功能持久化
- [ ] 用户个人主页
- [ ] 买卖双方站内消息
- [ ] 支付流程（Stripe）
