"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// ---------- content data ----------
const NAV_ITEMS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "life", label: "Life" },
  { id: "contact", label: "Contact" },
];

const STATS = [
  { n: "10M+", l: "Claims processed" },
  { n: "$2.3B", l: "Anomalies surfaced" },
  { n: "40%", l: "Lift over baseline" },
  { n: "1,707", l: "LinkedIn followers" },
];

const SKILLS_MARQUEE = [
  "Databricks", "PySpark", "AWS", "dbt", "Python", "SQL",
  "Delta Lake", "FastAPI", "Airflow", "Snowflake", "Azure",
  "XGBoost", "SHAP", "Dagster", "FAISS", "LLMs",
];

const PROJECTS = [
  {
    id: "billingshield",
    tag: "In progress",
    tagStyle: "accent" as const,
    meta: "2026 — Solo · 10 weeks",
    title: "BillingShield — a healthcare payment-integrity platform, built end-to-end.",
    body: "Full medallion pipeline on CMS Medicare data — 10M+ provider-procedure claims flowing through Bronze → Silver → Gold Delta tables on Databricks, a PySpark + dbt transformation layer, an XGBoost fraud classifier with SHAP explanations, served through FastAPI and a Streamlit dashboard.",
    calloutLabel: "The decision I'd defend",
    calloutColor: "#E8A87C",
    calloutText: "Splitting train/test at the NPI level, not the row level. Row-level splits leak provider identity and inflate accuracy 10+ points. The kind of thing that looks fine in a notebook and breaks in production.",
    stack: ["Databricks", "PySpark", "dbt", "Delta Lake", "XGBoost", "SHAP", "FastAPI", "Streamlit", "Dagster"],
    link: "https://github.com/VedantVAchole/billing-shield",
    linkLabel: "Read on GitHub",
    visual: { type: "image", src: "/projects/billingshield-architecture.svg", alt: "BillingShield end-to-end architecture diagram" },
    featured: true,
  },
  {
    id: "claims",
    tag: "Shipped",
    tagStyle: "neutral" as const,
    meta: "2026 — Solo · 3 weeks",
    title: "Healthcare claims analytics — AWS medallion on Parquet.",
    body: "Production ELT on AWS Glue (PySpark) across four normalized claims tables. Joined data, applied window functions for provider rankings, computed derived fields, and delivered six Gold-layer KPIs in Parquet — with sub-second Athena query performance on large-scale claims.",
    calloutLabel: "The quiet win",
    calloutColor: "#FFFFFF",
    calloutText: "Automated schema detection via Glue Crawlers cataloged 10 tables. That's the kind of plumbing nobody notices until it isn't there — and it's where most pipelines rot.",
    stack: ["AWS Glue", "PySpark", "S3", "Athena", "Parquet", "Medallion"],
    link: "https://github.com/VedantVAchole/healthcare-claims-pipeline",
    linkLabel: "Read on GitHub",
    visual: { type: "svg-flow" as const },
    featured: false,
  },
  {
    id: "rag",
    tag: "Case study",
    tagStyle: "outline" as const,
    meta: "2025 — Solo · 2 weeks",
    title: "LLM-powered resume matching, demoed to CGI senior leadership.",
    body: "Built an end-to-end RAG pipeline — dense vector search in FAISS plus GPT-4 re-ranking — to semantically match 3,000 candidate profiles against open roles. Live proof-of-concept to CGI senior leadership: 40% improvement in candidate relevance over keyword ATS.",
    calloutLabel: "What I kept",
    calloutColor: "#C38D9E",
    calloutText: "The code is archived. What I kept is the lesson that AI in enterprise is a communication problem as much as a technical one. A model that doesn't explain itself is a model nobody adopts.",
    stack: ["OpenAI GPT-4", "FAISS", "RAG", "HuggingFace", "Sentence Transformers"],
    link: null,
    linkLabel: "Code archived · Case study only",
    visual: { type: "svg-vector" as const },
    featured: false,
  },
];

const LIFE_INTERESTS = [
  { i: "i.", t: "F1 race data — building a telemetry-analysis side project to sit alongside BillingShield." },
  { i: "ii.", t: "Cricket league in Louisiana. Saturdays are sacred — catch my practice shorts on YouTube." },
  { i: "iii.", t: "Push/pull/legs split, 2,200 kcal, eggetarian and protein-obsessed." },
  { i: "iv.", t: "Kimball's Data Warehouse Toolkit. Still relevant in 2026." },
];

// ---------- sub-components ----------

function StatusDot() {
  return (
    <div className="relative flex items-center justify-center w-2 h-2">
      <span className="absolute w-2 h-2 rounded-full accent-bg pulse-ring"></span>
      <span className="relative w-1.5 h-1.5 rounded-full accent-bg pulse-dot"></span>
    </div>
  );
}

function Tag({ children, style }: { children: React.ReactNode; style: "accent" | "neutral" | "outline" }) {
  const base = "mono text-[10px] tracking-[0.25em] uppercase px-3 py-1.5 rounded-full";
  if (style === "accent") {
    return (
      <span
        className={base}
        style={{ background: "linear-gradient(135deg, #E8A87C 0%, #C38D9E 100%)", color: "#08080A", fontWeight: 500 }}
      >
        {children}
      </span>
    );
  }
  if (style === "neutral") {
    return (
      <span className={base} style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#B0B0B8" }}>
        {children}
      </span>
    );
  }
  return (
    <span className={base} style={{ border: "1px solid rgba(255,255,255,0.15)", color: "#8A8A94" }}>
      {children}
    </span>
  );
}

function BronzeSilverGoldFlow() {
  return (
    <svg viewBox="0 0 400 500" className="w-full h-full">
      <defs>
        <marker id="flow-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#E8A87C" />
        </marker>
      </defs>

      <text x="32" y="50" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6A6A74" letterSpacing="3">AWS GLUE PIPELINE</text>

      {[
        { y: 80, label: "S3", sub: "raw claims · 4 tables" },
        { y: 170, label: "Glue + PySpark", sub: "join · window fn · rank" },
        { y: 260, label: "Athena", sub: "sub-second queries" },
      ].map((box, i) => (
        <g key={i}>
          <rect x="80" y={box.y} width="240" height="54" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
          <text x="100" y={box.y + 26} fontFamily="Instrument Serif, serif" fontSize="18" fill="#FAFAFA" fontStyle="italic">{box.label}</text>
          <text x="100" y={box.y + 42} fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#6A6A74" letterSpacing="1">{box.sub}</text>
        </g>
      ))}

      <path d="M 200 134 L 200 168" stroke="#E8A87C" strokeWidth="1.5" markerEnd="url(#flow-arrow)" />
      <path d="M 200 224 L 200 258" stroke="#E8A87C" strokeWidth="1.5" markerEnd="url(#flow-arrow)" />

      <line x1="32" y1="340" x2="368" y2="340" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <text x="32" y="360" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6A6A74" letterSpacing="3">SIX GOLD KPIs</text>

      {[
        "01 — 229 flagged claims · $25M+",
        "02 — $88.9M cancer treatment",
        "03 — 193 critical risk patients",
        "04 — top 1% high-cost claims",
        "05 — provider rankings",
        "06 — regional exposure",
      ].map((t, i) => (
        <text key={i} x="32" y={390 + i * 18} fontFamily="JetBrains Mono, monospace" fontSize="11" fill="#B0B0B8">{t}</text>
      ))}
    </svg>
  );
}

function VectorScatter() {
  return (
    <svg viewBox="0 0 400 500" className="w-full h-full">
      <defs>
        <linearGradient id="accentGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E8A87C" />
          <stop offset="100%" stopColor="#C38D9E" />
        </linearGradient>
      </defs>

      <text x="32" y="50" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6A6A74" letterSpacing="3">VECTOR SPACE</text>

      <text x="32" y="100" fontFamily="Instrument Serif, serif" fontSize="28" fill="#FAFAFA" fontStyle="italic">query</text>
      <line x1="130" y1="90" x2="280" y2="90" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeDasharray="3,4" />
      <text x="290" y="100" fontFamily="Instrument Serif, serif" fontSize="28" fontStyle="italic" fill="url(#accentGrad2)">match</text>

      {Array.from({ length: 60 }).map((_, i) => {
        const seed = (i * 137.5) % 360;
        const x = 50 + (i % 10) * 32 + ((seed % 7) - 3) * 3;
        const y = 160 + Math.floor(i / 10) * 32 + ((seed % 5) - 2) * 3;
        const isMatch = [22, 33, 44].includes(i);
        return (
          <circle key={i} cx={x} cy={y} r={isMatch ? 5 : 2} fill={isMatch ? "url(#accentGrad2)" : "rgba(255,255,255,0.25)"} />
        );
      })}

      <line x1="96" y1="192" x2="176" y2="224" stroke="#E8A87C" strokeWidth="0.5" opacity="0.5" />
      <line x1="176" y1="224" x2="240" y2="256" stroke="#C38D9E" strokeWidth="0.5" opacity="0.5" />

      <line x1="32" y1="380" x2="368" y2="380" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
      <text x="32" y="405" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#6A6A74" letterSpacing="2">FAISS · 3K VECTORS · TOP-K RERANK</text>
      <text x="32" y="440" fontFamily="Instrument Serif, serif" fontSize="32" fontStyle="italic" fill="url(#accentGrad2)">40%</text>
      <text x="32" y="465" fontFamily="JetBrains Mono, monospace" fontSize="10" fill="#B0B0B8" letterSpacing="2">LIFT OVER KEYWORD ATS</text>
    </svg>
  );
}

// ---------- main page ----------

export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    const onMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            const id = entry.target.getAttribute("data-section");
            if (id) setActiveSection(id);
          }
        });
      },
      { threshold: 0.15, rootMargin: "-10% 0px -10% 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    document.querySelectorAll("[data-section]").forEach((el) => io.observe(el));

    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouse);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      io.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen w-full relative overflow-x-hidden noise bg-ink-950 text-ink-50">
      {/* Ambient mouse glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-30 blur-[120px] transition-all duration-700 ease-out"
          style={{
            background:
              "radial-gradient(circle, rgba(232,168,124,0.4), rgba(195,141,158,0.15) 40%, transparent 70%)",
            left: `calc(${mouse.x}% - 400px)`,
            top: `calc(${mouse.y}% - 400px)`,
          }}
        />
      </div>

      {/* ==================== NAV ==================== */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(8, 8, 10, 0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255, 255, 255, 0.06)" : "1px solid transparent",
        }}
      >
        <div className="max-w-shell mx-auto px-6 md:px-10 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 flex items-center justify-center accent-bg rounded-md overflow-hidden">
              <span className="serif text-lg italic text-black relative z-10">V</span>
            </div>
            <span className="mono text-[11px] tracking-[0.2em] uppercase font-medium hidden sm:inline">
              Vedant Achole
            </span>
          </a>

          <div className="flex items-center gap-6 md:gap-10">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link mono text-[11px] tracking-[0.2em] uppercase hidden md:inline ${activeSection === item.id ? "active" : ""}`}
                style={{ color: activeSection === item.id ? "#FAFAFA" : "#8A8A94" }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/Vedant_Achole_Resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="mono text-[11px] tracking-[0.2em] uppercase hidden md:inline"
              style={{ color: "#8A8A94" }}
            >
              Résumé ↗
            </a>
            <a
              href="mailto:vedant4815@gmail.com"
              className="mono text-[11px] tracking-[0.2em] uppercase px-4 py-2 rounded-md transition-all hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #E8A87C 0%, #C38D9E 100%)",
                color: "#08080A",
                fontWeight: 500,
              }}
            >
              Say Hi →
            </a>
          </div>
        </div>
      </nav>

      {/* ==================== HERO ==================== */}
      <section
        id="top"
        data-section="top"
        className="relative min-h-screen flex items-center bg-grid pt-32 pb-24 px-6 md:px-10"
      >
        <div className="max-w-shell mx-auto w-full relative z-10">
          <div className="grid md:grid-cols-12 gap-10 items-center">
            {/* text column */}
            <div className="md:col-span-8">
              <div data-reveal className="flex items-center gap-3 mb-8">
                <StatusDot />
                <span className="mono text-[11px] tracking-[0.25em] uppercase text-ink-500">
                  Available July 2026 &nbsp;·&nbsp; NYC / Boston / Seattle / Remote
                </span>
              </div>

              <h1
                data-reveal
                data-reveal-delay="1"
                className="serif font-light leading-[0.9] tracking-tight mb-10"
                style={{ fontSize: "clamp(2.5rem, 7vw, 6.5rem)" }}
              >
                Data &amp; AI engineer
                <br />
                building systems that{" "}
                <span className="serif italic accent-text">ship and survive</span>
                <span className="cursor accent-text ml-1">_</span>
              </h1>

              <p
                data-reveal
                data-reveal-delay="2"
                className="text-base md:text-lg leading-[1.7] max-w-xl mb-10 text-ink-400"
              >
                I build end-to-end data platforms — from ingestion and ELT to ML models and serving layers. Currently at CGI (Lafayette), shipping{" "}
                <span className="accent-text font-medium">BillingShield</span>, a healthcare payment-integrity platform on 10M+ CMS Medicare claims.
              </p>

              <div data-reveal data-reveal-delay="3" className="flex flex-wrap items-center gap-6 md:gap-8">
                <a href="#work" className="link-arrow mono text-[12px] tracking-[0.2em] uppercase text-ink-50">
                  View work <span className="arrow">→</span>
                </a>
                <a
                  href="https://github.com/VedantVAchole"
                  target="_blank"
                  rel="noreferrer"
                  className="link-arrow mono text-[12px] tracking-[0.2em] uppercase text-ink-500"
                >
                  GitHub <span className="arrow">↗</span>
                </a>
                <a
                  href="https://linkedin.com/in/vedantachole"
                  target="_blank"
                  rel="noreferrer"
                  className="link-arrow mono text-[12px] tracking-[0.2em] uppercase text-ink-500"
                >
                  LinkedIn <span className="arrow">↗</span>
                </a>
                <a
                  href="/Vedant_Achole_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="link-arrow mono text-[12px] tracking-[0.2em] uppercase text-ink-500"
                >
                  Résumé <span className="arrow">↗</span>
                </a>
              </div>
            </div>

            {/* photo column */}
            <div data-reveal data-reveal-delay="2" className="md:col-span-4 flex justify-center md:justify-end">
              <div className="relative">
                <div
                  className="absolute -inset-2 rounded-2xl opacity-40 blur-xl"
                  style={{
                    background: "linear-gradient(135deg, #E8A87C 0%, #C38D9E 100%)",
                  }}
                />
                <div
                  className="relative rounded-2xl overflow-hidden"
                  style={{
                    width: "min(320px, 80vw)",
                    aspectRatio: "4/5",
                    border: "1px solid rgba(255,255,255,0.12)",
                  }}
                >
                  <Image
                    src="/images/vedant.jpg"
                    alt="Vedant Achole"
                    fill
                    sizes="320px"
                    priority
                    className="object-cover"
                    style={{ objectPosition: "center 30%" }}
                  />
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(8,8,10,0.6) 0%, transparent 40%)",
                    }}
                  />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="mono text-[10px] tracking-[0.25em] uppercase text-ink-400">
                      Vedant Achole
                    </p>
                    <p className="mono text-[10px] tracking-[0.25em] uppercase text-ink-600">
                      Lafayette, LA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* stats */}
          <div
            data-reveal
            data-reveal-delay="4"
            className="mt-20 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {STATS.map((s, i) => (
              <div key={i} className="stat">
                <div
                  className="serif font-light stat-num transition-colors"
                  style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 1 }}
                >
                  {s.n}
                </div>
                <div className="mono text-[10px] tracking-[0.2em] uppercase mt-3 text-ink-500">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-ink-600 hidden md:flex">
          <span className="mono text-[9px] tracking-[0.25em] uppercase">Scroll</span>
          <svg width="12" height="24" viewBox="0 0 12 24">
            <path d="M6 2 L6 22 M2 18 L6 22 L10 18" stroke="currentColor" strokeWidth="1" fill="none" />
          </svg>
        </div>
      </section>

      {/* ==================== MARQUEE ==================== */}
      <section
        className="py-10 overflow-hidden"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="marquee-track flex gap-14 whitespace-nowrap">
          {[...Array(3)].map((_, loop) => (
            <div key={loop} className="flex gap-14 items-center shrink-0">
              {SKILLS_MARQUEE.map((skill, i) => (
                <div key={i} className="flex items-center gap-14 shrink-0">
                  <span
                    className="serif italic text-ink-600"
                    style={{ fontSize: "1.875rem", fontWeight: 300 }}
                  >
                    {skill}
                  </span>
                  <div className="w-1 h-1 rounded-full accent-bg" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ==================== WORK ==================== */}
      <section id="work" data-section="work" className="py-24 md:py-40 px-6 md:px-10 relative">
        <div className="max-w-shell mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-24">
            <div data-reveal className="md:col-span-3">
              <span className="mono text-[11px] tracking-[0.25em] uppercase text-ink-600">01 — Selected Work</span>
            </div>
            <div data-reveal data-reveal-delay="1" className="md:col-span-9">
              <h2
                className="serif font-light leading-[0.95]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Three projects. <span className="serif italic accent-text">Three real decisions.</span>
              </h2>
              <p className="mt-6 text-lg max-w-2xl text-ink-500">
                Every project on my resume has a technical decision I'd defend in an interview. These are the ones that shaped how I think about data systems.
              </p>
            </div>
          </div>

          {PROJECTS.map((p, idx) => {
            const isFeatured = p.featured;
            const flipVisual = idx === 1;
            const innerClass = "rounded-2xl p-8 md:p-12";
            const outerStyle = isFeatured
              ? { background: "linear-gradient(135deg, rgba(232,168,124,0.15) 0%, rgba(195,141,158,0.08) 50%, rgba(255,255,255,0.04) 100%)" }
              : undefined;
            const innerStyle = isFeatured
              ? { backgroundColor: "#0D0D10" }
              : { backgroundColor: "#0D0D10", border: "1px solid rgba(255,255,255,0.06)" };

            const visualElement = (
              <div
                className="project-visual rounded-xl overflow-hidden relative"
                style={{
                  aspectRatio: "4/5",
                  background: "linear-gradient(145deg, #131318 0%, #0A0A0D 100%)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {p.visual.type === "image" && (
                  <div className="relative w-full h-full p-4">
                    <Image
                      src={p.visual.src}
                      alt={p.visual.alt}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-contain p-4"
                    />
                  </div>
                )}
                {p.visual.type === "svg-flow" && <BronzeSilverGoldFlow />}
                {p.visual.type === "svg-vector" && <VectorScatter />}
              </div>
            );

            return (
              <article
                key={p.id}
                data-reveal
                className={`project-card mb-16 md:mb-24 ${isFeatured ? "p-px" : ""} rounded-2xl`}
                style={outerStyle}
              >
                <div className={innerClass} style={innerStyle}>
                  <div className="grid md:grid-cols-12 gap-8 items-start">
                    {/* text side */}
                    <div className={`md:col-span-7 ${flipVisual ? "md:order-1" : ""}`}>
                      <div className="flex items-center gap-3 mb-6 flex-wrap">
                        <Tag style={p.tagStyle}>{p.tag}</Tag>
                        <span className="mono text-[10px] tracking-[0.25em] uppercase text-ink-600">{p.meta}</span>
                      </div>

                      <h3
                        className="serif font-light mb-6"
                        style={{
                          fontSize: "clamp(1.75rem, 3.2vw, 3rem)",
                          lineHeight: 1.05,
                          letterSpacing: "-0.02em",
                        }}
                      >
                        {p.title}
                      </h3>

                      <p className="text-base leading-[1.75] mb-6 text-ink-400">{p.body}</p>

                      <div
                        className="p-5 rounded-lg mb-8"
                        style={{
                          backgroundColor: `${p.calloutColor}10`,
                          borderLeft: `2px solid ${p.calloutColor}`,
                        }}
                      >
                        <p
                          className="mono text-[10px] tracking-[0.25em] uppercase mb-2"
                          style={{ color: p.calloutColor }}
                        >
                          {p.calloutLabel}
                        </p>
                        <p
                          className="serif italic leading-[1.65]"
                          style={{ fontSize: "1.0625rem", color: "#D8D8E0" }}
                        >
                          {p.calloutText}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-8">
                        {p.stack.map((t, i) => (
                          <span
                            key={i}
                            className="mono text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-md text-ink-400"
                            style={{
                              backgroundColor: "rgba(255,255,255,0.04)",
                              border: "1px solid rgba(255,255,255,0.08)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {p.link ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className={`link-arrow mono text-[11px] tracking-[0.2em] uppercase ${isFeatured ? "accent-text" : "text-ink-50"}`}
                        >
                          {p.linkLabel} <span className="arrow">↗</span>
                        </a>
                      ) : (
                        <span className="mono text-[11px] tracking-[0.2em] uppercase text-ink-600">
                          {p.linkLabel}
                        </span>
                      )}
                    </div>

                    {/* visual side */}
                    <div className={`md:col-span-5 ${flipVisual ? "md:order-2" : ""}`}>
                      {visualElement}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ==================== ABOUT ==================== */}
      <section
        id="about"
        data-section="about"
        className="py-24 md:py-40 px-6 md:px-10 relative"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-shell mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-16">
            <div data-reveal className="md:col-span-3">
              <span className="mono text-[11px] tracking-[0.25em] uppercase text-ink-600">02 — About</span>
            </div>
            <div data-reveal data-reveal-delay="1" className="md:col-span-9">
              <h2
                className="serif font-light leading-[0.95]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                The <span className="serif italic accent-text">long version.</span>
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-3" />
            <div data-reveal data-reveal-delay="2" className="md:col-span-6">
              <p
                className="serif text-2xl md:text-3xl leading-[1.4] mb-10 italic text-ink-200"
                style={{ fontWeight: 300 }}
              >
                I grew up in Maharashtra, moved to Pune for a BTech in Artificial Intelligence, then to Boston for an MS in Management at Questrom. Now in Lafayette, Louisiana — consulting at CGI by day, building healthcare data systems by night.
              </p>
              <p className="text-base md:text-lg leading-[1.75] mb-6 text-ink-400">
                The short version of my career is that I kept following one question:{" "}
                <em className="serif">where does the data actually come from, and why does it break?</em>{" "}
                That led from ML research in undergrad to data quality work at KPMG, then to a management degree (because I wanted to understand why companies make the data decisions they do), and now to building data and AI platforms full-time.
              </p>
              <p className="text-base md:text-lg leading-[1.75] mb-6 text-ink-400">
                I'm looking for a Data Engineering or AI Engineering role where the work is real — healthcare, fintech, anywhere the numbers matter. I care about pipelines that hold up, documentation people can actually read, and communicating technical work to non-technical audiences.
              </p>
              <p className="text-base md:text-lg leading-[1.75] text-ink-400">
                Off the clock: cricket on Saturdays, vlogs on YouTube, eggs most mornings, and ~23 hours a week of deliberate practice toward being genuinely good at this craft.
              </p>
            </div>

            <div data-reveal data-reveal-delay="3" className="md:col-span-3">
              <div className="md:sticky md:top-32 space-y-10">
                <div>
                  <p className="mono text-[10px] tracking-[0.25em] uppercase mb-4 text-ink-600">Education</p>
                  <div className="space-y-4 text-sm leading-[1.6]">
                    <div>
                      <p className="text-ink-50 font-medium">MS Management</p>
                      <p className="text-ink-500">Boston University, Questrom<br />Director's Honors · 2025</p>
                    </div>
                    <div>
                      <p className="text-ink-50 font-medium">BTech, AI &amp; Data Science</p>
                      <p className="text-ink-500">VIIT, Pune<br />9.03 / 10 · 2024</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mono text-[10px] tracking-[0.25em] uppercase mb-4 text-ink-600">Experience</p>
                  <div className="space-y-4 text-sm leading-[1.6]">
                    <div>
                      <p className="text-ink-50 font-medium">CGI — Consultant</p>
                      <p className="text-ink-500">Sep 2025 — present</p>
                    </div>
                    <div>
                      <p className="text-ink-50 font-medium">KPMG — Analyst</p>
                      <p className="text-ink-500">Feb 2024 — Aug 2024</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="mono text-[10px] tracking-[0.25em] uppercase mb-4 text-ink-600">Certifications</p>
                  <div className="text-sm leading-[1.8] text-ink-400">
                    Databricks Fundamentals<br />
                    AWS + Azure Essentials<br />
                    HubSpot Digital Marketing
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== LIFE ==================== */}
      <section
        id="life"
        data-section="life"
        className="py-24 md:py-40 px-6 md:px-10 relative"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-shell mx-auto">
          <div className="grid md:grid-cols-12 gap-8 mb-20">
            <div data-reveal className="md:col-span-3">
              <span className="mono text-[11px] tracking-[0.25em] uppercase text-ink-600">03 — Off-screen</span>
            </div>
            <div data-reveal data-reveal-delay="1" className="md:col-span-9">
              <h2
                className="serif font-light leading-[0.95]"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
              >
                Being a <span className="serif italic accent-text">whole person.</span>
              </h2>
              <p className="mt-6 text-lg max-w-2xl text-ink-500">
                Saturdays are for cricket. Evenings sometimes become vlogs. I think being a whole person is part of being a decent engineer.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-3" />

            <div data-reveal data-reveal-delay="2" className="md:col-span-5">
              <p className="mono text-[10px] tracking-[0.25em] uppercase mb-6 text-ink-600">
                YouTube · Life by Vedant Achole
              </p>
              <a
                href="https://www.youtube.com/@vedantacholee"
                target="_blank"
                rel="noreferrer"
                className="block group rounded-xl overflow-hidden relative"
                style={{
                  aspectRatio: "16/10",
                  background: "linear-gradient(145deg, #1A1A1F 0%, #0D0D10 100%)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div
                      className="relative inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-transform group-hover:scale-110"
                      style={{ background: "linear-gradient(135deg, #E8A87C 0%, #C38D9E 100%)" }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#08080A">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <p className="serif italic text-xl mb-1 text-ink-50">Life by Vedant Achole</p>
                    <p className="mono text-[10px] tracking-[0.2em] uppercase text-ink-500">
                      Cricket · vlogs · @vedantacholee ↗
                    </p>
                  </div>
                </div>
              </a>
              <p className="mt-4 text-sm text-ink-500 italic">
                "Started by engineers for just their backchodi and enjoyment."
              </p>
            </div>

            <div data-reveal data-reveal-delay="3" className="md:col-span-4 md:col-start-9">
              <p className="mono text-[10px] tracking-[0.25em] uppercase mb-6 text-ink-600">Into right now</p>
              <ul className="space-y-5">
                {LIFE_INTERESTS.map((item, k) => (
                  <li key={k} className="flex gap-4 items-start group">
                    <span className="serif italic text-2xl accent-text shrink-0">{item.i}</span>
                    <p className="text-base leading-[1.6] text-ink-400">{item.t}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CONTACT ==================== */}
      <section
        id="contact"
        data-section="contact"
        className="py-24 md:py-40 px-6 md:px-10 relative"
        style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="max-w-shell mx-auto">
          <div className="grid md:grid-cols-12 gap-8">
            <div data-reveal className="md:col-span-3">
              <span className="mono text-[11px] tracking-[0.25em] uppercase text-ink-600">04 — Contact</span>
            </div>
            <div data-reveal data-reveal-delay="1" className="md:col-span-9">
              <h2
                className="serif font-light leading-[0.9]"
                style={{ fontSize: "clamp(3rem, 8vw, 8rem)" }}
              >
                Let's <span className="serif italic accent-text">talk.</span>
              </h2>
              <p className="mt-10 text-xl md:text-2xl leading-[1.5] max-w-3xl text-ink-400">
                Looking for a Data Engineering or AI Engineering role where I can ship real pipelines and learn from senior engineers. Available July 2026. NYC, Boston, Seattle, or strong remote teams.
              </p>

              <div
                data-reveal
                data-reveal-delay="2"
                className="mt-16 grid md:grid-cols-3 gap-4"
              >
                {[
                  { label: "Email", value: "vedant4815@gmail.com", href: "mailto:vedant4815@gmail.com" },
                  { label: "Phone", value: "+1 857-832-8355", href: "tel:+18578328355" },
                  { label: "LinkedIn", value: "/in/vedantachole", href: "https://linkedin.com/in/vedantachole" },
                ].map((item, i) => (
                  <a
                    key={i}
                    href={item.href}
                    target={item.href.startsWith("mailto") || item.href.startsWith("tel") ? undefined : "_blank"}
                    rel="noreferrer"
                    className="block group p-6 rounded-xl transition-all hover:bg-white/5"
                    style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <p className="mono text-[10px] tracking-[0.25em] uppercase mb-3 text-ink-600">{item.label}</p>
                    <p className="serif text-xl italic text-ink-50 group-hover:accent-text transition-colors">{item.value}</p>
                    <p className="mono text-[10px] tracking-[0.2em] uppercase mt-4 opacity-0 group-hover:opacity-100 transition-opacity accent-text">
                      Open ↗
                    </p>
                  </a>
                ))}
              </div>

              <div
                data-reveal
                data-reveal-delay="3"
                className="mt-6 grid md:grid-cols-2 gap-4"
              >
                <a
                  href="https://github.com/VedantVAchole"
                  target="_blank"
                  rel="noreferrer"
                  className="block group p-6 rounded-xl transition-all hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <p className="mono text-[10px] tracking-[0.25em] uppercase mb-3 text-ink-600">GitHub</p>
                  <p className="serif text-xl italic text-ink-50 group-hover:accent-text transition-colors">
                    @VedantVAchole
                  </p>
                </a>
                <a
                  href="/Vedant_Achole_Resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="block group p-6 rounded-xl transition-all hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <p className="mono text-[10px] tracking-[0.25em] uppercase mb-3 text-ink-600">Résumé</p>
                  <p className="serif text-xl italic text-ink-50 group-hover:accent-text transition-colors">
                    Download PDF ↓
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="py-12 px-6 md:px-10" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="max-w-shell mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <p className="mono text-[10px] tracking-[0.25em] uppercase text-ink-600">© 2026 Vedant Achole</p>
            <p className="mono text-[10px] tracking-[0.25em] uppercase mt-1" style={{ color: "#4A4A54" }}>
              Built in Next.js · Deployed on Vercel
            </p>
          </div>
          <a href="#top" className="link-arrow mono text-[10px] tracking-[0.25em] uppercase text-ink-500">
            Back to top <span className="arrow">↑</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
