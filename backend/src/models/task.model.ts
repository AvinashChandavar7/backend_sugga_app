import { Schema, models, model, Document } from "mongoose";

export interface ITask extends Document {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
}

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "A task must have a title"],
    },
    description: {
      type: String,
      required: [true, "A task must have a description"],
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },

  },
  { timestamps: true }
);

// taskSchema.index({ title: 1 });

const Task = models.Task || model<ITask>("Task", taskSchema);

export default Task;

