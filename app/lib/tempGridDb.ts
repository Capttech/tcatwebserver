import fs from "node:fs";
import path from "node:path";

export type TempGridBlock = {
    vlan: string;
    switchName: string;
    portNumber: string;
};

type TempGridDbShape = {
    blocks: TempGridBlock[];
};

export const TEMP_GRID_TOTAL = 41;

const DB_FILE = path.join(process.cwd(), "data", "temp-grid-db.json");

function emptyBlock(): TempGridBlock {
    return {
        vlan: "",
        switchName: "",
        portNumber: "",
    };
}

function initialDb(): TempGridDbShape {
    return {
        blocks: Array.from({ length: TEMP_GRID_TOTAL }, emptyBlock),
    };
}

function ensureDbFile() {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    if (!fs.existsSync(DB_FILE)) {
        fs.writeFileSync(DB_FILE, JSON.stringify(initialDb(), null, 2), "utf8");
    }
}

function normalizeBlocks(input: unknown): TempGridBlock[] {
    if (!Array.isArray(input)) {
        return Array.from({ length: TEMP_GRID_TOTAL }, emptyBlock);
    }

    return Array.from({ length: TEMP_GRID_TOTAL }, (_, index) => {
        const item = input[index];
        if (!item || typeof item !== "object") return emptyBlock();

        const block = item as Partial<TempGridBlock>;
        return {
            vlan: typeof block.vlan === "string" ? block.vlan.trim() : "",
            switchName: typeof block.switchName === "string" ? block.switchName.trim() : "",
            portNumber: typeof block.portNumber === "string" ? block.portNumber.trim() : "",
        };
    });
}

function readDb(): TempGridDbShape {
    ensureDbFile();
    const raw = fs.readFileSync(DB_FILE, "utf8");

    try {
        const parsed = JSON.parse(raw) as Partial<TempGridDbShape>;
        const db: TempGridDbShape = {
            blocks: normalizeBlocks(parsed.blocks),
        };

        if (!Array.isArray(parsed.blocks) || parsed.blocks.length !== TEMP_GRID_TOTAL) {
            writeDb(db);
        }

        return db;
    } catch {
        const db = initialDb();
        writeDb(db);
        return db;
    }
}

function writeDb(db: TempGridDbShape) {
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2), "utf8");
}

export function getTempGridBlocks() {
    return readDb().blocks;
}

export function saveTempGridBlocks(blocks: unknown) {
    const db: TempGridDbShape = {
        blocks: normalizeBlocks(blocks),
    };
    writeDb(db);
    return db.blocks;
}
