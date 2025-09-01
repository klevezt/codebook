import z from "zod";

export const postSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  tags: z.array(z.string()),
});
