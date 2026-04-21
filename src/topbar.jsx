function Topbar({ mode, setMode, onToggleTweaks }) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span className="crumb">ClarityOS</span>
        <span className="sep"><Icons.ChevR size={12} /></span>
        <span className="crumb">Metrics</span>
        <span className="sep"><Icons.ChevR size={12} /></span>
        <span className="crumb current">Company</span>
      </div>
      <div className="topbar-right">
        <div className="seg" role="tablist" aria-label="View mode">
          <button aria-pressed={mode === 'model'} onClick={() => setMode('model')}>MODEL</button>
          <button aria-pressed={mode === 'data'} onClick={() => setMode('data')}>DATA</button>
        </div>
        <Tooltip label="Help" side="bottom"><button className="icon-btn"><Icons.Help size={16} /></button></Tooltip>
        <Tooltip label="Settings" side="bottom"><button className="icon-btn" onClick={onToggleTweaks}><Icons.Gear size={16} /></button></Tooltip>
        <button className="user-chip">
          <span className="avatar">JC</span>
          <span>jack@clarityos.com</span>
          <Icons.ChevD size={12} />
        </button>
      </div>
    </header>
  );
}

function TabBar({ tabs, active, onSelect, onClose }) {
  return (
    <div className="tabs" role="tablist" aria-label="Workspace tabs">
      {tabs.map(t => (
        <button
          key={t.id}
          className="tab"
          role="tab"
          aria-selected={t.id === active}
          onClick={() => onSelect(t.id)}
        >
          <span>{t.label}</span>
          <span
            className="close"
            onClick={(e) => { e.stopPropagation(); onClose(t.id); }}
          >
            <Icons.X size={10} />
          </span>
        </button>
      ))}
      <button className="tab-add" aria-label="Add tab"><Icons.Plus size={14} /></button>
    </div>
  );
}

Object.assign(window, { Topbar, TabBar });
