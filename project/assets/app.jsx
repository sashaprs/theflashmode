// TheFlashMode — App shell with Tweaks
const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "typo": "neutral",
  "hero": "ba-slider",
  "density": "airy"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Apply tweak classes to <body>
  useEffect(() => {
    const b = document.body;
    b.classList.remove('theme-light', 'theme-dark', 'theme-sepia');
    b.classList.add(`theme-${tweaks.theme}`);
    b.classList.remove('type-editorial', 'type-neutral', 'type-display');
    b.classList.add(`type-${tweaks.typo}`);
    b.classList.remove('density-airy', 'density-compact');
    b.classList.add(`density-${tweaks.density}`);
  }, [tweaks.theme, tweaks.typo, tweaks.density]);

  return (
    <React.Fragment>
      <Nav />
      <main>
        <Hero variant={tweaks.hero} />
        <LogoStrip />
        <Problem />
        <HowItWorks />
        <Pipeline />
        <Models />
        <Gallery />
        <Testimonials />
        <Pricing />
        <FinalCTA />
        <StickyBar />
      </main>
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection title="Palette">
          <TweakRadio
            label="Mode"
            value={tweaks.theme}
            onChange={(v) => setTweak('theme', v)}
            options={[
              { value: 'light', label: 'Clair' },
              { value: 'dark', label: 'Sombre' },
              { value: 'sepia', label: 'Sépia' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Typographie des titres">
          <TweakRadio
            label="Style"
            value={tweaks.typo}
            onChange={(v) => setTweak('typo', v)}
            options={[
              { value: 'editorial', label: 'Serif éditorial' },
              { value: 'neutral', label: 'Sans neutre' },
              { value: 'display', label: 'Display bold' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Hero">
          <TweakSelect
            label="Variante"
            value={tweaks.hero}
            onChange={(v) => setTweak('hero', v)}
            options={[
              { value: 'ba-slider', label: 'Slider avant / après (interactif)' },
              { value: 'video-loop', label: 'Vidéo loop (4 étapes)' },
              { value: 'static', label: 'Image fixe — campagne' },
            ]}
          />
        </TweakSection>
        <TweakSection title="Densité">
          <TweakRadio
            label="Espacement"
            value={tweaks.density}
            onChange={(v) => setTweak('density', v)}
            options={[
              { value: 'airy', label: 'Aéré premium' },
              { value: 'compact', label: 'Compact business' },
            ]}
          />
        </TweakSection>
      </TweaksPanel>
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
