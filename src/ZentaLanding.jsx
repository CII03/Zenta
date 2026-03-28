import { useState, useEffect, useRef } from "react";

const FEATURES = [
  {
    icon: "⚡",
    title: "Instant Transfers",
    desc: "Send money across 50+ countries in under 3 seconds. No delays, no excuses.",
  },
  {
    icon: "🔒",
    title: "Bank-Grade Security",
    desc: "256-bit encryption, biometric auth, and real-time fraud detection on every transaction.",
  },
  {
    icon: "💱",
    title: "Live FX Rates",
    desc: "Exchange at interbank rates with zero hidden markups. What you see is what you pay.",
  },
  {
    icon: "📊",
    title: "Spend Analytics",
    desc: "Visualise where your money goes with intelligent categorisation and monthly reports.",
  },
  {
    icon: "🌍",
    title: "Multi-Currency Wallets",
    desc: "Hold, convert, and spend in USD, EUR, GBP, NGN and 30+ currencies simultaneously.",
  },
  {
    icon: "🤝",
    title: "Business API",
    desc: "Integrate Zenta payments into your product in minutes with our developer-first REST API.",
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "$0",
    period: "forever",
    desc: "For individuals getting started with global payments.",
    features: ["5 transfers/month", "2 currency wallets", "Standard FX rates", "Email support"],
    cta: "Get Started Free",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$19",
    period: "per month",
    desc: "For freelancers and small teams moving money regularly.",
    features: ["Unlimited transfers", "10 currency wallets", "Interbank FX rates", "Priority support", "Spend analytics", "Team members (up to 5)"],
    cta: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Business",
    price: "$79",
    period: "per month",
    desc: "For companies with serious cross-border payment volume.",
    features: ["Everything in Growth", "Unlimited wallets", "API access", "Custom FX agreements", "Dedicated account manager", "SLA guarantee"],
    cta: "Contact Sales",
    highlight: false,
  },
];

const TESTIMONIALS = [
  {
    quote: "Zenta cut our international payroll time from 3 days to 20 minutes. It's the only tool we actually kept.",
    name: "Amara Osei",
    role: "CFO, BrightLayer Studios",
    avatar: "AO",
  },
  {
    quote: "As a freelancer billing clients in the US and EU, Zenta saves me hundreds of dollars a month in FX fees alone.",
    name: "Raj Mehta",
    role: "Independent Product Designer",
    avatar: "RM",
  },
  {
    quote: "The API documentation is genuinely good. We integrated Zenta into our checkout in an afternoon.",
    name: "Lena Fischer",
    role: "CTO, Shopmatic",
    avatar: "LF",
  },
];

const TICKER_ITEMS = [
  "USD → NGN  ₦1,612.40",
  "GBP → EUR  €1.1724",
  "USD → GHS  ₵15.82",
  "EUR → KES  KSh 142.30",
  "USD → ZAR  R18.64",
  "GBP → NGN  ₦2,035.10",
  "USD → EGP  E£49.12",
];

const NAV_LINKS = ["Features", "Pricing", "Testimonials"];


function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}


function MockCard() {
  const [amount, setAmount] = useState(500);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("NGN");
  const rates = { "USD-NGN": 1612.4, "USD-GBP": 0.787, "USD-EUR": 0.921, "GBP-NGN": 2035.1, "EUR-NGN": 1750.2 };
  const key = `${from}-${to}`;
  const revKey = `${to}-${from}`;
  const rate = rates[key] || (rates[revKey] ? 1 / rates[revKey] : 1);
  const converted = (amount * rate).toLocaleString("en-US", { maximumFractionDigits: 2 });

  return (
    <div style={{
      background: "linear-gradient(135deg, #1a1f1a 0%, #0d110d 100%)",
      border: "1px solid #00ff8830",
      borderRadius: 16,
      padding: "28px 28px 24px",
      width: "100%",
      maxWidth: 340,
      boxShadow: "0 0 60px #00ff8815, 0 24px 48px #00000060",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -40, right: -40, width: 140, height: 140, background: "#00ff8818", borderRadius: "50%", filter: "blur(40px)", pointerEvents: "none" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <span style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "#00ff88", fontWeight: 600 }}>Live Transfer</span>
        <span style={{ fontSize: 11, color: "#4a5a4a", letterSpacing: "0.06em" }}>⚡ 2.4s avg</span>
      </div>

      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 11, color: "#4a5a4a", marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>You send</p>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            type="number"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
            style={{ flex: 1, background: "#ffffff08", border: "1px solid #00ff8825", borderRadius: 8, padding: "10px 14px", fontSize: 22, fontWeight: 700, color: "#f0f0f0", fontFamily: "inherit", outline: "none", width: 0 }}
          />
          <select value={from} onChange={e => setFrom(e.target.value)}
            style={{ background: "#ffffff08", border: "1px solid #00ff8825", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#f0f0f0", fontFamily: "inherit", outline: "none", cursor: "pointer" }}>
            {["USD", "GBP", "EUR"].map(c => <option key={c} value={c} style={{ background: "#111" }}>{c}</option>)}
          </select>
        </div>
      </div>

      <div style={{ textAlign: "center", margin: "12px 0", color: "#00ff88", fontSize: 18 }}>⇅</div>

      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 11, color: "#4a5a4a", marginBottom: 8, letterSpacing: "0.08em", textTransform: "uppercase" }}>They receive</p>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ flex: 1, background: "#00ff8810", border: "1px solid #00ff8830", borderRadius: 8, padding: "10px 14px", fontSize: 22, fontWeight: 700, color: "#00ff88" }}>
            {converted}
          </div>
          <select value={to} onChange={e => setTo(e.target.value)}
            style={{ background: "#ffffff08", border: "1px solid #00ff8825", borderRadius: 8, padding: "10px 12px", fontSize: 13, color: "#f0f0f0", fontFamily: "inherit", outline: "none", cursor: "pointer" }}>
            {["NGN", "GBP", "EUR", "GHS", "KES"].map(c => <option key={c} value={c} style={{ background: "#111" }}>{c}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20, padding: "12px 0", borderTop: "1px solid #ffffff08" }}>
        <span style={{ fontSize: 12, color: "#4a5a4a" }}>Rate</span>
        <span style={{ fontSize: 12, color: "#a0b0a0", fontWeight: 500 }}>1 {from} = {rate.toLocaleString("en-US", { maximumFractionDigits: 4 })} {to}</span>
      </div>

      <button style={{
        width: "100%", padding: "14px", background: "#00ff88", color: "#050905",
        border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700,
        cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em",
        transition: "opacity 0.2s ease",
      }}
        onMouseEnter={e => e.target.style.opacity = 0.88}
        onMouseLeave={e => e.target.style.opacity = 1}
      >
        Send Now →
      </button>
    </div>
  );
}

export default function ZentaLanding() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [featRef, featInView] = useInView();
  const [pricingRef, pricingInView] = useInView();
  const [testimonialsRef, testimonialsInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "#080c08", color: "#e8ede8", minHeight: "100vh", fontFamily: "'Instrument Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Instrument+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #00ff88; color: #050905; }

        .z-fade { opacity: 0; transform: translateY(30px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .z-fade.in { opacity: 1; transform: none; }
        .z-fade.d1 { transition-delay: 0.05s; }
        .z-fade.d2 { transition-delay: 0.15s; }
        .z-fade.d3 { transition-delay: 0.25s; }
        .z-fade.d4 { transition-delay: 0.35s; }
        .z-fade.d5 { transition-delay: 0.45s; }
        .z-fade.d6 { transition-delay: 0.55s; }

        .feat-card {
          border: 1px solid #1a221a;
          border-radius: 12px;
          padding: 32px 28px;
          background: #0c100c;
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .feat-card:hover {
          border-color: #00ff8840;
          transform: translateY(-4px);
          box-shadow: 0 8px 32px #00ff8810;
        }

        .pricing-card {
          border: 1px solid #1a221a;
          border-radius: 16px;
          padding: 36px 32px;
          background: #0c100c;
          transition: transform 0.3s ease;
          position: relative;
        }
        .pricing-card:hover { transform: translateY(-4px); }
        .pricing-card.highlight {
          border-color: #00ff88;
          background: #0a130a;
          box-shadow: 0 0 40px #00ff8818;
        }

        .testi-card {
          border: 1px solid #1a221a;
          border-radius: 12px;
          padding: 32px;
          background: #0c100c;
        }

        .btn-green {
          display: inline-block;
          background: #00ff88;
          color: #050905;
          padding: 14px 32px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.03em;
          cursor: pointer;
          border: none;
          font-family: inherit;
          transition: opacity 0.2s ease, transform 0.2s ease;
          text-decoration: none;
        }
        .btn-green:hover { opacity: 0.88; transform: translateY(-1px); }

        .btn-ghost {
          display: inline-block;
          background: transparent;
          color: #e8ede8;
          padding: 13px 30px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.03em;
          cursor: pointer;
          border: 1px solid #2a362a;
          font-family: inherit;
          transition: border-color 0.2s ease, background 0.2s ease;
          text-decoration: none;
        }
        .btn-ghost:hover { border-color: #00ff8860; background: #00ff8808; }

        /* ticker */
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-track { display: flex; animation: tickerScroll 22s linear infinite; width: max-content; }
        .ticker-track:hover { animation-play-state: paused; }

        /* grid bg */
        .grid-bg {
          background-image:
            linear-gradient(#00ff8806 1px, transparent 1px),
            linear-gradient(90deg, #00ff8806 1px, transparent 1px);
          background-size: 48px 48px;
        }

        /* noise overlay */
        .noise::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .nav-link {
          background: none; border: none; cursor: pointer;
          font-size: 13px; font-family: inherit; color: #8a9a8a;
          letter-spacing: 0.06em; text-transform: uppercase; font-weight: 500;
          transition: color 0.2s ease;
          padding: 4px 0;
        }
        .nav-link:hover { color: #e8ede8; }

        .check { color: #00ff88; margin-right: 10px; }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .feat-grid { grid-template-columns: 1fr !important; }
          .pricing-grid { grid-template-columns: 1fr !important; }
          .testi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px",
        background: scrolled ? "rgba(8,12,8,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid #1a221a" : "1px solid transparent",
        transition: "all 0.4s ease",
      }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "-0.02em" }}>
          Zenta<span style={{ color: "#00ff88" }}>.</span>
        </span>

        <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
          {NAV_LINKS.map(l => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l.toLowerCase())}>{l}</button>
          ))}
          <button className="btn-green" style={{ padding: "9px 22px", fontSize: 13 }}>Get Started</button>
        </div>
      </nav>

      <section className="grid-bg noise" style={{ position: "relative", padding: "140px 48px 100px", maxWidth: 1160, margin: "0 auto" }}>

        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "#00ff8812", borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none" }} />

        <div className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#00ff8812", border: "1px solid #00ff8830", borderRadius: 999, padding: "6px 16px", marginBottom: 32 }}>
              <span style={{ width: 6, height: 6, background: "#00ff88", borderRadius: "50%", display: "inline-block" }} />
              <span style={{ fontSize: 12, color: "#00ff88", letterSpacing: "0.08em", fontWeight: 600, textTransform: "uppercase" }}>Now live in 50+ countries</span>
            </div>

            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              marginBottom: 24,
            }}>
              Move Money<br />
              <span style={{ color: "#00ff88" }}>Anywhere.</span><br />
              Instantly.
            </h1>

            <p style={{ fontSize: 17, lineHeight: 1.75, color: "#7a8a7a", fontWeight: 300, maxWidth: 420, marginBottom: 40 }}>
              Zenta is the payments infrastructure for the modern world — send, receive, and hold money across borders at real exchange rates with zero hidden fees.
            </p>

            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <button className="btn-green">Start for Free →</button>
              <button className="btn-ghost">See how it works</button>
            </div>

            <div style={{ display: "flex", gap: 32, marginTop: 48 }}>
              {[["$2.4B+", "Processed monthly"], ["180ms", "Avg transfer time"], ["99.99%", "Uptime SLA"]].map(([val, label]) => (
                <div key={label}>
                  <p style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: "#e8ede8", letterSpacing: "-0.02em" }}>{val}</p>
                  <p style={{ fontSize: 12, color: "#4a5a4a", letterSpacing: "0.06em", marginTop: 2 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <MockCard />
          </div>
        </div>
      </section>

      <div style={{ borderTop: "1px solid #1a221a", borderBottom: "1px solid #1a221a", padding: "14px 0", overflow: "hidden", background: "#0a0e0a" }}>
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ fontSize: 12, color: "#4a6a4a", letterSpacing: "0.1em", fontWeight: 500, marginRight: 60, whiteSpace: "nowrap", fontFamily: "'Syne', sans-serif" }}>
              <span style={{ color: "#00ff88", marginRight: 8 }}>◆</span>{item}
            </span>
          ))}
        </div>
      </div>

      <section id="features" ref={featRef} style={{ padding: "100px 48px", maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className={`z-fade d1 ${featInView ? "in" : ""}`} style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00ff88", marginBottom: 16, fontWeight: 600 }}>
            Why Zenta
          </p>
          <h2 className={`z-fade d2 ${featInView ? "in" : ""}`} style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Built for the speed<br />of modern business
          </h2>
        </div>

        <div className="feat-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <div key={f.title} className={`feat-card z-fade d${i + 1} ${featInView ? "in" : ""}`}>
              <div style={{ fontSize: 28, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 17, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>{f.title}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.75, color: "#6a7a6a", fontWeight: 300 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" ref={pricingRef} style={{ padding: "100px 48px", maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className={`z-fade d1 ${pricingInView ? "in" : ""}`} style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00ff88", marginBottom: 16, fontWeight: 600 }}>
            Pricing
          </p>
          <h2 className={`z-fade d2 ${pricingInView ? "in" : ""}`} style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Transparent pricing.<br />No surprises.
          </h2>
        </div>

        <div className="pricing-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "start" }}>
          {PRICING.map((p, i) => (
            <div key={p.name} className={`pricing-card z-fade d${i + 2} ${pricingInView ? "in" : ""} ${p.highlight ? "highlight" : ""}`}>
              {p.highlight && (
                <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: "#00ff88", color: "#050905", fontSize: 11, fontWeight: 700, padding: "4px 16px", borderRadius: 999, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                  MOST POPULAR
                </div>
              )}
              <p style={{ fontSize: 13, color: "#6a7a6a", fontWeight: 500, letterSpacing: "0.06em", marginBottom: 16 }}>{p.name.toUpperCase()}</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, marginBottom: 8 }}>
                <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, letterSpacing: "-0.03em", color: p.highlight ? "#00ff88" : "#e8ede8" }}>{p.price}</span>
                <span style={{ fontSize: 13, color: "#4a5a4a", marginBottom: 8 }}>/ {p.period}</span>
              </div>
              <p style={{ fontSize: 13, color: "#4a5a4a", lineHeight: 1.65, marginBottom: 28, fontWeight: 300 }}>{p.desc}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                {p.features.map(f => (
                  <span key={f} style={{ fontSize: 14, color: "#a0b0a0" }}>
                    <span className="check">✓</span>{f}
                  </span>
                ))}
              </div>
              <button className={p.highlight ? "btn-green" : "btn-ghost"} style={{ width: "100%", textAlign: "center" }}>{p.cta}</button>
            </div>
          ))}
        </div>
      </section>

      <section id="testimonials" ref={testimonialsRef} style={{ padding: "100px 48px", maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className={`z-fade d1 ${testimonialsInView ? "in" : ""}`} style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00ff88", marginBottom: 16, fontWeight: 600 }}>
            Testimonials
          </p>
          <h2 className={`z-fade d2 ${testimonialsInView ? "in" : ""}`} style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1 }}>
            Trusted by thousands<br />of businesses worldwide
          </h2>
        </div>

        <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={`testi-card z-fade d${i + 2} ${testimonialsInView ? "in" : ""}`}>
              <p style={{ fontSize: 14, lineHeight: 1.85, color: "#8a9a8a", fontWeight: 300, marginBottom: 28, fontStyle: "italic" }}>"{t.quote}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#00ff8820", border: "1px solid #00ff8840", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#00ff88", flexShrink: 0 }}>
                  {t.avatar}
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 600, color: "#e8ede8" }}>{t.name}</p>
                  <p style={{ fontSize: 12, color: "#4a5a4a", marginTop: 2 }}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section ref={ctaRef} style={{ padding: "80px 48px 120px", maxWidth: 1160, margin: "0 auto" }}>
        <div
          className={`z-fade d1 ${ctaInView ? "in" : ""}`}
          style={{
            background: "linear-gradient(135deg, #0d1a0d 0%, #0a120a 100%)",
            border: "1px solid #00ff8830",
            borderRadius: 20,
            padding: "80px 60px",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 0 80px #00ff8810",
          }}
        >
          <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 400, height: 200, background: "#00ff8815", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none" }} />

          <p style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#00ff88", marginBottom: 20, fontWeight: 600 }}>Get started today</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}>
            The world doesn't wait.<br />Your payments shouldn't either.
          </h2>
          <p style={{ fontSize: 16, color: "#6a7a6a", fontWeight: 300, marginBottom: 40, maxWidth: 420, margin: "0 auto 40px" }}>
            Join 40,000+ businesses already moving money smarter with Zenta.
          </p>

          {submitted ? (
            <p style={{ color: "#00ff88", fontWeight: 600, fontSize: 16 }}>✓ You're on the list — we'll be in touch!</p>
          ) : (
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <input
                type="email"
                placeholder="Enter your work email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{ background: "#ffffff08", border: "1px solid #2a362a", borderRadius: 8, padding: "13px 20px", fontSize: 14, color: "#e8ede8", fontFamily: "inherit", outline: "none", width: 280 }}
              />
              <button className="btn-green" onClick={() => email && setSubmitted(true)}>Request Early Access</button>
            </div>
          )}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid #1a221a", padding: "36px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, letterSpacing: "-0.02em" }}>
          Zenta<span style={{ color: "#00ff88" }}>.</span>
        </span>
        <span style={{ fontSize: 12, color: "#2a3a2a" }}>© 2025 Zenta Technologies Inc. All rights reserved.</span>
        <div style={{ display: "flex", gap: 28 }}>
          {["Privacy", "Terms", "Security", "Status"].map(l => (
            <a key={l} href="#" style={{ fontSize: 12, color: "#3a4a3a", textDecoration: "none", letterSpacing: "0.06em", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#8a9a8a"}
              onMouseLeave={e => e.target.style.color = "#3a4a3a"}>
              {l}
            </a>
          ))}
        </div>
      </footer>
    </div>
  );
}
