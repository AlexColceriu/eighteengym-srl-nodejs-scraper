# INSTRUCTIONS.md - Web Scraper pentru 18GYM

## Scop
Scraper pentru extragerea locurilor de muncă de la 18GYM (EIGHTEENGYM SRL) în formatul Job Model peviitor.ro.

## Tech Stack
- **Runtime:** Node.js (LTS)
- **HTTP Client:** `node-fetch`
- **HTML Parsing:** `cheerio`
- **Data Validation:** Validare manuală conform model.md
- **Output:** Solr + JSON

## Structura Proiectului
```
scraper/
├── index.js           # Scraper principal
├── company.js         # Validare companie ANAF
├── demoanaf.js        # API ANAF
├── solr.js            # Operații Solr
├── output/            # Fișiere JSON
└── README.md
```

## Rulare
```bash
npm install
npm run scrape
# sau
node index.js
```

## Output Format
Conform Job Model din model.md: url, title, company, cif, location, tags, workmode, date, status.
