import json
import random
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Random Generator API")

DATA_DIR = Path(__file__).parent / "data"

with open(DATA_DIR / "teams.json") as f:
    TEAMS = json.load(f)

with open(DATA_DIR / "artists.json") as f:
    ARTISTS = json.load(f)

@app.get("/api/random/number")
def random_number(min: int = 1, max: int = 100):
    if min > max:
        raise HTTPException(status_code=400, detail="min must be less than or equal to max")
    result = random.randint(min, max)
    return {"min": min, "max": max, "result": result}

@app.get("/api/random/team")
def random_team(league: str | None = None):
    teams = TEAMS

    if league:
        teams = [team for team in TEAMS if team["league"].lower() == league.lower()]

    if not teams:
        raise HTTPException(status_code=404, detail=f"No teams found for league '{league}'")

    return random.choice(teams)

@app.get("/api/random/artist")
def random_artist(genre: str | None = None):
    artists = ARTISTS

    if genre:
        artists = [artist for artist in ARTISTS if artist["genre"].lower() == genre.lower()]

    if not artists:
        raise HTTPException(status_code=404, detail=f"No artists found for genre '{genre}'")

    return random.choice(artists)

app.mount("/", StaticFiles(directory=Path(__file__).parent / "static", html=True), name="static")