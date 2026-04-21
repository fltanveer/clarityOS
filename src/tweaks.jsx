function TweaksPanel({ state, setState, onClose }) {
  const hues = [142, 221, 262, 24, 0, 200, 330];
  return (
    <div className="tweaks" role="dialog" aria-label="Tweaks">
      <header>
        <span>Tweaks</span>
        <button className="icon-btn" onClick={onClose}><Icons.X size={14} /></button>
      </header>
      <div className="body">
        <div>
          <label>Theme</label>
          <div className="row">
            {['light','dark'].map(t => (
              <button key={t} className="pill" aria-pressed={state.theme === t}
                onClick={() => setState(s => ({ ...s, theme: t }))}>{t}</button>
            ))}
          </div>
        </div>
        <div>
          <label>Density</label>
          <div className="row">
            {['compact','comfortable','relaxed'].map(d => (
              <button key={d} className="pill" aria-pressed={state.density === d}
                onClick={() => setState(s => ({ ...s, density: d }))}>{d}</button>
            ))}
          </div>
        </div>
        <div>
          <label>Accent</label>
          <div className="swatches">
            {hues.map(h => (
              <button key={h} className="swatch"
                aria-pressed={state.accentHue === h}
                style={{ background: `hsl(${h} 70% 45%)` }}
                onClick={() => setState(s => ({ ...s, accentHue: h }))}
              />
            ))}
          </div>
        </div>
        <div>
          <label>Properties panel</label>
          <div className="row">
            {[['on',true],['off',false]].map(([k,v]) => (
              <button key={k} className="pill" aria-pressed={state.showProperties === v}
                onClick={() => setState(s => ({ ...s, showProperties: v }))}>{k}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { TweaksPanel });
