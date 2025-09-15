import Post from "@/_models/post";
import connectDB from "@/lib/mongodb";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  await connectDB();
  const { id } = await params;

  const post = await Post.find({ _id: id });
  return Response.json(post);
}
