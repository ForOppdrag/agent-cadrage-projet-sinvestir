const requiredVariables = ["N8N_WEBHOOK_URL", "NEXT_PUBLIC_APP_URL"];

const missingVariables = requiredVariables.filter((name) => !process.env[name]);

if (missingVariables.length > 0) {
  console.error(
    `Variables d'environnement manquantes : ${missingVariables.join(", ")}`
  );
  process.exit(1);
}

console.log("Variables essentielles presentes.");
