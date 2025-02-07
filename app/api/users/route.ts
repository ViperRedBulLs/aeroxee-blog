import { ClientDB } from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const id = searchParams.get("id");

  if (id) {
    try {
      const result = await ClientDB.db("aeroxee-blog")
        .collection("users")
        .findOne({
          _id: ObjectId.createFromHexString(id),
        });
      if (result) {
        return Response.json({ status: "success", message: "", data: result });
      } else {
        return Response.json(
          { status: "error", message: "not found", data: null },
          { status: 404 }
        );
      }
    } catch (error) {
      return Response.json(
        { status: "error", message: error },
        { status: 500 }
      );
    }
  }
}
