import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const { index, password } = req.body;

  const filePath = path.join(process.cwd(), "data/data.json");
  const data = JSON.parse(fs.readFileSync(filePath));

  if (password !== data.adminPassword) {
    return res.status(401).json({ error: "Wrong password" });
  }

  if (data.records[index]) {
    data.records[index].approved = true;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(200).json({ success: true });
}
