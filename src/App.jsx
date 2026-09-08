import { useEffect, useRef, useState } from 'react'
import heroImg from '../assets/map_tracking.png'
import trackingImg from '../assets/live_tracking.png'
import playbackImg from '../assets/playback.jpg'
import rolesImg from '../assets/account_management.png'
import speedoImg from '../assets/speedometer (2).png'
import taxImg from '../assets/tax_check.png'
import guideImg from '../assets/troubleshoot.png'
import logoSvg from '../assets/sihemat_logo.svg'
import dashboardImg from '../assets/dashboard (3).png'
import unitListImg from '../assets/unit_list.jpg'
import addUnitImg from '../assets/addUnit.png'
import checkUnitImg from '../assets/checkUnit.jpg'
import showTaxImg from '../assets/show_tax.png'
import reportImg from '../assets/report.png'
import notifImg from '../assets/notification (1).png'
import loginCorpImg from '../assets/login_corp.png'

const BADGES = ['Flutter', 'Dart', 'Google Maps', 'Firebase', 'RBAC']

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const els = ref.current?.querySelectorAll('.reveal') ?? []
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return ref
}

function useCountUp(target, active, duration = 1400) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf
    const t0 = performance.now()
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])
  return val
}

function ThemeIcon({ theme }) {
  return theme === 'dark' ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
  )
}

/* ---------- Phone mockups (REAL APP SCREENSHOTS from /assets/) ---------- */

const MOCKUP_IMAGES = {
  hero: heroImg,
  tracking: trackingImg,
  playback: playbackImg,
  roles: rolesImg,
  speedo: speedoImg,
  tax: taxImg,
  guide: guideImg,
}

function PhoneFrame({ children }) {
  return (
    <div className="phone">
      <div className="phone-notch" />
      <div className="phone-screen">{children}</div>
      <div className="phone-home" />
    </div>
  )
}

function PhoneImage({ src, alt }) {
  return <img className="mockup-img" src={src} alt={alt} loading="lazy" />
}

function HeroPhone() {
  return (
    <PhoneFrame>
      <PhoneImage src={MOCKUP_IMAGES.hero} alt="SiHemat live GPS tracking — real app screenshot" />
    </PhoneFrame>
  )
}

function FeaturePhone({ kind }) {
  const map = {
    tracking: ['tracking', 'Live GPS Tracking — real app screenshot'],
    playback: ['playback', 'Route Playback — real app screenshot'],
    roles: ['roles', 'Multi-Role Access — real app screenshot'],
    speedo: ['speedo', 'Digital Speedometer — real app screenshot'],
    tax: ['tax', 'Vehicle Tax Checker — real app screenshot'],
    pdf: ['guide', 'Troubleshoot Guide — real app screenshot'],
  }
  const [key, alt] = map[kind] || map.tracking
  return (
    <PhoneFrame>
      <PhoneImage src={MOCKUP_IMAGES[key]} alt={alt} />
    </PhoneFrame>
  )
}

/* ---------- Sections ---------- */

const FEATURES = [
  { kind: 'tracking', tag: '01 — Realtime', title: 'Live GPS Tracking', desc: 'Every LEN electric motorbike streams position over Firebase in near real-time. Corporate dispatch sees the whole fleet on one Google Maps canvas with online / idle / offline states, so no unit ever goes dark.', points: ['Firebase realtime streams', 'Google Maps SDK markers & geofence', 'Online / idle / offline presence'] },
  { kind: 'playback', tag: '02 — History', title: 'Animated Route Playback', desc: 'Missed a trip? Scrub through any ride like a video. SiHemat replays the polyline with speed-aware animation — perfect for audits, incident review, and driver coaching.', points: ['53-point trip replay engine', '1x / 4x / 16x playback speeds', 'Distance + duration summary'] },
  { kind: 'roles', tag: '03 — Security', title: 'Multi-Role Access Control', desc: 'Driver, Corporate, and Guest each get a tailored workspace. Firebase Auth plus RBAC guards keep operational data strict: drivers see their unit, corporate sees everything, guests get read-only.', points: ['Driver / Corporate / Guest roles', 'Firebase Auth + route guards', 'Least-privilege data scoping'] },
  { kind: 'speedo', tag: '04 — Safety', title: 'Digital Speedometer', desc: 'A latency-friendly on-device speedometer with overspeed warnings. It keeps riders accountable and gives fleet managers a live safety signal without extra hardware.', points: ['Live km/h gauge + odometer', 'Overspeed alert > 60 km/h', 'Battery-aware rendering'] },
  { kind: 'tax', tag: '05 — Compliance', title: 'Vehicle Tax Checker', desc: 'STNK deadlines stop slipping. Each plat nomor carries its tax status, due-date countdown, and reminder — compliance for the whole EV garage in one glance.', points: ['STNK due-date countdown', 'Per-unit compliance cards', 'One-tap reminder action'] },
  { kind: 'pdf', tag: '06 — Field Support', title: 'Troubleshoot PDF Guide', desc: 'When a bike faults roadside, the answer is already in the pocket. Curated PDF handbooks for battery, brake, and GPS faults work offline for drivers in the field.', points: ['Offline-first PDF handbook', 'Battery / brake / GPS fixes', 'Driver-friendly visual steps'] },
]

const GALLERY = [
  { src: dashboardImg, title: 'Fleet Dashboard', desc: 'Command overview' },
  { src: unitListImg, title: 'Unit List', desc: 'Every EV at a glance' },
  { src: addUnitImg, title: 'Add Unit', desc: 'Onboard a new bike' },
  { src: checkUnitImg, title: 'Check Unit', desc: 'Inspection detail' },
  { src: showTaxImg, title: 'Tax Detail', desc: 'STNK breakdown' },
  { src: reportImg, title: 'Reports', desc: 'Trips & compliance' },
  { src: notifImg, title: 'Notifications', desc: 'Alerts & reminders' },
  { src: loginCorpImg, title: 'Corporate Login', desc: 'Role-gated entry' },
]

function Metric({ value, suffix, label, sub, active }) {
  const n = useCountUp(value, active)
  return (
    <div className="metric glass reveal">
      <div className="metric-num">{n}{suffix}</div>
      <div className="metric-label">{label}</div>
      <p>{sub}</p>
    </div>
  )
}

function RamMetric({ active }) {
  const n = useCountUp(200, active)
  return (
    <div className="metric glass reveal">
      <div className="metric-num">&lt;{n}MB</div>
      <div className="metric-label">RAM Consumption</div>
      <p>Lightweight Flutter build, smooth on entry devices.</p>
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('sihemat-theme') || 'dark')
  const [metricsActive, setMetricsActive] = useState(false)
  const rootRef = useReveal()
  const metricsRef = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('sihemat-theme', theme)
  }, [theme])

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setMetricsActive(true), { threshold: 0.3 })
    if (metricsRef.current) io.observe(metricsRef.current)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={rootRef} className="page">
      <div className="glow glow-a" /><div className="glow glow-b" />

      {/* Header */}
      <header className="nav glass">
        <a className="brand" href="#top"><img src={logoSvg} className="brand-logo-wide logo-adapt" alt="SiHemat logo" /> <span className="brand-tag">CASE STUDY</span></a>
        <nav className="nav-links">
          <a href="#context">Context</a><a href="#features">Features</a><a href="#gallery">Screens</a><a href="#quality">Quality</a><a href="#contact">Contact</a>
        </nav>
        <div className="nav-actions">
          <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
            <ThemeIcon theme={theme} />
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            <span className={`toggle-pill ${theme}`}><span className="toggle-knob" /></span>
          </button>
          <a className="btn small ghost" href="https://github.com/Syidwan/Sihemat-v3" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="hero">
        <div className="hero-copy reveal visible">
          <div className="eyebrow"><span className="live-dot" /> PT LEN INDUSTRI (PERSERO) · EV FLEET</div>
          <h1>Real-Time <span className="accent">EV Fleet</span><br />Monitoring, in<br />your pocket.</h1>
          <p className="lede">SiHemat is a Flutter-powered command center for LEN's electric motorbikes — live GPS, route replay, safety telemetry, and compliance, unified in one mobile app.</p>
          <div className="badges">{BADGES.map((b) => <span key={b} className="badge">{b}</span>)}</div>
          <div className="cta-row">
            <a className="btn primary" href="https://github.com/Syidwan/Sihemat-v3" target="_blank" rel="noreferrer">⌨ View GitHub</a>
            <a className="btn ghost" href="#features">▶ Live Demo</a>
          </div>
          <div className="hero-mini">
            <div><strong>12+</strong><span>units tracked</span></div>
            <div><strong>~2s</strong><span>GPS refresh</span></div>
            <div><strong>3</strong><span>role workspaces</span></div>
          </div>
        </div>
        <div className="hero-phone reveal visible">
          <div className="phone-glow" />
          <HeroPhone />
          <div className="float-card fc1 glass">📍 LEN-EV 042 · moving 42 km/h</div>
          <div className="float-card fc2 glass">🔋 Fleet health 94%</div>
        </div>
      </section>

      <div className="marquee"><div className="marquee-track"><span>FLUTTER · GOOGLE MAPS · FIREBASE REALTIME · RBAC · EV TELEMETRY · STNK COMPLIANCE ·&nbsp;</span><span>FLUTTER · GOOGLE MAPS · FIREBASE REALTIME · RBAC · EV TELEMETRY · STNK COMPLIANCE ·&nbsp;</span></div></div>

      {/* Context */}
      <section id="context" className="section">
        <p className="kicker reveal">01 — Context</p>
        <h2 className="reveal">The problem <span className="accent">vs</span> the SiHemat fix</h2>
        <p className="sub reveal">PT Len runs a growing pool of electric motorbikes for operations — but spreadsheets and word-of-mouth can't track moving assets.</p>
        <div className="context-grid">
          <div className="ctx glass reveal problem">
            <h3>⚠ The Challenge</h3>
            <ul>
              <li><strong>Blind fleet:</strong> no live position for corporate dispatch — units go missing for hours.</li>
              <li><strong>No trip history:</strong> incidents and route deviations can't be audited or replayed.</li>
              <li><strong>One-size access:</strong> drivers and managers share the same view; sensitive ops data leaks.</li>
              <li><strong>Missed compliance:</strong> STNK / vehicle tax deadlines tracked manually, fines pile up.</li>
              <li><strong>Roadside helplessness:</strong> drivers with battery or brake faults have no field guide.</li>
            </ul>
          </div>
          <div className="ctx glass reveal solution">
            <h3>⚡ The SiHemat Solution</h3>
            <ul>
              <li><strong>Live command map:</strong> every bike streams GPS to one realtime Flutter + Google Maps view.</li>
              <li><strong>Replayable truth:</strong> animated route playback turns any trip into reviewable evidence.</li>
              <li><strong>RBAC workspaces:</strong> Driver, Corporate, and Guest roles with Firebase-guarded scopes.</li>
              <li><strong>Compliance built-in:</strong> tax checker with countdowns keeps the whole garage street-legal.</li>
              <li><strong>Offline resilience:</strong> speedometer + PDF troubleshoot guides work even with weak signal.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features zigzag */}
      <section id="features" className="section">
        <p className="kicker reveal">02 — Core features</p>
        <h2 className="reveal">Six spotlights, <span className="accent">one</span> mission</h2>
        <p className="sub reveal">Each capability pairs a live phone-frame prototype with the engineering decision behind it. Alternate, scan, understand.</p>
        <div className="zigzag">
          {FEATURES.map((f, i) => (
            <article key={f.kind} className={`spot reveal ${i % 2 ? 'flip' : ''}`}>
              <div className="spot-phone"><div className="phone-glow small" /><FeaturePhone kind={f.kind} /></div>
              <div className="spot-copy glass">
                <span className="spot-tag">{f.tag}</span>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <ul>{f.points.map((p) => <li key={p}>✓ {p}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Gallery — more app screens */}
      <section id="gallery" className="section">
        <p className="kicker reveal">02b — More screens</p>
        <h2 className="reveal">The full app, <span className="accent">frame by frame</span></h2>
        <p className="sub reveal">Beyond the six spotlights — dashboard, garage management, reports, notifications, and role-gated auth, all from the real build.</p>
        <div className="gallery-grid">
          {GALLERY.map((g) => (
            <figure key={g.title} className="g-card glass reveal">
              <div className="g-phone"><img src={g.src} alt={`${g.title} — SiHemat app screenshot`} loading="lazy" /></div>
              <figcaption><strong>{g.title}</strong><span>{g.desc}</span></figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Metrics */}
      <section id="quality" className="section" ref={metricsRef}>
        <p className="kicker reveal">03 — Testing & quality</p>
        <h2 className="reveal">Black-Box tested. <span className="accent">Fleet approved.</span></h2>
        <p className="sub reveal">45 scripted scenarios across 7 modules — every pass, zero critical defects, featherweight on device RAM.</p>
        <div className="metrics">
          <Metric value={100} suffix="%" label="Pass Rate" sub="All Black-Box scenarios green on release candidate." active={metricsActive} />
          <Metric value={45} suffix="" label="Test Scenarios" sub="Functional paths incl. GPS, roles, replay & tax." active={metricsActive} />
          <Metric value={7} suffix="" label="Test Modules" sub="Map, auth, speedo, garage, PDF, replay, compliance." active={metricsActive} />
          <RamMetric active={metricsActive} />
        </div>
        <div className="quality-strip glass reveal"><span>🧪 Black-Box methodology</span><span>📦 7 modules</span><span>✅ 0 critical defects</span><span>📱 Low-end friendly</span></div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer glass reveal">
        <img src={logoSvg} className="footer-logo logo-adapt" alt="SiHemat — Hemat Energi Untuk Masa Depan" />
        <h2>Ready for Indonesia's <span className="accent">EV ecosystem.</span></h2>
        <p>SiHemat proves a state-owned fleet can go electric — and stay observable, compliant, and safe. Built as a mobile-developer case study for PT Len Industri (Persero).</p>
        <div className="cta-row center">
          <a className="btn primary" href="https://github.com/Syidwan/Sihemat-v3" target="_blank" rel="noreferrer">GitHub Repository</a>
          <a className="btn ghost" href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn Profile</a>
        </div>
        <div className="credits"><span>Designed & engineered by <strong>Nirwan Rasyid Ridlo</strong> — Mobile Developer (Flutter)</span><span className="mono">Flutter · Dart · Google Maps · Firebase</span></div>
      </footer>
      <p className="tiny">© 2026 SiHemat Case Study · PT Len Industri (Persero) · Crafted with React for portfolio showcase</p>
    </div>
  )
}
