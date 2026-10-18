// Erzeugt die Platzhalterbilder unter public/images/produkte.
// Aufruf: node scripts/placeholders.mjs
// Echte Fotos einfach unter gleichem Namen ablegen oder Pfad in data/products.ts ändern.
import { mkdirSync, writeFileSync } from "node:fs";

const W = 800;
const H = 1000;
const INK = "#121212";
const out = new URL("../public/images/produkte/", import.meta.url);
mkdirSync(out, { recursive: true });

const range = (n) => Array.from({ length: n }, (_, i) => i);

function frame(body, { bg = ["#ebe5da", "#d9d0c2"], label = "Platzhalterbild" } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
  <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${bg[0]}"/><stop offset="1" stop-color="${bg[1]}"/></linearGradient>
  <radialGradient id="shadow"><stop offset="0" stop-color="#000" stop-opacity=".35"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
  <filter id="soft" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="6"/></filter>
  <linearGradient id="wall" x1="0" x2="1"><stop offset="0" stop-color="#2a2826"/><stop offset=".25" stop-color="${INK}"/><stop offset=".7" stop-color="#0b0b0b"/><stop offset="1" stop-color="#22201e"/></linearGradient>
</defs>
<rect width="${W}" height="${H}" fill="url(#bg)"/>
<g fill="none" stroke="#0e0e0e" stroke-opacity=".045">${range(14).map((i) => `<circle cx="400" cy="460" r="${120 + i * 34}"/>`).join("")}</g>
${body}
<text x="40" y="${H - 40}" font-family="Helvetica, Arial, sans-serif" font-size="18" letter-spacing="3" fill="#0e0e0e" fill-opacity=".35">${label.toUpperCase()}</text>
</svg>`;
}

/** Plattenoberseite als Ellipse (gekippt), mit Rillen und Etikett */
function disc(cx, cy, rx, ry, labelColor, { grooves = 22, labelScale = 0.3 } = {}) {
  const rings = range(grooves)
    .map((i) => {
      const k = 0.36 + (i / grooves) * 0.6;
      const gap = i % 6 === 5;
      return `<ellipse cx="${cx}" cy="${cy}" rx="${rx * k}" ry="${ry * k}" fill="none" stroke="${gap ? "#000" : "#fff"}" stroke-opacity="${gap ? 0.7 : 0.07}" stroke-width="${gap ? 1.6 : 1}"/>`;
    })
    .join("");
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${INK}"/>${rings}
<ellipse cx="${cx}" cy="${cy}" rx="${rx * labelScale}" ry="${ry * labelScale}" fill="${labelColor}"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx * 0.025}" ry="${ry * 0.025}" fill="#0e0e0e"/>
<path d="M${cx - rx * 0.8},${cy - ry * 0.35} A${rx * 0.85},${ry * 0.85} 0 0 1 ${cx - rx * 0.1},${cy - ry * 0.84}" fill="none" stroke="#fff" stroke-opacity=".12" stroke-width="6" stroke-linecap="round"/>`;
}

function shadow(cx, cy, rx, ry) {
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="url(#shadow)"/>`;
}

const files = {
  "schale-blue-note": frame(
    `${shadow(400, 690, 280, 50)}
<path d="M120,430 C126,560 250,680 400,680 C550,680 674,560 680,430 Z" fill="url(#wall)"/>
${range(9).map((i) => `<path d="M${140 + i * 22},${470 + i * 24} Q400,${600 + i * 14} ${660 - i * 22},${470 + i * 24}" fill="none" stroke="#fff" stroke-opacity=".05"/>`).join("")}
${disc(400, 430, 280, 105, "#3b5878", { labelScale: 0.24 })}`,
    { bg: ["#e9e4dc", "#d3ccc0"] },
  ),
  "schale-nachtfahrt": frame(
    `${shadow(400, 640, 330, 46)}
<path d="M70,480 C110,560 250,610 400,610 C550,610 690,560 730,480 Z" fill="url(#wall)"/>
<path d="M70,480 C110,430 160,520 220,450 C280,390 330,470 400,420 C470,380 520,470 580,440 C640,410 690,500 730,480 C700,540 560,590 400,590 C240,590 100,540 70,480 Z" fill="${INK}"/>
${range(8).map((i) => `<ellipse cx="400" cy="500" rx="${300 - i * 30}" ry="${78 - i * 8}" fill="none" stroke="#fff" stroke-opacity=".06"/>`).join("")}
<ellipse cx="400" cy="505" rx="64" ry="18" fill="#d9541e"/>
<ellipse cx="400" cy="505" rx="4" ry="1.5" fill="#0e0e0e"/>`,
    { bg: ["#e6e0d6", "#cfc6b8"] },
  ),
  "schachbrett-endspiel": frame(
    `${shadow(400, 720, 330, 60)}
<g transform="translate(400 470) scale(1 .56) rotate(45)">
  <rect x="-232" y="-232" width="464" height="464" rx="10" fill="#b9a68a"/>
  <rect x="-232" y="-232" width="464" height="464" rx="10" fill="none" stroke="#000" stroke-opacity=".25" stroke-width="3"/>
  ${range(64)
    .map((n) => {
      const r = Math.floor(n / 8);
      const c = n % 8;
      const dark = (r + c) % 2 === 1;
      return `<rect x="${-216 + c * 54}" y="${-216 + r * 54}" width="54" height="54" fill="${dark ? INK : "#e7d9c1"}"/>${dark ? `<circle cx="${-216 + c * 54 + 27}" cy="${-216 + r * 54 + 27}" r="18" fill="none" stroke="#fff" stroke-opacity=".08"/><circle cx="${-216 + c * 54 + 27}" cy="${-216 + r * 54 + 27}" r="10" fill="none" stroke="#fff" stroke-opacity=".08"/>` : ""}`;
    })
    .join("")}
</g>
<path d="M72,470 L400,654 L728,470 L728,500 L400,684 L72,500 Z" fill="#8f7c62"/>
<path d="M400,654 L728,470 L728,500 L400,684 Z" fill="#6f5f4a"/>`,
    { bg: ["#ece6dc", "#d6cdbf"] },
  ),
  "schachbrett-rillenzug": frame(
    `${shadow(400, 690, 300, 56)}
<defs><clipPath id="round"><ellipse cx="400" cy="470" rx="280" ry="150"/></clipPath></defs>
<ellipse cx="400" cy="488" rx="280" ry="150" fill="#060606"/>
<ellipse cx="400" cy="470" rx="280" ry="150" fill="${INK}"/>
<g clip-path="url(#round)">
  <g transform="translate(400 470) scale(1 .536) rotate(45)">
  ${range(64)
    .map((n) => {
      const r = Math.floor(n / 8);
      const c = n % 8;
      return (r + c) % 2 === 0 ? `<rect x="${-200 + c * 50}" y="${-200 + r * 50}" width="50" height="50" fill="#e7d9c1"/>` : "";
    })
    .join("")}
  </g>
</g>
${range(5).map((i) => `<ellipse cx="400" cy="470" rx="${282 - i * 4}" ry="${151 - i * 2}" fill="none" stroke="#fff" stroke-opacity=".08"/>`).join("")}
<ellipse cx="400" cy="470" rx="22" ry="12" fill="#d9541e"/>`,
    { bg: ["#e8e2d8", "#cdc4b5"] },
  ),
  "beistelltisch-plattenteller": frame(
    `${shadow(400, 860, 260, 40)}
<g stroke="#1b1b1b" stroke-width="9" stroke-linecap="round" fill="none">
  <path d="M260,420 L215,850"/><path d="M540,420 L585,850"/><path d="M400,440 L400,880"/>
</g>
<path d="M120,380 L120,394 C120,450 680,450 680,394 L680,380 Z" fill="#070707"/>
${disc(400, 380, 280, 70, "#e7d9c1", { labelScale: 0.26 })}`,
    { bg: ["#ebe6de", "#d4cbbd"] },
  ),
  "beistelltisch-zugabe": frame(
    `${shadow(400, 870, 240, 38)}
<rect x="378" y="380" width="44" height="470" rx="6" fill="#a88a64"/>
<rect x="378" y="380" width="14" height="470" fill="#fff" fill-opacity=".12"/>
<ellipse cx="400" cy="856" rx="150" ry="30" fill="#8d7254"/>
<ellipse cx="400" cy="848" rx="150" ry="30" fill="#a88a64"/>
<path d="M150,570 C150,612 650,612 650,570 L650,560 L150,560 Z" fill="#070707"/>
${disc(400, 560, 250, 58, "#d9541e", { grooves: 16 })}
<path d="M110,330 C110,380 690,380 690,330 L690,318 L110,318 Z" fill="#070707"/>
${disc(400, 318, 290, 68, "#e7d9c1", { labelScale: 0.24 })}`,
    { bg: ["#e9e3d9", "#d0c7b9"] },
  ),
  "wandkunst-seite-b": frame(
    `<rect x="130" y="170" width="540" height="620" fill="#000" fill-opacity=".18" transform="translate(14 22)" filter="url(#soft)"/>
<rect x="130" y="170" width="540" height="620" fill="#1a1918"/>
<rect x="152" y="192" width="496" height="576" fill="#f4efe6"/>
<g transform="translate(400 480)">
  <path d="${(() => {
    const pts = [];
    for (let a = 0; a <= 360; a += 3) {
      const t = (a * Math.PI) / 180;
      const r = 190 + 22 * Math.cos(t * 9);
      pts.push(`${(Math.cos(t) * r).toFixed(1)},${(Math.sin(t) * r).toFixed(1)}`);
    }
    return `M${pts.join(" L")} Z`;
  })()}" fill="${INK}"/>
  ${range(18).map((i) => `<circle r="${60 + i * 7}" fill="none" stroke="#fff" stroke-opacity=".06"/>`).join("")}
  <circle r="58" fill="#d9541e"/>
  <circle r="4" fill="#0e0e0e"/>
  <text y="6" text-anchor="middle" font-family="Georgia, serif" font-style="italic" font-size="20" fill="#0e0e0e">Seite B</text>
</g>`,
    { bg: ["#e4ddd1", "#d2c9bb"] },
  ),
  "wandkunst-langspiel": frame(
    `<defs><clipPath id="lp"><circle cx="400" cy="470" r="260"/></clipPath></defs>
${[0, 1, 2]
  .map((i) => {
    const x = 130 + i * 186;
    return `<rect x="${x + 10}" y="200" width="168" height="560" fill="#000" fill-opacity=".14" filter="url(#soft)" transform="translate(6 14)"/>
<rect x="${x}" y="200" width="168" height="560" fill="#f4efe6" stroke="#1a1918" stroke-width="10"/>
<g clip-path="url(#lp)"><svg x="${x + 5}" y="205" width="158" height="550" viewBox="${x + 5} 205 158 550">
  <circle cx="400" cy="470" r="260" fill="${INK}"/>
  ${range(22).map((k) => `<circle cx="400" cy="470" r="${84 + k * 8}" fill="none" stroke="#fff" stroke-opacity=".07"/>`).join("")}
  <circle cx="400" cy="470" r="80" fill="#d9541e"/>
  <circle cx="400" cy="470" r="5" fill="#0e0e0e"/>
</svg></g>`;
  })
  .join("")}`,
    { bg: ["#e6e0d5", "#cfc6b8"] },
  ),
};

for (const [name, svg] of Object.entries(files)) {
  writeFileSync(new URL(`${name}.svg`, out), svg);
}
console.log(`${Object.keys(files).length} Platzhalter geschrieben.`);
