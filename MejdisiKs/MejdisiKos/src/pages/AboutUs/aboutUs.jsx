import { useEffect, useState } from 'react';
import './aboutus.css';

const milestones = [
  { year: '2018', event: 'U themelua organizata jonë me një grup të vogël vullnetarësh.' },
  { year: '2019', event: 'Organizuam 100+ evente për ndërgjegjësimin e komunitetit.' },
  { year: '2020', event: 'Krijuam platformën online për këshilla dhe raporte mjedisore.' },
  { year: '2021', event: 'Arritëm mbi 5,000 tonë riciklim të mbetjeve në nivel kombëtar.' },
  { year: '2023', event: 'Zgjeruam rrjetin tonë me mbi 50,000 anëtarë aktivë.' },
];

const teamMembers = [
  { name: 'Albana Krasniqi', role: 'Koordinatore Projekte', img: '/images/foto3.jpg', social: { linkedin: '#', twitter: '#' } },
  { name: 'Erdin Berisha', role: 'Specialist Ndërgjegjësimi', img: '/images/foto1.jpg', social: { linkedin: '#', twitter: '#' } },
  { name: 'Flutra Dervishi', role: 'Menaxhere Komuniteti', img: '/images/foto2.jpg', social: { linkedin: '#', twitter: '#' } },
];


const Counter = ({ end, suffix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const incrementTime = 30;
    const steps = duration / incrementTime;
    const stepValue = end / steps;

    const counter = setInterval(() => {
      start += stepValue;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(counter);
  }, [end]);

  return (
    <span>{count.toLocaleString()}{suffix}</span>
  );
};

const AboutUs = () => {
  return (
    <>
      
      {/* Hero Section */}
      <section className="aboutus-hero">
        <div className="hero-text">
          <h1>Rreth Nesh</h1>
          <p>
            Jemi një organizatë e dedikuar për mbrojtjen e mjedisit dhe zhvillimin e qëndrueshëm, me qëllim të krijojmë një botë më të pastër dhe më të gjelbër.
          </p>
          <p className="mission">
            <strong>Misioni ynë:</strong> Të edukojmë dhe mobilizojmë komunitetin për ndryshime pozitive në mjedis.
          </p>
          <p className="vision">
            <strong>Vizioni ynë:</strong> Një planet ku natyra dhe njerëzit jetojnë në harmoni të plotë.
          </p>
        </div>
        <div className="hero-image">
          <img src="/images/mejdisiproecting.jpg" alt="Mbrojtja e Mjedisit" />
        </div>
      </section>

      {/* Achievements with animated counters */}
      <section className="aboutus-achievements">
        <h2>Arritjet tona kryesore</h2>
        <div className="achievements-cards">
          <div className="achievement-card">
            <Counter end={10000} suffix="+" />
            <p>Tonë mbetje të ricikluara</p>
          </div>
          <div className="achievement-card">
            <Counter end={500} suffix="+" />
            <p>Evente dhe trajnime të organizuara</p>
          </div>
          <div className="achievement-card">
            <Counter end={50000} suffix="+" />
            <p>Anëtarë aktivë në komunitet</p>
          </div>
        </div>
      </section>

      {/* Milestones timeline */}
      <section className="aboutus-timeline">
        <h2>Historia jonë në kohë</h2>
        <div className="timeline-container">
          {milestones.map(({ year, event }, idx) => (
            <div key={idx} className={`timeline-item ${idx % 2 === 0 ? 'left' : 'right'}`}>
              <div className="content">
                <span className="year">{year}</span>
                <p>{event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="aboutus-team">
        <h2>Ekipi ynë profesional</h2>
        <div className="team-container">
          {teamMembers.map(({ name, role, img, social }, idx) => (
            <div key={idx} className="team-member">
              <img src={img} alt={name} />
              <h3>{name}</h3>
              <p>{role}</p>
              <div className="social-links">
                <a href={social.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <svg viewBox="0 0 24 24" fill="#0A66C2" width="20" height="20"><path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11.7 19h-2.8v-8.7h2.8v8.7zm-1.4-9.9c-.9 0-1.5-.7-1.5-1.5s.6-1.5 1.5-1.5c.9 0 1.5.7 1.5 1.5s-.6 1.5-1.5 1.5zm11.1 9.9h-2.8v-4.7c0-1.1 0-2.6-1.6-2.6-1.6 0-1.8 1.2-1.8 2.5v4.8h-2.8v-8.7h2.7v1.2h.1c.4-.7 1.4-1.4 2.9-1.4 3.1 0 3.7 2 3.7 4.6v4.3z"/></svg>
                </a>
                <a href={social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
                  <svg viewBox="0 0 24 24" fill="#1DA1F2" width="20" height="20"><path d="M24 4.6c-.9.4-1.8.7-2.8.8 1-.6 1.7-1.5 2-2.6-.9.6-1.9 1-3 1.3-.9-.9-2.2-1.5-3.5-1.5-2.7 0-4.8 2.2-4.8 4.8 0 .4 0 .7.1 1-4-.2-7.5-2.2-9.9-5.2-.4.6-.6 1.5-.6 2.4 0 1.7.9 3.3 2.2 4.3-.8 0-1.5-.2-2.1-.6v.1c0 2.3 1.6 4.2 3.7 4.7-.4.1-.8.2-1.2.2-.3 0-.6 0-.9-.1.6 2 2.4 3.4 4.5 3.4-1.7 1.3-3.8 2-6.1 2-.4 0-.8 0-1.2-.1 2.2 1.4 4.8 2.2 7.5 2.2 9 0 14-7.5 14-14 0-.2 0-.4 0-.6 1-.7 1.8-1.6 2.5-2.6z"/></svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default AboutUs;
