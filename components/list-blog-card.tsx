import { getCategoryById } from "@/lib/categories";
import getMoment from "@/lib/get-moment";
import stripHtmlAndTruncate from "@/lib/truncate";
import { type Article } from "@/lib/types/articles";
import { getUserById } from "@/lib/users";
import { Book, CalendarDays, Clock, Eye, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

type ListBlogCardProps = {
  article: Article;
};

export default async function ListBlogCard({ article }: ListBlogCardProps) {
  const category = await getCategoryById(article.categoryId);
  const owner = await getUserById(article.userId);
  if (!owner) return;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Link href={`/blog/${article._id}`} className="text-sky-600">
            {article.title}
          </Link>
        </CardTitle>
        <div className="flex items-center gap-2 flex-wrap">
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-1 text-xs font-extralight cursor-pointer">
                <User size="20" />
                <span>{owner?.username}</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar>
                  <AvatarImage src="https://github.com/vercel.png" />
                  <AvatarFallback>VC</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">{owner.username}</h4>
                  <p className="text-sm">
                    The React Framework – created and maintained by @vercel.
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                    <span className="text-xs text-muted-foreground">
                      Joined December 2021
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <HoverCard>
            <HoverCardTrigger asChild>
              <div className="flex items-center gap-1 text-xs font-extralight cursor-pointer">
                <Book size="20" />
                <span>{category?.title}</span>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <p className="text-sm">{category?.description}</p>
            </HoverCardContent>
          </HoverCard>

          <div className="flex items-center gap-1 text-xs font-extralight">
            <Eye size="20" />
            <span>{article.views}</span>
          </div>
          <div className="flex items-center gap-1 text-xs font-extralight">
            <Clock size="20" />
            <span>{getMoment(article.createdAt)}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-extralight">
          {stripHtmlAndTruncate(article.content, 20)}...
        </p>
      </CardContent>
    </Card>
  );
}
