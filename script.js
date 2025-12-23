fetch("/api/list")
  .then(r => r.json())
  .then(data => {
    const table = document.getElementById("list");
    data.levels.forEach(l => {
      let cls = "";
      if (l.rank === 1) cls = "rank1";
      if (l.rank === 2) cls = "rank2";
      if (l.rank === 3) cls = "rank3";

      table.innerHTML += `
        <tr class="${cls}">
          <td>#${l.rank}</td>
          <td>${l.name}</td>
          <td>${l.publisher}</td>
          <td>${Math.max(5, Math.round(100 - (l.rank - 1) * 1.3))}</td>
        </tr>
      `;
    });
  });

function submit() {
  fetch("/api/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      player: player.value,
      level: level.value
    })
  }).then(() => alert("Record admin onayına gönderildi"));
}
