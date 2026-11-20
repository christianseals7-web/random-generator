import json
import random
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles

app = FastAPI(title="Random Generator API")

DATA_DIR = Path(__file__).parent / "data"


def load(filename):
    with open(DATA_DIR / filename, encoding="utf-8") as f:
        return json.load(f)


TEAMS = load("teams.json")
ARTISTS = load("artists.json")
RESTAURANTS = load("restaurants.json")


def same(a, b):
    return a.lower() == b.lower()


def pick(items, what):
    if not items:
        raise HTTPException(status_code=404, detail=f"No {what} match those filters")
    return random.choice(items)


@app.get("/api/random/number")
def random_number(min: int = 1, max: int = 100):
    if min > max:
        raise HTTPException(status_code=400, detail="min must be less than or equal to max")
    result = random.randint(min, max)
    return {"min": min, "max": max, "result": result}


@app.get("/api/random/team")
def random_team(league: str | None = None, region: str | None = None):
    teams = TEAMS

    if league:
        teams = [t for t in teams if same(t["league"], league)]
    if region:
        teams = [t for t in teams if same(t["region"], region)]

    return pick(teams, "teams")


@app.get("/api/random/artist")
def random_artist(genre: str | None = None):
    artists = ARTISTS

    if genre:
        artists = [a for a in artists if same(a["genre"], genre)]

    return pick(artists, "artists")


@app.get("/api/random/restaurant")
def random_restaurant(region: str | None = None, regional_only: bool = False):
    restaurants = RESTAURANTS

    if regional_only:
        restaurants = [r for r in restaurants if "National" not in r["regions"]]
    if region:
        restaurants = [
            r for r in restaurants
            if "National" in r["regions"] or any(same(x, region) for x in r["regions"])
        ]

    return pick(restaurants, "restaurants")


app.mount("/", StaticFiles(directory=Path(__file__).parent / "static", html=True), name="static")