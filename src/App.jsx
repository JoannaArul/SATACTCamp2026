import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Schedule", href: "#schedule" },
  { label: "Why Us", href: "#why" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const CREDENTIALS = [
  { stat: "1550", label: "SAT Score", sub: "99th percentile nationwide" },
  { stat: "36", label: "ACT Score", sub: "Perfect score" },
  { stat: "11", label: "Students Taught", sub: "Last summer's SAT camp" },
  { stat: "6", label: "Countries", sub: "Schoolhouse.world students" },
  { stat: "644", label: "MathCON National", sub: "of 34,000+ applicants" },
  { stat: "3+", label: "Organizations", sub: "VIP Tutoring, independent" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={`fade-in ${inView ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function CredentialSlideshow() {
  const [active, setActive] = useState(0);
  const [phase, setPhase] = useState("in");

  useEffect(() => {
    const t = setInterval(() => {
      setPhase("out");
      setTimeout(() => {
        setActive(p => (p + 1) % CREDENTIALS.length);
        setPhase("in");
      }, 350);
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const c = CREDENTIALS[active];

  return (
    <div className="slideshow">
      <div className="slideshow__track">
        <div className={`slideshow__slide phase-${phase}`}>
          <div className="slideshow__stat">{c.stat}</div>
          <div className="slideshow__label">{c.label}</div>
          <div className="slideshow__sub">{c.sub}</div>
        </div>
      </div>
      <div className="slideshow__dots">
        {CREDENTIALS.map((_, i) => (
          <button key={i} className={`slideshow__dot ${i === active ? "active" : ""}`}
            onClick={() => { setPhase("out"); setTimeout(() => { setActive(i); setPhase("in"); }, 200); }}
            aria-label={`Credential ${i + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const faqs = [
    { q: "Who are these classes designed for?", a: "Any student preparing for the SAT or ACT, whether for the first time or retaking to improve. Students at all levels are welcome." },
    { q: "Do I need to enroll in both programs?", a: "No. You can register for just the SAT program, just the ACT, or both. Each is a separate registration." },
    { q: "How much does it cost?", a: "Each class is $10. You pay only for the classes you attend. There are no packages, no commitments, and no long-term contracts." },
    { q: "When does the program start?", a: "Classes begin the first week of June. Register early as space is limited." },
    { q: "What is covered each session?", a: "Sessions focus on high-yield strategies, common question patterns, pacing, and problem-solving techniques. Subjects rotate throughout the week for comprehensive coverage." },
    { q: "Are classes online or in-person?", a: "All classes will remain online through Zoom. Homework and test practice sets will be provided each week." },
    { q: "How do I register?", a: "Complete the registration form linked on this page, or call or text 704-236-6064 with any questions before signing up." },
    { q: "What qualifies Joanna to teach?", a: "Joanna scored a 1550 on the SAT and a 36 on the ACT. She is a certified SAT tutor who has taught students across 6 countries, ran a summer SAT camp for 11 students last year, and qualified for the MathCON National Competition as one of 644 selected from over 34,000 nationwide." },
  ];

  return (
    <>
      {/* NAV */}
      <header className={`nav ${scrolled ? "nav--solid" : ""}`}>
        <div className="nav__inner">
          <a className="nav__logo" href="#hero" onClick={e => { e.preventDefault(); scrollTo("#hero"); }}>
            <span className="nav__mark">J</span>
            <span className="nav__name">Aspire Prep</span>
          </a>
          <nav className="nav__links">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} onClick={e => { e.preventDefault(); scrollTo(l.href); }}>{l.label}</a>
            ))}
          </nav>
          <a className="nav__cta" href="https://forms.gle/xzSDipBgy6uJe1rX7" target="_blank" rel="noopener noreferrer">
            Register
          </a>
          <button className={`burger ${menuOpen ? "open" : ""}`} aria-label="Toggle menu" onClick={() => setMenuOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
        <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map(l => (
            <a key={l.href} href={l.href} onClick={e => { e.preventDefault(); scrollTo(l.href); }}>{l.label}</a>
          ))}
          <a className="mobile-nav__cta" href="https://forms.gle/xzSDipBgy6uJe1rX7" target="_blank" rel="noopener noreferrer">Register Now</a>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero__inner container">
          <div className="hero__left">
            <div className="hero__eyebrow">Summer 2026 &nbsp;·&nbsp; Enrolling Now</div>
            <h1 className="hero__h1">
              SAT &amp; ACT Prep<br />
              <em>That Actually Works</em>
            </h1>
            <p className="hero__body">
              Small-group classes taught by a student who scored a <strong>1550 on the SAT</strong> and a <strong>36 on the ACT</strong>, and spent last summer teaching 11 students to do the same.
            </p>
            <div className="hero__actions">
              <a className="btn-primary" href="https://forms.gle/xzSDipBgy6uJe1rX7" target="_blank" rel="noopener noreferrer">
                Register Now
              </a>
              <a className="btn-outline" href="tel:7042366064">704-236-6064</a>
            </div>
            <p className="hero__fine">$10 per class &nbsp;·&nbsp; Starting June 2026</p>
          </div>
          <div className="hero__right">
            <CredentialSlideshow />
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {[0, 1, 2].map(outer => (
            <span key={outer} className="ticker__set">
              {["SAT Prep", "ACT Prep", "1550 SAT", "36 ACT", "Schoolhouse Certified", "MathCON National Qualifier", "6 Countries", "11 Students", "$10 Per Class", "Starting June 2026"].map((t, i) => (
                <span key={i} className="ticker__item">{t}<span className="ticker__dot">·</span></span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="section about">
        <div className="container">
          <div className="about__grid">
            <FadeIn className="about__photo-col">
              <div className="about__photo">
                <img src="/JoannaHeadshot.jpg" alt="Joanna Arul Jeeva" />
              </div>
              <div className="about__caption">
                <strong>Joanna Arul Jeeva</strong>
                <span>NCSSM Durham</span>
              </div>
            </FadeIn>
            <div className="about__text-col">
              <FadeIn>
                <div className="section-label">Your Instructor</div>
                <h2 className="section-title">Meet Joanna</h2>
              </FadeIn>
              <FadeIn delay={100}>
                <p className="about__lead">
                  I'm a student at the North Carolina School of Science and Mathematics. I scored a <strong>1550 on the SAT</strong> and a <strong>36 on the ACT</strong>, and this summer I'm running focused prep classes built around the strategies that worked for me and for my students last year.
                </p>
                <p className="about__body">
                  Last summer, I taught SAT prep to 11 students, helping them build confidence, improve pacing, and develop effective testing strategies. This year I'm expanding to include ACT prep as well.
                </p>
              </FadeIn>
              <FadeIn delay={200}>
                <div className="quals">
                  <div className="quals__heading">Qualifications</div>
                  {[
                    { title: "Certified SAT Tutor", sub: "Teaching students across 6 countries" },
                    { title: "MathCON National Qualifier", sub: "1 of 644 selected from 34,000+ nationwide" },
                    { title: "Multi-Organization Tutoring Experience", sub: "VIP Tutoring and independent SAT camp" },
                    { title: "Proven Summer Camp Results", sub: "11 students taught last summer with measurable gains" },
                  ].map((q, i) => (
                    <div key={i} className="qual">
                      <div className="qual__bar" />
                      <div>
                        <div className="qual__title">{q.title}</div>
                        <div className="qual__sub">{q.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="programs" className="section programs">
        <div className="container">
          <FadeIn>
            <div className="section-label">The Program</div>
            <h2 className="section-title">How It Works</h2>
          </FadeIn>
          <div className="steps">
            {[
              { n: "01", title: "Enroll", body: "Register through the form and reach out with any questions about which program fits your test date and goals." },
              { n: "02", title: "Strategy Sessions", body: "Each class targets the question types and patterns that appear most frequently, with direct focus on what moves scores." },
              { n: "03", title: "Full Section Coverage", body: "Math, Reading, Writing, and Science (ACT) rotate across sessions so you get comprehensive preparation, not repetition." },
              { n: "04", title: "Test With Confidence", body: "Walk in with a clear strategy, practiced pacing, and the confidence that comes from consistent, focused preparation." },
            ].map((s, i) => (
              <FadeIn key={s.n} delay={i * 70}>
                <div className="step">
                  <div className="step__n">{s.n}</div>
                  <div className="step__rule" />
                  <div className="step__body">
                    <h3>{s.title}</h3>
                    <p>{s.body}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" className="section schedule">
        <div className="container">
          <FadeIn>
            <div className="section-label">Schedule &amp; Pricing</div>
            <h2 className="section-title">Simple. Affordable. Effective.</h2>
          </FadeIn>
          <div className="sched-table">
            {[
              { name: "SAT Prep", days: ["Monday", "Wednesday"], registerLabel: "Register for SAT" },
              { name: "ACT Prep", days: ["Tuesday", "Thursday"], registerLabel: "Register for ACT" },
            ].map((row, i) => (
              <FadeIn key={row.name} delay={i * 100}>
                <div className="sched-row">
                  <div className="sched-row__name">{row.name}</div>
                  <div className="sched-row__days">
                    {row.days.map(d => <span key={d} className="sched-day">{d}</span>)}
                  </div>
                  <div className="sched-row__time">5:00 PM to 6:00 PM</div>
                  <div className="sched-row__price">$10 <span>per class</span></div>
                  <a className="sched-row__btn" href="https://forms.gle/xzSDipBgy6uJe1rX7" target="_blank" rel="noopener noreferrer">
                    {row.registerLabel}
                  </a>
                </div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={220}>
            <div className="sched-footer">
              <div className="sched-detail"><strong>Starts</strong><span>First week of June 2026</span></div>
              <div className="sched-detail"><strong>Pricing</strong><span>$10 per class, no packages required</span></div>
              <div className="sched-detail"><strong>Questions</strong><a href="tel:7042366064">704-236-6064</a></div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY */}
      <section id="why" className="section why">
        <div className="container">
          <FadeIn>
            <div className="section-label">Why This Program</div>
            <h2 className="section-title">What Sets This Apart</h2>
          </FadeIn>
          <div className="why__grid">
            {[
              { title: "Taught by a Top Scorer", body: "Joanna scored in the 99th percentile on both the SAT and ACT. Her strategies come from having taken and mastered these exact exams, not from a curriculum guide." },
              { title: "Small Groups, Real Attention", body: "This is not a video course or a 30-student lecture. Small groups mean every student is seen, heard, and helped each session." },
              { title: "Accessible Pricing", body: "At $10 per class with no packages or contracts, quality test prep is available to every family." },
              { title: "Proven Results", body: "Eleven students completed last summer's SAT camp. They left with sharper skills, better pacing, and genuine confidence for test day." },
              { title: "Internationally Recognized", body: "As a certified tutor, Joanna has worked with students across 6 countries and understands the wide range of challenges students face." },
              { title: "Only What Matters", body: "No filler content. Every session is built around high-frequency question types, common traps, and the strategies that directly improve scores." },
            ].map((w, i) => (
              <FadeIn key={w.title} delay={i * 55}>
                <div className="why-item">
                  <div className="why-item__accent" />
                  <h3>{w.title}</h3>
                  <p>{w.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="section faq">
        <div className="container">
          <div className="faq__layout">
            <FadeIn className="faq__left">
              <div className="section-label">FAQ</div>
              <h2 className="section-title">Your Questions,<br />Answered</h2>
              <p className="faq__note">Still have questions? Reach out directly and Joanna will get back to you.</p>
              <a className="btn-primary" href="tel:7042366064">Call or Text</a>
            </FadeIn>
            <div className="faq__right">
              {faqs.map((f, i) => (
                <FadeIn key={i} delay={i * 35}>
                  <div className={`faq-item ${openFaq === i ? "open" : ""}`}>
                    <button className="faq-item__q" onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}>
                      <span>{f.q}</span>
                      <span className="faq-item__icon">{openFaq === i ? "−" : "+"}</span>
                    </button>
                    <div className="faq-item__body">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <div className="container">
          <div className="contact__layout">
            <FadeIn className="contact__left">
              <div className="section-label">Get In Touch</div>
              <h2 className="section-title">Ready to Start?</h2>
              <p className="contact__body">
                Register through the form or reach out directly. Joanna is happy to answer questions about scheduling, content, or which program fits your student's needs.
              </p>
            </FadeIn>
            <FadeIn delay={100} className="contact__right">
              <a className="contact-link contact-link--primary" href="https://forms.gle/xzSDipBgy6uJe1rX7" target="_blank" rel="noopener noreferrer">
                <div>
                  <div className="contact-link__name">Registration Form</div>
                  <div className="contact-link__sub">Sign up for SAT or ACT classes</div>
                </div>
                <span className="contact-link__arr">&#8599;</span>
              </a>
              <a className="contact-link" href="tel:7042366064">
                <div>
                  <div className="contact-link__name">Call or Text</div>
                  <div className="contact-link__sub">704-236-6064</div>
                </div>
                <span className="contact-link__arr">&#8599;</span>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer__top">
            <div className="footer__brand">
              <span className="nav__mark">J</span>
              <span className="footer__title">Aspire Prep</span>
            </div>
            <nav className="footer__links">
              {NAV_LINKS.map(l => (
                <a key={l.href} href={l.href} onClick={e => { e.preventDefault(); scrollTo(l.href); }}>{l.label}</a>
              ))}
            </nav>
          </div>
          <div className="footer__bottom">
            <span>&copy; 2026 Joanna Arul Jeeva. NCSSM Durham.</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
