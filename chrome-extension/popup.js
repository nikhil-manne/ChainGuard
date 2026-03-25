document.getElementById("submit").onclick = async () => {
  const pattern = document.getElementById("pattern").value;

  if (!pattern) {
    alert("Enter a suspicious URL");
    return;
  }

  await fetch("http://localhost:3000/report", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pattern })
  });

  alert("Threat reported successfully");
  document.getElementById("pattern").value = "";
};
