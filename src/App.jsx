import { useState, useEffect, useRef } from "react";

const PAGES = {
  home: "home",
  tokyo: "tokyo",
  izakaya: "izakaya",
  chefday: "chefday",
  maui: "maui",
  about: "about",
  contact: "contact",
};

/* ─── UTILS ─────────────────────────────── */
function useFadeIn(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useFadeIn();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 1.4s cubic-bezier(0.19,1,0.22,1) ${delay}s, transform 1.4s cubic-bezier(0.19,1,0.22,1) ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* ─── GLOBAL STYLES ─────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@200;300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root {
      --black: #060606; --off-black: #0d0d0d; --charcoal: #1a1a1a;
      --mid: #2e2e2e; --muted: #555; --dim: #888;
      --silver: #b0b0b0; --near-white: #e8e8e8; --white: #f5f5f5; --accent: #c8b89a;
    }
    @media (max-width: 768px) {
      nav { padding: 20px 24px; }
      .nav-links { gap: 16px; }
      .nav-links button { font-size: 9px; }
      section { padding: 80px 24px; }
      .steps-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
    }
    html { scroll-behavior: smooth; }
    body {
      background: var(--black); color: var(--near-white);
      font-family: 'Montserrat', sans-serif; font-weight: 300;
      letter-spacing: 0.02em; cursor: none; overflow-x: hidden;
    }
    ::selection { background: var(--near-white); color: var(--black); }
    .cursor {
      position: fixed; width: 8px; height: 8px; background: var(--near-white);
      border-radius: 50%; pointer-events: none; z-index: 9999;
      transition: transform 0.15s ease; mix-blend-mode: difference;
    }
    .cursor-ring {
      position: fixed; width: 36px; height: 36px;
      border: 1px solid rgba(232,232,232,0.4); border-radius: 50%;
      pointer-events: none; z-index: 9998;
      transition: transform 0.4s cubic-bezier(0.19,1,0.22,1); mix-blend-mode: difference;
    }
    .serif { font-family: 'Cormorant Garamond', serif; }
    .italic { font-style: italic; }
    .rule { width: 100%; height: 1px; background: var(--charcoal); }
    .rule-sm { width: 40px; height: 1px; background: var(--dim); }
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      display: flex; justify-content: space-between; align-items: center;
      padding: 28px 48px; mix-blend-mode: difference;
    }
    .nav-logo {
      font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 500;
      letter-spacing: 0.35em; color: var(--white); background: none; border: none; cursor: none;
    }
    .nav-links { display: flex; gap: 36px; list-style: none; }
    .nav-links button {
      background: none; border: none; cursor: none;
      font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 300;
      letter-spacing: 0.3em; color: var(--dim); text-transform: uppercase; transition: color 0.3s;
    }
    .nav-links button:hover { color: var(--white); }
    section { padding: 120px 48px; }
    @media (max-width: 768px) {
      nav { padding: 20px 24px; }
      .nav-links { gap: 16px; }
      .nav-links button { font-size: 9px; }
      section { padding: 80px 24px; }
    }
    .page-wrap { opacity: 0; animation: pageIn 0.8s cubic-bezier(0.19,1,0.22,1) forwards; }
    @keyframes pageIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 12px;
      background: none; border: none; cursor: none;
      font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 400;
      letter-spacing: 0.35em; text-transform: uppercase; color: var(--silver);
      padding: 0; padding-bottom: 6px; border-bottom: 1px solid var(--mid);
      transition: color 0.3s, border-color 0.3s, gap 0.3s;
    }
    .btn-ghost:hover { color: var(--white); border-color: var(--silver); gap: 20px; }
    .btn-solid {
      display: inline-block; background: var(--near-white); color: var(--black);
      font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 500;
      letter-spacing: 0.3em; text-transform: uppercase; padding: 16px 36px;
      border: none; cursor: none; transition: background 0.3s;
    }
    .btn-solid:hover { background: var(--accent); }
    .tag {
      display: inline-block; font-size: 9px; font-weight: 400;
      letter-spacing: 0.35em; text-transform: uppercase; color: var(--muted);
      border: 1px solid var(--charcoal); padding: 5px 12px;
    }
    .grain::before {
      content: ''; position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 9990; opacity: 0.6;
    }
    .num { font-family: 'Cormorant Garamond', serif; font-size: 80px; font-weight: 300; line-height: 1; color: var(--charcoal); }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--mid); }
  `}</style>
);

/* ─── CURSOR ─────────────────────────────── */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX - 4 + "px"; dot.current.style.top = e.clientY - 4 + "px"; }
      if (ring.current) { ring.current.style.left = e.clientX - 18 + "px"; ring.current.style.top = e.clientY - 18 + "px"; }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return <><div className="cursor" ref={dot} /><div className="cursor-ring" ref={ring} /></>;
}

/* ─── NAV ────────────────────────────────── */
function Nav({ setPage }) {
  return (
    <nav>
      <button className="nav-logo" onClick={() => setPage(PAGES.home)}>REVY WILD</button>
      <ul className="nav-links">
        {[["Tokyo", PAGES.tokyo], ["Maui", PAGES.maui], ["About", PAGES.about], ["Contact", PAGES.contact]].map(([label, page]) => (
          <li key={label}><button onClick={() => setPage(page)}>{label}</button></li>
        ))}
      </ul>
    </nav>
  );
}

/* ─── SHARED: PAGE FOOTER ───────────────── */
function PageFooter({ setPage, back = PAGES.home, label }) {
  return (
    <footer style={{ padding: "32px 48px", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--charcoal)" }}>
      <button className="btn-ghost" onClick={() => setPage(back)}>← Back</button>
      <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase" }}>{label}</span>
    </footer>
  );
}

/* ─── HOME PAGE ─────────────────────────── */
function HomePage({ setPage }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setHeroLoaded(true), 100); return () => clearTimeout(t); }, []);

  return (
    <div className="page-wrap grain">
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, var(--black) 35%, transparent 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", right: 0, top: 0, width: "55%", height: "100%", background: "var(--off-black)", overflow: "hidden", zIndex: 0 }}>
          {/* REPLACE with your photo */}
          <img
            src="/public/hero-revy.png"
            alt="Revy Wild"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "grayscale(100%) contrast(1.05)", opacity: 0.7, transform: heroLoaded ? "scale(1)" : "scale(1.06)", transition: "transform 3s cubic-bezier(0.19,1,0.22,1), opacity 2s ease" }}
          />
        </div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <div style={{ opacity: heroLoaded ? 1 : 0, transform: heroLoaded ? "translateY(0)" : "translateY(30px)", transition: "opacity 1.4s cubic-bezier(0.19,1,0.22,1) 0.3s, transform 1.4s cubic-bezier(0.19,1,0.22,1) 0.3s" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", color: "var(--muted)", marginBottom: 40, textTransform: "uppercase" }}>Maui · Tokyo</p>
            <h1 className="serif" style={{ fontSize: "clamp(56px, 8vw, 100px)", fontWeight: 300, lineHeight: 0.95, marginBottom: 40 }}>
              Some things<br />can't be found.<br />
              <span className="italic" style={{ color: "var(--silver)" }}>Only introduced.</span>
            </h1>
            <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, maxWidth: 380, marginBottom: 52, fontWeight: 300 }}>
              Network & hospitality operator based between Maui and Tokyo. After spending years finding the right places and the right people in the hospitality industry, I know who and what is worth your time.
            </p>
            <button className="btn-ghost" onClick={() => setPage(PAGES.tokyo)}>
              See what I offer <span style={{ fontSize: 14 }}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", borderTop: "1px solid var(--charcoal)", borderBottom: "1px solid var(--charcoal)", padding: "0 48px" }}>
          {[
            ["$1M+", "Café & rentals, Maui"],
            ["47", "Prefectures traveled, stayed in 67 locals' homes"],
            ["100+", "Placed into FAANG"],
            ["200+", "Tokyo izakayas, vetted"],
          ].map(([n, label], i) => (
            <div key={n} style={{ padding: "48px 0", paddingLeft: i === 0 ? 0 : 24, borderRight: "1px solid var(--charcoal)" }}>
              <div className="serif" style={{ fontSize: 40, fontWeight: 300, color: "var(--near-white)", marginBottom: 8 }}>{n}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* TWO EXPERIENCES */}
      <section style={{ padding: "120px 48px" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, paddingBottom: 24, borderBottom: "1px solid var(--charcoal)" }}>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300 }}>Tokyo.</h2>
            <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.2em", textTransform: "uppercase" }}>Two experiences</p>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {[
            {
              tag: "~$100 per person",
              title: "200 Izakayas, 3 Stops.",
              desc: "Anyone can find a \"hidden gem\" in Tokyo. After 200+ izakayas, I know which ones are actually worth your night.",
              page: PAGES.izakaya,
            },
            {
              tag: "From $750 per person",
              title: "A Day Off With The Chef",
              desc: "You pick a dish from their menu. They take you to the market to pick the ingredients, then back to their kitchen to make it together — with a chef who's been perfecting this for over a decade.",
              page: PAGES.chefday,
            },
          ].map((item) => (
            <FadeIn key={item.tag}>
              <div
                onClick={() => setPage(item.page)}
                style={{ background: "var(--off-black)", padding: 52, display: "flex", flexDirection: "column", gap: 24, cursor: "none", transition: "background 0.3s", minHeight: 420 }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--charcoal)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--off-black)"}
              >
                <span className="tag" style={{ alignSelf: "flex-start" }}>{item.tag}</span>
                <h3 className="serif" style={{ fontSize: 40, fontWeight: 300, lineHeight: 1.1, marginTop: "auto", whiteSpace: "pre-line" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.8 }}>{item.desc}</p>
                <button className="btn-ghost" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                  Learn more <span style={{ fontSize: 14 }}>→</span>
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "140px 48px", background: "var(--near-white)", color: "var(--black)", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 32, color: "#666" }}>Tokyo · Maui</p>
          <h2 className="serif italic" style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 300, marginBottom: 48, color: "var(--black)", lineHeight: 0.9 }}>Let's talk.</h2>
          <button className="btn-solid" onClick={() => setPage(PAGES.contact)}>Reach out</button>
        </FadeIn>
      </section>

      <footer style={{ padding: "32px 48px", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--charcoal)" }}>
        <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase" }}>Revy Wild © 2025</span>
        <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>Tokyo · Maui</span>
      </footer>
    </div>
  );
}

/* ─── TOKYO OVERVIEW PAGE ───────────────── */
function TokyoPage({ setPage }) {
  return (
    <div className="page-wrap">
      <section style={{ minHeight: "80vh", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", background: "var(--off-black)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--off-black) 45%, transparent)" }} />
        <img src="/public/tokyo.png" alt="Tokyo" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: 0.2 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 32 }}>Tokyo, Japan</span>
          <h1 className="serif" style={{ fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 300, lineHeight: 0.95, marginBottom: 32 }}>
            Two ways in.<br />
            <span className="italic" style={{ color: "var(--silver)" }}>One city.</span>
          </h1>
          <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, maxWidth: 440 }}>
            An open entry point for anyone curious. A curated session for those who want to go further.
          </p>
        </div>
      </section>

      <section style={{ padding: "100px 48px", background: "var(--off-black)" }}>
        <FadeIn>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <div className="rule-sm" style={{ margin: "0 auto 48px" }} />
            <blockquote className="serif italic" style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 250, lineHeight: 1.3, color: "var(--near-white)", marginBottom: 40 }}>
              "Filtering took years. Relationships, longer.<br />You get both in a few hours."
            </blockquote>
            <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.9, maxWidth: 400, margin: "0 auto" }}>
              Tokyo has thousands of hidden gems and no shortage of Google hotspots. It takes years to know which ones are actually worth your time. It takes longer to know the chefs who'll cook with you like you're a friend.
            </p>
          </div>
        </FadeIn>
      </section>
      
      <section style={{ padding: "120px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {[
            {
              tag: "~$100 per person",
              title: "200 Izakayas, 3 Stops.",
              body: "Anyone can find a \"hidden gem\" in Tokyo. After 200+ izakayas, I know which ones are actually worth your night.",
              page: PAGES.izakaya,
            },
            {
              tag: "From $750 per person",
              title: "A Day Off With The Chef",
              body: "You pick a dish from their menu. They take you to the market to pick the ingredients, then back to their kitchen to make it together — with a chef who's been perfecting this for over a decade.",
              page: PAGES.chefday,
            },
          ].map((item) => (
            <FadeIn key={item.tag}>
              <div
                onClick={() => setPage(item.page)}
                style={{ background: "var(--off-black)", padding: 52, display: "flex", flexDirection: "column", gap: 24, cursor: "none", transition: "background 0.3s", minHeight: 460 }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--charcoal)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--off-black)"}
              >
                <span className="tag" style={{ alignSelf: "flex-start" }}>{item.tag}</span>
                <h3 className="serif" style={{ fontSize: 40, fontWeight: 300, lineHeight: 1.1, marginTop: "auto" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.8 }}>{item.body}</p>
                <button className="btn-ghost" style={{ alignSelf: "flex-start", marginTop: 8 }}>
                  Learn more <span style={{ fontSize: 14 }}>→</span>
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <PageFooter setPage={setPage} label="Revy Wild · Tokyo" />
    </div>
  );
}

/* ─── IZAKAYA PAGE ──────────────────────── */
function IzakayaPage({ setPage }) {
  return (
    <div className="page-wrap">
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", background: "var(--off-black)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--off-black) 50%, transparent)" }} />
        <img src="/public/izakaya.png" alt="Izakaya Tokyo" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: 0.25 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 32 }}>Tokyo · Group experience</span>
          <h1 className="serif" style={{ fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 300, lineHeight: 0.95, marginBottom: 32 }}>
            200 Izakayas,<br />
            <span className="italic" style={{ color: "var(--silver)" }}>3 Stops.</span>
          </h1>
          <p style={{ fontSize: 15, color: "var(--dim)", lineHeight: 1.9, maxWidth: 460 }}>
            I've been to over 200 izakayas in Tokyo — hidden gems, Google-famous spots, everything in between. Most aren't worth your time. These three are.
          </p>
        </div>
      </section>

      {/* The filter */}
      <section style={{ padding: "100px 48px", background: "var(--off-black)" }}>
        <FadeIn>
          <div style={{ maxWidth: 640 }}>
            <div className="rule-sm" style={{ marginBottom: 40 }} />
            <p style={{ fontSize: 15, color: "var(--silver)", lineHeight: 2, fontWeight: 300 }}>
              Most hidden gems are cute. Most Google hotspots are fine. However, what I noticed makes a night consistently memorable was different — places with enough culture to mean something, and enough local energy to feel alive. The kind of place that has a reason to exist beyond looking good on a photo.
            </p>
            <p style={{ fontSize: 15, color: "var(--silver)", lineHeight: 2, fontWeight: 300, marginTop: 24 }}>
              Three stops, three hours. A group activity at about $100 per person.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* The three stops */}
      <section style={{ padding: "120px 48px" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80, paddingBottom: 24, borderBottom: "1px solid var(--charcoal)" }}>
            <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300 }}>Three stops.</h2>
            <span style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>~1 hour each</span>
          </div>
        </FadeIn>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {[
            {
              n: "01",
              title: "Step back in time.",
              area: "Post-war district",
              body: "We start in the izakayas that have been running since the 1970s, tucked under the train tracks. Chaotic, loud, and completely unchanged. The kind of place locals have been coming to for decades for no other reason than it's exactly right.",
            },
            {
              n: "02",
              title: "Standing drinks, elevated.",
              area: "Ginza",
              body: "A standing bar in Ginza that's earned its following on quality alone — known for fresh herbs sourced from a farm in Aomori. Small, no seats, no fuss.",
            },
            {
              n: "03",
              title: "Celebrate like a local.",
              area: "Near a wedding venue",
              body: "The last stop fills up with after-parties and the kind of energy that's hard to manufacture. A good place to end.",
            },
          ].map((stop, i) => (
            <FadeIn key={stop.n} delay={i * 0.1}>
              <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 48, padding: "52px 0", borderBottom: "1px solid var(--charcoal)", alignItems: "start" }}>
                <div>
                  <div className="num" style={{ fontSize: 56 }}>{stop.n}</div>
                  <div style={{ fontSize: 12, letterSpacing: "0.3em", color: "var(--silver)", textTransform: "uppercase", marginTop: 8 }}>{stop.area}</div>
                </div>
                <div>
                  <h3 className="serif" style={{ fontSize: 32, fontWeight: 300, marginBottom: 20 }}>{stop.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--silver)", lineHeight: 1.9 }}>{stop.body}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Pricing + CTA */}
      <section style={{ padding: "100px 48px", background: "var(--off-black)" }}>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="serif" style={{ fontSize: 64, fontWeight: 300, color: "var(--near-white)", marginBottom: 8 }}>~$100</div>
              <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 32 }}>Per person · Group activity · ~3 hours</div>
              <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.9 }}>
                Reach out to check availability and group size.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start" }}>
              <button className="btn-solid" onClick={() => setPage(PAGES.contact)}>Get in touch</button>
              <button className="btn-ghost" onClick={() => setPage(PAGES.chefday)}>
                Also: A Day Off With The Chef <span style={{ fontSize: 14 }}>→</span>
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      <PageFooter setPage={setPage} back={PAGES.tokyo} label="Revy Wild · Tokyo" />
    </div>
  );
}

/* ─── CHEF DAY PAGE ─────────────────────── */
function ChefDayPage({ setPage }) {
  return (
    <div className="page-wrap">
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", background: "var(--off-black)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--off-black) 45%, transparent)" }} />
        <img src="/public/japankitchen.png" alt="Chef kitchen Tokyo" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: 0.2 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 32 }}>Tokyo · Curated session</span>
          <h1 className="serif" style={{ fontSize: "clamp(44px, 6vw, 82px)", fontWeight: 300, lineHeight: 1, marginBottom: 32 }}>
            Cook with the chef<br />
            <span className="italic" style={{ color: "var(--silver)" }}>on their day off.</span>
          </h1>
          <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, maxWidth: 460 }}>
            You pick a dish. A chef who's been doing this for over a decade takes you to the market, then back to their kitchen to make it together.
          </p>
        </div>
      </section>

      {/* What this is */}
      <section style={{ padding: "100px 48px", background: "var(--off-black)" }}>
        <FadeIn>
          <div style={{ maxWidth: 640 }}>
            <div className="rule-sm" style={{ marginBottom: 40 }} />
            <p style={{ fontSize: 15, color: "var(--silver)", lineHeight: 2, fontWeight: 300, marginTop: 0 }}>
              The kind of afternoon that only happens if you were friends with them for years
            </p>
          </div>
        </FadeIn>
      </section>

      {/* The arc */}
      <section style={{ padding: "120px 48px" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80, paddingBottom: 24, borderBottom: "1px solid var(--charcoal)" }}>
            <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300 }}>How it unfolds.</h2>
            <span style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>~4 hours</span>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32 }}>
          {[
            { n: "I", title: "The Restaurant", body: "You sit down with the menu. You pick a dish — whatever you want to learn to make. That's where it starts." },
            { n: "II", title: "The Market", body: "The chef takes you to pick the ingredients. You see how they choose — what they look for, what they pass on." },
            { n: "III", title: "The Kitchen", body: "Inside the restaurant on their day off. The chef will show you how to cook the dish from step one — ingredients chosen, techniques explained, no shortcuts." },
            { n: "IV", title: "The Table", body: "A meal from what was bought that morning. The chef stays and eats with you." },
          ].map((step, i) => (
            <FadeIn key={step.n} delay={i * 0.1}>
              <div>
                <div className="serif" style={{ fontSize: 64, color: "var(--charcoal)", lineHeight: 1, marginBottom: 20 }}>{step.n}</div>
                <div className="rule" style={{ marginBottom: 24 }} />
                <h4 style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, color: "var(--muted)" }}>{step.title}</h4>
                <p style={{ fontSize: 13, color: "var(--silver)", lineHeight: 1.9 }}>{step.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Pricing + CTA */}
      <section style={{ padding: "100px 48px", background: "var(--off-black)" }}>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="serif" style={{ fontSize: 64, fontWeight: 300, color: "var(--near-white)", marginBottom: 8 }}>from $750</div>
              <div style={{ fontSize: 10, letterSpacing: "0.25em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 32 }}>Per person · Group of 2-4 guests · ~4 hours</div>
              <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.9 }}>
                Reach out to check availability, group size, and dish options.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 32, alignItems: "flex-start" }}>
              <button className="btn-solid" onClick={() => setPage(PAGES.contact)}>Get in touch</button>
              <button className="btn-ghost" onClick={() => setPage(PAGES.izakaya)}>
                Also: 200 Izakayas, 3 Stops. <span style={{ fontSize: 14 }}>→</span>
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      <PageFooter setPage={setPage} back={PAGES.tokyo} label="Revy Wild · Tokyo" />
    </div>
  );
}

/* ─── MAUI PAGE ─────────────────────────── */
function MauiPage({ setPage }) {
  return (
    <div className="page-wrap">
      <section style={{ minHeight: "85vh", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", background: "var(--off-black)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--off-black) 50%, transparent)" }} />
        <img src="/public/maui.png" alt="Maui" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: 0.2 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 32 }}>Maui, Hawaii</span>
          <h1 className="serif" style={{ fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 300, lineHeight: 0.95, marginBottom: 32 }}>
            Maui.<br />
            <span className="italic" style={{ color: "var(--silver)" }}>Private stays.</span>
          </h1>
          <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, maxWidth: 440 }}>
            I own and operate here. The properties are mine. So are the recommendations.
          </p>
        </div>
      </section>

      <section style={{ padding: "120px 48px" }}>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
            <div>
              <h2 className="serif" style={{ fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 300, lineHeight: 1.1, marginBottom: 32 }}>
                Private properties.<br />
                <span className="italic" style={{ color: "var(--silver)" }}>Personal layer included.</span>
              </h2>
              <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, marginBottom: 40 }}>
                I've been running a café and rental properties in Maui for years. When you stay, you get what I actually know — the producers, the back roads, the spots that have no reason to advertise.
              </p>
              <button className="btn-ghost" onClick={() => setPage(PAGES.contact)}>
                Inquire about availability <span style={{ fontSize: 14 }}>→</span>
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { title: "Private Stays", body: "Properties I own and stand behind. Inquire directly." },
                { title: "Local Knowledge", body: "Where to eat, who to call, what to skip. Comes with the stay." },
                { title: "The Café", body: "Running for years, with supplier relationships going back just as long." },
              ].map((item) => (
                <div key={item.title} style={{ background: "var(--off-black)", padding: 32 }}>
                  <h4 style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, color: "var(--near-white)" }}>{item.title}</h4>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <PageFooter setPage={setPage} label="Revy Wild · Maui" />
    </div>
  );
}

/* ─── ABOUT PAGE ────────────────────────── */
function AboutPage({ setPage }) {
  return (
    <div className="page-wrap">
      <section style={{ minHeight: "100vh", padding: "160px 48px 120px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
        <div style={{ position: "sticky", top: 120 }}>
          <FadeIn>
            <div style={{ aspectRatio: "2/3", background: "var(--charcoal)", overflow: "hidden", marginBottom: 24 }}>
              {/* REPLACE with your photo */}
              <img src="/public/hero-revy.png" alt="Rebecca Hsiao" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "grayscale(100%)", opacity: 0.6 }} />
            </div>
            <p style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>
              Rebecca (Revy Wild) Hsiao <br />
              <span style={{ color: "var(--dim)", display: "block", marginTop: 6 }}>Network & Hospitality Operator</span>
            </p>
          </FadeIn>
        </div>

      <div>
      <FadeIn>
        <h1 className="serif" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, lineHeight: 1, marginBottom: 60 }}>
          Revy Wild<br />
          <span className="italic" style={{ color: "var(--silver)", fontSize: "clamp(24px, 3vw, 40px)" }}>Not all introductions are equal.</span>
        </h1>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div style={{ marginBottom: 48 }}>
          {[
            "Worked at Google, Meta, and several startups before leaving tech to build a café and rental properties in Maui. Within a year, reduced waste from 15% to 3% and grew sales by 20% — now over $1M in combined revenue, managed remotely. With my N2 level Japanese I traveled across all 47 prefectures staying in 67 locals' homes, and was visiting Tokyo twice a year for 5 years straight before moving here four and a half years ago.",
            "In that time I've taken Google directors, nine-figure founders, and local Japanese around Tokyo. Helped over 100 people — mostly non-tech career switchers — get into FAANG. Helped three people start rental operations in Maui.",
            "The chef sessions and izakaya list exist because of five years of showing up, in Japanese, to the same places and the same people.",
          ].map((para, i) => (
            <p key={i} style={{ fontSize: 15, color: "var(--silver)", lineHeight: 1.9, fontWeight: 300, marginBottom: 28 }}>{para}</p>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <button className="btn-ghost" onClick={() => setPage(PAGES.contact)}>
          Reach out <span style={{ fontSize: 14 }}>→</span>
        </button>
      </FadeIn>
    </div>
      </section>

      <PageFooter setPage={setPage} label="Revy Wild" />
    </div>
  );
}

/* ─── CONTACT PAGE ──────────────────────── */
function ContactPage({ setPage }) {
  const [formData, setFormData] = useState({ name: "", email: "", interest: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xqeglepk", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch { setStatus("error"); }
  };

  const inputStyle = {
    background: "transparent", border: "none", borderBottom: "1px solid var(--mid)",
    color: "var(--near-white)", fontFamily: "'Montserrat', sans-serif",
    fontSize: 13, fontWeight: 300, letterSpacing: "0.05em",
    padding: "16px 0", width: "100%", outline: "none", transition: "border-color 0.3s",
  };

  return (
    <div className="page-wrap">
      <section style={{ minHeight: "100vh", padding: "160px 48px 120px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
        <FadeIn>
          <div>
            <h1 className="serif" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, lineHeight: 1, marginBottom: 40 }}>
              Get in touch.
            </h1>
            <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, maxWidth: 380, marginBottom: 60 }}>
              Tell me what you're looking for. The more specific, the better.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["Email", "contact@revywild.com"], ["Instagram", "instagram.com/revywild"], ["Based", "Tokyo · Maui"]].map(([label, val]) => (
                <div key={label} style={{ display: "flex", gap: 20, alignItems: "center" }}>
                  <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase", minWidth: 80 }}>{label}</span>
                  <span style={{ fontSize: 13, color: "var(--silver)" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          {status === "sent" ? (
            <div style={{ paddingTop: 40 }}>
              <div className="serif italic" style={{ fontSize: 48, color: "var(--silver)", marginBottom: 24 }}>Received.</div>
              <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9 }}>I'll be in touch.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 36, paddingTop: 40 }}>
              {[
                { key: "name", label: "Your name", type: "text" },
                { key: "email", label: "Email address", type: "email" },
                { key: "interest", label: "Subject", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>{field.label}</label>
                  <input
                    type={field.type}
                    value={formData[field.key]}
                    onChange={e => setFormData({ ...formData, [field.key]: e.target.value })}
                    style={inputStyle}
                    onFocus={e => e.target.style.borderBottomColor = "var(--silver)"}
                    onBlur={e => e.target.style.borderBottomColor = "var(--mid)"}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>What you're looking for</label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  style={{ ...inputStyle, resize: "none" }}
                  onFocus={e => e.target.style.borderBottomColor = "var(--silver)"}
                  onBlur={e => e.target.style.borderBottomColor = "var(--mid)"}
                />
              </div>
              {status === "error" && (
                <p style={{ fontSize: 12, color: "#c0392b" }}>Something went wrong. Try emailing contact@revywild.com directly.</p>
              )}
              <button
                className="btn-solid"
                onClick={handleSubmit}
                style={{ alignSelf: "flex-start", cursor: "none", opacity: status === "sending" ? 0.5 : 1 }}
              >
                {status === "sending" ? "Sending..." : "Send"}
              </button>
            </div>
          )}
        </FadeIn>
      </section>

      <PageFooter setPage={setPage} label="Revy Wild" />
    </div>
  );
}

/* ─── APP ────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState(PAGES.home);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [page]);

  const renderPage = () => {
    switch (page) {
      case PAGES.tokyo:   return <TokyoPage setPage={setPage} />;
      case PAGES.izakaya: return <IzakayaPage setPage={setPage} />;
      case PAGES.chefday: return <ChefDayPage setPage={setPage} />;
      case PAGES.maui:    return <MauiPage setPage={setPage} />;
      case PAGES.about:   return <AboutPage setPage={setPage} />;
      case PAGES.contact: return <ContactPage setPage={setPage} />;
      default:            return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <GlobalStyle />
      <Cursor />
      <Nav setPage={setPage} />
      <main style={{ paddingTop: 80 }}>{renderPage()}</main>
    </>
  );
}