import fs from "fs";
import path from "path";

export default function(req,res){
  const file = path.join(process.cwd(),"data/data.json");
  const data = JSON.parse(fs.readFileSync(file));

  if(req.body.password!==data.adminPassword)
    return res.status(401).end();

  data.records.splice(req.body.index,1);
  fs.writeFileSync(file,JSON.stringify(data,null,2));
  res.end();
}
