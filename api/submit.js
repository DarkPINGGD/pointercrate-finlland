import fs from "fs";
import path from "path";

function calculatePoints(rank) {
  if (rank > 150) return 0;
  return Math.round(Math.pow(1 - (rank - 1) / 150, 2) * 100);
}

export default function handler(req, res) {
  const file = path.join(process.cwd(), "data/data.json");
  const data = JSON.parse(fs.readFileSync(file));

  const { player, country, level, video } = req.body;

  if (!player || !level || !video)
    return res.status(400).json({ error: "Missing fields" });

  const lvl = data.levels.find(l => l.name === level && !l.archived);
  if (!lvl) return res.status(400).json({ error: "Level not found" });

  const duplicate = data.records.find(
    r => r.player === player && r.level === level
  );
  if (duplicate)
    return res.status(400).json({ error: "Duplicate record" });

  data.records.push({
    player,
    country,
    level: lvl.name,
    rank: lvl.rank,
    points: calculatePoints(lvl.rank),
    video,
    approved: false,
    date: new Date().toISOString().split("T")[0]
  });

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ success: true });
}
