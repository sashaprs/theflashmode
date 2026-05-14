// TheFlashMode — Landing components (Lumora-style design system)
const { useState, useEffect, useRef, useCallback } = React;

/* ============================================================
   Brand mark (Bolt + wordmark)
============================================================ */
function Brand({ size = 14 }) {
  return (
    <span className="brand-mark" style={{ fontSize: size }}>
      <span className="bolt" aria-hidden="true"></span>
      <span>TheFlashMode</span>
    </span>
  );
}

/* ============================================================
   Two-row nav: Global (black) + Sub (frosted parchment)
============================================================ */
function Nav() {
  return (
    <React.Fragment>
      <nav className="global-nav" aria-label="Navigation principale">
        <div className="global-nav-inner">
          <a className="global-nav-brand" href="#top">
            <span className="bolt" aria-hidden="true"></span>
            <span>TheFlashMode</span>
          </a>
          <div className="global-nav-links">
            <a href="#fonctionnement">Studio</a>
            <a href="#mannequins">Mannequins</a>
            <a href="#galerie">Galerie</a>
            <a href="#tarifs">Tarifs</a>
            <a href="#pipeline">Technologie</a>
            <a href="#temoignages">Avis</a>
            <a href="#aide">Aide</a>
          </div>
          <div className="global-nav-right">
            <a href="#recherche" aria-label="Recherche">⌕</a>
            <a href="#connexion">Connexion</a>
          </div>
        </div>
      </nav>
      <div className="sub-nav" role="navigation" aria-label="Studio">
        <div className="sub-nav-inner">
          <div className="sub-nav-title">Studio</div>
          <div className="sub-nav-links">
            <a href="#fonctionnement">Fonctionnement</a>
            <a href="#pipeline">Technologie</a>
            <a href="#tarifs">Tarifs</a>
            <a className="btn btn-primary" href="#essai">Essayer</a>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

/* ============================================================
   HERO — three variants
============================================================ */
function HeroBeforeAfter() {
  const [pos, setPos] = useState(52);
  const wrapRef = useRef(null);
  const drag = useRef(false);
  const move = useCallback((clientX) => {
    const r = wrapRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100));
    setPos(p);
  }, []);
  useEffect(() => {
    const onMove = (e) => { if (drag.current) { e.preventDefault(); move(e.touches ? e.touches[0].clientX : e.clientX); } };
    const onUp = () => { drag.current = false; document.body.style.userSelect = ''; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [move]);

  return (
    <div className="ba" ref={wrapRef}
      onMouseDown={(e) => { drag.current = true; move(e.clientX); document.body.style.userSelect = 'none'; }}
      onTouchStart={(e) => { drag.current = true; move(e.touches[0].clientX); }}
    >
      <image-slot id="hero-after" shape="rect" radius="2px"
        placeholder="Après — mannequin IA habillé"
        style={{position:'absolute', inset:0}}>
      </image-slot>
      <div style={{position:'absolute', inset:0, clipPath: `inset(0 ${100 - pos}% 0 0)`}}>
        <image-slot id="hero-before" shape="rect" radius="2px"
          placeholder="Avant — vêtement à plat"
          style={{position:'absolute', inset:0}}>
        </image-slot>
      </div>
      <div className="ba-line" style={{ left: `${pos}%` }} aria-hidden="true">
        <div className="ba-handle" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow={Math.round(pos)} tabIndex="0">
          <svg width="18" height="14" viewBox="0 0 20 14" fill="none">
            <path d="M6 1 1 7l5 6M14 1l5 6-5 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      <div className="ba-badge ba-left">Avant — vêtement</div>
      <div className="ba-badge ba-right">Après — IA</div>
    </div>
  );
}

function HeroVideo() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const i = setInterval(() => setFrame(f => (f + 1) % 4), 1400);
    return () => clearInterval(i);
  }, []);
  const labels = [
    'Photo vêtement uploadée',
    'Mannequin IA généré',
    'Try-on en cours…',
    'Visuel final HD',
  ];
  return (
    <div className="ba">
      <image-slot id={`hero-loop-${frame}`} shape="rect" radius="2px" placeholder={labels[frame]}
        style={{position:'absolute', inset:0}}>
      </image-slot>
      <div className="loop-frames" aria-hidden="true">
        {[0,1,2,3].map(i => <div key={i} className={"loop-dot" + (i === frame ? " on" : "")}></div>)}
      </div>
      <div className="ba-badge ba-left">{labels[frame]}</div>
    </div>
  );
}

function HeroStatic() {
  return (
    <div className="ba">
      <image-slot id="hero-static" shape="rect" radius="2px"
        placeholder="Visuel campagne mode — généré par TheFlashMode"
        style={{position:'absolute', inset:0}}>
      </image-slot>
      <div className="ba-badge ba-left">Campagne SS26 — Maison Élise</div>
    </div>
  );
}

function Hero({ variant }) {
  return (
    <section className="hero tile" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="t-eyebrow fade-up">Nouveau · Studio mode IA</div>
          <h1 className="t-hero fade-up d1">
            Un shooting mode complet,<br/>
            <span className="t-it">en une minute.</span>
          </h1>
          <p className="t-lead fade-up d2" style={{marginTop: 18}}>
            Habillez des mannequins générés par IA avec vos propres vêtements.
            Plus de studio, plus de retouche, plus de logistique — juste vos visuels,
            prêts pour la campagne.
          </p>
          <div className="hero-ctas fade-up d3">
            <a className="btn btn-primary" href="#essai">Commencer — 29€/mois</a>
            <a className="btn btn-secondary-pill" href="#fonctionnement">En savoir plus</a>
          </div>
          <div className="hero-meta fade-up d4">
            <span><strong className="t-body-strong">5 crédits</strong> offerts</span>
            <span aria-hidden="true">·</span>
            <span>Sans carte bancaire</span>
            <span aria-hidden="true">·</span>
            <span>Export HD multi-formats</span>
          </div>
        </div>
        <div className="hero-visual fade-up d2">
          {variant === 'video-loop' && <HeroVideo />}
          {variant === 'static' && <HeroStatic />}
          {(variant === 'ba-slider' || !variant) && <HeroBeforeAfter />}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Logo strip
============================================================ */
function LogoStrip() {
  const logos = ['Maison Élise', 'Bardot & Sons', 'Studio Noir', 'ATLAS', 'Volta Mode', 'Refuge', 'Index Officiel'];
  return (
    <section className="logo-strip">
      <div className="wrap">
        <div className="logo-strip-label t-caption">Choisi par des marques mode indépendantes et émergentes</div>
        <div className="logo-strip-row">
          {logos.map(l => <span key={l}>{l}</span>)}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PROBLEM — economic argument
============================================================ */
function Problem() {
  const items = [
    { label: 'Mannequin pro',     range: '500 — 5 000 €', sub: '/ jour' },
    { label: 'Photographe mode',  range: '800 — 3 000 €', sub: '/ jour' },
    { label: 'Location studio',   range: '300 — 1 000 €', sub: '/ jour' },
    { label: 'Retoucheur',        range: '200 — 500 €',   sub: '/ image' },
  ];
  return (
    <section className="tile parchment" id="probleme">
      <div className="wrap">
        <div className="problem-grid">
          <div>
            <div className="t-eyebrow">Le problème</div>
            <h2 className="t-display-lg" style={{marginTop: 14}}>
              Une campagne mode standard mobilise quatre métiers et trois jours.
            </h2>
            <p className="t-lead" style={{marginTop: 18}}>
              TheFlashMode remplace l'intégralité de ce processus par un abonnement
              mensuel — accessible à toute marque, quelle que soit sa taille.
            </p>
            <div className="problem-result">
              <span className="t-caption" style={{display:'block', marginBottom: 6}}>Total chez TheFlashMode</span>
              <span className="problem-price t-num">29<span style={{fontSize:'0.32em', fontWeight: 400}}>€/mois</span></span>
              <span className="problem-included t-caption">50 crédits · 4 à 8 visuels par session · Export HD inclus</span>
            </div>
          </div>
          <ul className="problem-list" role="list">
            {items.map((it, i) => (
              <li key={it.label} className="problem-row">
                <span className="problem-row-num t-num t-caption">0{i+1}</span>
                <div>
                  <div className="t-body-strong">{it.label}</div>
                  <div className="t-caption">approche traditionnelle</div>
                </div>
                <div className="problem-row-price">
                  <div className="t-body-strong t-num">{it.range}</div>
                  <div className="t-caption">{it.sub}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   HOW IT WORKS — 3 steps
============================================================ */
function HowItWorks() {
  const steps = [
    { n: '01', title: 'Déposez votre vêtement.',
      body: 'Une simple photo studio (à plat, sur cintre, fond blanc). Drag & drop, validation instantanée — JPG · PNG · WebP.',
      placeholder: 'Photo produit — pull cachemire' },
    { n: '02', title: 'Décrivez votre mannequin.',
      body: 'Sélecteurs visuels — genre, morphologie, ethnie, âge, pose, fond — ou phrase libre type "femme 30 ans, peau dorée, fond studio crème".',
      placeholder: 'Critères mannequin IA' },
    { n: '03', title: 'Téléchargez vos visuels.',
      body: '4 à 8 variantes générées en moins de 90 secondes. Retouche légère intégrée, export multi-résolutions (web · print · réseaux).',
      placeholder: 'Grille résultats × 8 variantes' },
  ];
  return (
    <section className="tile" id="fonctionnement">
      <div className="wrap">
        <header className="section-head">
          <div className="t-eyebrow">Comment ça marche</div>
          <h2 className="t-display-lg" style={{marginTop: 14}}>
            Trois étapes. Quatre-vingt-dix secondes.
          </h2>
        </header>
        <div className="how-grid">
          {steps.map((s, i) => (
            <article key={s.n} className="how-step fade-up" style={{animationDelay: `${i*120}ms`}}>
              <div className="how-num t-num">{s.n}</div>
              <div className="how-thumb">
                <image-slot id={`step-${s.n}`} shape="rect" radius="8px" placeholder={s.placeholder}></image-slot>
              </div>
              <h3 className="t-display-md">{s.title}</h3>
              <p className="t-body" style={{color:'var(--ink-muted-80)', marginTop: 8, marginBottom: 0}}>{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   AI PIPELINE — dark tile
============================================================ */
function Pipeline() {
  const items = [
    { tag: 'GPT-4o',      title: 'Interprétation', body: 'Vos critères en langage naturel sont traduits en prompt optimisé.', cost: '0,01 $' },
    { tag: 'GPT-Image-1', title: 'Mannequin',       body: 'Génération d\'une photo réaliste du mannequin selon le prompt.', cost: '0,04 $' },
    { tag: 'Fashn.ai',    title: 'Virtual Try-On',  body: 'Habillage pixel-perfect du mannequin avec votre vêtement réel × 4.', cost: '0,16 $' },
  ];
  return (
    <section className="tile dark" id="pipeline">
      <div className="wrap">
        <header className="section-head">
          <div className="t-eyebrow">Sous le capot</div>
          <h2 className="t-display-lg" style={{marginTop: 14, color:'#fff'}}>
            Trois IA de pointe. Une seule session.
          </h2>
          <p className="t-lead" style={{marginTop: 18}}>
            Coût total API par session — incluant 4 à 8 visuels finaux HD :
            {' '}<strong style={{color:'#fff'}} className="t-num">0,21 $</strong>.
          </p>
        </header>
        <div className="pipeline">
          {items.map((it, i) => (
            <React.Fragment key={it.title}>
              <article className="pipe-card">
                <div className="pipe-tag chip dark">{it.tag}</div>
                <h3 className="t-display-md" style={{marginTop: 18, color:'#fff'}}>{it.title}</h3>
                <p className="t-body" style={{color:'var(--body-muted)', marginTop: 8}}>{it.body}</p>
                <div className="pipe-cost t-caption t-num">≈ {it.cost}</div>
              </article>
              {i < items.length - 1 && <div className="pipe-arrow" aria-hidden="true">→</div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MODELS — marketplace teaser
============================================================ */
function Models() {
  const models = [
    { name: 'Aïssa K.',  tags: ['Femme · 28', 'Editorial'],     celeb: false },
    { name: 'Lior B.',   tags: ['Homme · 31', 'Sportswear'],    celeb: false },
    { name: 'Soraya M.', tags: ['Femme · 24', 'Haute couture'], celeb: true },
    { name: 'Tomás R.',  tags: ['Homme · 35', 'Casual urbain'], celeb: false },
    { name: 'Iris D.',   tags: ['Non-binaire · 26', 'Avant-garde'], celeb: false },
    { name: 'Naomi V.',  tags: ['Femme · 29', 'Beauté luxe'],   celeb: true },
  ];
  return (
    <section className="tile" id="mannequins">
      <div className="wrap">
        <header className="section-head section-head-row">
          <div>
            <div className="t-eyebrow">Marketplace mannequins</div>
            <h2 className="t-display-lg" style={{marginTop: 14, maxWidth: 720}}>
              Travaillez avec de vrais mannequins. Sans casting, sans contrat.
            </h2>
          </div>
          <p className="t-lead" style={{maxWidth: 420}}>
            Une marketplace de mannequins ayant cédé leurs droits à l'image, rémunérés
            automatiquement à chaque utilisation via royalties.
          </p>
        </header>
        <div className="models-carousel">
          {models.map((m, i) => (
            <article key={m.name} className="model-card fade-up" style={{animationDelay:`${i*60}ms`}}>
              <div className="model-portrait">
                <image-slot id={`model-${i}`} shape="rect" radius="2px" placeholder={`Portrait ${m.name}`}></image-slot>
                {m.celeb && <span className="badge-celeb">★ Célébrité</span>}
              </div>
              <div className="model-meta">
                <div className="t-body-strong">{m.name}</div>
                <div className="t-caption">{m.tags.join(' · ')}</div>
              </div>
            </article>
          ))}
        </div>
        <div className="models-cta">
          <a className="link" href="#mannequins">Voir tous les mannequins partenaires</a>
          <a className="link" href="#candidature">Vous êtes mannequin ? Postulez</a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   GALLERY — store-style 18px cards (matches design system)
============================================================ */
function Gallery() {
  const items = [
    { brand: 'Maison Élise',   meta: 'Robe d\'été · 1 240 ♥' },
    { brand: 'Volta Mode',     meta: 'Veste cuir · 871 ♥' },
    { brand: 'Refuge',         meta: 'Pull mailles · 642 ♥' },
    { brand: 'ATLAS',          meta: 'Sneakers · 1 893 ♥' },
    { brand: 'Bardot & Sons',  meta: 'Trench · 524 ♥' },
    { brand: 'Studio Noir',    meta: 'Total look · 1 102 ♥' },
    { brand: 'Index Officiel', meta: 'Sac à main · 778 ♥' },
    { brand: 'Lume Studio',    meta: 'Maillot · 446 ♥' },
  ];
  return (
    <section className="tile parchment" id="galerie">
      <div className="wrap">
        <header className="section-head section-head-row">
          <div>
            <div className="t-eyebrow">Galerie publique</div>
            <h2 className="t-display-lg" style={{marginTop: 14}}>
              Vu sur TheFlashMode cette semaine.
            </h2>
          </div>
          <a className="btn btn-secondary-pill" href="#galerie">Explorer la galerie</a>
        </header>
        <div className="gallery-grid">
          {items.map((it, i) => (
            <article key={i} className="store-card fade-up" style={{animationDelay:`${i*40}ms`}}>
              <div className="store-card-img">
                <image-slot id={`g-${i}`} shape="rect" radius="8px" placeholder={`Visuel ${it.brand}`}></image-slot>
              </div>
              <div className="store-card-meta">
                <span className="name">{it.brand}</span>
                <span className="sub">{it.meta}</span>
              </div>
              <a className="link" href="#galerie">Voir</a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   TESTIMONIALS
============================================================ */
function Testimonials() {
  const quotes = [
    { quote: "Pour notre dropshipping mode, on faisait une campagne tous les 3 mois. Maintenant on en sort une par semaine, au même budget annuel.",
      who: 'Camille Vidal', role: 'Co-fondatrice, Maison Élise' },
    { quote: "Le rendu Fashn.ai est bluffant. Mes clients ne distinguent plus les visuels IA des photos studio — et notre taux de conversion a grimpé de 22%.",
      who: 'Marc Estève', role: 'Directeur e-commerce, Volta Mode' },
    { quote: "Le système de royalties est honnête. Mon profil tourne, je gagne sans casting, sans déplacement. C'est un nouveau métier qui se dessine.",
      who: 'Soraya M.', role: 'Mannequin partenaire' },
  ];
  return (
    <section className="tile" id="temoignages">
      <div className="wrap">
        <div className="t-eyebrow">Ils nous utilisent</div>
        <div className="testimonials">
          {quotes.map((q, i) => (
            <figure key={i} className="t-card fade-up" style={{animationDelay:`${i*120}ms`}}>
              <blockquote className="t-display-md" style={{margin: 0, fontWeight: 600}}>
                <span style={{color:'var(--primary)'}}>“</span>{q.quote}<span style={{color:'var(--primary)'}}>”</span>
              </blockquote>
              <figcaption className="t-caption" style={{marginTop: 22}}>
                <strong className="t-body-strong" style={{display:'block', color:'var(--ink)'}}>{q.who}</strong>
                {q.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRICING preview — 4 plans (white cards, featured = ink)
============================================================ */
function Pricing() {
  const plans = [
    { name: 'Free',       price: '0',   period: '/mois', credits: '5 crédits',     desc: 'Pour découvrir. Watermark sur les exports.',           cta: 'Créer un compte',  features: ['5 crédits / mois','Mannequins IA','Export web','—'] },
    { name: 'Starter',    price: '29',  period: '/mois', credits: '50 crédits',    desc: 'Pour les marques émergentes qui sortent une campagne par mois.', cta: 'Commencer Starter', features: ['50 crédits / mois','Mannequins IA + réels','Export HD','10 projets'] },
    { name: 'Pro',        price: '79',  period: '/mois', credits: '200 crédits',   desc: 'Pour les e-commerçants à volume avec workspace équipe.',          cta: 'Choisir Pro',      features: ['200 crédits / mois','Workspace 3 membres','Analytics avancés','Rapports exportables'], featured: true },
    { name: 'Entreprise', price: '199', period: '/mois', credits: 'Illimités',     desc: 'Crédits illimités, accès API, Account Manager dédié.',           cta: 'Parler à un expert', features: ['Crédits illimités','Accès API complet','Account Manager','Workspace illimité'] },
  ];
  return (
    <section className="tile pearl" id="tarifs">
      <div className="wrap">
        <header className="section-head center">
          <div className="t-eyebrow">Tarifs</div>
          <h2 className="t-display-lg" style={{marginTop: 14}}>
            Quatre plans. Aucune surprise.
          </h2>
          <p className="t-lead" style={{marginTop: 18}}>
            1 crédit = 1 session complète = 4 à 8 visuels finaux. Résiliable à tout moment.
          </p>
        </header>
        <div className="pricing">
          {plans.map(p => (
            <article key={p.name} className={"price-card" + (p.featured ? " featured" : "")}>
              {p.featured && <div className="price-flag">Le plus choisi</div>}
              <header className="price-head">
                <div className="t-body-strong">{p.name}</div>
                <div className="price-amount">
                  <span className="t-num" style={{fontFamily:'var(--font-headline)', fontSize: '56px', fontWeight: 'var(--headline-weight)', lineHeight: 1, letterSpacing: '-0.03em'}}>{p.price}</span>
                  <span style={{fontSize: 17, marginLeft: 4, opacity: 0.7}}>€{p.period}</span>
                </div>
                <div className="t-caption price-credits" style={{marginTop: 4}}>{p.credits}</div>
              </header>
              <p className="t-body" style={{minHeight: 64}}>{p.desc}</p>
              <ul className="price-features">
                {p.features.map(f => (
                  <li key={f} className="t-body" style={{fontSize: 15}}>
                    <span className="price-check" aria-hidden="true">✓</span> {f}
                  </li>
                ))}
              </ul>
              <a className={"btn " + (p.featured ? "btn-primary" : "btn-secondary-pill")} href="#essai" style={{width: '100%'}}>{p.cta}</a>
            </article>
          ))}
        </div>
        <div style={{textAlign:'center', marginTop: 32}}>
          <a className="link" href="#tarifs">Voir le détail complet & FAQ</a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   FINAL CTA (dark)
============================================================ */
function FinalCTA() {
  return (
    <section className="tile dark" id="essai" style={{textAlign:'center'}}>
      <div className="wrap-narrow" style={{margin: '0 auto'}}>
        <div className="t-eyebrow">Commencer maintenant</div>
        <h2 className="t-display-lg" style={{marginTop: 18, color:'#fff'}}>
          Cinq crédits offerts. Sans carte bancaire.
        </h2>
        <p className="t-lead" style={{marginTop: 18, marginLeft:'auto', marginRight:'auto'}}>
          Générez votre première campagne mode en moins de deux minutes.
          Vous gardez tous les droits sur vos visuels.
        </p>
        <div style={{display:'flex', gap: 10, justifyContent:'center', marginTop: 28, flexWrap:'wrap'}}>
          <a className="btn btn-primary" href="#inscription">Créer mon compte</a>
          <a className="btn btn-secondary-pill" href="#demo">Demander une démo</a>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   Floating sticky bar — appears as you scroll
============================================================ */
function StickyBar() {
  return (
    <div className="sticky-bar">
      <span className="t-body">
        À partir de <strong>29€/mois</strong> · 50 crédits inclus · résiliable à tout moment.
      </span>
      <a className="btn btn-primary" href="#essai">Commencer</a>
    </div>
  );
}

/* ============================================================
   FOOTER
============================================================ */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <Brand />
          <p className="t-caption" style={{maxWidth: 320, marginTop: 14, lineHeight: 1.5}}>
            Plateforme SaaS de génération de visuels mode par IA.
            Habillez des mannequins générés par IA avec vos propres vêtements.
          </p>
          <form className="newsletter" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Votre email" aria-label="Email" />
            <button className="btn btn-primary" type="submit" style={{padding:'8px 16px', fontSize:14}}>S'abonner</button>
          </form>
        </div>
        <div className="footer-col">
          <h4>Produit</h4>
          <ul>
            <li><a href="#fonctionnement">Fonctionnement</a></li>
            <li><a href="#tarifs">Tarifs</a></li>
            <li><a href="#galerie">Galerie</a></li>
            <li><a href="#mannequins">Mannequins</a></li>
            <li><a href="#api">API</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Mannequins</h4>
          <ul>
            <li><a href="#candidature">Devenir mannequin</a></li>
            <li><a href="#royalties">Royalties</a></li>
            <li><a href="#contrat">Droits à l'image</a></li>
            <li><a href="#celeb">Programme Célébrité</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Ressources</h4>
          <ul>
            <li><a href="#blog">Journal</a></li>
            <li><a href="#cas">Études de cas</a></li>
            <li><a href="#aide">Centre d'aide</a></li>
            <li><a href="#parrain">Parrainage</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Société</h4>
          <ul>
            <li><a href="#about">À propos</a></li>
            <li><a href="#presse">Presse</a></li>
            <li><a href="#carrieres">Carrières</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-legal">
        <span>© 2026 TheFlashMode SAS · Paris · Tous droits réservés.</span>
        <span style={{display:'flex', gap: 18, flexWrap:'wrap'}}>
          <a href="#mentions">Mentions légales</a>
          <a href="#cgu">CGU</a>
          <a href="#confidentialite">Confidentialité</a>
          <a href="#cookies">Cookies</a>
        </span>
      </div>
    </footer>
  );
}

Object.assign(window, {
  Brand, Nav, Hero, LogoStrip, Problem, HowItWorks, Pipeline,
  Models, Gallery, Testimonials, Pricing, FinalCTA, StickyBar, Footer,
});
