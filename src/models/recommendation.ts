import mongoose, { Schema, Document, Model } from 'mongoose';

export interface Recommendation extends Document {
  userRef: string;
  suggestions: string[];
  createdAt: Date;
}

const RecommendationSchema: Schema<Recommendation> = new Schema(
  {
    userRef: { type: String, required: true },
    suggestions: { type: [String], required: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export const RecommendationModel: Model<Recommendation> =
  mongoose.model<Recommendation>('Recommendation', RecommendationSchema);
