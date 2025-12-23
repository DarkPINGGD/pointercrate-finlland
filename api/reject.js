import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { index, password } = req.body;

  const file = path.join(process.cwd(), "data/data.json");
  const data = JSON.parse(fs.readFileSync(file));

  if (password !== data.adminPassword) {
    return res.status(401).end();
  }

  data.records.splice(index, 1);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));

  res.status(200).json({ success: true });
}
