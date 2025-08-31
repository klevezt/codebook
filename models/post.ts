import mongoose, { Schema, Document } from "mongoose";

// Define TypeScript interface for a Todo
export interface IPost extends Document {
  title: string;
  completed: boolean;
}
// Create Mongoose schema
const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);
// Prevent model recompilation in development
export default mongoose.models.Todo || mongoose.model<IPost>("Todo", PostSchema);
