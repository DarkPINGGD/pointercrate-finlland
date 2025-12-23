export default async function(req,res){
  const {password} = req.body;
  if(password==="admin123"){
    res.json({ok:true});
  } else {
    res.json({ok:false});
  }
}
