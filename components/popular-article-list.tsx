import { getCategoryById } from "@/lib/categories";
import getMoment from "@/lib/get-moment";
import stripHtmlAndTruncate from "@/lib/truncate";
import { Article } from "@/lib/types/articles";
import { getUserById } from "@/lib/users";
import { Book, Clock, Eye, User } from "lucide-react";
import Link from "next/link";

type Props = {
  article: Article;
};

export default async function PopularArticleList({ article }: Props) {
  const owner = await getUserById(article.userId);
  const category = await getCategoryById(article.categoryId);

  return (
    <div className="py-2 border-b border-b-gray-300 dark:border-b-gray-600">
      <h4 className="text-lg text-sky-600 mb-1">
        <Link href={`/blog/${article._id}`}>{article.title}</Link>
      </h4>
      <div className="flex flex-row flex-wrap gap-2 mb-2">
        <div className="flex items-center gap-1 text-xs font-extralight">
          <User size="20" />
          <span>{owner?.username}</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-extralight">
          <Book size="20" />
          <span>{category?.title}</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-extralight">
          <Eye size="20" />
          <span>{article.views}</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-extralight">
          <Clock size="20" />
          <span>{getMoment(article.createdAt)}</span>
        </div>
      </div>
      <p className="text-sm font-extralight">
        {stripHtmlAndTruncate(article.content, 5)}...
      </p>
    </div>
  );
}
