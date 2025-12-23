import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const filePath = path.join(process.cwd(), "data/data.json");
  const data = JSON.parse(fs.readFileSync(filePath));

  const { player, level } = req.body;

  const lvl = data.levels.find(l => l.name === level);
  if (!lvl) {
    return res.status(400).json({ error: "Level not found" });
  }

  // Pointercrate benzeri puan formülü
  const points = Math.max(5, Math.round(100 - (lvl.rank - 1) * 1.3));

  data.records.push({
    player,
    level,
    points,
    approved: false
  });

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(200).json({ success: true });
}
