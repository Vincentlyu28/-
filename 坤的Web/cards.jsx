/* =========================================================================
   CARDS — one component per content type. Each card links to item.url.
   ========================================================================= */

/* ---- shared cover: real photo (item.cover URL) → else a designed brand cover ---- */
function isVideoUrl(url) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url || "");
}

function isBlobUrl(url) {
  return /^blob:/i.test(url || "");
}

function isLocalUploadVideo(item) {
  return !!(item && item.localUpload && (isVideoUrl(item.url) || isBlobUrl(item.url)));
}

function CoverArtwork({ theme }) {
  if (theme.key === "spatial") {
    return (
      <svg className="bc-art bc-art-spatial" viewBox="0 0 220 150" aria-hidden="true">
        <path d="M72 28 142 54 106 114 36 88Z" />
        <path d="M142 54 184 33 146 94 106 114Z" />
        <path d="M72 28 113 12 184 33 142 54Z" />
        <path className="bc-line" d="M36 88 113 12 M106 114 184 33 M72 28 146 94" />
      </svg>
    );
  }
  if (theme.key === "workflow") {
    return (
      <svg className="bc-art bc-art-workflow" viewBox="0 0 220 150" aria-hidden="true">
        <path d="M26 42 H194" />
        <path d="M26 75 H194" />
        <path d="M26 108 H194" />
        <circle cx="62" cy="42" r="13" />
        <circle cx="128" cy="75" r="13" />
        <circle cx="168" cy="108" r="13" />
      </svg>
    );
  }
  if (theme.key === "eval") {
    return (
      <svg className="bc-art bc-art-eval" viewBox="0 0 220 150" aria-hidden="true">
        <circle cx="110" cy="75" r="54" />
        <circle cx="110" cy="75" r="31" />
        <path d="M110 21 V129 M56 75 H164" />
        <path className="bc-line" d="M82 88 l18 17 l40 -55" />
      </svg>
    );
  }
  if (theme.key === "triage" || theme.key === "market") {
    return (
      <svg className="bc-art bc-art-chart" viewBox="0 0 220 150" aria-hidden="true">
        <path d="M42 116 V76 M82 116 V55 M122 116 V91 M162 116 V38" />
        <path className="bc-line" d="M36 96 C70 92 80 58 112 72 S154 72 180 36" />
        <circle cx="180" cy="36" r="9" />
      </svg>
    );
  }
  if (theme.key === "imaging") {
    return (
      <svg className="bc-art bc-art-imaging" viewBox="0 0 220 150" aria-hidden="true">
        <rect x="48" y="26" width="124" height="98" rx="16" />
        <path d="M76 55 H144 M76 75 H154 M76 95 H132" />
        <path className="bc-line" d="M42 44 C72 18 146 18 178 46 M42 106 C72 132 146 132 178 104" />
      </svg>
    );
  }
  return (
    <svg className="bc-art bc-art-clinical" viewBox="0 0 220 150" aria-hidden="true">
      <path d="M22 78 H70 l8 -26 l12 54 l16 -78 l14 96 l12 -46 H198" />
      <circle cx="58" cy="40" r="10" />
      <circle cx="158" cy="110" r="10" />
      <path className="bc-line" d="M58 40 C90 26 130 122 158 110" />
    </svg>
  );
}

const CLICK_STORAGE_KEY = "pulse-click-counts-v1";

function itemClickKey(item) {
  if (!item) return "";
  return String(item.id || item.url || item.title || item.name || "");
}

function getItemClickCounts() {
  try { return JSON.parse(localStorage.getItem(CLICK_STORAGE_KEY) || "{}"); } catch (e) { return {}; }
}

function recordItemClick(item) {
  if (!item || !item.url || item.url === "#") return;
  const key = itemClickKey(item);
  if (!key) return;
  const counts = getItemClickCounts();
  counts[key] = (counts[key] || 0) + 1;
  try { localStorage.setItem(CLICK_STORAGE_KEY, JSON.stringify(counts)); } catch (e) {}
  window.dispatchEvent(new CustomEvent("pulse:item-clicked", { detail: { key, count: counts[key] } }));
}

function Cover({ item, label, ratio = "16 / 9" }) {
  const [broken, setBroken] = React.useState(false);
  if (isLocalUploadVideo(item) && !broken) {
    return (
      <div className="cover-slot cover-video" style={{ aspectRatio: ratio }}>
        <video
          src={item.url + "#t=0.1"}
          muted
          playsInline
          preload="metadata"
          onError={() => setBroken(true)}
        />
        {item.platform && <span className="cover-source">{item.platform}</span>}
      </div>
    );
  }
  if (item.cover && !broken) {
    return (
      <div className="cover-slot cover-img" style={{ aspectRatio: ratio }}>
        <img src={item.cover} alt="" loading="lazy" style={{ objectPosition: item.imagePosition || "center" }} onError={() => setBroken(true)} />
        {item.platform && <span className="cover-source">{item.platform}</span>}
      </div>
    );
  }
  // No photo → use the article metadata to make a content-specific cover.
  const theme = getContentCoverTheme(item);
  const [hue, hue2, accentHue] = theme.hues;
  const title = item.title || item.name || "Untitled note";
  const tags = (item.tags || []).slice(0, 2);
  return (
    <div
      className={"cover-slot brand-cover content-cover cover-" + theme.key}
      style={{
        aspectRatio: ratio,
        "--cover-hue": hue,
        "--cover-hue-2": hue2,
        "--cover-accent-hue": accentHue,
        background: `linear-gradient(142deg, oklch(0.96 0.026 ${hue}) 0%, oklch(0.88 0.058 ${hue2}) 100%)`,
      }}
    >
      {item.platform && <span className="cover-source on-brand">{item.platform}</span>}
      <div className="bc-copy">
        <span className="bc-kicker">{coverKicker(item)}</span>
        <span className="bc-title">{title}</span>
      </div>
      <CoverArtwork theme={theme} />
      <span className="bc-glyph">{theme.glyph}</span>
      {!!tags.length && (
        <span className="bc-topic-row">
          {tags.map((tag) => <span key={tag}>{tag}</span>)}
        </span>
      )}
    </div>
  );
}

/* opens item.url unless the click began inside an interactive cover slot */
function openItem(item) {
  return (e) => {
    if (e.target.closest(".cover-dropzone")) return;
    if (!item.url || item.url === "#") return;
    recordItemClick(item);
    if (isLocalUploadVideo(item) || isVideoUrl(item.url)) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("pulse:play-video", { detail: item }));
      return;
    }
    window.open(item.url, "_blank", "noopener");
  };
}

/* ---- ARTICLE ---- concise: cover → title → author → tags(source + topic) */
function ArticleCard({ item, featured }) {
  return (
    <div
      className={"card card-article clickable" + (featured ? " card-featured" : "")}
      onClick={openItem(item)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") openItem(item)(e); }}
    >
      {featured && <span className="featured-flag">Selected</span>}
      <Cover item={item} label="article cover" ratio={featured ? "4 / 3" : "16 / 9"} />
      <div className="card-body">
        <h3 className="card-title">{item.title}</h3>
        <span className="byline">
          <Avatar name={item.author} handle={item.handle} platform={item.platform} img={item.avatar} size={26} />
          <span className="byline-name">{item.author}</span>
          <span className="byline-handle">{item.handle}</span>
        </span>
        <div className="tag-row">
          <Tag variant="source">{item.platform}</Tag>
          {item.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
    </div>
  );
}

/* ---- VIDEO ---- concise: cover → title → author → tags(source + topic) */
function VideoCard({ item, featured }) {
  const localVideo = isLocalUploadVideo(item);
  return (
    <div
      className={"card card-video clickable" + (featured ? " card-featured" : "") + (localVideo ? " card-local-video" : "")}
      onClick={openItem(item)}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") openItem(item)(e); }}
    >
      {featured && <span className="featured-flag">Selected</span>}
      <div className="video-cover">
        <Cover item={item} label="video still" ratio={featured ? "4 / 3" : "16 / 9"} />
        <span className="play-badge" aria-hidden="true">▶</span>
        {item.meta && <span className="duration-badge">{item.meta}</span>}
      </div>
      <div className="card-body">
        <h3 className="card-title">{item.title}</h3>
        <span className="byline">
          <Avatar name={item.channel} handle={item.handle} platform={item.platform} img={item.avatar} size={26} />
          <span className="byline-name">{item.channel}</span>
        </span>
        <div className="tag-row">
          <Tag variant="source">{item.platform}</Tag>
          {item.tags.map((t) => <Tag key={t}>{t}</Tag>)}
        </div>
      </div>
    </div>
  );
}

/* ---- VOICE (person / company) ---- */
function VoiceCard({ item }) {
  return (
    <a className="card card-voice" href={item.url} target="_blank" rel="noopener" onClick={() => recordItemClick(item)}>
      <div className="voice-head">
        <Avatar name={item.name} size={52} />
        <div className="voice-id">
          <h3 className="card-title voice-name">{item.name}</h3>
          <span className="voice-handle">
            <SourceBadge tone="muted">{item.platform}</SourceBadge>
            <span className="handle-text">{item.handle}</span>
          </span>
        </div>
        <span className={"kind-pill kind-" + item.kind.toLowerCase()}>{item.kind}</span>
      </div>
      <p className="card-note voice-focus">{item.focus}</p>
      <div className="tag-row">{item.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
    </a>
  );
}

/* ---- PEOPLE (personal inspiration archive) ---- */
function PeopleCard({ item }) {
  const openPerson = (e) => {
    e.preventDefault();
    recordItemClick(item);
    window.dispatchEvent(new CustomEvent("pulse:open-person", { detail: item }));
  };
  return (
    <a className="card card-people" href={"#person-" + item.id} onClick={openPerson}>
      <div className="people-photo">
        <Cover item={item} label="portrait" ratio="4 / 5" />
        {item.photoCredit && <span className="people-photo-credit">{item.photoCredit}</span>}
      </div>
      <div className="people-body">
        <div className="people-top">
          <div className="people-id">
            <span className="people-source">{item.source}</span>
            <h3 className="card-title people-name">{item.name}</h3>
            {item.cnName && <span className="people-cn">{item.cnName}</span>}
          </div>
          <span className="people-date">{item.date}</span>
        </div>
        <div className="people-moment">
          <span>Moment</span>
          <p>{item.moment}</p>
        </div>
        <p className="people-quote">{item.quote}</p>
        <div className="card-foot">
          <div className="tag-row">{item.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          <span className="card-date">{item.role}</span>
        </div>
      </div>
    </a>
  );
}

/* ---- PRODUCT ---- */
function ProductCard({ item }) {
  const is2D = item.segment.includes("2D");
  return (
    <a className="card card-product" href={item.url} target="_blank" rel="noopener" onClick={() => recordItemClick(item)}>
      <div className="product-head">
        <span className="product-logo" style={{ background: `oklch(0.93 0.04 ${hashHue(item.name)})`, color: `oklch(0.40 0.07 ${hashHue(item.name)})` }}>
          {initials(item.name)}
        </span>
        <div className="product-id">
          <h3 className="card-title product-name">{item.name}</h3>
          <span className="product-company">{item.company}</span>
        </div>
        <span className={"segment-pill " + (is2D ? "seg-2d" : "seg-2c")}>{item.segment}</span>
      </div>
      <p className="card-note">{item.oneLiner}</p>
      <div className="card-foot">
        <div className="tag-row">{item.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        <span className="card-date">{item.region}</span>
      </div>
    </a>
  );
}

/* ---- BUILD (my vibecoding) ---- */
function BuildCard({ item }) {
  return (
    <a className="card card-build" href={item.url} target="_blank" rel="noopener" onClick={() => recordItemClick(item)}>
      <div className="build-top">
        <span className={"status-dot status-" + item.status.toLowerCase().replace(/\s/g, "")} />
        <span className="status-label">{item.status}</span>
        <span className="build-arrow" aria-hidden="true">↗</span>
      </div>
      <h3 className="card-title build-name">{item.name}</h3>
      <p className="card-note">{item.oneLiner}</p>
      <div className="card-foot">
        <div className="tag-row mono">{item.stack.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        <span className="card-date">{item.date}</span>
      </div>
    </a>
  );
}

const CARD_FOR = {
  articles: ArticleCard,
  people: PeopleCard,
  videos: VideoCard,
  voices: VoiceCard,
  products: ProductCard,
  builds: BuildCard,
};

Object.assign(window, { ArticleCard, PeopleCard, VideoCard, VoiceCard, ProductCard, BuildCard, CARD_FOR, getItemClickCounts, itemClickKey, recordItemClick });
