import connectDB from "@/lib/mongodb";
import Post from "@/models/post";

export async function GET() {
  await connectDB();
  const todos = await Post.find();
  return Response.json(todos);
}

export async function POST(req: Request) {
  const body = await req.json();

  const { description } = body;
  if (!description)
    return Response.json(
      { success: false, message: "Description is required" },
      {
        status: 400,
      }
    );

  const newPost = await Post.create({ ...body });
  return Response.json(
    { success: false, data: newPost },
    {
      status: 201,
    }
  );
}

export async function DELETE(req: Request) {
  const body = await req.json();

  console.log({ body });
  const { _id } = body;
  if (!_id)
    return Response.json(
      { success: false, message: "ID is required" },
      {
        status: 400,
      }
    );

  await Post.deleteOne({ _id });
  return Response.json(
    { success: true, message: `Post with ID ${_id} is deleted` },
    {
      status: 201,
    }
  );
}
