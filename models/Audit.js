import mongoose from "mongoose";

const AuditSchema = new mongoose.Schema({
  name: String,
  email: String,
  project: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Audit || mongoose.model("Audit", AuditSchema);