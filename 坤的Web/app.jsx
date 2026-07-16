/* =========================================================================
   APP — sidebar nav + content area + per-section filtering.
   ========================================================================= */

const INTAKE_STORAGE_KEY = "pulse-intake-items-v1";
const PEOPLE_NOTES_STORAGE_KEY = "pulse-people-notes-v1";
const FEATURED_SECTION = {
  key: "featured",
  label: "精选",
  blurb: "按打开次数沉淀出来的高频内容。",
};

function KnowledgeTopbar({ active, onKnowledge, onFeatured, onIntake }) {
  return (
    <header className="kb-topbar">
      <a className="kb-mark" href="./Home%20(1).html" aria-label="返回首页">
        <img className="kb-brand-logo" src="assets/pangolin-logo.png" alt="穿山甲 Pangolin" />
      </a>
      <nav className="site-nav" aria-label="知识库导航">
        <a className="nav-link" href="./Home%20(1).html">首页</a>
        <button className={"nav-link nav-button" + (active !== "featured" && active !== "intake" ? " active" : "")} type="button" onClick={onKnowledge}>知识库</button>
        <a className="nav-link" href="./%E6%B5%8B%E8%AF%84web/index.html">测评系统</a>
        <button className={"nav-link nav-button" + (active === "featured" ? " active" : "")} type="button" onClick={onFeatured}>精选</button>
        <a className="nav-link" href="./Reading%20Share%20(1).html">阅读分享</a>
        <button className={"nav-link nav-button" + (active === "intake" ? " active" : "")} type="button" onClick={onIntake}>收录</button>
      </nav>
      <div className="kb-top-meta">
        <div className="a">KNOWLEDGE 101</div>
        <div className="b">AI HEALTH · NOTES · SIGNALS</div>
      </div>
    </header>
  );
}

function Sidebar({ active, onNav, theme, onTheme, counts }) {
  const D = window.PULSE;
  const navSections = [FEATURED_SECTION, ...D.sections];
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark brand-mark-logo" aria-hidden="true">
          <img src="uploads/08604f2f9cd126f2c1523cd735b49ca-49023165.jpg" alt="" />
        </span>
        <div className="brand-text">
          <span className="brand-name">{D.brand.name}</span>
          <span className="brand-curator">{D.brand.curator}</span>
        </div>
      </div>

      <p className="brand-tagline">{D.brand.tagline}</p>

      <EcgLine className="sidebar-ecg" height={22} />

      <nav className="nav">
        {navSections.map((s, i) => {
          const count = counts?.[s.key] ?? (D[s.key] || []).filter((it) => it && it.url && it.url !== "#").length;
          return (
            <button
              key={s.key}
              className={"nav-item" + (s.key === active ? " is-active" : "")}
              onClick={() => onNav(s.key)}
            >
              <span className="nav-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="nav-label">{s.label}</span>
              <span className="nav-count">{count}</span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-foot">
        <ThemeSwitch current={theme} onPick={onTheme} />
        <div className="sidebar-credit">
          <span>Pangolin Lab</span>
          <span className="dot-sep">·</span>
          <span>Collection 101</span>
        </div>
      </div>
    </aside>
  );
}

function ContentHeader({ section, filter, onFilter, count }) {
  const D = window.PULSE;
  const navSections = [FEATURED_SECTION, ...D.sections];
  const meta = navSections.find((s) => s.key === section);
  const idx = navSections.findIndex((s) => s.key === section) + 1;
  const opts = D.filters[section] || [];
  return (
    <header className="content-header">
      <div className="header-main">
        <div className="collection-mark" aria-hidden="true">
          <span className="collection-mark-label">Collection</span>
          <span className="collection-mark-number">101</span>
          <span className="collection-mark-section">/{String(idx).padStart(2, "0")}</span>
        </div>
        <div className="header-text">
          <div className="header-eyebrow">
            <span className="eyebrow-text">{meta.label}</span>
            <span className="eyebrow-line" />
            <span className="eyebrow-count">{count} {count === 1 ? "entry" : "entries"}</span>
          </div>
          <h1 className="header-title">{meta.label}</h1>
          <p className="header-blurb">{meta.blurb}</p>
        </div>
      </div>
      {opts.length > 0 && <FilterRow options={opts} active={filter} onChange={onFilter} />}
    </header>
  );
}

function Grid({ section, filter, items: incomingItems }) {
  const items = (incomingItems || window.PULSE[section] || []).filter((it) => it && it.url && it.url !== "#");
  const Card = window.CARD_FOR[section];
  const shown = filter === "All" ? items : items.filter((it) => it.filter === filter);
  const gridClass = "grid grid-" + section;
  // Articles & Videos get an editorial "featured" lead item when unfiltered.
  const canFeature = (section === "articles" || section === "videos") && shown.length >= 3;
  if (canFeature) {
    const [lead, ...rest] = shown;
    return (
      <React.Fragment>
        <Card item={lead} featured />
        <div className={gridClass}>
          {rest.map((item, i) => <Card key={i} item={item} />)}
        </div>
      </React.Fragment>
    );
  }
  return (
    <div className={gridClass}>
      {shown.map((item, i) => <Card key={i} item={item} />)}
      {shown.length === 0 && <p className="empty">Nothing here yet.</p>}
    </div>
  );
}

function FeaturedPage({ items }) {
  if (items.length === 0) {
    return (
      <section className="featured-empty" aria-label="精选空状态">
        <span className="featured-empty-kicker">Featured</span>
        <h2>还没有点击记录</h2>
        <p>等待第一条高频内容沉淀。</p>
      </section>
    );
  }
  const [lead, ...rest] = items;
  const LeadCard = window.CARD_FOR[lead._section];
  return (
    <React.Fragment>
      <div className="featured-lead-shell">
        <span className="click-rank">No. 01 · {lead.clickCount} 次打开</span>
        <LeadCard item={lead} featured />
      </div>
      <div className="grid grid-featured">
        {rest.map((item, i) => {
          const Card = window.CARD_FOR[item._section];
          return (
            <div className="ranked-card" key={item._clickKey || i}>
              <span className="click-rank">No. {String(i + 2).padStart(2, "0")} · {item.clickCount} 次打开</span>
              <Card item={item} />
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
}

function VideoPlayerModal({ item, onClose }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  if (!item) return null;
  return (
    <div className="video-modal" role="dialog" aria-modal="true" aria-label={item.title}>
      <button className="video-modal-backdrop" type="button" aria-label="Close video" onClick={onClose} />
      <section className="video-player-shell">
        <div className="video-player-head">
          <div>
            <span className="video-player-source">{item.platform || "Video"}</span>
            <h2>{item.title}</h2>
          </div>
          <button className="video-close" type="button" onClick={onClose} aria-label="Close video">×</button>
        </div>
        <video className="video-player" src={item.url} controls autoPlay playsInline preload="metadata" />
        <div className="video-player-meta">
          <span>{item.channel}</span>
          <span>{item.meta}</span>
          <span>{item.date}</span>
        </div>
        {item.note && <p className="video-player-note">{item.note}</p>}
      </section>
    </div>
  );
}

function PeopleDetailModal({ item, notes, onAddNote, onDeleteNote, onClose }) {
  const [draft, setDraft] = useState({ type: "学习点", title: "", body: "" });

  useEffect(() => {
    if (!item) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item, onClose]);

  useEffect(() => {
    setDraft({ type: "学习点", title: "", body: "" });
  }, [item?.id]);

  if (!item) return null;

  const save = (e) => {
    e.preventDefault();
    if (!draft.title.trim() && !draft.body.trim()) return;
    onAddNote(item.id, {
      id: "note-" + Date.now(),
      type: draft.type,
      title: draft.title.trim() || draft.type,
      body: draft.body.trim(),
      createdAt: new Date().toISOString(),
    });
    setDraft({ type: draft.type, title: "", body: "" });
  };

  const personNotes = notes[item.id] || [];
  const links = item.sourceLinks || (item.url ? [{ label: item.source || "Source", url: item.url }] : []);

  return (
    <div className="person-modal" role="dialog" aria-modal="true" aria-label={item.name}>
      <button className="person-modal-backdrop" type="button" aria-label="Close person detail" onClick={onClose} />
      <section className="person-shell">
        <button className="person-close" type="button" onClick={onClose} aria-label="Close person detail">×</button>
        <div className="person-hero">
          <div className="person-portrait">
            <Cover item={item} label="portrait" ratio="4 / 5" />
            {item.photoCredit && <span className="people-photo-credit">{item.photoCredit}</span>}
          </div>
          <div className="person-identity">
            <span className="person-kicker">{item.filter} · {item.role}</span>
            <h2>{item.name}</h2>
            {item.cnName && <p className="person-cn">{item.cnName}</p>}
            <p className="person-summary">{item.summary || item.quote}</p>
            <div className="tag-row">{(item.tags || []).map((t) => <Tag key={t}>{t}</Tag>)}</div>
          </div>
        </div>

        <div className="person-detail-grid">
          <section className="person-panel person-panel-wide">
            <span className="person-panel-label">为什么振奋我</span>
            <p className="person-main-note">{item.why}</p>
            {item.quote && <blockquote>{item.quote}</blockquote>}
          </section>

          <section className="person-panel">
            <span className="person-panel-label">关键事件</span>
            <ol className="person-timeline">
              {(item.timeline || []).map((m, i) => (
                <li key={i}>
                  <span>{m.date}</span>
                  <p>{m.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section className="person-panel">
            <span className="person-panel-label">我想提炼的东西</span>
            <ul className="person-lessons">
              {(item.lessons || []).map((lesson) => <li key={lesson}>{lesson}</li>)}
            </ul>
          </section>

          <section className="person-panel">
            <span className="person-panel-label">素材来源</span>
            <div className="person-source-list">
              {links.map((link) => (
                <a key={link.url} href={link.url} target="_blank" rel="noopener" onClick={() => window.recordItemClick?.(item)}>{link.label}</a>
              ))}
            </div>
          </section>

          <section className="person-panel">
            <span className="person-panel-label">待补内容</span>
            <ul className="person-lessons">
              {(item.next || []).map((todo) => <li key={todo}>{todo}</li>)}
            </ul>
          </section>

          <section className="person-panel person-panel-wide">
            <span className="person-panel-label">我的笔记</span>
            <div className="person-note-list">
              {personNotes.length === 0 ? (
                <p className="person-empty-note">还没有自己的记录。先写一句被击中的地方也可以。</p>
              ) : personNotes.map((note) => (
                <article className="person-note" key={note.id}>
                  <div>
                    <span>{note.type}</span>
                    <h3>{note.title}</h3>
                  </div>
                  {note.body && <p>{note.body}</p>}
                  <button type="button" onClick={() => onDeleteNote(item.id, note.id)}>删除</button>
                </article>
              ))}
            </div>
            <form className="person-note-form" onSubmit={save}>
              <div className="person-note-row">
                <select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })}>
                  <option>学习点</option>
                  <option>摘录</option>
                  <option>问题</option>
                  <option>待补</option>
                  <option>联想</option>
                </select>
                <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} placeholder="标题 / 一句话" />
              </div>
              <textarea value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} placeholder="写下你自己的理解、摘录、问题或后续计划。" />
              <button type="submit">保存到我的知识库</button>
            </form>
          </section>
        </div>
      </section>
    </div>
  );
}

function sourceFromUrl(url) {
  try {
    const host = new URL(normalizeUrl(url)).hostname.replace(/^www\./, "");
    if (/youtube\.com|youtu\.be/.test(host)) return "YouTube";
    if (/x\.com|twitter\.com/.test(host)) return "X";
    if (/mp\.weixin\.qq\.com/.test(host)) return "公众号";
    if (/substack\.com/.test(host)) return "Substack";
    return host.split(".")[0] || "Web";
  } catch (e) {
    return "Web";
  }
}

function normalizeUrl(url) {
  const value = String(url || "").trim();
  if (!value) return "";
  if (/^(https?:|blob:)/i.test(value) || value.startsWith("videos/")) return value;
  return "https://" + value;
}

function youtubeThumb(url) {
  const match = String(url).match(/(?:v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{6,})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : "";
}

function generatedCover(title, source) {
  const item = { title, platform: source, tags: source ? [source] : [] };
  const theme = window.getContentCoverTheme ? window.getContentCoverTheme(item) : { label: source || "Knowledge Note", glyph: "101", hues: [160, 210, 32] };
  const [hue, hue2, accentHue] = theme.hues;
  const titleLines = splitCoverTitle(title || "Untitled note", /[\u4e00-\u9fa5]/.test(title || "") ? 15 : 28).slice(0, 3);
  const escapeXml = (value) => String(value || "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&apos;",
  }[ch]));
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="oklch(0.96 0.026 ${hue})"/>
          <stop offset="1" stop-color="oklch(0.87 0.058 ${hue2})"/>
        </linearGradient>
        <radialGradient id="spot" cx=".8" cy=".16" r=".34">
          <stop offset="0" stop-color="oklch(0.96 0.07 ${accentHue})" stop-opacity=".9"/>
          <stop offset="1" stop-color="oklch(0.96 0.07 ${accentHue})" stop-opacity="0"/>
        </radialGradient>
      </defs>
      <rect width="1200" height="675" fill="url(#bg)"/>
      <rect width="1200" height="675" fill="url(#spot)"/>
      <rect x="46" y="46" width="1108" height="583" fill="none" stroke="oklch(0.62 0.055 ${hue})" stroke-opacity=".36" stroke-width="3"/>
      <text x="86" y="122" font-family="Arial, sans-serif" font-size="35" font-weight="700" fill="oklch(0.36 0.08 ${hue})">${escapeXml(theme.label)}</text>
      <text x="86" y="525" font-family="Georgia, serif" font-size="58" font-weight="700" fill="oklch(0.22 0.07 ${hue})">${escapeXml(titleLines[0] || "")}</text>
      ${titleLines.slice(1).map((line, i) => `<text x="86" y="${592 + i * 54}" font-family="Georgia, serif" font-size="50" font-weight="700" fill="oklch(0.22 0.07 ${hue})">${escapeXml(line)}</text>`).join("")}
      <text x="1030" y="132" text-anchor="end" font-family="Arial, sans-serif" font-size="64" font-weight="800" fill="oklch(0.40 0.09 ${hue})" opacity=".48">${escapeXml(theme.glyph)}</text>
      <path d="M640 358 H830 l20 -68 l26 142 l36 -210 l34 238 l26 -102 h190" fill="none" stroke="oklch(0.38 0.09 ${hue})" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity=".72"/>
      <path d="M760 210 C850 150 962 158 1036 226 S1118 390 1028 458 S810 504 736 418" fill="none" stroke="oklch(0.52 0.11 ${accentHue})" stroke-width="10" stroke-linecap="round" opacity=".56"/>
      <text x="86" y="185" font-family="Arial, sans-serif" font-size="25" fill="oklch(0.38 0.05 ${hue})">${escapeXml(source || "Pangolin Lab")}</text>
    </svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

function splitCoverTitle(value, maxLen) {
  const text = String(value || "").trim();
  if (!text) return [];
  if (/[\u4e00-\u9fa5]/.test(text)) {
    return text.match(new RegExp(`.{1,${maxLen}}`, "g")) || [text];
  }
  const lines = [];
  let current = "";
  text.split(/\s+/).forEach((word) => {
    const next = current ? current + " " + word : word;
    if (next.length > maxLen && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });
  if (current) lines.push(current);
  return lines;
}

function parseReaderText(text, url) {
  const title = (text.match(/^Title:\s*(.+)$/m) || text.match(/^#\s+(.+)$/m) || [])[1] || "";
  const date = (text.match(/(?:Published|Date|日期|发布时间):\s*(.+)$/im) || [])[1] || "";
  const author = (text.match(/(?:Author|By|作者):\s*(.+)$/im) || [])[1] || "";
  return {
    title: title.trim(),
    author: author.trim(),
    date: date.trim(),
    platform: sourceFromUrl(url),
  };
}

async function fetchLinkInfo(url) {
  const targetUrl = normalizeUrl(url);
  const direct = sourceFromUrl(targetUrl);
  const info = {
    title: "",
    author: "",
    date: "",
    platform: direct,
    cover: youtubeThumb(targetUrl),
  };
  try {
    const readerUrl = "https://r.jina.ai/" + encodeURIComponent(targetUrl);
    const res = await fetch(readerUrl);
    if (!res.ok) throw new Error("metadata fetch failed");
    const text = await res.text();
    return { ...info, ...parseReaderText(text, targetUrl) };
  } catch (e) {
    return info;
  }
}

function IntakePage({ onAdd }) {
  const [type, setType] = useState("webpage");
  const [url, setUrl] = useState("");
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [draft, setDraft] = useState({
    title: "",
    author: "",
    date: "",
    source: "",
    cover: "",
    tags: "",
    note: "",
  });

  const isLocal = type === "local-video";
  const isVideo = isLocal || type === "youtube";
  const sourceLabel = type === "youtube" ? "YouTube" : type === "x" ? "X" : type === "webpage" ? "Web" : "本地视频";

  const analyze = async () => {
    if (isLocal) {
      const fileUrl = file ? URL.createObjectURL(file) : "";
      const fileName = file?.name || "";
      setDraft((prev) => ({
        ...prev,
        title: prev.title || fileName.replace(/\.[^.]+$/, "") || "本地视频",
        source: "本地视频",
        cover: "",
      }));
      setUrl((prev) => prev || fileUrl);
      setStatus(fileUrl ? "已读取本地视频，首帧将作为封面。" : "请选择文件，或填写 videos/xxx.mp4。");
      return;
    }
    if (!url.trim()) return;
    setStatus("正在抓取链接信息...");
    const normalized = normalizeUrl(url);
    setUrl(normalized);
    const info = await fetchLinkInfo(normalized);
    const title = info.title || draft.title || "未命名内容";
    setDraft((prev) => ({
      ...prev,
      title,
      author: info.author || prev.author || "山甲实验室",
      date: info.date || prev.date || "Jun 2026",
      source: info.platform || sourceLabel,
      cover: info.cover || prev.cover || generatedCover(title, info.platform || sourceLabel),
    }));
    setStatus(info.title ? "已抓取标题与来源信息。" : "未能完整抓取，已生成可编辑草稿。");
  };

  const save = (e) => {
    e.preventDefault();
    const finalUrl = normalizeUrl(url);
    if (!draft.title.trim() || !finalUrl) return;
    const tags = draft.tags.split(/[，,]/).map((t) => t.trim()).filter(Boolean);
    const item = {
      title: draft.title.trim(),
      platform: draft.source || sourceLabel,
      filter: draft.source || sourceLabel,
      tags: tags.length ? tags : [sourceLabel],
      note: draft.note,
      date: draft.date || "Jun 2026",
      meta: isVideo ? "Video" : "Link",
      url: finalUrl,
      cover: isLocal ? "" : draft.cover,
      localUpload: isLocal,
    };
    onAdd(isVideo ? "videos" : "articles", isVideo ? {
      ...item,
      channel: draft.author || "山甲实验室",
      handle: draft.source || sourceLabel,
    } : {
      ...item,
      author: draft.author || "山甲实验室",
      handle: draft.source || sourceLabel,
    }, { persist: !/^blob:/i.test(finalUrl) });
    setStatus("已纳入知识库。");
  };

  return (
    <section className="intake-page">
      <div className="intake-hero">
        <span className="intake-index">06</span>
        <div>
          <span className="intake-kicker">Capture Desk</span>
          <h2>智能收录台</h2>
          <p>先选择类型，再补充必要内容。网页链接会尝试自动抓取标题、作者、发布时间、来源和封面。</p>
        </div>
      </div>
      <form className="intake-form" onSubmit={save}>
        <div className="type-row">
          {[
            ["webpage", "网页"],
            ["youtube", "YouTube"],
            ["x", "X"],
            ["local-video", "本地视频"],
          ].map(([id, label]) => (
            <button key={id} type="button" className={type === id ? "is-picked" : ""} onClick={() => setType(id)}>{label}</button>
          ))}
        </div>
        {isLocal ? (
          <label className="intake-field">
            <span>视频文件</span>
            <input type="file" accept="video/mp4,video/webm,video/ogg" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          </label>
        ) : null}
        <label className="intake-field intake-wide">
          <span>{isLocal ? "视频路径 / 临时链接" : "链接"}</span>
          <div className="intake-linkline">
            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder={isLocal ? "videos/example.mp4，或选择本地视频" : "https://..."} />
            <button type="button" onClick={analyze}>智能抓取</button>
          </div>
        </label>
        <label className="intake-field">
          <span>标题</span>
          <input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
        </label>
        <label className="intake-field">
          <span>{isVideo ? "频道 / 作者" : "作者"}</span>
          <input value={draft.author} onChange={(e) => setDraft({ ...draft, author: e.target.value })} />
        </label>
        <label className="intake-field">
          <span>发布时间</span>
          <input value={draft.date} onChange={(e) => setDraft({ ...draft, date: e.target.value })} />
        </label>
        <label className="intake-field">
          <span>来源</span>
          <input value={draft.source} onChange={(e) => setDraft({ ...draft, source: e.target.value })} placeholder={sourceLabel} />
        </label>
        <label className="intake-field intake-wide">
          <span>封面</span>
          <input value={draft.cover} onChange={(e) => setDraft({ ...draft, cover: e.target.value })} placeholder="自动抓取；没有时会生成主题封面" />
        </label>
        <label className="intake-field">
          <span>标签</span>
          <input value={draft.tags} onChange={(e) => setDraft({ ...draft, tags: e.target.value })} placeholder="AI医疗, 产品, 观察" />
        </label>
        <label className="intake-field intake-wide">
          <span>备注</span>
          <input value={draft.note} onChange={(e) => setDraft({ ...draft, note: e.target.value })} placeholder="为什么值得收录" />
        </label>
        <div className="intake-actions">
          <span>{status}</span>
          <button type="submit">纳入知识库</button>
        </div>
      </form>
    </section>
  );
}

function App() {
  const [section, setSection] = useState("featured");
  const [playingVideo, setPlayingVideo] = useState(null);
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [clickTick, setClickTick] = useState(0);
  const [savedItems, setSavedItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem(INTAKE_STORAGE_KEY) || "{}"); } catch (e) { return {}; }
  });
  const [peopleNotes, setPeopleNotes] = useState(() => {
    try { return JSON.parse(localStorage.getItem(PEOPLE_NOTES_STORAGE_KEY) || "{}"); } catch (e) { return {}; }
  });
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem("pulse-theme") || "editorial"; } catch (e) { return "editorial"; }
  });
  // filter is per-section; reset to All when section changes
  const [filters, setFilters] = useState({});
  const filter = filters[section] || "All";

  useEffect(() => { window.applyTheme(theme); }, [theme]);
  useEffect(() => {
    const onPlayVideo = (e) => setPlayingVideo(e.detail);
    window.addEventListener("pulse:play-video", onPlayVideo);
    return () => window.removeEventListener("pulse:play-video", onPlayVideo);
  }, []);
  useEffect(() => {
    const onClicked = () => setClickTick((n) => n + 1);
    window.addEventListener("pulse:item-clicked", onClicked);
    return () => window.removeEventListener("pulse:item-clicked", onClicked);
  }, []);
  useEffect(() => {
    const onOpenPerson = (e) => setSelectedPerson(e.detail);
    window.addEventListener("pulse:open-person", onOpenPerson);
    return () => window.removeEventListener("pulse:open-person", onOpenPerson);
  }, []);
  useEffect(() => {
    try { localStorage.removeItem("pulse-custom-items"); } catch (e) {}
  }, []);

  const updatePeopleNotes = (updater) => {
    setPeopleNotes((prev) => {
      const next = updater(prev);
      try { localStorage.setItem(PEOPLE_NOTES_STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      return next;
    });
  };

  const setFilter = (f) => setFilters((prev) => ({ ...prev, [section]: f }));
  const itemsFor = (key) => [
    ...(savedItems[key] || []),
    ...(window.PULSE[key] || []),
  ];
  const contentSections = window.PULSE.sections.filter((s) => s.key !== "intake");
  const allContentItems = () => contentSections.flatMap((s) =>
    itemsFor(s.key)
      .filter((it) => it && it.url && it.url !== "#" && window.CARD_FOR[s.key])
      .map((it) => ({ ...it, _section: s.key }))
  );
  const featuredItems = useMemo(() => {
    const counts = window.getItemClickCounts ? window.getItemClickCounts() : {};
    return allContentItems()
      .map((it) => {
        const key = window.itemClickKey ? window.itemClickKey(it) : (it.id || it.url || it.title || it.name);
        return { ...it, _clickKey: key, clickCount: counts[key] || 0 };
      })
      .filter((it) => it.clickCount > 0)
      .sort((a, b) => b.clickCount - a.clickCount || String(a.title || a.name).localeCompare(String(b.title || b.name)))
      .slice(0, 9);
  }, [savedItems, clickTick]);

  const counts = {
    featured: featuredItems.length,
    ...Object.fromEntries(window.PULSE.sections.map((s) => [
      s.key,
      s.key === "intake" ? "＋" : itemsFor(s.key).filter((it) => it && it.url && it.url !== "#").length,
    ])),
  };

  const addItem = (key, item, options = {}) => {
    const nextItem = { ...item, id: "intake-" + Date.now() };
    setSavedItems((prev) => {
      const next = { ...prev, [key]: [nextItem, ...(prev[key] || [])] };
      if (options.persist !== false) {
        try { localStorage.setItem(INTAKE_STORAGE_KEY, JSON.stringify(next)); } catch (e) {}
      }
      return next;
    });
    setSection(key);
    setFilters((prev) => ({ ...prev, [key]: item.filter || "All" }));
  };

  const addPeopleNote = (personId, note) => {
    updatePeopleNotes((prev) => ({ ...prev, [personId]: [note, ...(prev[personId] || [])] }));
  };

  const deletePeopleNote = (personId, noteId) => {
    updatePeopleNotes((prev) => ({
      ...prev,
      [personId]: (prev[personId] || []).filter((note) => note.id !== noteId),
    }));
  };

  const allItems = section === "featured" ? featuredItems : itemsFor(section).filter((it) => it && it.url && it.url !== "#");
  const visibleCount = filter === "All" ? allItems.length : allItems.filter((it) => it.filter === filter).length;

  return (
    <div className="app">
      <KnowledgeTopbar active={section} onKnowledge={() => setSection("articles")} onFeatured={() => setSection("featured")} onIntake={() => setSection("intake")} />
      <Sidebar active={section} onNav={setSection} theme={theme} onTheme={setTheme} counts={counts} />
      <main className="content" key={section}>
        <div className="content-inner">
          <ContentHeader section={section} filter={filter} onFilter={setFilter} count={visibleCount} />
          {section === "featured" ? <FeaturedPage items={featuredItems} /> : section === "intake" ? <IntakePage onAdd={addItem} /> : <Grid section={section} filter={filter} items={allItems} />}
        </div>
      </main>
      <VideoPlayerModal item={playingVideo} onClose={() => setPlayingVideo(null)} />
      <PeopleDetailModal
        item={selectedPerson}
        notes={peopleNotes}
        onAddNote={addPeopleNote}
        onDeleteNote={deletePeopleNote}
        onClose={() => setSelectedPerson(null)}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
