import mongoose, { Schema } from "mongoose";

export interface ISettings {
  ownerId: string;
  businessName: string;
  supportEmail: string;
  knowledge: string;
}

const settingsSchema = new Schema<ISettings>(
  {
    ownerId: { type: String, required: true, unique: true },
    businessName: { type: String, required: true },
    supportEmail: { type: String, required: true },
    knowledge: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Settings ||
  mongoose.model<ISettings>("Settings", settingsSchema);
