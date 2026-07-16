/* =========================================================================
   THREE THEMES — all anchored in calm medical blue/green, varied in warmth,
   structure and type. Applied by setting CSS variables + [data-theme] on <html>.
   ========================================================================= */
window.THEMES = {
  editorial: {
    name: "Editorial",
    blurb: "Warm paper · literary serif · sage-teal",
    swatch: ["#FBFAF6", "#1f6f63", "#211E18"],
    vars: {
      "--bg": "#FBFAF6",
      "--surface": "#FFFFFF",
      "--surface-2": "#F3F0E8",
      "--text": "#211E18",
      "--muted": "#6E685C",
      "--faint": "#9A9488",
      "--line": "#E7E2D6",
      "--line-strong": "#D8D2C4",
      "--accent": "oklch(0.50 0.07 172)",
      "--accent-soft": "oklch(0.94 0.03 172)",
      "--accent-ink": "oklch(0.38 0.06 172)",
      "--radius": "5px",
      "--radius-lg": "9px",
      "--font-display": "'Times New Roman', '微软雅黑', 'Microsoft YaHei', serif",
      "--font-body": "'Times New Roman', '微软雅黑', 'Microsoft YaHei', serif",
      "--font-mono": "'Times New Roman', '微软雅黑', 'Microsoft YaHei', serif",
      "--display-weight": "500",
      "--display-tracking": "-0.01em",
      "--label-transform": "uppercase",
      "--label-tracking": "0.12em",
      "--shadow": "0 1px 2px rgba(33,30,24,0.04), 0 8px 24px -16px rgba(33,30,24,0.18)",
      "--shadow-hover": "0 2px 6px rgba(33,30,24,0.06), 0 18px 40px -20px rgba(33,30,24,0.28)",
      "--card-border": "1px solid var(--line)",
    },
  },

  index: {
    name: "Index",
    blurb: "Cool archive grid · mono labels · medical blue",
    swatch: ["#F6F8FB", "#1f5fd4", "#141821"],
    vars: {
      "--bg": "#F5F7FA",
      "--surface": "#FFFFFF",
      "--surface-2": "#EDF1F6",
      "--text": "#141821",
      "--muted": "#5A6373",
      "--faint": "#8A93A3",
      "--line": "#E1E6EE",
      "--line-strong": "#CDD5E0",
      "--accent": "oklch(0.52 0.13 252)",
      "--accent-soft": "oklch(0.95 0.03 252)",
      "--accent-ink": "oklch(0.42 0.13 252)",
      "--radius": "2px",
      "--radius-lg": "3px",
      "--font-display": "'Times New Roman', '微软雅黑', 'Microsoft YaHei', serif",
      "--font-body": "'Times New Roman', '微软雅黑', 'Microsoft YaHei', serif",
      "--font-mono": "'Times New Roman', '微软雅黑', 'Microsoft YaHei', serif",
      "--display-weight": "700",
      "--display-tracking": "-0.02em",
      "--label-transform": "uppercase",
      "--label-tracking": "0.1em",
      "--shadow": "none",
      "--shadow-hover": "0 0 0 1px var(--accent-ink)",
      "--card-border": "1px solid var(--line-strong)",
    },
  },

  field: {
    name: "Field Notes",
    blurb: "Cream zine · display serif · forest green + clay",
    swatch: ["#F5F1E6", "#2f6b4a", "#c0734a"],
    vars: {
      "--bg": "#F5F1E6",
      "--surface": "#FCFAF3",
      "--surface-2": "#EDE7D6",
      "--text": "#1F2A22",
      "--muted": "#5E6358",
      "--faint": "#928E7E",
      "--line": "#E0D9C6",
      "--line-strong": "#CFC6AE",
      "--accent": "oklch(0.50 0.09 158)",
      "--accent-soft": "oklch(0.93 0.04 150)",
      "--accent-ink": "oklch(0.40 0.08 158)",
      "--accent-2": "oklch(0.62 0.11 50)",
      "--radius": "3px",
      "--radius-lg": "14px",
      "--font-display": "'Times New Roman', '微软雅黑', 'Microsoft YaHei', serif",
      "--font-body": "'Times New Roman', '微软雅黑', 'Microsoft YaHei', serif",
      "--font-mono": "'Times New Roman', '微软雅黑', 'Microsoft YaHei', serif",
      "--display-weight": "400",
      "--display-tracking": "0em",
      "--label-transform": "uppercase",
      "--label-tracking": "0.14em",
      "--shadow": "0 1px 0 var(--line-strong), 0 10px 30px -22px rgba(31,42,34,0.4)",
      "--shadow-hover": "0 2px 0 var(--accent-ink), 0 20px 44px -22px rgba(31,42,34,0.45)",
      "--card-border": "1px solid var(--line-strong)",
    },
  },
};

window.applyTheme = function (id) {
  const t = window.THEMES[id];
  if (!t) return;
  const root = document.documentElement;
  Object.entries(t.vars).forEach(([k, v]) => root.style.setProperty(k, v));
  root.setAttribute("data-theme", id);
  try { localStorage.setItem("pulse-theme", id); } catch (e) {}
};
