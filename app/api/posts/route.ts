import connectDB from "@/lib/mongodb";
import Post from "@/models/post";

export async function GET() {
  await connectDB();
  const todos = await Post.find();
  return Response.json(todos);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { title } = body;
  if (!title)
    return Response.json(
      { success: false, message: "Title is required" },
      {
        status: 400,
      }
    );

  const newPost = await Post.create({ title });
  return Response.json(
    { success: false, data: newPost },
    {
      status: 201,
    }
  );
}
