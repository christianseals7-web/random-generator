async function callApi(path, params, resultEl, formatResult) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== "") {
      query.append(key, value);
    }
  }

  resultEl.textContent = "...";
  resultEl.classList.remove("error");

  try {
    const response = await fetch(`${path}?${query}`);
    const data = await response.json();

    if (!response.ok) {
      resultEl.classList.add("error");
      resultEl.textContent = typeof data.detail === "string" ? data.detail : "Invalid input";
      return;
    }

    resultEl.textContent = formatResult(data);
  } catch (err) {
    resultEl.classList.add("error");
    resultEl.textContent = "Couldn't reach the server";
  }
}

document.getElementById("num-btn").addEventListener("click", () => {
  callApi(
    "/api/random/number",
    {
      min: document.getElementById("num-min").value,
      max: document.getElementById("num-max").value,
    },
    document.getElementById("num-result"),
    (data) => data.result
  );
});

document.getElementById("team-btn").addEventListener("click", () => {
  callApi(
    "/api/random/team",
    { league: document.getElementById("team-league").value },
    document.getElementById("team-result"),
    (data) => data.name
  );
});

document.getElementById("artist-btn").addEventListener("click", () => {
  callApi(
    "/api/random/artist",
    { genre: document.getElementById("artist-genre").value },
    document.getElementById("artist-result"),
    (data) => data.name
  );
});