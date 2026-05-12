# Instructions

## Project Purpose

This scraper extracts job listings from 18GYM Romania careers page and imports them to peviitor.ro.

Target: https://18gym.ro/cariere/

## Model Schemas

The job and company models are defined in:
- `job-model.md` - Job model schema
- `company-model.md` - Company model schema

## Important

These models are **dynamic** and can change over time. They are based on the official Peviitor Core schemas which may be updated.

## How to Keep Models Updated

When working on this scraper:

1. **Check for updates** in the Peviitor Core repository:
   - Repository: https://github.com/peviitor-ro/peviitor_core
   - Main file: README.md (contains Job and Company model schemas)

2. **When to update**:
   - Before starting new development work
   - If field requirements or validations have changed
   - If new fields have been added

3. **How to update**:
   - Fetch the latest README.md from peviitor_core main branch
   - Compare with current job-model.md and company-model.md
   - Update local files if there are differences
   - Update index.js mapping logic if field requirements changed

## Technologies

- **Node.js & JavaScript** - For scraping and data extraction
- **Apache SOLR** - For data storage and indexing
- **Cheerio** - For HTML parsing

## Workflow Steps

1. **Start with brand** - We know the brand (e.g., "18GYM")
2. **Search in DemoANAF** - Find company by brand, get CIF from search results
3. **Get company details from ANAF** - Using CIF, fetch full company data from ANAF
4. **Validate with Peviitor** - Verify company exists in Peviitor, get group/brand info
5. **Check existing jobs in SOLR** - Query SOLR by CIF to see what jobs already exist
6. **Check company status** - If ANAF status = "inactive" → DELETE existing jobs from SOLR and STOP
7. **Save company.json** - Save all ANAF + Peviitor data for backup
8. **Scrape new jobs** - Extract jobs from 18gym.ro careers page
9. **Transform for SOLR** - Validate and fix job data:
   - location: Only Romanian cities allowed
   - tags: lowercase, no diacritics
   - company: uppercase
10. **Upsert to SOLR** - Import/update jobs in SOLR
11. **Verify URLs** - Check existing job URLs still work, delete 404s

## Running the Scraper

```bash
# Set environment variables
export SOLR_AUTH=user:password

# Run the full scraper workflow
node index.js

# Test mode (no SOLR interaction)
node index.js --test
```

> **Important**: Scraper does NOT delete jobs from other sources. It only upserts 18GYM jobs. Existing jobs are preserved.

## File Responsibilities

| File | Role |
|------|------|
| `index.js` | Main entry point - validate company → scrape careers page → transform → upsert |
| `company.js` | Validates company via ANAF + Peviitor, checks if active/inactive, saves company.json |
| `solr.js` | SOLR operations module - query, delete, upsert jobs + standalone commands |
| `demoanaf.js` | ANAF API module - searchCompany(brand) and getCompanyFromANAF(cif) |

## API Endpoints

- **DemoANAF Search**: `https://demoanaf.ro/api/search?q=BRAND` - Search companies by name/brand
- **DemoANAF Company**: `https://demoanaf.ro/api/company/:cui` - Get company details by CIF
- **Peviitor API**: `https://api.peviitor.ro/v1/company/`
- **Solr**: `https://solr.peviitor.ro/solr/job` (auth: via `SOLR_AUTH` environment variable)

## Environment Variables

| Variable | Description |
|----------|-------------|
| `SOLR_AUTH` | SOLR credentials in format `user:password` |

## Standalone Commands

```bash
# Verify jobs in SOLR by CIF
node solr.js <CIF>

# Extract existing jobs from SOLR by CIF
node solr.js extract <CIF>

# Query company in SOLR
node solr.js company <search_term>

# Get company details from ANAF by CIF
node demoanaf.js <CIF>

# Search companies in ANAF by brand
node demoanaf.js search <brand>
```

## Testing

Run tests:
```bash
npm test
```

## Technical Debt / Future Work

- [ ] Integrate bestjobs API for additional job listings
- [ ] Write Unit Tests for all modules
- [ ] Write Integration Tests for SOLR interaction
- [ ] Write E2E automated tests
