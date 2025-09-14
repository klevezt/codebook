import Post from "@/_models/post";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const post = await Post.find({ _id: id });
  return Response.json(post);
}
