import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    menteeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mentorId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["notActive","active", "expired"],
      default: "notActive",
    },
    sessionType: { 
        type: String,
        enum: ["chat", "video"], 
        required: true
    },
    paymentStatus: { 
        type: Boolean, 
        default: false
    },
  },
  { timestamps: true }
);

export const Session = mongoose.model("Session",sessionSchema)
