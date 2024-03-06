import Container from "@/components/container";
import { Card } from "@/components/ui/card";
import { getArticleByUserId } from "@/lib/articles";
import { type User } from "@/lib/types/users";
import { Newspaper } from "lucide-react";
import { Metadata } from "next";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Dashboard | aeroxee",
  description: "",
};

export default async function Dashboard() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("user");

  if (!userCookie) return <></>;

  const user: User = JSON.parse(userCookie.value);

  const articles = await getArticleByUserId(user._id);

  return (
    <>
      <Container className="pt-[90px] pb-[90px] px-4 md:px-[50px] lg:px-[90px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <Newspaper size={40} />
              <span className="text-xl">{articles.length}</span>
            </div>
          </Card>
        </div>
      </Container>
    </>
  );
}
