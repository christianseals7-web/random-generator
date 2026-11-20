async function callApi(path, params, resultEl, detailEl, formatResult) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== "") {
      query.append(key, value);
    }
  }

  resultEl.textContent = "...";
  resultEl.classList.remove("error");
  if (detailEl) detailEl.textContent = "";

  try {
    const response = await fetch(`${path}?${query}`);
    const data = await response.json();

    if (!response.ok) {
      resultEl.classList.add("error");
      resultEl.textContent = typeof data.detail === "string" ? data.detail : "Invalid input";
      return;
    }

    const [main, detail] = formatResult(data);
    resultEl.textContent = main;
    if (detailEl) detailEl.textContent = detail;
  } catch (err) {
    resultEl.classList.add("error");
    resultEl.textContent = "Couldn't reach the server";
  }
}

const $ = (id) => document.getElementById(id);

$("num-btn").addEventListener("click", () => {
  callApi(
    "/api/random/number",
    { min: $("num-min").value, max: $("num-max").value },
    $("num-result"),
    null,
    (data) => [data.result, ""]
  );
});

$("team-btn").addEventListener("click", () => {
  callApi(
    "/api/random/team",
    { league: $("team-league").value, region: $("team-region").value },
    $("team-result"),
    $("team-detail"),
    (data) => [
      data.name,
      [data.league, data.conference, data.state].filter(Boolean).join(" · "),
    ]
  );
});

$("artist-btn").addEventListener("click", () => {
  callApi(
    "/api/random/artist",
    { genre: $("artist-genre").value },
    $("artist-result"),
    $("artist-detail"),
    (data) => [data.name, `${data.genre} · #${data.rank} most streamed on Spotify`]
  );
});

$("food-btn").addEventListener("click", () => {
  callApi(
    "/api/random/restaurant",
    {
      region: $("food-region").value,
      regional_only: $("food-regional").checked ? "true" : "",
    },
    $("food-result"),
    $("food-detail"),
    (data) => [data.name, `${data.category} · ${data.regions.join(", ")}`]
  );
});