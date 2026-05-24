// Fonction pour récupérer le dernier lavage
async function loadLastWash() {
  const { data, error } = await supabase
    .from("wash_settings")
    .select("*")
    .order("id", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Erreur Supabase :", error);
    document.getElementById("troubleText").textContent =
      "Ton souci a été lavé, mais impossible d'afficher les détails.";
    return;
  }

  if (data.length === 0) {
    document.getElementById("troubleText").textContent =
      "Ton souci a été lavé.";
    return;
  }

  const wash = data[0];

  document.getElementById("troubleText").textContent =
    `« ${wash.trouble} » a été lavé avec succès.`;

  document.getElementById("details").textContent =
    `Programme : ${wash.mode}, ${wash.temperature}°, savon ${wash.soap}.`;
}

loadLastWash();