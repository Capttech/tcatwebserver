import { NextResponse } from "next/server";
import mysql from "@/lib/db";

async function getClassroomNetmapBlocks() {
    const [rows] = await mysql.query("SELECT block_index, vlan, switchName, portNumber FROM classroom_netmap ORDER BY block_index ASC");
    return rows;
}

async function saveClassroomNetmapBlocks(blocks) {
    if (!Array.isArray(blocks)) return [];
    const now = new Date();

    await mysql.query("DELETE FROM classroom_netmap");

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i] || {};
        await mysql.query("INSERT INTO classroom_netmap (block_index, vlan, switchName, portNumber, updatedAt) VALUES (?, ?, ?, ?, ?)", [i, block.vlan || '', block.switchName || '', block.portNumber || '', now]);
    }

    return getClassroomNetmapBlocks();
}

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


