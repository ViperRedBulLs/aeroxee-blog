import Container from "@/components/container";
import ListBlogCard from "@/components/list-blog-card";
import PopularArticleList from "@/components/popular-article-list";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getArticles } from "@/lib/articles";
import { Article } from "@/lib/types/articles";
import { Metadata } from "next";
import { Key } from "react";

export const metadata: Metadata = {
  title: "Blog | aeroxee",
  description: "This is new blog",
};

export default async function Blog({
  params,
}: {
  params: { skip: number; limit: number };
}) {
  const articles = await getArticles(
    "PUBLISHED",
    "createdAt",
    params.skip ? params.skip : 0,
    params.limit ? params.limit : 10
  );
  const popularArticles = await getArticles("PUBLISHED", "views", 0, 5);

  return (
    <Container className="pt-[90px] pb-[90px] px-4 md:px-[50px] lg:px-[90px] mx-auto">
      <div className="flex items-start flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-8/12 mb-5 lg:mb-0">
          <h2 className="text-xl font-extrabold text-sky-600">New Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-5">
            {articles.map((article: Article, key: Key) => (
              <ListBlogCard key={key} article={article} />
            ))}
          </div>
          <div className="my-5">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>

        {/*  */}
        <div className="w-full lg:w-4/12">
          <h2 className="text-xl font-extrabold text-sky-600">
            Popular Articles
          </h2>
          <div className="flex flex-col mt-5">
            {popularArticles.map((popularArticle: Article, key: Key) => (
              <PopularArticleList key={key} article={popularArticle} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
