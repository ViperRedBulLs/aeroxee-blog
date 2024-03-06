"use client";

import { Article } from "@/lib/types/articles";
import { Category } from "@/lib/types/category";
import { getCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, Key, useState } from "react";
import { AlertDialogCancel } from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

export default function FormUpdateArticle({
  categories,
  article,
}: {
  categories: Category[];
  article: Article;
}) {
  const [category, setCategory] = useState<string>(article.categoryId);
  const [title, setTitle] = useState<string>(article.title);
  const [content, setContent] = useState<string>(article.content);
  const [status, setStatus] = useState<string>(article.status);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const userCookies = getCookie("user");
  if (!userCookies) {
    window.location.href = "/login";
    return;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(
      `${process.env.URL}/api/articles/${article._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: category,
          title: title,
          content: content,
          status: status,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setIsLoading(false);
      window.alert(data.message);
      router.refresh();
      return;
    } else {
      setIsLoading(false);
      window.alert(data.message);
      console.log("Error during update your article.");
      router.refresh();
      return;
    }
  };

  return (
    <form action="" className="my-5" method="post" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 mb-3">
        <Label htmlFor="category">Category</Label>
        <Select
          name="category"
          onValueChange={(e) => setCategory(e)}
          defaultValue={category}
          required
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Category</SelectLabel>
              {categories.map((category: Category, index: Key) => (
                <SelectItem key={index} value={category._id}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Article title"
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={title}
          required
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <Label htmlFor="content">Content</Label>
        <Textarea
          name="content"
          placeholder="Type your content here, using markdown."
          defaultValue={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="status">Status</label>
        <Select
          onValueChange={(e) => setStatus(e)}
          defaultValue={status}
          required
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Status</SelectLabel>
              <SelectItem value="DRAFTED">Drafted</SelectItem>
              <SelectItem value="PUBLISHED">Published</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-2">
        <Button type="submit" className="flex items-center gap-1">
          {isLoading && <Loader2 size={20} className="animate-spin" />}
          Save
        </Button>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </div>
    </form>
  );
}
