import mongoose, { Schema, Document } from "mongoose";

// Define TypeScript interface for a Post
export interface IModelPost extends Document {
  description: string;
  favorite?: boolean;
  tags?: string[];
  image?: string;
}
// Create Mongoose schema
const PostSchema = new Schema<IModelPost>(
  {
    description: { type: String, required: true },
    image: { type: String, default: "" },
    tags: { type: Array, default: [] },
    favorite: { type: Boolean, default: false },
  },
  { timestamps: true }
);
// Prevent model recompilation in development
export default mongoose.models.Post || mongoose.model<IModelPost>("Post", PostSchema);
