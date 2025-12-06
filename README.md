# Projekt-M210

# WordPress + MariaDB – Cloud-Projekt (LB02 – Modul 210)
 
Dieses Projekt stellt eine containerisierte WordPress-Applikation bereit, bestehend aus zwei Hauptkomponenten:
 
- **WordPress** (Web-Applikation)
- **MariaDB** (Datenbank)
 
Die gesamte Infrastruktur wird über Docker Compose gestartet und kann optional über eine GitLab CI/CD Pipeline automatisiert deployt werden.
 
---
 
## 📁 Projektstruktur

LB-Projekt-M210-Anina.Natalia
│
├─ Projektdokumentation.pdf
│
├─ Prasentation.pdf
│
└─ Projekt/ 
	├─ .gitlab-ci.yml
	│ 
	├─ infra/
	│   ├─ docker-compose.yml
	│   ├─ .env.example
	│   └─ .gitkeep
	│
	├─ app/
	│   └─ .gitkeep
	│
	├─ pipelines/
	│   ├─ DEPLOYMENT-NOTIZEN.md
	│   └─ .gitkeep
	│
	└─ README.md

---
 
## ⚙️ Konfiguration (.env)
 
Die Container-Konfiguration erfolgt über eine `.env` Datei.  
Eine Beispiel-Umgebungsdatei ist bereits vorhanden:
 
**Datei:** `Projekt/infra/.env.example`
 
Inhalt:
 
```env
# Datenbankeinstellungen für WordPress + MariaDB
 
WP_DB_NAME=wpdb
WP_DB_USER=wpuser
WP_DB_PASSWORD=wppass
 
DB_ROOT_PASSWORD=rootpass
