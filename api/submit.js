import fs from "fs";
import path from "path";

function calculatePoints(rank) {
  if (rank > 150) return 0;
  return Math.round(Math.pow(1 - (rank - 1) / 150, 2) * 100);
}

export default function handler(req, res) {
  const file = path.join(process.cwd(), "data/data.json");
  const data = JSON.parse(fs.readFileSync(file));

  const level = data.levels.find(l => l.name === req.body.level && !l.archived);
  if (!level) return res.status(400).json({ error: "Level not found" });

  const duplicate = data.records.find(
    r => r.player === req.body.player && r.level === level.name
  );
  if (duplicate) return res.status(400).json({ error: "Duplicate record" });

  const points = calculatePoints(level.rank);

  data.records.push({
    player: req.body.player,
    country: req.body.country,
    level: level.name,
    rank: level.rank,
    points,
    video: req.body.video,
    approved: false,
    date: new Date().toISOString().split("T")[0]
  });

  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ success: true });
}
