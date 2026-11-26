// China by Numbers — page switching, views and the output chart. No libraries, no network calls.
import { ABOUT, HEADLINE, YEARLY_OUTPUT, AGE_SPLIT, SECTOR_MIX, TRADE_BOARD, PROVINCE_RANK, WELLBEING, GREEN_GRID } from './data.js';

const stage = document.getElementById('stage');

// Keep user-visible text safe when it is built into markup.
const safe = (text) => String(text).replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[ch]));
const oneDecimal = (n) => Number(n).toFixed(1);

// Paint output bars with the growth line over the top, on a canvas.
function paintOutputChart(canvas, earliest) {
  const rows = YEARLY_OUTPUT.filter((r) => r.yr >= earliest);
  const scale = window.devicePixelRatio || 1;
  const width = 640, height = 300, left = 44, right = 14, top = 18, bottom = 30;
  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.style.height = 'auto';
  const pen = canvas.getContext('2d');
  pen.scale(scale, scale);
  const ceiling = 150;
  const plotLeft = left, plotRight = width - right, plotTop = top, plotBottom = height - bottom;
  const slot = (plotRight - plotLeft) / rows.length;
  pen.strokeStyle = '#e8edf2';
  pen.fillStyle = '#55677d';
  pen.font = '11px Arial';
  pen.textAlign = 'right';
  for (const mark of [0, 50, 100, 150]) {
    const y = plotBottom - (mark / ceiling) * (plotBottom - plotTop);
    pen.beginPath();
    pen.moveTo(plotLeft, y);
    pen.lineTo(plotRight, y);
    pen.stroke();
    pen.fillText(String(mark), plotLeft - 6, y + 4);
  }
  pen.textAlign = 'center';
  rows.forEach((row, i) => {
    const barX = plotLeft + i * slot + slot * 0.18;
    const barW = slot * 0.64;
    const barH = (row.total / ceiling) * (plotBottom - plotTop);
    pen.fillStyle = row.yr === 2024 ? '#c8102e' : '#1e40af';
    pen.fillRect(barX, plotBottom - barH, barW, barH);
    pen.fillStyle = '#ffffff';
    pen.font = 'bold 11px Arial';
    pen.fillText(oneDecimal(row.total), barX + barW / 2, plotBottom - barH + 14);
    pen.fillStyle = '#55677d';
    pen.font = '11px Arial';
    pen.fillText(String(row.yr), barX + barW / 2, plotBottom + 16);
  });
  const dotAt = (row, i) => {
    const x = plotLeft + i * slot + slot * 0.5;
    const y = plotBottom - (row.pace / 10) * (plotBottom - plotTop);
    return [x, y];
  };
  pen.strokeStyle = '#0e7490';
  pen.lineWidth = 2;
  pen.beginPath();
  rows.forEach((row, i) => {
    const [x, y] = dotAt(row, i);
    if (i === 0) pen.moveTo(x, y); else pen.lineTo(x, y);
  });
  pen.stroke();
  pen.fillStyle = '#0e7490';
  rows.forEach((row, i) => {
    const [x, y] = dotAt(row, i);
    pen.beginPath();
    pen.arc(x, y, 3, 0, Math.PI * 2);
    pen.fill();
  });
  pen.fillStyle = '#0e7490';
  pen.font = '11px Arial';
  pen.textAlign = 'left';
  pen.fillText('— growth % (scale 0–10%)', plotLeft + 4, plotTop + 2);
}

function headlineTiles() {
  const tiles = HEADLINE.map((h) => `
    <div class="tile">
      <div class="tile-name">${safe(h.heading)}</div>
      <div class="tile-big">${safe(h.reading)}</div>
      <div class="tile-shift${h.shift.startsWith('down') ? ' falling' : ''}">${safe(h.shift)}</div>
      <div class="tile-aside">${safe(h.aside)}</div>
    </div>`).join('');
  return `<div class="tiles">${tiles}</div>`;
}

function ageMeters() {
  return AGE_SPLIT.map((a) => `
    <div class="meter-row">
      <span>${safe(a.band)}</span>
      <span class="meter-track"><span class="meter-fill" style="width:${a.portion}%;background:#1e40af"></span></span>
      <span class="meter-num">${a.headcount}m · ${a.portion}%</span>
    </div>`).join('');
}

function sectorMeters() {
  return SECTOR_MIX.map((s) => `
    <div class="meter-row">
      <span>${safe(s.sector)}</span>
      <span class="meter-track"><span class="meter-fill" style="width:${s.portion}%;background:${s.tint}"></span></span>
      <span class="meter-num">¥${s.added}tr · ${s.portion}%</span>
    </div>`).join('');
}

function yearPicker() {
  return `<div class="field-row">
    <label for="earliestYear">Starting year</label>
    <select id="earliestYear">
      <option value="2015" selected>2015</option>
      <option value="2018">2018</option>
      <option value="2020">2020</option>
      <option value="2022">2022</option>
    </select>
    <span class="dim tiny">Pick a year and the chart redraws.</span>
  </div>`;
}

function chartPanel() {
  return `<div class="box">
    <h3>National output, 2015–2024 (¥ trillion), with growth (%)</h3>
    <canvas class="graph" id="outputChart" role="img" aria-label="Bar chart of China's national output from 2015 to 2024, rising from 68.9 to 134.9 trillion yuan"></canvas>
    <p class="graph-note">Bars: output in trillion yuan. Line: real yearly growth. 2024 is shown in red. Source: NBS.</p>
    ${yearPicker()}
  </div>`;
}

// One page each.
function pageOverview() {
  return `
    <p class="eyebrow">National statistics · ${safe(ABOUT.place)}</p>
    <h1>China in ${ABOUT.edition}: the year in numbers</h1>
    <p class="intro">One country, 1.4 billion people, the world's second-largest economy. Here are the figures that describe China today — its people, its growth, its trade, its health and its provinces — all taken from the National Bureau of Statistics.</p>
    ${headlineTiles()}
    <div class="split">
      ${chartPanel()}
      <div class="box">
        <h3>Who lives here</h3>
        ${ageMeters()}
        <p class="tiny dim">Age bands at the end of 2024. People aged 60 and over passed 300 million for the first time; the working-age band (15–59) is 60.9% of everyone.</p>
        <h3 style="margin-top:18px">Where output comes from</h3>
        ${sectorMeters()}
        <p class="tiny dim">Services now make more than half of output; industry is 38.3% and farming 7.1%.</p>
      </div>
    </div>
    <div class="highlight">
      <p><b>Why 2024 stands out.</b> Output grew 5.0% to ¥134.9 trillion, the share of people in towns and cities reached 67.0%, and expected lifespan hit 79.0 years — while the population fell for a third year running, by 1.39 million.</p>
    </div>`;
}

function pageEconomy() {
  return `
    <p class="eyebrow">Economy</p>
    <h1>The economy in ${ABOUT.edition}</h1>
    <p class="intro">Growth of 5.0% on a ¥134.9 trillion economy, a record goods surplus, and services past half of output. Change the starting year to redraw the chart, or read the trade table below.</p>
    <div class="split">
      ${chartPanel()}
      <div class="box">
        <h3>Output by sector</h3>
        ${sectorMeters()}
        <p class="tiny dim">Value added in 2024: services ¥73.7tr, industry ¥51.7tr, farming ¥9.6tr.</p>
      </div>
    </div>
    <h2>Trade, prices and incomes</h2>
    <div class="box"><div class="pairs">
      ${TRADE_BOARD.map((t) => `<div><span>${safe(t.item)}</span><b>${safe(t.reading)} · ${safe(t.shift)}</b></div>`).join('')}
    </div></div>
    <p class="tiny dim">Goods trade reached ¥43.85 trillion in 2024; the surplus of ¥7.06 trillion was the largest ever recorded. Research spending of ¥3.61 trillion is 2.7% of output.</p>`;
}

function pagePeople() {
  const biggest = [...PROVINCE_RANK].sort((a, b) => b.residents - a.residents).slice(0, 6);
  return `
    <p class="eyebrow">People</p>
    <h1>1,408 million people</h1>
    <p class="intro">China's population fell for a third year in 2024, by 1.39 million, because births (9.54 million) stayed below deaths (10.93 million). The country is ageing quickly — and its cities are still growing.</p>
    <div class="split">
      <div class="box">
        <h3>Age bands, end of 2024</h3>
        ${ageMeters()}
        <p class="tiny dim">Children (0–14) are 16.5% of everyone; people 60 and over are 22.0%, and 65 and over are 15.6%.</p>
      </div>
      <div class="box">
        <h3>Where people live</h3>
        <div class="pairs">
          <div><span>People in towns and cities</span><b>943.5m · 67.0%</b></div>
          <div><span>People in the countryside</span><b>464.8m · 33.0%</b></div>
          <div><span>Births in 2024</span><b>9.54m</b></div>
          <div><span>Deaths in 2024</span><b>10.93m</b></div>
          <div><span>Expected lifespan</span><b>79.0 years</b></div>
          <div><span>New city residents in 2024</span><b>+13.2m</b></div>
        </div>
        <p class="tiny dim">The city share rose 0.84 points in a year. Guangdong is the most populous province, with 127.4 million people.</p>
      </div>
    </div>
    <h2>Most populous provinces</h2>
    <div class="box"><table>
      <thead><tr><th>Province</th><th>Capital</th><th class="fig">People (m)</th><th class="fig">Output (¥tr)</th></tr></thead>
      <tbody>${biggest.map((p) => `
        <tr><td>${safe(p.province)}</td><td>${safe(p.seat)}</td><td class="fig">${oneDecimal(p.residents)}</td><td class="fig">${p.output.toFixed(2)}</td></tr>`).join('')}</tbody>
    </table></div>`;
}

function pageRegions() {
  return `
    <p class="eyebrow">Regions</p>
    <h1>The provinces, ranked</h1>
    <p class="intro">Ten provinces by output in 2024. Guangdong and Jiangsu each pass ¥13 trillion — more than most countries earn in a year. Search the table, or tap a column heading to sort it.</p>
    <div class="box">
      <div class="field-row">
        <label for="searchBox">Search</label>
        <input type="search" id="searchBox" placeholder="Try a province or a capital…" aria-label="Search provinces">
        <span class="dim tiny" id="rowCount"></span>
      </div>
      <table>
        <thead><tr>
          <th><button data-sort="province">Province ↕</button></th>
          <th><button data-sort="seat">Capital ↕</button></th>
          <th class="fig"><button data-sort="output">Output (¥tr) ↕</button></th>
          <th class="fig"><button data-sort="residents">People (m) ↕</button></th>
        </tr></thead>
        <tbody id="provinceRows"></tbody>
      </table>
      <p class="tiny dim">Output and population, 2024, National Bureau of Statistics. Guangdong's economy is larger than Australia's.</p>
    </div>`;
}

function pageLiving() {
  return `
    <p class="eyebrow">Living</p>
    <h1>Health, learning and the land</h1>
    <p class="intro">How long people live, how much they study, and the country they live in — from hospital beds to solar panels to fast trains.</p>
    <h2>Health and schooling</h2>
    <div class="box"><div class="pairs">
      ${WELLBEING.map((t) => `<div><span>${safe(t.item)}</span><b>${safe(t.reading)}</b></div>`).join('')}
    </div></div>
    <h2>Environment and the built country</h2>
    <div class="box"><div class="pairs">
      ${GREEN_GRID.map((t) => `<div><span>${safe(t.item)}</span><b>${safe(t.reading)}</b></div>`).join('')}
    </div></div>
    <div class="highlight">
      <p><b>The green shift.</b> China built 12.89 million new-energy vehicles in 2024 and runs 887 GW of solar and 521 GW of wind power — the most in the world on both counts. Fast rail now covers 48,000 km.</p>
    </div>`;
}

// The province table: search text plus a sort column and direction.
let sortField = 'output';
let sortWay = -1;
let searchText = '';
function fillProvinceRows() {
  const body = document.getElementById('provinceRows');
  if (!body) return;
  const needle = searchText.trim().toLowerCase();
  let shown = PROVINCE_RANK.filter((p) => !needle || p.province.toLowerCase().includes(needle) || p.seat.toLowerCase().includes(needle));
  shown = [...shown].sort((a, b) => {
    const left = a[sortField], right = b[sortField];
    const diff = typeof left === 'string' ? left.localeCompare(right) : left - right;
    return diff * sortWay;
  });
  body.innerHTML = shown.map((p) => `
    <tr><td>${safe(p.province)}</td><td>${safe(p.seat)}</td><td class="fig">${p.output.toFixed(2)}</td><td class="fig">${oneDecimal(p.residents)}</td></tr>`).join('')
    || '<tr><td colspan="4" class="dim">No province matches that search.</td></tr>';
  const tally = document.getElementById('rowCount');
  if (tally) tally.textContent = shown.length + ' of ' + PROVINCE_RANK.length + ' shown';
}

// Switch pages from the hash, then wire up the controls on the new page.
const PAGES = { overview: pageOverview, economy: pageEconomy, people: pagePeople, regions: pageRegions, living: pageLiving };
function showPage() {
  const key = (location.hash || '#/overview').replace(/^#\//, '');
  const name = PAGES[key] ? key : 'overview';
  document.querySelectorAll('[data-section]').forEach((link) => link.classList.toggle('current', link.dataset.section === name));
  stage.innerHTML = PAGES[name]();
  const canvas = document.getElementById('outputChart');
  const picker = document.getElementById('earliestYear');
  if (canvas) {
    paintOutputChart(canvas, picker ? Number(picker.value) : 2015);
    if (picker) picker.addEventListener('change', () => paintOutputChart(canvas, Number(picker.value)));
  }
  if (name === 'regions') {
    fillProvinceRows();
    const box = document.getElementById('searchBox');
    if (box) box.addEventListener('input', () => { searchText = box.value; fillProvinceRows(); });
    document.querySelectorAll('[data-sort]').forEach((btn) => btn.addEventListener('click', () => {
      const field = btn.dataset.sort;
      if (sortField === field) sortWay = -sortWay;
      else { sortField = field; sortWay = (field === 'province' || field === 'seat') ? 1 : -1; }
      fillProvinceRows();
    }));
  }
  window.scrollTo(0, 0);
}
window.addEventListener('hashchange', showPage);
showPage();
