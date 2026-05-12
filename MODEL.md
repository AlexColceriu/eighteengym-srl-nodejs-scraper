# Modele de Date - 18GYM / EIGHTEENGYM SRL

## Job Model

| Field          | Type     | Required | Description |
|----------------|----------|----------|-------------|
| url            | string   | Yes      | URL-ul complet către pagina jobului |
| title          | string   | Yes      | Titlul exact al poziției |
| company        | string   | No       | EIGHTEENGYM SRL |
| cif            | string   | No       | 9829933 |
| location       | string[] | No       | Orașele unde e disponibil jobul |
| tags           | string[] | No       | Skill-uri, lowercase, max 20 |
| workmode       | string   | No       | "remote", "on-site", "hybrid" |
| date           | date     | No       | Data scrape (ISO8601 UTC) |
| status         | string   | No       | "scraped", "tested", "published", "verified" |
| salary         | string   | No       | (opțional) "MIN-MAX CURRENCY" |

### Job Status Flow
```
scraped → (tested OR verified) → published
```

## Company Model

| Field       | Type     | Required | Description |
|-------------|----------|----------|-------------|
| id          | string   | Yes      | 9829933 |
| company     | string   | Yes      | EIGHTEENGYM SRL |
| brand       | string   | No       | 18GYM |
| status      | string   | No       | "activ" |
| location    | string[] | No       | Târgu Mureș, Cluj-Napoca, București etc. |
| website     | string[] | No       | https://18gym.ro |
| career      | string[] | No       | https://18gym.ro/cariere/ |
| scraperFile | string   | No       | eighteengym-srl-nodejs-scraper |
