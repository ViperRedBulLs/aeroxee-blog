import ArticleDeleteAction from "@/components/article-delete-action";
import Container from "@/components/container";
import FormInsertArticle from "@/components/form-insert-article";
import FormUpdateArticle from "@/components/form-update-article";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getArticleByUserId } from "@/lib/articles";
import { getAllCategories } from "@/lib/categories";
import { Article } from "@/lib/types/articles";
import { User } from "@/lib/types/users";
import { Pen, Plus } from "lucide-react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Overview | aeroxee",
  description: "",
};

export default async function Overview() {
  const categories = await getAllCategories();

  const cookieStore = cookies();
  const userCookies = cookieStore.get("user");
  if (!userCookies) return;
  const user: User = JSON.parse(userCookies.value);

  const articles = await getArticleByUserId(user._id);

  return (
    <>
      <Container className="pt-[90px] pb-[90px] px-4 md:px-[50px] lg:px-[90px] mx-auto">
        <div className="mb-5 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold">Overview</h1>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" className="flex items-center gap-1">
                <Plus size={20} />
                Article
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="min-w-[96%] lg:min-w-[90%] h-[calc(100vh-10%)] overflow-auto">
              <AlertDialogHeader>
                <AlertDialogTitle>Create new article?</AlertDialogTitle>
                <AlertDialogDescription>
                  Create new article
                </AlertDialogDescription>
              </AlertDialogHeader>
              <FormInsertArticle categories={categories} />
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article: Article, index: number) => (
            <Card key={index} className="relative group">
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>Status: {article.status}</CardDescription>
              </CardHeader>
              <div className="absolute top-0 left-0 bottom-0 right-0 bg-background/50 filter backdrop-blur-md rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all ease-in-out">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="flex items-center justify-center gap-2">
                    <Link href={`/blog/${article._id}`} legacyBehavior>
                      <Button variant="outline">View</Button>
                    </Link>
                    {/* Edit */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="default"
                          className="flex items-center gap-1"
                        >
                          <Pen size={20} />
                          Update
                        </Button>
                      </AlertDialogTrigger>

                      <AlertDialogContent className="min-w-[96%] lg:min-w-[90%] h-[calc(100vh-10%)] overflow-auto">
                        <AlertDialogHeader>
                          <AlertDialogTitle>Update article</AlertDialogTitle>
                          <AlertDialogDescription>
                            Update your article.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <FormUpdateArticle
                          categories={categories}
                          article={article}
                        />
                      </AlertDialogContent>
                    </AlertDialog>
                    {/* Delete */}
                    <ArticleDeleteAction id={article._id} />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}
