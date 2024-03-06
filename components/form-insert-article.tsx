"use client";

import { Category } from "@/lib/types/category";
import { User } from "@/lib/types/users";
import { getCookie } from "cookies-next";
import { Loader2 } from "lucide-react";
import { FormEvent, Key, useState } from "react";
import Showdown from "showdown";
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

export default function FormInsertArticle({
  categories,
}: {
  categories: Category[];
}) {
  const [category, setCategory] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const userCookies = getCookie("user");
  if (!userCookies) {
    window.location.href = "/login";
    return;
  }
  const user: User = JSON.parse(userCookies);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(`${process.env.URL}/api/articles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: user._id,
        categoryId: category,
        title: title,
        content: content,
        status: status,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsLoading(false);
      window.alert(data.message);
      return;
    } else {
      setIsLoading(false);
      window.alert(data.message);
      return;
    }
  };

  return (
    <form action="" className="my-5" method="post" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1 mb-3">
        <Label htmlFor="category">Category</Label>
        <Select name="category" onValueChange={(e) => setCategory(e)} required>
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
          required
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <Label htmlFor="status">Status</Label>
        <Textarea
          name="status"
          placeholder="Type your content here, using markdown."
          defaultValue={"# Hello World"}
          onChange={(e) => {
            const converter = new Showdown.Converter();
            console.log(converter.makeHtml(e.target.value));
            setContent(converter.makeHtml(e.target.value));
          }}
          required
        />
      </div>
      <div className="flex flex-col gap-1 mb-3">
        <label htmlFor="status">Status</label>
        <Select onValueChange={(e) => setStatus(e)} required>
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
