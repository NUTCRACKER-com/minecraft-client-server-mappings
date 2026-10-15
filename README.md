# NUTclient Server Mappings

Hier steht, **wie NUTclient auf einem Server aussieht und sich verhält**: Name, alle Adressen, Banner, Icon und welche Module dort ausgeschaltet werden
(z. B. weil die Server-Regeln Freecam verbieten). Das NUTclient-Backend liest dieses Repo täglich; wer einen Server ergänzen oder korrigieren will, macht einen **Pull Request**.

Zusätzlich gleicht das Backend täglich öffentliche Mappings anderer Clients ab (Lunar Client, Tyranis – beide MIT; NoRisk nur Name/Adressen/Kategorien, weil deren Repo GPL ist).
Einträge aus **diesem** Repo haben immer Vorrang.

## Einen Server hinzufügen

1. Ordner `servers/<kurzname>/` anlegen (nur `a-z`, `0-9`, `-`).
2. `server.json` nach [`schema/server.schema.json`](schema/server.schema.json) schreiben – Vorlage: [`servers/_example/server.json`](servers/_example/server.json).
3. Optional `icon.png` (quadratisch, mind. 128×128) und `banner.png`/`banner.webp`/`banner.gif` (16:9) danebenlegen.
4. `node scripts/validate.js` ausführen (oder die Prüfung im Pull Request abwarten).
5. Pull Request öffnen. Bitte den Link zu den **Server-Regeln** in `rulesUrl` angeben, damit man die Sperren nachprüfen kann.

## Felder

| Feld | Pflicht | Bedeutung |
| --- | --- | --- |
| `name` | ja | Anzeigename |
| `addresses` | ja | Alle Adressen des Servers (Domains, ohne Port). Untersubdomains passen automatisch mit. |
| `categories` | nein | z. B. `PVP`, `SURVIVAL`, `SKYBLOCK` |
| `icon` / `banner` | nein | Dateiname im selben Ordner |
| `rulesUrl` | nein | Link zu den Regeln / der Mod-Liste des Servers |
| `disabledModules` | nein | Modul-IDs, die dort ausgeschaltet werden ([alle IDs](docs/modules.md)) |
| `notes` | nein | Kurze Begründung (wird intern angezeigt) |

Gesperrte Module lassen sich auf dem Server nicht einschalten und kommen beim Verlassen automatisch zurück.

## Lizenz

Die Daten stehen unter MIT (siehe `LICENSE`). Banner und Icons gehören den jeweiligen Servern und liegen hier nur zur Anzeige im Client.
