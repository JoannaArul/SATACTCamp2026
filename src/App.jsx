import { useState, useEffect, useRef } from "react";
import "./App.css";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Schedule & Pricing", href: "#schedule" },
  { label: "Why Choose Us", href: "#why" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.12, ...options });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={`fade-in ${inView ? "visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const faqs = [
    {
      q: "Who are these classes designed for?",
      a: "These classes are designed for any student preparing to take the SAT or ACT — whether you're taking it for the first time or retaking to improve your score. Students at all levels are welcome.",
    },
    {
      q: "Do I need to sign up for both SAT and ACT?",
      a: "No. You can sign up for just the SAT program, just the ACT program, or both. Each is a separate registration.",
    },
    {
      q: "How much does it cost?",
      a: "Each class is $10. SAT classes run Mondays and Wednesdays, and ACT classes run Tuesdays and Thursdays — both from 5:00–6:00 PM. You only pay for the classes you attend.",
    },
    {
      q: "When does the program start?",
      a: "Classes begin the first week of June. Register early to secure your spot.",
    },
    {
      q: "What will be covered in classes?",
      a: "Each session focuses on high-yield strategies, common question patterns, pacing, and problem-solving techniques. Subjects and sections are rotated throughout the week so students get comprehensive coverage.",
    },
    {
      q: "Are classes online or in-person?",
      a: "Please reach out via the contact information below to ask about class format and location details.",
    },
    {
      q: "How do I register?",
      a: "Fill out the registration form linked on this page, or call/text 704-236-6064 with any questions before signing up.",
    },
    {
      q: "What makes Joanna qualified to teach?",
      a: "Joanna scored a 1550 on the SAT and a 36 on the ACT. She is a Schoolhouse.world certified SAT tutor, has tutored students across 6 countries, and ran a successful SAT prep camp last summer for 11 students. She is also a MathCON national qualifier — one of 644 students selected from over 34,000 nationwide.",
    },
  ];

  return (
    <>
      {/* NAV */}
      <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
        <div className="navbar__inner">
          <a className="navbar__logo" href="#hero" onClick={(e) => { e.preventDefault(); scrollTo("#hero"); }}>
            <span className="logo-mark">J</span>
            <span className="logo-text">Joanna's Test Prep</span>
          </a>
          <nav className="navbar__links">
            {NAV_LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}>
                {l.label}
              </a>
            ))}
          </nav>
          <a
            className="navbar__cta"
            href="https://forms.gle/xzSDipBgy6uJe1rX7"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register Now
          </a>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span /><span /><span />
          </button>
        </div>
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}>
              {l.label}
            </a>
          ))}
          <a
            className="mobile-cta"
            href="https://forms.gle/xzSDipBgy6uJe1rX7"
            target="_blank"
            rel="noopener noreferrer"
          >
            Register Now
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="hero" className="hero">
        <div className="hero__bg">
          <div className="hero__circle hero__circle--1" />
          <div className="hero__circle hero__circle--2" />
          <div className="hero__circle hero__circle--3" />
        </div>
        <div className="hero__content">
          <div className="hero__badge">Summer 2025 · Enrolling Now</div>
          <h1 className="hero__title">
            SAT &amp; ACT Prep<br />
            <span className="hero__title--accent">That Actually Works</span>
          </h1>
          <p className="hero__sub">
            Expert-led small-group classes taught by a student who scored a <strong>1550 SAT</strong> and a <strong>36 ACT</strong> — and spent last summer teaching 11 students to do the same.
          </p>
          <div className="hero__scores">
            <div className="score-card">
              <span className="score-card__num">1550</span>
              <span className="score-card__label">SAT Score</span>
            </div>
            <div className="score-divider" />
            <div className="score-card">
              <span className="score-card__num">36</span>
              <span className="score-card__label">ACT Score</span>
            </div>
          </div>
          <div className="hero__actions">
            <a
              className="btn btn--primary"
              href="https://forms.gle/xzSDipBgy6uJe1rX7"
              target="_blank"
              rel="noopener noreferrer"
            >
              Register Now
            </a>
            <a
              className="btn btn--secondary"
              href="tel:7042366064"
            >
              Call or Text: 704-236-6064
            </a>
          </div>
          <p className="hero__price-note">$10 per class &nbsp;·&nbsp; Starting first week of June</p>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section about">
        <div className="container">
          <FadeIn>
            <div className="section-label">About Your Instructor</div>
            <h2 className="section-title">Meet Joanna</h2>
          </FadeIn>
          <div className="about__grid">
            <FadeIn delay={100} className="about__photo-wrap">
              <div className="about__photo-placeholder">
                <span>Photo Coming Soon</span>
              </div>
            </FadeIn>
            <FadeIn delay={200} className="about__text">
              <p className="about__intro">
                Hi! My name is <strong>Joanna Arul Jeeva</strong>, a student at the North Carolina School of Science and Mathematics (NCSSM Durham). I scored a <strong>1550 on the SAT</strong> and a <strong>36 on the ACT</strong>, and this summer I'm hosting focused SAT and ACT prep classes built around the strategies that actually moved the needle for me — and for my students.
              </p>
              <p>
                Last summer, I taught SAT prep for 11 students, helping them build confidence, improve pacing, and develop effective testing strategies. This year, I'm expanding to include ACT prep as well.
              </p>

              <div className="credentials">
                <div className="credential">
                  <div className="credential__icon">&#10003;</div>
                  <div>
                    <strong>Schoolhouse.world Certified SAT Tutor</strong>
                    <span>Teaching students across 6 countries</span>
                  </div>
                </div>
                <div className="credential">
                  <div className="credential__icon">&#10003;</div>
                  <div>
                    <strong>MathCON National Qualifier</strong>
                    <span>1 of 644 students selected from 34,000+ nationwide</span>
                  </div>
                </div>
                <div className="credential">
                  <div className="credential__icon">&#10003;</div>
                  <div>
                    <strong>Multi-Organization Tutoring Experience</strong>
                    <span>VIP Tutoring, Schoolhouse, and independent SAT programs</span>
                  </div>
                </div>
                <div className="credential">
                  <div className="credential__icon">&#10003;</div>
                  <div>
                    <strong>Proven Summer Camp Results</strong>
                    <span>11 students taught last summer with measurable confidence gains</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="programs" className="section programs">
        <div className="container">
          <FadeIn>
            <div className="section-label">The Program</div>
            <h2 className="section-title">How It Works</h2>
            <p className="section-sub">A straightforward, structured approach to real score improvement.</p>
          </FadeIn>
          <div className="steps">
            {[
              {
                num: "01",
                title: "Enroll & Get Placed",
                body: "Register through the form below. Reach out with any questions about which program fits your timeline and target test date.",
              },
              {
                num: "02",
                title: "High-Yield Strategy Sessions",
                body: "Each class covers question patterns, pacing techniques, and the specific strategies that appear most frequently on the SAT or ACT.",
              },
              {
                num: "03",
                title: "Rotating Content Coverage",
                body: "Different subjects and sections are covered each week — Math, Reading, Writing, and Science (ACT) — so you get comprehensive preparation.",
              },
              {
                num: "04",
                title: "Test With Confidence",
                body: "Walk into test day with a clear game plan, practiced strategies, and the confidence that comes from consistent preparation.",
              },
            ].map((s, i) => (
              <FadeIn key={s.num} delay={i * 100}>
                <div className="step">
                  <div className="step__num">{s.num}</div>
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

      {/* SCHEDULE & PRICING */}
      <section id="schedule" className="section schedule">
        <div className="container">
          <FadeIn>
            <div className="section-label">Schedule &amp; Pricing</div>
            <h2 className="section-title">Simple, Affordable Classes</h2>
            <p className="section-sub">No contracts. No commitments. Just $10 per class.</p>
          </FadeIn>
          <div className="schedule__grid">
            <FadeIn delay={100}>
              <div className="program-card program-card--sat">
                <div className="program-card__tag">SAT Prep</div>
                <h3>SAT Program</h3>
                <div className="program-card__days">
                  <div className="day-pill">Monday</div>
                  <div className="day-pill">Wednesday</div>
                </div>
                <div className="program-card__time">5:00 – 6:00 PM</div>
                <div className="program-card__price">
                  <span className="price-num">$10</span>
                  <span className="price-unit">/ class</span>
                </div>
                <ul className="program-card__features">
                  <li>Math strategies &amp; problem-solving</li>
                  <li>Reading &amp; Writing techniques</li>
                  <li>Pacing and time management</li>
                  <li>Common question pattern recognition</li>
                </ul>
                <a
                  className="btn btn--primary btn--full"
                  href="https://forms.gle/xzSDipBgy6uJe1rX7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register for SAT
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <div className="program-card program-card--act">
                <div className="program-card__tag">ACT Prep</div>
                <h3>ACT Program</h3>
                <div className="program-card__days">
                  <div className="day-pill">Tuesday</div>
                  <div className="day-pill">Thursday</div>
                </div>
                <div className="program-card__time">5:00 – 6:00 PM</div>
                <div className="program-card__price">
                  <span className="price-num">$10</span>
                  <span className="price-unit">/ class</span>
                </div>
                <ul className="program-card__features">
                  <li>Math &amp; Science reasoning</li>
                  <li>English &amp; Reading sections</li>
                  <li>ACT-specific pacing strategies</li>
                  <li>High-yield content focus areas</li>
                </ul>
                <a
                  className="btn btn--primary btn--full"
                  href="https://forms.gle/xzSDipBgy6uJe1rX7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Register for ACT
                </a>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={300}>
            <div className="schedule__note">
              Classes begin the <strong>first week of June</strong>. Register early — spots are limited. Questions? Call or text <a href="tel:7042366064">704-236-6064</a>.
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section id="why" className="section why">
        <div className="container">
          <FadeIn>
            <div className="section-label">Why Us</div>
            <h2 className="section-title">What Sets This Program Apart</h2>
          </FadeIn>
          <div className="why__grid">
            {[
              {
                title: "Taught by a Top Scorer",
                body: "Joanna didn't just study these tests — she mastered them, scoring in the 99th percentile on both the SAT and ACT. Her strategies come from real experience, not a textbook.",
              },
              {
                title: "Small Group, Real Attention",
                body: "This isn't a video course or a 30-student classroom. Small group sizes mean your student gets seen, heard, and helped — every session.",
              },
              {
                title: "Affordable Access",
                body: "At $10 per class, this program makes quality test prep accessible to every family — no expensive packages, no long-term contracts.",
              },
              {
                title: "Proven Track Record",
                body: "Last summer, 11 students came through this program. They left with stronger skills, better pacing, and the confidence to sit for their exam.",
              },
              {
                title: "Internationally Recognized Instruction",
                body: "As a Schoolhouse.world certified tutor, Joanna has worked with students across 6 countries — bringing a broad perspective on where students most commonly struggle.",
              },
              {
                title: "Focused on What's Tested",
                body: "No filler. Every session targets high-frequency question types, common traps, and the exact strategies that move scores.",
              },
            ].map((w, i) => (
              <FadeIn key={w.title} delay={i * 80}>
                <div className="why-card">
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
        <div className="container container--narrow">
          <FadeIn>
            <div className="section-label">FAQ</div>
            <h2 className="section-title">Your Questions, Answered</h2>
          </FadeIn>
          <div className="faq__list">
            {faqs.map((f, i) => (
              <FadeIn key={i} delay={i * 50}>
                <div className={`faq-item ${openFaq === i ? "open" : ""}`}>
                  <button
                    className="faq-item__q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{f.q}</span>
                    <span className="faq-item__arrow">{openFaq === i ? "−" : "+"}</span>
                  </button>
                  <div className="faq-item__a">
                    <p>{f.a}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section contact">
        <div className="container container--narrow">
          <FadeIn>
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">Ready to Get Started?</h2>
            <p className="section-sub">
              Register through the form or reach out directly with any questions. Joanna is happy to help you figure out which program is right for your student.
            </p>
          </FadeIn>
          <div className="contact__cards">
            <FadeIn delay={100}>
              <a
                className="contact-card contact-card--primary"
                href="https://forms.gle/xzSDipBgy6uJe1rX7"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="contact-card__icon">&#9998;</div>
                <div>
                  <strong>Registration Form</strong>
                  <span>Sign up for SAT or ACT classes</span>
                </div>
                <span className="contact-card__arrow">&#8594;</span>
              </a>
            </FadeIn>
            <FadeIn delay={200}>
              <a className="contact-card" href="tel:7042366064">
                <div className="contact-card__icon">&#9742;</div>
                <div>
                  <strong>Call or Text</strong>
                  <span>704-236-6064</span>
                </div>
                <span className="contact-card__arrow">&#8594;</span>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer__inner">
            <div className="footer__brand">
              <span className="logo-mark">J</span>
              <span>Joanna's Test Prep &nbsp;·&nbsp; Summer 2025</span>
            </div>
            <div className="footer__links">
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); scrollTo(l.href); }}>
                  {l.label}
                </a>
              ))}
            </div>
          </div>
          <div className="footer__copy">
            &copy; 2025 Joanna Arul Jeeva · NCSSM Durham · All rights reserved
          </div>
        </div>
      </footer>
    </>
  );
}
