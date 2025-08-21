import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} MejdisiIm. Të gjitha të drejtat e rezervuara.</p>
      <div className="footer-links">
        <a href="#privacy">Privatësia</a>
        <a href="#terms">Kushtet e përdorimit</a>
        <a href="#contact">Kontakti</a>
      </div>
    </footer>
  );
};

export default Footer;
