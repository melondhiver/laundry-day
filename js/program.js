// --- Initialisation Supabase ---
const supabase = window.supabase.createClient(
  "https://meydnxmkhqnlaianxxbj.supabase.co",
  "sb_publishable_Wkc5CdL4q_X39NO4vXDP0A_xD6CwOJR"
);

// --- Gestion des choix utilisateur ---
let settings = {
  temp: null,
  soap: null,
  mode: null,
  prewash: false,
  softener: false
};

// --- Boutons Température ---
document.querySelectorAll("[data-temp]").forEach(btn => {
  btn.onclick = () => {
    settings.temp = parseInt(btn.dataset.temp);

    document.querySelectorAll("[data-temp]").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  };
});

// --- Boutons Savon ---
document.querySelectorAll("[data-soap]").forEach(btn => {
  btn.onclick = () => {
    settings.soap = btn.dataset.soap;

    document.querySelectorAll("[data-soap]").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  };
});

// --- Boutons Programme ---
document.querySelectorAll("[data-mode]").forEach(btn => {
  btn.onclick = () => {
    settings.mode = btn.dataset.mode;

    document.querySelectorAll("[data-mode]").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");
  };
});

// --- Envoi vers Supabase ---
document.getElementById("washBtn").onclick = async () => {
  const trouble = localStorage.getItem("trouble");

  if (!trouble) {
    alert("Erreur : aucun souci trouvé.");
    return;
  }

  if (!settings.temp || !settings.soap || !settings.mode) {
    alert("Merci de sélectionner tous les réglages avant de lancer le lavage.");
    return;
  }

  settings.prewash = document.getElementById("prewash").checked;
  settings.softener = document.getElementById("softener").checked;

  const payload = {
    trouble: trouble,
    temperature: settings.temp,
    soap: settings.soap,
    mode: settings.mode,
    prewash: settings.prewash,
    softener: settings.softener
  };

  const { data, error } = await supabase
    .from("wash_settings")
    .insert([payload]);

  if (error) {
    console.error("Erreur Supabase :", error);
    alert("Une erreur est survenue.");
    return;
  }

  window.location.href = "clean.html";
};
