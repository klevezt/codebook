import Post from "@/models/post";

export async function GET() {
  const posts = await Post.find({ favorite: true }).sort({ createdAt: -1 }); // newest first

  return Response.json(posts);
}
