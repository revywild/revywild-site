import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Tokyo", "Maui", "About", "Contact"];

const PAGES = {
  home: "home",
  tokyo: "tokyo",
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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 1.4s cubic-bezier(0.19,1,0.22,1) ${delay}s, transform 1.4s cubic-bezier(0.19,1,0.22,1) ${delay}s`,
      }}
    >
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
      --black: #060606;
      --off-black: #0d0d0d;
      --charcoal: #1a1a1a;
      --mid: #2e2e2e;
      --muted: #555;
      --dim: #888;
      --silver: #b0b0b0;
      --near-white: #e8e8e8;
      --white: #f5f5f5;
      --accent: #c8b89a;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--black);
      color: var(--near-white);
      font-family: 'Montserrat', sans-serif;
      font-weight: 300;
      letter-spacing: 0.02em;
      cursor: none;
      overflow-x: hidden;
    }

    ::selection { background: var(--near-white); color: var(--black); }

    /* Custom cursor */
    .cursor {
      position: fixed;
      width: 8px; height: 8px;
      background: var(--near-white);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: transform 0.15s ease, opacity 0.3s ease;
      mix-blend-mode: difference;
    }
    .cursor-ring {
      position: fixed;
      width: 36px; height: 36px;
      border: 1px solid rgba(232,232,232,0.4);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      transition: transform 0.4s cubic-bezier(0.19,1,0.22,1), opacity 0.3s ease;
      mix-blend-mode: difference;
    }

    .serif { font-family: 'Cormorant Garamond', serif; }
    .italic { font-style: italic; }

    /* Horizontal rule */
    .rule {
      width: 100%; height: 1px;
      background: var(--charcoal);
    }
    .rule-sm {
      width: 40px; height: 1px;
      background: var(--dim);
    }

    /* Nav */
    nav {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 1000;
      display: flex; justify-content: space-between; align-items: center;
      padding: 28px 48px;
      mix-blend-mode: difference;
    }
    .nav-logo {
      font-family: 'Montserrat', sans-serif;
      font-size: 11px;
      font-weight: 500;
      letter-spacing: 0.35em;
      color: var(--white);
    }
    .nav-links {
      display: flex; gap: 36px;
      list-style: none;
    }
    .nav-links button {
      background: none; border: none; cursor: none;
      font-family: 'Montserrat', sans-serif;
      font-size: 10px;
      font-weight: 300;
      letter-spacing: 0.3em;
      color: var(--dim);
      text-transform: uppercase;
      transition: color 0.3s;
    }
    .nav-links button:hover { color: var(--white); }

    /* Sections */
    section { padding: 120px 48px; }
    @media (max-width: 768px) {
      nav { padding: 20px 24px; }
      .nav-links { gap: 20px; }
      section { padding: 80px 24px; }
    }

    /* Page transitions */
    .page-wrap {
      opacity: 0;
      animation: pageIn 0.8s cubic-bezier(0.19,1,0.22,1) forwards;
    }
    @keyframes pageIn {
      from { opacity: 0; transform: translateY(12px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Image placeholder */
    .img-placeholder {
      background: var(--charcoal);
      width: 100%; height: 100%;
      display: flex; align-items: center; justify-content: center;
      color: var(--muted);
      font-size: 10px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
    }

    /* Button */
    .btn-ghost {
      display: inline-flex; align-items: center; gap: 12px;
      background: none; border: none; cursor: none;
      font-family: 'Montserrat', sans-serif;
      font-size: 10px; font-weight: 400;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: var(--silver);
      padding: 0; padding-bottom: 6px;
      border-bottom: 1px solid var(--mid);
      transition: color 0.3s, border-color 0.3s, gap 0.3s;
    }
    .btn-ghost:hover { color: var(--white); border-color: var(--silver); gap: 20px; }

    .btn-solid {
      display: inline-block;
      background: var(--near-white);
      color: var(--black);
      font-family: 'Montserrat', sans-serif;
      font-size: 10px; font-weight: 500;
      letter-spacing: 0.3em;
      text-transform: uppercase;
      padding: 16px 36px;
      border: none; cursor: none;
      transition: background 0.3s, color 0.3s;
    }
    .btn-solid:hover { background: var(--accent); }

    /* Tags */
    .tag {
      display: inline-block;
      font-size: 9px; font-weight: 400;
      letter-spacing: 0.35em;
      text-transform: uppercase;
      color: var(--muted);
      border: 1px solid var(--charcoal);
      padding: 5px 12px;
    }

    /* Grain overlay */
    .grain::before {
      content: '';
      position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E");
      pointer-events: none; z-index: 9990; opacity: 0.6;
    }

    /* Number callout */
    .num {
      font-family: 'Cormorant Garamond', serif;
      font-size: 80px; font-weight: 300;
      line-height: 1;
      color: var(--charcoal);
    }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: var(--black); }
    ::-webkit-scrollbar-thumb { background: var(--mid); }
  `}</style>
);

/* ─── CURSOR ────────────────────────────── */
function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (dot.current) {
        dot.current.style.left = e.clientX - 4 + "px";
        dot.current.style.top = e.clientY - 4 + "px";
      }
      if (ring.current) {
        ring.current.style.left = e.clientX - 18 + "px";
        ring.current.style.top = e.clientY - 18 + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div className="cursor" ref={dot} />
      <div className="cursor-ring" ref={ring} />
    </>
  );
}

/* ─── NAV ───────────────────────────────── */
function Nav({ setPage }) {
  return (
    <nav>
      <button className="nav-logo" onClick={() => setPage(PAGES.home)} style={{ cursor: "none", background: "none", border: "none" }}>
        REVY WILD
      </button>
      <ul className="nav-links">
        {NAV_LINKS.map((l) => (
          <li key={l}>
            <button onClick={() => setPage(l.toLowerCase())}>{l}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

/* ─── HOME PAGE ─────────────────────────── */
function HomePage({ setPage }) {
  const [heroLoaded, setHeroLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="page-wrap grain">
      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", position: "relative", overflow: "hidden" }}>
        {/* Background image area */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, var(--black) 35%, transparent 100%)",
          zIndex: 1
        }} />
        <div style={{
          position: "absolute", right: 0, top: 0, width: "55%", height: "100%",
          background: "var(--off-black)",
          overflow: "hidden",
          zIndex: 0
        }}>
          {/* REPLACE src with your actual photo */}
          <img
            src="public/hero-revy.png"
            alt="Revy Wild"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", filter: "grayscale(100%) contrast(1.05)", opacity: 0.35,
              transform: heroLoaded ? "scale(1)" : "scale(1.06)",
              transition: "transform 3s cubic-bezier(0.19,1,0.22,1), opacity 2s ease"
            }}
          />
        </div>

        {/* Hero copy */}
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <div style={{
            opacity: heroLoaded ? 1 : 0,
            transform: heroLoaded ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 1.4s cubic-bezier(0.19,1,0.22,1) 0.3s, transform 1.4s cubic-bezier(0.19,1,0.22,1) 0.3s"
          }}>
            <p style={{ fontSize: 10, letterSpacing: "0.4em", color: "var(--muted)", marginBottom: 40, textTransform: "uppercase" }}>
              Maui · Tokyo
            </p>
            <h1 className="serif" style={{ fontSize: "clamp(56px, 8vw, 100px)", fontWeight: 300, lineHeight: 0.95, marginBottom: 40 }}>
              Some things<br />
              can't be found.<br />
              <span className="italic" style={{ color: "var(--silver)" }}>Only introduced.</span>
            </h1>
            <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, maxWidth: 380, marginBottom: 52, fontWeight: 300 }}>
              Network & hospitality operator based between Maui and Tokyo. After spending years finding the right places and the right people in the hospitality industry, I know who and what is worth your time.
            </p>
            <button className="btn-ghost" onClick={() => setPage(PAGES.tokyo)}>
              See how it works <span style={{ fontSize: 14 }}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <FadeIn>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          borderTop: "1px solid var(--charcoal)", borderBottom: "1px solid var(--charcoal)",
          padding: "0 48px"
        }}>
          {[
            ["$1M+", "Revenue Café & rentals, Maui"],
            ["47", "Prefectures traveled, staying only with locals"],
            ["100+", "Placed into FAANG"],
            ["200+", "Tokyo izakayas, vetted"],
          ].map(([n, label]) => (
            <div key={n} style={{ padding: "48px 0", borderRight: "1px solid var(--charcoal)" }}>
              <div className="serif" style={{ fontSize: 40, fontWeight: 300, color: "var(--near-white)", marginBottom: 8 }}>{n}</div>
              <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--muted)", textTransform: "uppercase" }}>{label}</div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* TWO WORLDS */}
      <section style={{ padding: "120px 48px" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, paddingBottom: 24, borderBottom: "1px solid var(--charcoal)" }}>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300 }}>
              Where I work.
            </h2>
            <p style={{ fontSize: 11, color: "var(--muted)", letterSpacing: "0.2em", textTransform: "uppercase", textAlign: "right" }}>
              Where I work
            </p>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {[
            {
              loc: "TOKYO, JP",
              title: "The Hidden Kitchen",
              desc: "Private sessions with Tokyo chefs — market, kitchen, table. Built on relationships I've spent years making.",
              tag: "Flagship Experience",
              page: PAGES.tokyo
            },
            {
              loc: "MAUI, HI",
              title: "The Sanctuary",
              desc: "Private stays in properties I own. I've been running hospitality here for years — the recommendations come with the stay.",
              tag: "Private Stays",
              page: PAGES.maui
            }
          ].map((item) => (
            <FadeIn key={item.loc}>
              <div
                onClick={() => setPage(item.page)}
                style={{
                  background: "var(--off-black)", padding: 52,
                  display: "flex", flexDirection: "column", gap: 24,
                  cursor: "none", transition: "background 0.3s",
                  minHeight: 420
                }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--charcoal)"}
                onMouseLeave={e => e.currentTarget.style.background = "var(--off-black)"}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase" }}>{item.loc}</span>
                  <span className="tag">{item.tag}</span>
                </div>
                <h3 className="serif" style={{ fontSize: 44, fontWeight: 300, lineHeight: 1.05, marginTop: "auto" }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.8 }}>{item.desc}</p>
                <button className="btn-ghost" style={{ alignSelf: "flex-start", marginTop: 16 }}>
                  Explore <span style={{ fontSize: 14 }}>→</span>
                </button>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* MANIFESTO */}
      <section style={{ padding: "100px 48px", background: "var(--off-black)" }}>
        <FadeIn>
          <div style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
            <div className="rule-sm" style={{ margin: "0 auto 48px" }} />
            <blockquote className="serif italic" style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 300, lineHeight: 1.3, color: "var(--near-white)", marginBottom: 40 }}>
              "Some things can't be found.<br />Only introduced."
            </blockquote>
            <p style={{ fontSize: 13, color: "var(--dim)", lineHeight: 1.9, maxWidth: 400, margin: "0 auto" }}>
              Restaurants with no English menus. Chefs who don't do bookings. Spots that have been there for twenty years with no presence online. I know where they are.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* SOCIAL PROOF / WHO THIS IS FOR */}
      <section style={{ padding: "120px 48px" }}>
        <FadeIn>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300, marginBottom: 64 }}>
            Who reaches out.
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}>
          {[
            { num: "01", title: "Founders & Executives", body: "Coming to Japan and want something that isn't a tour." },
            { num: "02", title: "Restaurateurs & Chefs", body: "Looking for genuine introductions into Japan's food world." },
            { num: "03", title: "Travelers", body: "Who've done the hotels and want what's harder to find." },
          ].map((item) => (
            <FadeIn key={item.num} delay={parseInt(item.num) * 0.1}>
              <div>
                <div className="num">{item.num}</div>
                <div className="rule" style={{ marginBottom: 24 }} />
                <h4 style={{ fontSize: 13, fontWeight: 400, letterSpacing: "0.1em", marginBottom: 14, color: "var(--near-white)" }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FOOTER CTA */}
      <section style={{ padding: "140px 48px", background: "var(--near-white)", color: "var(--black)", textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: 32, color: "#666" }}>Tokyo · Maui</p>
          <h2 className="serif italic" style={{ fontSize: "clamp(40px, 7vw, 96px)", fontWeight: 300, marginBottom: 48, color: "var(--black)", lineHeight: 0.9 }}>
            Let's talk.
          </h2>
          <button className="btn-solid" onClick={() => setPage(PAGES.contact)}>
            Reach out
          </button>
        </FadeIn>
      </section>

      <footer style={{ padding: "32px 48px", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--charcoal)" }}>
        <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase" }}>Revy Wild © 2025</span>
        <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>Tokyo · Maui</span>
      </footer>
    </div>
  );
}

/* ─── TOKYO PAGE ─────────────────────────── */
function TokyoPage({ setPage }) {
  return (
    <div className="page-wrap">
      {/* Hero */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", background: "var(--off-black)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--off-black) 40%, transparent)" }} />
        <img
          src="/public/tokyo.png"
          alt="Tokyo"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: 0.2 }}
        />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680 }}>
          <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 32 }}>Tokyo, Japan</span>
          <h1 className="serif" style={{ fontSize: "clamp(52px, 8vw, 96px)", fontWeight: 300, lineHeight: 0.95, marginBottom: 32 }}>
            The Hidden<br />
            <span className="italic" style={{ color: "var(--silver)" }}>Kitchen.</span>
          </h1>
          <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, maxWidth: 440 }}>
            A morning at the market with the chef, then their kitchen on their day off. Two guests. Ends at the table.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section style={{ padding: "120px 48px" }}>
        <FadeIn>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 80, paddingBottom: 24, borderBottom: "1px solid var(--charcoal)" }}>
            <h2 className="serif" style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300 }}>The Arc</h2>
            <span style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>How a session unfolds</span>
          </div>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 60 }}>
          {[
            { n: "I", title: "The Market", body: "Early morning with the chef — walking the market they've been going to for years, picking what they'll cook." },
            { n: "II", title: "The Kitchen", body: "Inside the restaurant on their day off. You watch how they actually work." },
            { n: "III", title: "The Table", body: "A meal from what was bought that morning. The chef stays and eats with you." },
          ].map((step) => (
            <FadeIn key={step.n} delay={0.1 * ["I","II","III"].indexOf(step.n)}>
              <div>
                <div className="serif" style={{ fontSize: 64, color: "var(--charcoal)", lineHeight: 1, marginBottom: 20 }}>{step.n}</div>
                <div className="rule" style={{ marginBottom: 24 }} />
                <h4 style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16, color: "var(--near-white)" }}>{step.title}</h4>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.9 }}>{step.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Who I partner with */}
      <section style={{ padding: "100px 48px", background: "var(--off-black)" }}>
        <FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <span className="tag" style={{ marginBottom: 32, display: "inline-block" }}>The Partner</span>
              <h2 className="serif" style={{ fontSize: "clamp(36px, 4vw, 60px)", fontWeight: 300, lineHeight: 1.1, marginBottom: 32 }}>
                Ten-year veterans.<br />
                <span className="italic" style={{ color: "var(--silver)" }}>Loyal regulars. No press.</span>
              </h2>
              <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9 }}>
                Restaurant owners who have been doing this for a decade, with the same suppliers and the same regulars. I've spent years building trust with them. That's what makes the introduction possible.
              </p>
            </div>
            <div style={{ aspectRatio: "3/4", background: "var(--charcoal)", overflow: "hidden" }}>
              {/* REPLACE with a photo of a Japanese kitchen / market */}
              <img
                src="/public/japankitchen.png"
                alt="Tokyo kitchen"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: 0.5 }}
              />
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Entry point & pricing */}
      <section style={{ padding: "120px 48px" }}>
        <FadeIn>
          <h2 className="serif" style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 300, marginBottom: 64 }}>How to begin.</h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
          {[
            {
              tag: "Entry Point",
              title: "The Izakaya Edit",
              price: "from $100",
              via: "Via Airbnb Experiences",
              body: "I've eaten at over 200 izakayas in Tokyo. This is the shortlist — places with no sign outside and no English menu.",
            },
            {
              tag: "Private Session",
              title: "The Hidden Kitchen",
              price: "from $750 / person",
              via: "By introduction only",
              body: "Market, kitchen, table. A half-day with a Tokyo chef, two guests maximum. Booked directly through me.",
            }
          ].map((item) => (
            <FadeIn key={item.title} delay={0.1}>
              <div style={{ background: "var(--off-black)", padding: 52, minHeight: 340 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
                  <span className="tag">{item.tag}</span>
                  <div style={{ textAlign: "right" }}>
                    <div className="serif" style={{ fontSize: 28, color: "var(--near-white)" }}>{item.price}</div>
                    <div style={{ fontSize: 9, letterSpacing: "0.25em", color: "var(--muted)", textTransform: "uppercase", marginTop: 4 }}>{item.via}</div>
                  </div>
                </div>
                <h3 className="serif" style={{ fontSize: 36, fontWeight: 300, marginBottom: 20 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.9 }}>{item.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.2}>
          <div style={{ marginTop: 48, display: "flex", justifyContent: "flex-end" }}>
            <button className="btn-ghost" onClick={() => setPage(PAGES.contact)}>
              Inquire about access <span style={{ fontSize: 14 }}>→</span>
            </button>
          </div>
        </FadeIn>
      </section>

      <footer style={{ padding: "32px 48px", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--charcoal)" }}>
        <button className="btn-ghost" onClick={() => setPage(PAGES.home)}>← Back</button>
        <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase" }}>Revy Wild · Tokyo</span>
      </footer>
    </div>
  );
}

/* ─── MAUI PAGE ─────────────────────────── */
function MauiPage({ setPage }) {
  return (
    <div className="page-wrap">
      <section style={{ minHeight: "85vh", display: "flex", alignItems: "flex-end", padding: "0 48px 80px", background: "var(--off-black)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--off-black) 50%, transparent)" }} />
        <img
          src="/public/maui.png"
          alt="Maui"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(100%)", opacity: 0.2 }}
        />
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
            <div style={{ display: "grid", gridTemplateRows: "auto auto", gap: 2 }}>
              {[
                { title: "Private Stays", body: "Properties I own and stand behind. Inquire directly." },
                { title: "Local Knowledge", body: "Where to eat, who to call, what to skip. Comes with the stay." },
                { title: "The Café", body: "Running for years, with supplier relationships going back just as long." },
              ].map((item) => (
                <div key={item.title} style={{ background: "var(--off-black)", padding: 32, marginBottom: 2 }}>
                  <h4 style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12, color: "var(--near-white)" }}>{item.title}</h4>
                  <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.8 }}>{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      <footer style={{ padding: "32px 48px", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--charcoal)" }}>
        <button className="btn-ghost" onClick={() => setPage(PAGES.home)}>← Back</button>
        <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase" }}>Revy Wild · Maui</span>
      </footer>
    </div>
  );
}

/* ─── ABOUT PAGE ─────────────────────────── */
function AboutPage({ setPage }) {
  return (
    <div className="page-wrap">
      <section style={{ minHeight: "100vh", padding: "160px 48px 120px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
        <div style={{ position: "sticky", top: 120 }}>
          <FadeIn>
            <div style={{ aspectRatio: "2/3", background: "var(--charcoal)", overflow: "hidden", marginBottom: 24 }}>
              {/* REPLACE with your actual photo */}
              <img
                src="public/hero-revy.png"
                alt="Rebecca Hsiao — Revy Wild"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "grayscale(100%)", opacity: 0.6 }}
              />
            </div>
            <p style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase" }}>
              Rebecca Hsiao · Revy Wild<br />
              <span style={{ color: "var(--dim)", display: "block", marginTop: 6 }}>交流・ホスピタリティ事業運営</span>
            </p>
          </FadeIn>
        </div>

        <div>
          <FadeIn>
            <h1 className="serif" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, lineHeight: 1, marginBottom: 60 }}>
              Rebecca Hsiao.<br />
              <span className="italic" style={{ color: "var(--silver)" }}>Revy Wild.</span>
            </h1>
          </FadeIn>

          {[
            {
              label: "Background",
              body: "Worked in tech. Left to build something I could own — a café in Maui, then properties. Over $1M in revenue and a clear sense of what good hospitality actually requires."
            },
            {
              label: "Tokyo",
              body: "N2 Japanese. Years of building relationships with restaurant owners and producers who don't have an English website. I'm the introduction for people who want that layer."
            },
            {
              label: "The Work",
              body: "Private stays in Maui. Private kitchen sessions in Tokyo. Both involve the same thing: knowing the right people and being trusted by them."
            },
          ].map((item, i) => (
            <FadeIn key={item.label} delay={i * 0.1}>
              <div style={{ marginBottom: 48, paddingBottom: 48, borderBottom: "1px solid var(--charcoal)" }}>
                <div className="rule-sm" style={{ marginBottom: 20 }} />
                <h4 style={{ fontSize: 10, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 16 }}>{item.label}</h4>
                <p style={{ fontSize: 15, color: "var(--silver)", lineHeight: 1.9, fontWeight: 300 }}>{item.body}</p>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={0.4}>
            <button className="btn-ghost" onClick={() => setPage(PAGES.contact)}>
              Reach out <span style={{ fontSize: 14 }}>→</span>
            </button>
          </FadeIn>
        </div>
      </section>

      <footer style={{ padding: "32px 48px", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--charcoal)" }}>
        <button className="btn-ghost" onClick={() => setPage(PAGES.home)}>← Back</button>
        <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase" }}>Revy Wild</span>
      </footer>
    </div>
  );
}

/* ─── CONTACT PAGE ─────────────────────────── */
function ContactPage({ setPage }) {
  const [formData, setFormData] = useState({ name: "", email: "", interest: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (formData.name && formData.email && formData.message) {
      setSent(true);
    }
  };

  const inputStyle = {
    background: "transparent",
    border: "none", borderBottom: "1px solid var(--mid)",
    color: "var(--near-white)",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: 13, fontWeight: 300,
    letterSpacing: "0.05em",
    padding: "16px 0",
    width: "100%",
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <div className="page-wrap">
      <section style={{ minHeight: "100vh", padding: "160px 48px 120px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>
        <FadeIn>
          <div>
            <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 32 }}>
              Get in touch
            </span>
            <h1 className="serif" style={{ fontSize: "clamp(40px, 5vw, 72px)", fontWeight: 300, lineHeight: 1, marginBottom: 40 }}>
              Get in touch.
            </h1>
            <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9, maxWidth: 380, marginBottom: 60 }}>
              Tell me what you're looking for. The more specific, the better.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                ["Email", "contact@revywild.com"],
                ["Instagram", "@revywild"],
                ["Based", "Tokyo · Maui"],
              ].map(([label, val]) => (
                <div key={label} style={{ display: "flex", gap: 20, alignItems: "center" }}>
                  <span style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase", minWidth: 80 }}>{label}</span>
                  <span style={{ fontSize: 13, color: "var(--silver)" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={0.2}>
          {sent ? (
            <div style={{ paddingTop: 40 }}>
              <div className="serif italic" style={{ fontSize: 48, color: "var(--silver)", marginBottom: 24 }}>Received.</div>
              <p style={{ fontSize: 14, color: "var(--dim)", lineHeight: 1.9 }}>
                I'll be in touch if there's a fit. Thank you for being specific.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 36, paddingTop: 40 }}>
              {[
                { key: "name", label: "Your name", type: "text" },
                { key: "email", label: "Email address", type: "email" },
                { key: "interest", label: "Tokyo / Maui / Both", type: "text" },
              ].map((field) => (
                <div key={field.key}>
                  <label style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                    {field.label}
                  </label>
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
                <label style={{ fontSize: 9, letterSpacing: "0.3em", color: "var(--muted)", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
                  What you're looking for
                </label>
                <textarea
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  style={{ ...inputStyle, resize: "none", borderBottom: "1px solid var(--mid)" }}
                  onFocus={e => e.target.style.borderBottomColor = "var(--silver)"}
                  onBlur={e => e.target.style.borderBottomColor = "var(--mid)"}
                />
              </div>
              <button className="btn-solid" onClick={handleSubmit} style={{ alignSelf: "flex-start", cursor: "none" }}>
                Send
              </button>
            </div>
          )}
        </FadeIn>
      </section>

      <footer style={{ padding: "32px 48px", display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--charcoal)" }}>
        <button className="btn-ghost" onClick={() => setPage(PAGES.home)}>← Back</button>
        <span style={{ fontSize: 9, letterSpacing: "0.4em", color: "var(--muted)", textTransform: "uppercase" }}>Revy Wild</span>
      </footer>
    </div>
  );
}

/* ─── APP ───────────────────────────────── */
export default function App() {
  const [page, setPage] = useState(PAGES.home);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [page]);

  const renderPage = () => {
    switch (page) {
      case PAGES.tokyo: return <TokyoPage setPage={setPage} />;
      case PAGES.maui: return <MauiPage setPage={setPage} />;
      case PAGES.about: return <AboutPage setPage={setPage} />;
      case PAGES.contact: return <ContactPage setPage={setPage} />;
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <GlobalStyle />
      <Cursor />
      <Nav setPage={setPage} />
      <main style={{ paddingTop: 80 }}>
        {renderPage()}
      </main>
    </>
  );
}
