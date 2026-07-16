/* =========================================================================
   UI PRIMITIVES — placeholders, avatars, badges, chips, theme switcher.
   ========================================================================= */
const { useState, useEffect, useMemo } = React;

/* ---- deterministic hue from a string (for avatars/placeholders) ---- */
function hashHue(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) % 360;
  return h;
}
function initials(name) {
  const parts = String(name).trim().split(/\s+/);
  // CJK: take first 2 chars
  if (/[\u4e00-\u9fa5]/.test(name)) return name.slice(0, 2);
  return parts.slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

/* ---- content-aware cover theme: title/tags drive the generated artwork ---- */
const CONTENT_COVER_THEMES = [
  {
    key: "spatial",
    label: "Spatial AI",
    glyph: "3D",
    words: /world model|spatial|空间|具身|vision|frontier/i,
    hues: [186, 236, 55],
  },
  {
    key: "clinical",
    label: "Clinical Reasoning",
    glyph: "Dx",
    words: /clinical|diagnos|reasoning|病例|诊断|医生|患者|入院|病史/i,
    hues: [162, 214, 18],
  },
  {
    key: "workflow",
    label: "Care Workflow",
    glyph: "SOAP",
    words: /scribe|ambient|workflow|hospital|deployment|EHR|病历|结构化|院内|落地/i,
    hues: [172, 204, 42],
  },
  {
    key: "eval",
    label: "Safety Eval",
    glyph: "Eval",
    words: /eval|safety|agent|harm|benchmark|评分|安全|测评/i,
    hues: [146, 278, 32],
  },
  {
    key: "triage",
    label: "Triage Economics",
    glyph: "Flow",
    words: /triage|primary care|economics|reimbursement|分诊|导诊|基层|商业化|留存/i,
    hues: [128, 196, 24],
  },
  {
    key: "imaging",
    label: "Imaging UX",
    glyph: "Scan",
    words: /radiolog|imaging|copilot|影像|放射|阅片|UX/i,
    hues: [198, 158, 34],
  },
  {
    key: "market",
    label: "AI Healthcare",
    glyph: "AI",
    words: /AI医疗|healthcare|medical|LLM|大模型|产品|市场|commercial/i,
    hues: [152, 222, 28],
  },
];

function coverThemeText(item) {
  return [
    item?.title,
    item?.name,
    item?.note,
    item?.meta,
    item?.platform,
    ...(item?.tags || []),
  ].filter(Boolean).join(" ");
}

function getContentCoverTheme(item = {}) {
  const text = coverThemeText(item);
  const matched = CONTENT_COVER_THEMES.find((theme) => theme.words.test(text));
  if (matched) return matched;
  const seed = hashHue(text || "Pulse");
  return {
    key: "research",
    label: item.platform || "Knowledge Note",
    glyph: "101",
    hues: [142 + (seed % 36), 196 + (seed % 42), 28 + (seed % 38)],
  };
}

function coverKicker(item = {}) {
  const theme = getContentCoverTheme(item);
  const firstTag = item.tags && item.tags[0];
  return firstTag || theme.label;
}

/* ---- striped cover placeholder (label tells you what to drop in) ---- */
function CoverSlot({ label = "cover", ratio = "16 / 9", seed = "x" }) {
  // Constrain to a green→teal→blue band (150–230) so covers stay on-brand.
  const hue = 150 + (hashHue(seed) % 80);
  const a = `oklch(0.94 0.018 ${hue})`;
  const b = `oklch(0.90 0.032 ${hue})`;
  return (
    <div
      className="cover-slot"
      style={{
        aspectRatio: ratio,
        backgroundColor: a,
        backgroundImage: `repeating-linear-gradient(45deg, ${b} 0 8px, ${a} 8px 16px)`,
      }}
    >
      <span className="cover-tag">{label}</span>
    </div>
  );
}

/* ---- circular avatar: real profile image when resolvable, else initials ---- */
function avatarUrl(handle, platform) {
  if (!handle) return null;
  const h = String(handle).replace(/^@/, "").trim();
  if (!h || /[\u4e00-\u9fa5]/.test(h)) return null; // CJK handle → no service
  if (platform === "X" || platform === "Twitter") return `https://unavatar.io/twitter/${h}`;
  return null;
}
function Avatar({ name, handle, platform, img, size = 30 }) {
  const [failed, setFailed] = useState(false);
  const hue = hashHue(name || handle || "x");
  const src = img || avatarUrl(handle, platform);
  if (src && !failed) {
    return (
      <img
        className="avatar avatar-img"
        src={src}
        alt={name || handle}
        style={{ width: size, height: size }}
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <span
      className="avatar"
      style={{
        width: size, height: size,
        background: `oklch(0.92 0.04 ${hue})`,
        color: `oklch(0.40 0.07 ${hue})`,
        fontSize: size * 0.38,
      }}
    >
      {initials(name)}
    </span>
  );
}

/* ---- small monospace platform / source badge ---- */
function SourceBadge({ children, tone = "accent" }) {
  return <span className={`source-badge tone-${tone}`}>{children}</span>;
}

/* ---- tag pill (variant: 'source' renders the origin platform distinctly) ---- */
function Tag({ children, variant }) {
  return <span className={"tag" + (variant ? " tag-" + variant : "")}>{children}</span>;
}

/* ---- filter chip row ---- */
function FilterRow({ options, active, onChange }) {
  return (
    <div className="filter-row" role="tablist">
      {options.map((opt) => (
        <button
          key={opt}
          className={"chip" + (opt === active ? " is-active" : "")}
          onClick={() => onChange(opt)}
          role="tab"
          aria-selected={opt === active}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ---- theme switcher (sidebar footer) ---- */
function ThemeSwitch({ current, onPick }) {
  return (
    <div className="theme-switch">
      <div className="theme-switch-label">Theme</div>
      <div className="theme-switch-row">
        {Object.entries(window.THEMES).map(([id, t]) => (
          <button
            key={id}
            className={"theme-opt" + (id === current ? " is-active" : "")}
            onClick={() => onPick(id)}
            title={t.blurb}
          >
            <span className="theme-dots">
              {t.swatch.map((c, i) => (
                <span key={i} className="theme-dot" style={{ background: c }} />
              ))}
            </span>
            <span className="theme-name">{t.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { CoverSlot, Avatar, SourceBadge, Tag, FilterRow, ThemeSwitch, hashHue, initials, getContentCoverTheme, coverKicker, EcgLine });

/* ---- ECG / pulse line motif (reusable) ---- */
function EcgLine({ className = "", height = 28 }) {
  return (
    <svg className={"ecg " + className} height={height} viewBox="0 0 240 28" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M0 14 H64 l5 -9 l5 18 l6 -22 l6 26 l5 -13 H140 l4 -7 l5 14 l5 -7 H240"
        fill="none" stroke="currentColor" strokeWidth="1.5"
        strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
