import connectDB from "@/lib/mongodb";
import Post from "@/models/post";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  await connectDB();
  const post = await Post.find({ _id: id });
  return Response.json(post);
}
