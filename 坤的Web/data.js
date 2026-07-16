/* =========================================================================
   PLACEHOLDER CONTENT — swap these out for your real curated items.
   Every item has a `url` (where the card links to) and metadata used by cards.
   Names/handles here are invented placeholders, not real attributions.
   ========================================================================= */
window.PULSE = {
  brand: {
    name: "吕坤",
    tagline: "个人知识库 · Collection 101",
    curator: "Vincent Lyu",
  },

  sections: [
    { key: "articles", label: "Articles", blurb: "Writing worth keeping — essays, threads, deep dives." },
    { key: "people",   label: "People",   blurb: "让我重新有劲的人：他们如何训练、承受、抵达，以及为什么振奋我。" },
    { key: "videos",   label: "Videos",   blurb: "Talks, demos and explainers I keep coming back to." },
    { key: "voices",   label: "Voices",   blurb: "People & organizations shaping AI in healthcare." },
    { key: "products", label: "Products", blurb: "Real products shipping today — consumer & clinical." },
    { key: "builds",   label: "Builds",   blurb: "Things I'm vibecoding. Rough edges welcome." },
    { key: "intake",   label: "Intake",   blurb: "A focused desk for collecting links and local media." },
  ],

  // Filter dimension per section (drives the chip row)
  filters: {
    articles: ["All", "X", "Substack", "公众号", "Blog"],
    people:   ["All", "Athlete", "Climber", "Builder", "Thinker"],
    videos:   ["All", "本地视频", "YouTube", "Bilibili", "视频号"],
    voices:   ["All", "People", "Companies"],
    products: ["All", "Consumer · 2C", "Clinical · 2D"],
    builds:   ["All", "Live", "WIP", "Prototype"],
    intake:   ["All"],
  },

  articles: [
    { id: "feifei-world-models", title: "A Functional Taxonomy of World Models", platform: "X", author: "Fei-Fei Li", handle: "@drfeifei", filter: "X", tags: ["World Models", "Spatial Intelligence"], meta: "Essay", date: "2026", cover: "covers/feifei-world-models.png", avatar: "https://unavatar.io/twitter/drfeifei", url: "https://x.com/drfeifei/status/2062247238143996275" },
    { id: "feifei-words-to-worlds", title: "From Words to Worlds: Spatial Intelligence is AI's Next Frontier", platform: "Substack", author: "Fei-Fei Li", handle: "drfeifei.substack.com", filter: "Substack", tags: ["Spatial Intelligence", "World Models"], meta: "Essay · 10 min read", date: "Nov 2025", cover: "covers/feifei-words-to-worlds.png", avatar: "https://unavatar.io/twitter/drfeifei", url: "https://drfeifei.substack.com/p/from-words-to-worlds-spatial-intelligence" },
    { title: "The clinical reasoning gap in medical LLMs", platform: "Substack", author: "Lena Whitfield", handle: "@lwhitfield", filter: "Substack", tags: ["LLM", "Diagnosis"], note: "Clearest framing yet of where models quietly break in real diagnosis.", date: "May 2026", meta: "12 min read", url: "#" },
    { title: "Why ambient scribes won the hospital first", platform: "X", author: "Marcus Huang", handle: "@marcus_dx", filter: "X", tags: ["Workflow", "Scribes"], note: "A thread that finally explains the adoption curve.", date: "May 2026", meta: "18-post thread", url: "#" },
    { id: "wangang-ai-medical-commercialization", title: "好大夫王航，给AI医疗商业化的3个启示是什么？", platform: "公众号", author: "稳定的坤", handle: "吕坤", filter: "公众号", tags: ["AI医疗", "商业化"], meta: "原创", date: "Jun 2026", cover: "covers/haodaifu-wanghang.png", url: "https://mp.weixin.qq.com/s/4SNYNBSuLgGmdUs3Rb5fRQ" },
    { title: "病历结构化：大模型落地的第一公里", platform: "公众号", author: "Wei Zhang", handle: "未来诊室", filter: "公众号", tags: ["EHR", "中国市场"], note: "国内视角，讲透了数据脏在哪。", date: "Apr 2026", meta: "9 min read", url: "#" },
    { title: "Evaluating medical agents without harming patients", platform: "Blog", author: "Priya Nair", handle: "priyanair.dev", filter: "Blog", tags: ["Eval", "Safety"], note: "The eval harness I wish I'd had two projects ago.", date: "Apr 2026", meta: "15 min read", url: "#" },
    { title: "The economics of AI triage in primary care", platform: "Substack", author: "Sam Okafor", handle: "@s_okafor", filter: "Substack", tags: ["Economics", "Triage"], note: "Follow the reimbursement, not the demo.", date: "Mar 2026", meta: "11 min read", url: "#" },
    { title: "What radiologists actually want from copilots", platform: "X", author: "Hannah Brooks", handle: "@hbrooks_md", filter: "X", tags: ["Radiology", "UX"], note: "Field notes from someone who sits in the reading room.", date: "Mar 2026", meta: "12-post thread", url: "#" },
  ],

  people: [
    {
      id: "maja-chwalinska-roland-garros-2026",
      name: "Maja Chwalińska",
      cnName: "玛雅·赫瓦林斯卡",
      role: "Polish tennis player",
      filter: "Athlete",
      source: "AP / WTA",
      cover: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Maja_Chwalinska_%2852163974449%29.jpg?width=900",
      imagePosition: "center 18%",
      photoCredit: "Peter Menzel · CC BY-SA 2.0",
      summary: "一个把长期低位训练兑现成关键时刻稳定的人。",
      moment: "从资格赛打进 2026 法网女单决赛",
      date: "Jun 2026",
      why: "振奋点不是爆冷本身，而是一个长期不在聚光灯中心的人，仍然把日复一日的训练变成了关键时刻的稳定。",
      quote: "从资格赛到决赛：把“不被看见”的时间，全部兑现成球场上的秩序。",
      timeline: [
        { date: "2026", text: "以资格赛球员身份打进法网女单决赛。" },
        { date: "待补", text: "补她低谷期、恢复训练和关键比赛的时间线。" }
      ],
      lessons: ["把不被看见的时间继续做厚", "稳定不是天赋，是重复之后的秩序", "低位出发也可以保留冠军想象"],
      sourceLinks: [
        { label: "AP 报道", url: "https://apnews.com/article/483dbbf0e39d1d6ad94ee5eb55f122e0" },
        { label: "WTA Profile", url: "https://www.wtatennis.com/players/325643/maja-chwalinska" }
      ],
      tags: ["Underdog", "Resilience", "Tennis"],
      next: ["补一张比赛截图或官方图", "记录她赛后采访里关于压力的一句话", "补她低谷期与恢复训练的时间线"],
      url: "https://apnews.com/article/483dbbf0e39d1d6ad94ee5eb55f122e0"
    },
    {
      id: "alex-honnold-el-capitan-taipei-101",
      name: "Alex Honnold",
      cnName: "亚历克斯·霍诺德",
      role: "Free-solo climber",
      filter: "Climber",
      source: "National Geographic / Netflix",
      cover: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Alex_Honnold_01.jpg?width=900",
      imagePosition: "center 18%",
      photoCredit: "Bengt Oberger · CC BY-SA 4.0",
      summary: "把恐惧拆成准备、训练、复盘和执行的人。",
      moment: "El Capitan 之后，又在 2026 年完成 Taipei 101 徒手攀登",
      date: "2017 / 2026",
      why: "他吸引人的地方不是冒险，而是把恐惧拆成可训练、可复盘、可执行的细节；极端动作背后是一种近乎冷静的长期主义。",
      quote: "真正吓人的不是高度，而是一个人能把准备做到多具体。",
      timeline: [
        { date: "2017-06-03", text: "完成 Yosemite El Capitan free solo。" },
        { date: "2026-01-25", text: "完成 Taipei 101 外墙徒手攀登。" }
      ],
      lessons: ["恐惧需要被拆解，而不是被否认", "极限动作来自极细的准备", "长期主义有时表现为冷静到近乎朴素"],
      sourceLinks: [
        { label: "Free Solo", url: "https://films.nationalgeographic.com/free-solo" },
        { label: "Taipei 101 Live", url: "https://www.netflix.com/tudum/articles/how-to-watch-alex-honnold-skyscraper-climb-live-netflix" }
      ],
      tags: ["Focus", "Preparation", "Climbing"],
      next: ["补 Free Solo 观后笔记", "记录 Taipei 101 直播里的一个画面", "比较岩壁攀登和城市立面的心理差异"],
      url: "https://films.nationalgeographic.com/free-solo"
    }
  ],

  videos: [
    { title: "知识库本地视频", platform: "本地视频", channel: "山甲实验室", handle: "Pangolin", filter: "本地视频", tags: ["Local Video", "Knowledge Base"], note: "站内播放的视频内容，封面直接取自视频首帧。", date: "Jun 2026", meta: "MP4", url: "videos/knowledge-upload-001.mp4", localUpload: true },
    { title: "Building a diagnosis copilot, end to end", platform: "YouTube", channel: "Lena Whitfield", handle: "@lwhitfield", filter: "YouTube", tags: ["Build", "RAG"], note: "The best 40 minutes on medical RAG plumbing.", date: "May 2026", meta: "41:12", url: "#" },
    { title: "AI 医疗产品的真实留存曲线", platform: "Bilibili", channel: "未来诊室", handle: "未来诊室", filter: "Bilibili", tags: ["Retention", "中国市场"], note: "国产产品的留存拆解，数据很诚实。", date: "Apr 2026", meta: "23:40", url: "#" },
    { title: "Inside a hospital LLM deployment", platform: "视频号", channel: "Wei Zhang", handle: "智慧医院", filter: "视频号", tags: ["Deployment", "Hospital"], note: "罕见的院内一线落地记录。", date: "Apr 2026", meta: "16:05", url: "#" },
    { title: "Fine-tuning vs. RAG for clinical text", platform: "YouTube", channel: "Priya Nair", handle: "@priyanair", filter: "YouTube", tags: ["Fine-tune", "RAG"], note: "Settles a debate I keep having with myself.", date: "Mar 2026", meta: "28:30", url: "#" },
    { title: "Demo: ambient scribe in a live clinic", platform: "Bilibili", channel: "Marcus Huang", handle: "@marcus_dx", filter: "Bilibili", tags: ["Scribes", "Demo"], note: "Watch the doctor stop typing. That's the product.", date: "Mar 2026", meta: "9:55", url: "#" },
  ],

  voices: [
    { name: "Lena Whitfield", kind: "Person", platform: "X", handle: "@lwhitfield", focus: "Clinical NLP researcher · writes the sharpest evals.", filter: "People", tags: ["Eval", "Research"], url: "#" },
    { name: "Marcus Huang", kind: "Person", platform: "X", handle: "@marcus_dx", focus: "ER physician turned founder · ambient scribes.", filter: "People", tags: ["Founder", "Scribes"], url: "#" },
    { name: "未来诊室", kind: "Person", platform: "公众号", handle: "未来诊室", focus: "国内 AI 医疗最值得读的长文作者之一。", filter: "People", tags: ["中国市场", "深度"], url: "#" },
    { name: "Helix Health", kind: "Company", platform: "X", handle: "@helixhealth", focus: "Diagnosis copilots for primary care.", filter: "Companies", tags: ["Copilot", "Primary care"], url: "#" },
    { name: "Cadence Clinical", kind: "Company", platform: "X", handle: "@cadenceclin", focus: "Ambient documentation, EHR-native.", filter: "Companies", tags: ["Scribes", "EHR"], url: "#" },
    { name: "明镜医疗", kind: "Company", platform: "公众号", handle: "明镜医疗", focus: "面向基层的 AI 问诊与分诊。", filter: "Companies", tags: ["分诊", "基层"], url: "#" },
  ],

  products: [
    { name: "蚂蚁阿福", company: "Ant Group", segment: "Consumer · 2C", oneLiner: "AI health companion — symptom check, guidance, follow-up.", region: "China", filter: "Consumer · 2C", tags: ["Companion", "Triage"], url: "#" },
    { name: "字节小荷", company: "ByteDance", segment: "Consumer · 2C", oneLiner: "Consumer health Q&A and care navigation.", region: "China", filter: "Consumer · 2C", tags: ["Q&A", "Navigation"], url: "#" },
    { name: "Helix Copilot", company: "Helix Health", segment: "Clinical · 2D", oneLiner: "Diagnosis copilot embedded in the primary-care EHR.", region: "US", filter: "Clinical · 2D", tags: ["Copilot", "EHR"], url: "#" },
    { name: "Cadence Scribe", company: "Cadence Clinical", segment: "Clinical · 2D", oneLiner: "Ambient documentation that writes the note for you.", region: "US", filter: "Clinical · 2D", tags: ["Scribe", "Docs"], url: "#" },
    { name: "明镜分诊", company: "明镜医疗", segment: "Consumer · 2C", oneLiner: "面向基层的 AI 分诊与导诊小程序。", region: "China", filter: "Consumer · 2C", tags: ["分诊", "小程序"], url: "#" },
  ],

  builds: [
    { name: "TriageLine", status: "Live", oneLiner: "A tiny triage assistant I run for myself — symptom → next step.", stack: ["React", "Claude", "RAG"], filter: "Live", date: "2026", url: "#" },
    { name: "PaperPulse", status: "WIP", oneLiner: "Auto-summarizes new AI-health papers into a daily digest.", stack: ["Python", "LLM", "Cron"], filter: "WIP", date: "2026", url: "#" },
    { name: "NoteWeaver", status: "Prototype", oneLiner: "Turns voice memos into structured clinical-style notes.", stack: ["Whisper", "Claude"], filter: "Prototype", date: "2026", url: "#" },
    { name: "EvalBench-Med", status: "WIP", oneLiner: "A small harness to score medical answers on safety + accuracy.", stack: ["TS", "Evals"], filter: "WIP", date: "2026", url: "#" },
  ],

  intake: [],
};
