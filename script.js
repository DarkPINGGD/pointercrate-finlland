let last = 0;

function submit(){
  if(Date.now() - last < 5000){
    alert("Wait 5 seconds");
    return;
  }
  last = Date.now();

  fetch("/api/submit",{
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      player:player.value,
      country:country.value,
      level:level.value,
      video:video.value
    })
  })
  .then(r=>r.json())
  .then(d=>alert(d.success?"Submitted":"Error"));
}
