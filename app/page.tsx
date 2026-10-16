import ReservationForm from "./ReservationForm";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <div className="brand">
          <div className="brand-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
              <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
              <line x1="6" y1="1" x2="6" y2="4" />
              <line x1="10" y1="1" x2="10" y2="4" />
              <line x1="14" y1="1" x2="14" y2="4" />
            </svg>
          </div>
          <div>
            <strong>Café Colonial</strong>
            <small>EXPERIÊNCIA ÚNICA</small>
          </div>
        </div>
        <nav className="main-nav">
          <a href="#specialties">Especialidades</a>
          <a href="#reservation">Reservas</a>
          <a href="#location">Localização</a>
        </nav>
        <a href="#reservation" className="header-cta">
          Reserve agora
        </a>
      </header>

      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">
            <span>Desde 1972</span>
          </div>
          <h1>
            Sabores que contam <em>histórias</em>
          </h1>
          <p>
            Em meio às montanhas de Campo Largo, nossa tradição colonial
            encontra a excelência moderna. Um convite para despertar
            seus sentidos.
          </p>
          <div className="hero-actions">
            <a href="#reservation" className="button-primary">
              Fazer reserva
            </a>
            <a href="#specialties" className="button-secondary">
              Conhecer menu
            </a>
          </div>
          <div className="hero-location">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span>Campo Largo, PR • Rua das Flores, 42</span>
          </div>
        </div>
      </section>

      <section className="section" id="specialties">
        <div className="section-label">
          <span>NOSSAS ESPECIALIDADES</span>
        </div>
        <h2>
          Feito com <em>carinho</em>
        </h2>
        <p className="intro-copy">
          Cada prato é uma celebração da culinária colonial,
          preparado com ingredientes frescos e receitas que atravessam gerações.
        </p>
        <div className="specialties">
          <div className="specialty">
            <div className="specialty-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                <line x1="6" y1="1" x2="6" y2="4" />
                <line x1="10" y1="1" x2="10" y2="4" />
                <line x1="14" y1="1" x2="14" y2="4" />
              </svg>
            </div>
            <h3>Café Colonial</h3>
            <p>
              Seleção de pães, bolos, queijos, geleias e frutas
              da estação, servidos com nosso café especial.
            </p>
          </div>
          <div className="specialty">
            <div className="specialty-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <h3>Pratos Quentes</h3>
            <p>
              Opções reconfortantes como cucas, bolos assados
              e pratos quentes da tradição colonial.
            </p>
          </div>
          <div className="specialty">
            <div className="specialty-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <h3>Doces Artesanais</h3>
            <p>
              Bolos, tortas e doces feitos à mão,
              com receitas familiares e ingredientes de qualidade.
            </p>
          </div>
        </div>
      </section>

      <section className="reservation-section" id="reservation">
        <div className="reservation-copy">
          <div className="section-label">
            <span>RESERVAS</span>
          </div>
          <h2>
            Garanta seu <em>momento</em>
          </h2>
          <p>
            Antecipe sua visita e garanta um lugar para
            aproveitar nossa experiência colonial em família
            ou com amigos.
          </p>
          <div className="reservation-benefit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Confirmado instantaneamente</span>
          </div>
          <div className="reservation-benefit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Até 15 pessoas por reserva</span>
          </div>
          <div className="reservation-benefit">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Cancelamento flexível</span>
          </div>
        </div>
        <ReservationForm />
      </section>

      <section className="section location-section" id="location">
        <div className="section-label">
          <span>LOCALIZAÇÃO</span>
        </div>
        <h2>
          Visite-nos em <em>Campo Largo</em>
        </h2>
        <p>
          Rua das Flores, 42 • Centro<br />
          Campo Largo, PR • Brasil<br />
          <br />
          Aberto de terça a domingo<br />
          8h às 18h
        </p>
      </section>

      <footer className="footer">
        <div className="footer-brand">Café Colonial</div>
        <p>Desde 1972, trazendo tradição e sabor.</p>
        <small>© 2024 Café Colonial. Todos os direitos reservados.</small>
      </footer>
    </>
  );
}
