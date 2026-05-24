document.getElementById("foldBtn").onclick = () => {
  const text = document.getElementById("troubleInput").value.trim();

  if (text === "") {
    alert("Tu dois écrire un souci avant de continuer.");
    return;
  }

  localStorage.setItem("trouble", text);

  const paper = document.getElementById("paper");
  paper.textContent = text;
  paper.classList.remove("hidden");
  paper.classList.add("fold");

  setTimeout(() => {
    window.location.href = "program.html";
  }, 300);
};
