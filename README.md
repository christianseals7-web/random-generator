# Random Generator

A full-stack web app that generates random picks: numbers, sports teams, music artists, and restaurants, with filters for league, genre, and US region.

**Live demo:** https://random-generator-08sa.onrender.com
*(Hosted on Render's free plan, so the first load may take up to a minute while it wakes up.)*

<img width="1887" height="920" alt="image" src="https://github.com/user-attachments/assets/f2f5ff45-15f0-4658-83e7-556b8cd6e224" />


## Features

- **Numbers**: pick a random number in any range, with input validation
- **Sports teams**: 627 teams across the NFL, NBA, MLB, NHL, college football (FBS), and college basketball (Division I), filterable by league and region
- **Music artists**: Spotify's all-time most-streamed artists, filterable by genre
- **Restaurants**: 100+ national and regional chains, filterable by region, with a "regional chains only" option
- **REST API** with auto-generated interactive docs at `/docs`

## Tech stack

- **Backend:** Python, FastAPI, Uvicorn
- **Frontend:** HTML, CSS, JavaScript (Fetch API)
- **Data:** JSON files
- **Deployment:** Render, with automatic deploys from GitHub

## API endpoints

| Endpoint | Query parameters | Example |
|---|---|---|
| `GET /api/random/number` | `min`, `max` | `/api/random/number?min=1&max=6` |
| `GET /api/random/team` | `league`, `region` | `/api/random/team?league=NBA&region=Southeast` |
| `GET /api/random/artist` | `genre` | `/api/random/artist?genre=Pop` |
| `GET /api/random/restaurant` | `region`, `regional_only` | `/api/random/restaurant?region=West&regional_only=true` |

Invalid input returns a `400` error, and filters that match nothing return a `404` with a message.

## Run it locally

```bash
git clone https://github.com/christianseals7-web/random-generator.git
cd random-generator/backend
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # Mac/Linux
pip install -r requirements.txt
python -m uvicorn main:app --reload
```

Then open http://127.0.0.1:8000.

## Project structure

```
backend/
├── main.py            # API routes and static file serving
├── requirements.txt
├── data/              # teams, artists, and restaurants as JSON
└── static/            # index.html, style.css, script.js
```
