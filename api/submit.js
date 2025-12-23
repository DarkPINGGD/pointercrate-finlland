import fs from "fs";
import path from "path";

export default function(req,res){
  const file = path.join(process.cwd(),"data/data.json");
  const data = JSON.parse(fs.readFileSync(file));

  const lvl = data.levels.find(l=>l.name===req.body.level);
  if(!lvl) return res.status(400).end();

  const dup = data.records.find(r=>r.player===req.body.player && r.level===req.body.level);
  if(dup) return res.status(400).end();

  data.records.push({
    player:req.body.player,
    country:req.body.country,
    level:lvl.name,
    points:lvl.points,
    video:req.body.video,
    approved:false,
    date:new Date().toISOString().split("T")[0]
  });

  fs.writeFileSync(file,JSON.stringify(data,null,2));
  res.end();
}
