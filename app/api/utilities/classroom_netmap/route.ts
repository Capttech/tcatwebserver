import { NextResponse } from "next/server";
import { getTempGridBlocks, saveTempGridBlocks } from "@/app/lib/tempGridDb";

export const runtime = "nodejs";

export async function GET() {
    return NextResponse.json({ ok: true, blocks: getTempGridBlocks() });
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const blocks = saveTempGridBlocks(body?.blocks);
        return NextResponse.json({ ok: true, blocks });
    } catch {
        return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
    }
}
