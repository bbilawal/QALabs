import { connectDB } from "@/lib/mongodb";
import Audit from "@/models/Audit";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const newAudit = await Audit.create(body);

    return Response.json({
      success: true,
      data: newAudit,
    });

  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      message: "Database error",
    });
  }
}

export async function GET() {
  try {
    await connectDB();

    const audits = await Audit.find().sort({ createdAt: -1 });

    return Response.json(audits);

  } catch (error) {
    return Response.json({ error: "Failed to fetch" });
  }
}