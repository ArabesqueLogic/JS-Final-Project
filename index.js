let wondersData = [];
let filter = "";
let searchInput = "";

async function getWonders() {
  const wonders = await fetch("https://www.world-wonders-api.org/v0/wonders");
  wondersData = await wonders.json();
  renderWonders();
}

function wonderHtml(wonder) {
  return `
    <div class="wonder__wrapper">
      <figure class="wonder__img--wrapper">
        <img class="wonder__img" src="${wonder.links.images[0]}" alt="" />
      </figure>
      <div class="wonder_description">
        <div class="wonder__title">${wonder.name}</div>
        <div class="wonder__location">${wonder.location}</div>
        <div class="wonder__build-year">${wonderBuildYear(wonder.build_year)}</div>
        <div class="wonder__time-period">${wonder.time_period}</div>
      </div>
    </div>
  `;
}

function renderWonders() {
  let data = [...wondersData];

  if (searchInput) {
    data = data.filter((wonder) =>
      wonder.name.toLowerCase().includes(searchInput),
    );
  }

  if (filter === "OLDEST_TO_NEWEST") {
    data.sort((a, b) => a.build_year - b.build_year);
  } else if (filter === "NEWEST_TO_OLDEST") {
    data.sort((a, b) => b.build_year - a.build_year);
  } else if (filter === "A_TO_Z") {
    data.sort((a, b) => a.name.localeCompare(b.name));
  } else if (filter === "Z_TO_A") {
    data.sort((a, b) => b.name.localeCompare(a.name));
  }

  document.querySelector(".wonders__wrapper").innerHTML = data
    .map((wonder) => wonderHtml(wonder))
    .join("");
}

function filterWonders(event) {
  filter = event.target.value;
  renderWonders();
}

function searchWonder(event) {
  searchInput = event.target.value.toLowerCase();
  renderWonders();
}

function wonderBuildYear(year) {
  if (year < 0) {
    return Math.abs(year) + " BCE";
  }
  return year + " CE";
}

getWonders();
