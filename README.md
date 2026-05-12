# EIGHTEENGYM SRL - Job Scraper

[![WebScraper 18GYM to Peviitor](https://github.com/AlexColceriu/eighteengym-srl-nodejs-scraper/actions/workflows/scrape.yml/badge.svg)](https://github.com/AlexColceriu/eighteengym-srl-nodejs-scraper/actions/workflows/scrape.yml)

A Node.js scraper for extracting job listings from 18GYM Romania and storing them in Solr for [peviitor.ro](https://peviitor.ro).

## Overview

This project automates daily scraping of 18GYM job listings in Romania, ensuring the peviitor.ro job board stays up-to-date.

## Features

- Scrapes job listings from 18GYM careers page
- Validates company data via ANAF
- Stores jobs in Solr with proper data validation
- GitHub Actions workflow for daily automated scraping

## Project Structure

```
├── index.js           # Main scraper entry point
├── company.js         # Company validation via ANAF
├── demoanaf.js        # ANAF API integration
├── solr.js            # Solr database operations
├── company.json       # Cached company data
├── tests/             # Test suite
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── .github/
│   └── workflows/
│       ├── scrape.yml     # Daily scraping workflow
│       └── test.yml      # Test automation
└── package.json
```

## Setup

### Prerequisites

- Node.js 24+
- npm

### Installation

```bash
npm install
```

### Configuration

Set the `SOLR_AUTH` environment variable with your Solr credentials:

```bash
export SOLR_AUTH="username:password"
```

## Usage

### Run the Scraper

```bash
npm run scrape
```

### Run Tests

```bash
# All tests
npm test

# Unit tests only
npm run test:unit

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e
```

## Company

**Legal name:** EIGHTEENGYM SRL
**Brand:** 18GYM
**CIF:** 9829933
**Location:** Târgu Mureș, România
**Industry:** Fitness (CAEN 9313)

## License

MIT
