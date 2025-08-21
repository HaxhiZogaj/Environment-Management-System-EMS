import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Mjedisi Fillon Me Ty 🌿</h1>
          <p>Ne jemi këtu për të të ndihmuar të ndërtosh një të ardhme të gjelbër dhe të qëndrueshme për të gjithë.</p>
          <div className="hero-buttons">
            <Link to="/vote" className="btn-hero">Bëhu Vullnetar</Link>
            <Link to="/greentip" className="btn-hero secondary">Këshilla të Gjelbra</Link>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="info-cards">
        <div className="info-card">
          <h2>♻️ Riciklimi</h2>
          <p>Zbulo qendrat më të afërta dhe mëso si të riciklosh si profesionist.</p>
          <Link to="/recyclingCenter" className="card-link">Më shumë</Link>
        </div>
        <div className="info-card">
          <h2>📊 Raportet</h2>
          <p>Shiko ndikimin tënd në mjedis përmes raporteve interaktive dhe statistikave.</p>
          <Link to="/environmentalreport" className="card-link">Shiko Raportet</Link>
        </div>
        <div className="info-card">
          <h2>🌱 Evente</h2>
          <p>Bashkohu në aktivitete që ndihmojnë natyrën dhe komunitetin.</p>
          <Link to="/comment" className="card-link">Ngjarjet</Link>
        </div>
         <div className="info-card">
          <h2>🌿 Keshilla</h2>
          <p>Zbato këto këshilla të thjeshta për një jetë më të qëndrueshme dhe të pastër.</p>
          <Link to="/greenTip" className="card-link">Ngjarjet</Link>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="highlight">
        <h2>Kontribuo për një Planet më të Pastër</h2>
        <p>Çdo veprim i vogël ka një ndikim të madh. Filloni sot me Mejdisi.</p>
        <Link to="/vote" className="btn-highlight">Ndihmo Tani</Link>
      </section>

       <section className="highlight">
        <h2>Raporto per kategorit per nje mjedis me te mire.</h2>
        <p>Mejdisi eshte ne duar tona per te miren e shendetit.</p>
        <Link to="/reportCategory" className="btn-highlight">Raporto Tani</Link>
      </section>
    </>
  );
};

export default Home;
