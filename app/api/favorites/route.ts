import { IPost } from "@/_components/_pageComponents/Posts";
import Post from "@/_models/post";

export async function GET() {
  const posts = await Post.find({ isFavorite: true }).sort({ createdAt: -1 }); // newest first
  return Response.json(posts);
}

export async function PUT(req: Request) {
  const body = await req.json();

  const { _id } = body;
  const post = (await Post.find({ _id })) as IPost[];
  if (!post || post.length === 0) {
    return Response.json(
      { message: "No post found" },
      {
        status: 400,
      }
    );
  }
  const isFavorite = post[0].isFavorite;

  await Post.findByIdAndUpdate(_id, { isFavorite: !isFavorite }, { returnDocument: "after" });
  return Response.json({
    status: 201,
  });
}
