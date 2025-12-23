import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const file = path.join(process.cwd(), "data/data.json");
  const data = JSON.parse(fs.readFileSync(file));
  res.json(data);
}
