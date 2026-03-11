import { NextResponse } from "next/server";
import { getClassroomNetmapBlocks, saveClassroomNetmapBlocks } from "@/app/lib/classroomNetmapDb";

export const runtime = "nodejs";


export async function GET() {
    const blocks = await getClassroomNetmapBlocks();
    return NextResponse.json({ ok: true, blocks });
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const blocks = await saveClassroomNetmapBlocks(body?.blocks);
        return NextResponse.json({ ok: true, blocks });
    } catch {
        return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
    }
}
