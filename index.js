async function getWonders() {
  const wonders = await fetch("https://www.world-wonders-api.org/v0/wonders");
  wondersData = await wonders.json();
  renderWonders();
  returnWonders();
}

let wondersData = [];

function wonderHtml(wonder) {
  return `<div class="wonder__wrapper">
                <figure class="wonder__img--wrapper">
                  <img
                    class="wonder__img"
                    src="${wonder.links.images[0]}"
                    alt="" 
                  />
                </figure>
                <div class="wonder_description">
                  <div class="wonder__title">${wonder.name}</div>
                  <div class="wonder__location">${wonder.location}</div>
                  <div class="wonder__build-year">${wonderBuildYear(wonder.build_year)}</div>
                  <div class="wonder__time-period">${wonder.time_period}</div>
                </div>
              </div>`;
}

function renderWonders(filter) {
  let filteredWonders = [...wondersData];

  if (filter === "OLDEST_TO_NEWEST") {
    filteredWonders.sort((a, b) => a.build_year - b.build_year);
  } else if (filter === "NEWEST_TO_OLDEST") {
    filteredWonders.sort((a, b) => b.build_year - a.build_year);
  } else if (filter === "A_TO_Z") {
    filteredWonders.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filter === "Z_TO_A") {
    filteredWonders.sort((a, b) => b.name.localeCompare(a.name));
  }

  const wondersListEl = document.querySelector(".wonders__wrapper");
  wondersListEl.innerHTML = filteredWonders
    .map((wonder) => wonderHtml(wonder))
    .join("");
}

function wonderBuildYear(build_year) {
  if (build_year < 0) {
    build_year = Math.abs(build_year);
    return build_year + " BCE";
  } else {
    return build_year + " CE";
  }
}

function returnWonders(event) {
  const input = event.target.value.toLowerCase();

  const sorted = [...wondersData].sort((a, b) => {
    if (
      a.name.toLowerCase().startsWith(input) &&
      b.name.toLowerCase().startsWith(input)
    )
      return a.name.localeCompare(b.name);
    else if (a.name.toLowerCase().startsWith(input)) return -1;
    else if (b.name.toLowerCase().startsWith(input)) return 1;

    return a.name.localeCompare(b.name);
  });

  document.querySelector(".wonders__wrapper").innerHTML = sorted
    .map((wonder) => wonderHtml(wonder))
    .join("");
}

function searchWonder(event) {
  returnWonders(event);
}

setTimeout(() => {
  getWonders();
}, 1);
