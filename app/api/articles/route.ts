import { ClientDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const categoryId = searchParams.get("categoryId");
  const userId = searchParams.get("userId");
  const status = searchParams.get("status");
  const sort = searchParams.get("sort");
  const skip = parseInt(searchParams.get("skip") || "0");
  const limit = parseInt(searchParams.get("limit") || "10");

  if (categoryId) {
    const result = await ClientDB.db("aeroxee-blog")
      .collection("articles")
      .find({
        categoryId: ObjectId.createFromHexString(categoryId),
      })
      .skip(skip)
      .limit(limit)
      .toArray();

    return Response.json({ status: "success", message: "", data: result });
  }

  if (userId) {
    const result = await ClientDB.db("aeroxee-blog")
      .collection("articles")
      .find({
        userId: ObjectId.createFromHexString(userId),
      })
      .skip(skip)
      .limit(limit)
      .toArray();

    return Response.json({ status: "success", message: "", data: result });
  }

  if (status && sort) {
    const result = await ClientDB.db("aeroxee-blog")
      .collection("articles")
      .find(
        {
          status: status,
        },
        {
          sort: sort === "views" ? { views: -1 } : { createdAt: -1 },
        }
      )
      .skip(skip)
      .limit(limit)
      .toArray();

    return Response.json({ status: "success", message: "", data: result });
  }

  const result = await ClientDB.db("aeroxee-blog")
    .collection("articles")
    .find({})
    .skip(skip)
    .limit(limit)
    .toArray();

  return Response.json({ status: "success", message: "", data: result });
}

export async function POST(request: Request) {
  const data = await request.json();

  try {
    const resultInserted = await ClientDB.db("aeroxee-blog")
      .collection("articles")
      .insertOne({
        categoryId: ObjectId.createFromHexString(data.categoryId),
        userId: ObjectId.createFromHexString(data.userId),
        title: data.title,
        content: data.content,
        views: 0,
        status: data.status,
        comments: null,
        updatedAt: null,
        createdAt: new Date(),
      });

    return Response.json(
      {
        status: "success",
        message:
          "Successfully insert new article with id: " +
          resultInserted.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json({ status: "error", message: error }, { status: 400 });
  }
}
