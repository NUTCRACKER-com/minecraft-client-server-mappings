// node scripts/validate.js – prüft alle servers/{nut,lunar,nrc}/<id>/server.json (Pflichtfelder, bekannte Modul-IDs, Dateien vorhanden, keine doppelten Adressen).
const fs = require("fs");
const path = require("path");
const schema = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "schema", "server.schema.json"), "utf8"));
const known = new Set(schema.properties.disabledModules.items.enum);
const root = path.join(__dirname, "..", "servers");
const entries = [];
for (const g of fs.readdirSync(root)) {
  const gp = path.join(root, g);
  if (!fs.statSync(gp).isDirectory()) continue;
  if (g.startsWith("_")) { entries.push([g, gp]); continue; }
  for (const d of fs.readdirSync(gp)) entries.push([d, path.join(gp, d)]);
}
let errors = 0;
const seen = new Map();
const fail = (m) => { console.error("FEHLER: " + m); errors++; };
for (const [d, base] of entries) {
  if (!fs.statSync(base).isDirectory()) continue;
  if (!/^_?[a-z0-9-]+$/.test(d)) fail(d + ": Ordnername nur a-z, 0-9, -");
  let s;
  try { s = JSON.parse(fs.readFileSync(path.join(base, "server.json"), "utf8")); } catch (e) { fail(d + ": server.json fehlt oder ist kein gültiges JSON"); continue; }
  for (const k of Object.keys(s)) if (!schema.properties[k]) fail(d + ": unbekanntes Feld " + k);
  if (!s.name) fail(d + ": name fehlt");
  if (!Array.isArray(s.addresses) || !s.addresses.length) fail(d + ": addresses fehlt");
  for (const a of s.addresses || []) {
    if (!/^[a-z0-9.-]+$/.test(a)) fail(d + ": ungültige Adresse " + a);
    if (!d.startsWith("_")) { if (seen.has(a) && seen.get(a) !== d) fail(d + ": Adresse " + a + " gehört schon zu " + seen.get(a)); seen.set(a, d); }
  }
  for (const m of s.disabledModules || []) if (!known.has(m)) fail(d + ": unbekannte Modul-ID " + m + " (siehe docs/modules.md)");
  for (const f of [s.icon, s.banner]) if (f && !fs.existsSync(path.join(base, f))) fail(d + ": Datei " + f + " fehlt");
  if (s.notes && /[äöüßÄÖÜ]|(und|der|die|das|nicht|keine|Regeln)/.test(s.notes)) fail(d + ": notes must be written in English");
  if (s.rulesUrl && !s.rulesUrl.startsWith("https://")) fail(d + ": rulesUrl muss mit https:// beginnen");
}
if (errors) { console.error(errors + " Fehler"); process.exit(1); }
console.log("Alle Einträge sind gültig.");
