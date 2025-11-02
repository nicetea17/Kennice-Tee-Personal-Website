import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import PhotoHover from "./PhotoHover";
import LiquidEther from './LiquidEther';
import SplitText from "./SplitText";
import Stepper, { Step } from './Stepper';


function NavBar() {
  const links = ['tee house', 'about', 'experience', 'contact'];
  const [active, setActive] = useState(0);
  const navRef = useRef(null);
  const lineRef = useRef(null);
  const liRefs = useRef([]);
  const animating = useRef(false);

  useEffect(() => {
    if (!liRefs.current[active]) return;
    const navBox = navRef.current.getBoundingClientRect();
    const activeBox = liRefs.current[active].getBoundingClientRect();
    const left = activeBox.left - navBox.left;
    const width = activeBox.width;
    const line = lineRef.current;
    line.style.left = `${left}px`;
    line.style.width = `${width}px`;
  }, []);

  const handleClick = (index) => {
    if (index === active || animating.current) return;
    animating.current = true;

    const navBox = navRef.current.getBoundingClientRect();
    const fromBox = liRefs.current[active].getBoundingClientRect();
    const toBox = liRefs.current[index].getBoundingClientRect();

    const fromLeft = fromBox.left - navBox.left;
    const fromWidth = fromBox.width;
    const toLeft = toBox.left - navBox.left;
    const toWidth = toBox.width;

    const line = lineRef.current;

    if (toLeft > fromLeft) {
      line.style.left = `${fromLeft}px`;
      line.style.width = `${toLeft - fromLeft + toWidth}px`;
    } else {
      line.style.left = `${toLeft}px`;
      line.style.width = `${fromLeft - toLeft + fromWidth}px`;
    }

    line.addEventListener(
      "transitionend",
      () => {
        line.style.left = `${toLeft}px`;
        line.style.width = `${toWidth}px`;
        setActive(index);
        animating.current = false;

        // Scroll to section on click
        const sectionId = links[index].toLowerCase().replace(/\s+/g, '-');
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }
      },
      { once: true }
    );
  };

  return (
    <nav className="nav" ref={navRef}>
      <div className="nav-container">
        <img src="teacupLogo.png" className="logo" alt="logo" />
        &nbsp;&nbsp;&nbsp;
        <ul>
          <li
            ref={(el) => (liRefs.current[0] = el)}
            className={active === 0 ? "active" : ""}
          >
            <a href="#" onClick={(e) => { e.preventDefault(); handleClick(0); }}>
              tee house
            </a>
          </li>
        </ul>
        <ul>
          {links.slice(1).map((link, i) => (
            <li
              key={link}
              ref={(el) => (liRefs.current[i + 1] = el)}
              className={active === i + 1 ? "active" : ""}
            >
              <a href="#" onClick={(e) => { e.preventDefault(); handleClick(i + 1); }}>
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="line" ref={lineRef}></div>
    </nav>
  );
}

function TypewriterRotator() {
  const phrases = ["developer", "dancer", "dreamer"];
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let updatedText = deleting
      ? currentPhrase.substring(0, charIndex - 1)
      : currentPhrase.substring(0, charIndex + 1);

    const timeout = setTimeout(() => {
      setText(updatedText);

      if (!deleting && updatedText === currentPhrase) {
        setTimeout(() => setDeleting(true), 1000);
      } else if (deleting && updatedText === '') {
        setDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        setCharIndex(0);
      } else {
        setCharIndex((prev) => prev + (deleting ? -1 : 1));
      }
    }, deleting ? 80 : 150);

    return () => clearTimeout(timeout);
  }, [charIndex, deleting, phraseIndex]);

  return (
          

    <h1 className="typewriter-text">
      <span className="large"> Kennice Tee. </span>
      <br />
      <span className="rotating">{text}</span>
      <span className="cursor">|</span>
    </h1>
  );
}

function AboutExplorer(){
  return(<Stepper
  initialStep={1}
  onStepChange={(step) => {
    console.log(step);
  }}
  onFinalStepCompleted={() => console.log("All steps completed!")}
  backButtonText="Previous"
  nextButtonText="Next"
> 
  <Step>
    <h2>Who Am I?</h2>
    <p>A passionate, curious, and determined programmer eager to learn and build innovative solutions in software engineering and machine learning. I develop full-stack projects that integrate thoughtful front-end design with efficient back-end systems. My knowledge surrounding machine learning architectures are applied to automate and solve real-world problems.</p>
  </Step>
  <Step>
    <h2>Education</h2>
    <p>I'm majoring in <b> Computer Science</b> and <b> Cognitive Science</b> at University of California, Berkeley, with an expected graduation date of May 2028!</p>
  </Step>
  <Step>
    <h2>Technical Strengths</h2>
    <p>Coding Languages: Python, HTML, CSS, Java, JavaScript <br></br>
    Libraries: pandas, numpy, matplotlib, PyTorch, Scikit-learn, React<br></br>
    Languages: English, Mandarin, Spanish, Korean </p>
  </Step>
  <Step>
    <h2>Coursework</h2>
    <p>Some core technical classes I have completed / am currently taking include:</p>
    <ul style = {{textAlign: 'left'}}>
    <li>CS61A - The Structure and Interpretation of Computer Programs</li>
    <li>CS70 - Discrete Mathematics & Probability Theory</li>
    <li>CS61B - Data Structures and Algorithms</li>
    <li>EECS16A - Foundations of Signals, Dynamical Systems, and Information Processing</li>
    <li>Math 54 - Linear Algebra & Differential Equations</li>
    <li>Math 53 - Multivariable Calculus</li>
    <li>Stat 20 - Introduction to Probability & Statistics</li>
    <li>CISD 307 - Introduction to Artificial Intelligence and Machine Learning</li>
    </ul>
  </Step>
  <Step>
    <h2>Wanna know more?</h2>
    <p>Find out more about my projects below!  </p>
  </Step>
</Stepper>
  )
}


function AboutSection() {
  const myImages = [
    "Untitled design.JPG",
    "D3F589E0-1583-487A-A671-4BC7C5729615.JPG",
    "IMG_0886 2.JPG",
    "IMG_3842.JPG"
  ];
  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };
  

  return (
    <section id="about" className="about-section">
      <AboutExplorer />



      {/*
      <SplitText
      text="About Me"
      className="text-2xl font-semibold text-center my-0"
      onLetterAnimationComplete={handleAnimationComplete}
      tag = "h2"
    />
      <p>
        I’m Kennice Tee, a freshman at UC Berkeley majoring in Computer Science (CDSS) and Cognitive Science.
      </p>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
        {myImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt=""
            className="mypics"
            style={{ objectFit: 'cover', borderRadius: '8px' }}
          />
        ))}
      </div>
      */}
    </section>
  );
}

function Experience() {
  const experiences = [
    {
      role: "Jane Street AMP Scholar",
      org: "Jane Street",
      dates: "Jun 2025 – Aug 2025",
      bullets: [
        "Explored combinatorics, number theory, programming, data analysis, and game theory",
      ],
      link: "https://www.janestreet.com/join-jane-street/programs-and-events/amp/",
    },
    {
      role: "Student Researcher (Astrophysics)",
      org: "Summer Science Program",
      dates: "Jun 2024 – Jul 2024",
      bullets: [
        "Collected data on asteroid 1951 LB and wrote a Python program to determine its orbit",
        "Co‑authored a LaTeX research paper with two collaborators",
      ],
    },
    {
      role: "Code Coach",
      org: "theCoderSchool Folsom",
      dates: "Aug 2024 – June 2025",
      bullets: [
        "Taught Scratch, Python, and Java (1:1 and 1:2) using project‑based methods",
      ],
    },
    {
      role: "Private Math Tutor",
      org: "Self‑employed",
      dates: "Jan 2023 – Present",
      bullets: [
        "Tutored Algebra through AP Calculus BC; emphasized problem‑solving and intuition",
      ],
    },
  ];

  const projects = [
    { name: "Architectural Style Classification Website", desc: "Developed a full-stack web application integrating a deep learning model trained on labeled datasets to classify architectural styles from user-uploaded images", tags: ["DL", "Python", "JavaScript", "HTML"] },
    { name: "SSP Astrophysics Orbit Determination Program", desc: "Built a Python program to compute asteroid 1951 LB’s orbit from observational data, and further predicting its potential celestial collisions in the future.", tags: ["Python"]},
    { name: "Camel Up (AI hints)", desc: "Implemented Camel Up board game logic with an AI-powered hint system that suggests the optimal strategy leveraging expected values.", tags: ["Python"] },
    { name: "Minesweeper", desc: "Recreated the classic Minesweeper game with a modern, minimalistic interface.", tags: ["Python"] },
    { name: "Wordle Unlimited + AI Solver", desc: "Engineered a Wordle Unlimited clone with an AI solver achieving 99% accuracy, validated through large-scale simulations.", tags: ["Python"] },
  ];

  // --- Scroll reveal & smoothed 3D tilt ---
  const cardRefs = useRef([]);
  const rafId = useRef(null);
  const tiltElRef = useRef(null);
  const target = useRef({ rx: 0, ry: 0 });
  const current = useRef({ rx: 0, ry: 0 });

  // ensure refs length matches projects length
  cardRefs.current = cardRefs.current.slice(0, projects.length);

  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });

    cardRefs.current.forEach((el) => {
      if (el && !el.classList.contains('in-view')) io.observe(el);
    });
    return () => io.disconnect();
  }, [projects.length]);

  const animateTilt = () => {
    const damp = 0.15; // smoothing factor
    current.current.rx += (target.current.rx - current.current.rx) * damp;
    current.current.ry += (target.current.ry - current.current.ry) * damp;
    const el = tiltElRef.current;
    if (el) {
      el.style.setProperty('--rx', `${current.current.rx}deg`);
      el.style.setProperty('--ry', `${current.current.ry}deg`);
      rafId.current = requestAnimationFrame(animateTilt);
    } else {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
  };

  const handleTilt = (e) => {
    const el = e.currentTarget;
    tiltElRef.current = el;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0..1
    const y = (e.clientY - rect.top) / rect.height;  // 0..1
    target.current.rx = (0.5 - y) * 4; // smaller max angle for stability
    target.current.ry = (x - 0.5) * 6;
    if (!rafId.current) rafId.current = requestAnimationFrame(animateTilt);
  };

  const resetTilt = () => {
    target.current.rx = 0;
    target.current.ry = 0;
    // Let RAF ease back; stop shortly after
    setTimeout(() => {
      tiltElRef.current = null;
    }, 200);
  };
  // --- end tilt/reveal ---

  return (
    <section id="experience" className="exp-section">
      <h2>Experience</h2>
      <p className="skills-line">
        Programming Languages: HTML, CSS, Java, Python, JavaScript
      </p>

      <div className="timeline">
        {experiences.map((e, i) => (
          <div className="timeline-item" key={i}>
            <div className="dot" />
            <div className="card">
              <div className="card-top">
                <h3>{e.role}</h3>
                <span className="dates">{e.dates}</span>
              </div>
              <div className="org">
                {e.link ? (
                  <a href={e.link} target="_blank" rel="noreferrer">{e.org}</a>
                ) : (
                  <span>{e.org}</span>
                )}
              </div>
              <ul>
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <h2 className="projects-title">Projects</h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <div
            className="project-card"
            key={i}
            ref={(el) => (cardRefs.current[i] = el)}
            style={{ '--stagger': `${i * 90}ms` }}
            onMouseMove={handleTilt}
            onMouseLeave={resetTilt}
          >
            <h3>{p.name}</h3>
            {/* Description reveals on title hover (CSS handles it) */}
            <p className="muted">{p.desc}</p>

            <div className="tag-row">
              {p.tags.map((t, k) => (
                <span
                  className="tag"
                  key={k}
                  style={{ '--tag-delay': `${180 + k * 70}ms` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <h2>Contact</h2>
      <p>Let’s connect! Feel free to reach out through any of the following:</p>
      <div className="contact-info">
        <a href="mailto:kennicetee@berkeley.edu"> kennicetee@berkeley.edu</a>
        <a href="https://www.linkedin.com/in/kennice-tee-820496280" target="_blank" rel="noreferrer">
          LinkedIn
        </a>
      </div>
    </section>
  );
}

function App() {
  return (
    <div>
      <div
        className="liquid-nav-wrapper"
        style={{
          position: "relative",
          width: "100vw",
          overflow: "hidden",
          zIndex: 1,
          
        }}
      >
        <LiquidEther
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0.6,
            backgroundColor: '#f9f7ff' 
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>
      <NavBar />
      </div>
      </div>
      {/* Front page */}
      <div className="app-container" id="tee-house" style={{
    position: 'relative',overflow: "hidden", }}>
      <LiquidEther
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)", 
          width: "100vw",                        
          zIndex: 0,     
          opacity: 0.6,  
          backgroundColor: '#f9f7ff'             
        }}
      />
      <div
    style={{
      position: 'relative',
      zIndex: 1,  
    }}
  >
        <TypewriterRotator />
      </div>
      </div>

      {/* Next section starts after scrolling */}
      <AboutSection />
      <Experience />
      <Contact />
    </div>
  );
}

export default App;
