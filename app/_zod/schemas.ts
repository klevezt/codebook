import z from "zod";

const FileSchema =
  typeof File !== "undefined" ? z.instanceof(File, { message: "Image must be a file" }) : z.any(); // fallback for Node.js (server)

export const postSchema = z.object({
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
  tags: z.array(z.string()).optional(),
  image: z.union([
    FileSchema.refine((file) => file && file.size > 0 && file.size <= 5_000_000, {
      message: "Max size exceeded",
    }),
    z.string().optional(), // fallback / default image
  ]),
});
