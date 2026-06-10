import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dns from "dns";

// Forzar a Node.js a preferir direcciones IPv4 sobre IPv6 para evitar problemas de ruteo ENETUNREACH en la nube
dns.setDefaultResultOrder("ipv4first");

// Cargar variables de entorno localmente de forma compatible con cualquier versión de Node
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envFile =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
const envPath = path.resolve(__dirname, "..", envFile);

if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const firstEquals = trimmed.indexOf("=");
    if (firstEquals === -1) return;
    const key = trimmed.substring(0, firstEquals).trim();
    let val = trimmed.substring(firstEquals + 1).trim();
    // Remover comillas iniciales y finales si existen
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.substring(1, val.length - 1);
    }

    if (!process.env[key]) {
      process.env[key] = val;
    }
  });
}
