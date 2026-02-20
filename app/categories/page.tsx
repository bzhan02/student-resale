import Link from "next/link"
import { categories } from "@/lib/mock-data"
import { CategoryIcon } from "@/components/category-icon"

export default function CategoriesPage() {
  return (
    <div className="px-4 py-6">
      <h1 className="mb-6 text-xl font-bold text-foreground">全部分类</h1>
      <div className="grid grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            href={`/categories/${cat.slug}`}
            className="flex flex-col items-center"
          >
            <CategoryIcon icon={cat.icon} name={cat.name} size="lg" />
            <span className="mt-1 text-xs text-muted-foreground">
              {cat.count} 件
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
