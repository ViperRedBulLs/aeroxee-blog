import { type Article } from "./types/articles";

async function getArticles(
  status: "PUBLISHED" | "DRAFTED",
  sort: "views" | "createdAt",
  skip: number,
  limit: number
): Promise<Article[]> {
  try {
    const response = await fetch(
      `${process.env.URL}/api/articles?status=${status}&sort=${sort}&skip=${skip}&limit=${limit}`,
      {
        cache: "no-cache",
      }
    );
    const data = await response.json();

    return data.data;
  } catch (error) {
    return [];
  }
}

async function getArticleById(id: string): Promise<Article> {
  try {
    const response = await fetch(`${process.env.URL}/api/articles/${id}`, {
      cache: "no-cache",
    });
    const data = await response.json();

    return data.data;
  } catch (error) {
    const a: Article = {
      _id: "",
      userId: "",
      categoryId: "",
      title: "",
      content: "",
      views: 0,
      status: "PUBLISHED",
      updatedAt: null,
      createdAt: "",
      comments: undefined,
    };
    return a;
  }
}

async function getArticleByUserId(userId: string): Promise<Article[]> {
  try {
    const response = await fetch(
      `${process.env.URL}/api/articles?userId=${userId}`,
      {
        cache: "no-cache",
      }
    );
    const data = await response.json();

    return data.data;
  } catch (error) {
    return [];
  }
}

async function deleteArticle(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.URL}/api/articles/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}

export { deleteArticle, getArticleById, getArticleByUserId, getArticles };
