import mysql from "@/lib/db";

export async function getClassroomNetmapBlocks() {
    const [rows] = await mysql.query(
        "SELECT block_index, vlan, switchName, portNumber FROM classroom_netmap ORDER BY block_index ASC"
    );
    return rows;
}

export async function saveClassroomNetmapBlocks(blocks) {
    if (!Array.isArray(blocks)) return [];
    const now = new Date();
    // Remove all existing blocks
    await mysql.query("DELETE FROM classroom_netmap");
    // Insert new blocks
    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i] || {};
        await mysql.query(
            "INSERT INTO classroom_netmap (block_index, vlan, switchName, portNumber, updatedAt) VALUES (?, ?, ?, ?, ?)",
            [i, block.vlan || '', block.switchName || '', block.portNumber || '', now]
        );
    }
    return getClassroomNetmapBlocks();
}
