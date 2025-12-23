import fs from "fs";
import path from "path";

export default function(req,res){
  const file = path.join(process.cwd(),"data/data.json");
  res.json(JSON.parse(fs.readFileSync(file)));
}
