function Sidebar({ active, onSelect }) {
  return (
    <nav className="sidebar" aria-label="Primary">
      <div className="logo">C</div>
      {SIDEBAR_ITEMS.map(item => {
        const Icon = Icons[item.icon];
        return (
          <Tooltip key={item.id} label={item.label} side="right">
            <button
              className="sidebar-btn"
              aria-current={active === item.id ? 'page' : undefined}
              onClick={() => onSelect(item.id)}
            >
              <Icon size={16} />
            </button>
          </Tooltip>
        );
      })}
      <div className="sidebar-spacer" />
      <Tooltip label="Compose" side="right">
        <button className="sidebar-btn"><Icons.Pencil size={16} /></button>
      </Tooltip>
      <Tooltip label="Settings" side="right">
        <button className="sidebar-btn"><Icons.Gear size={16} /></button>
      </Tooltip>
    </nav>
  );
}

Object.assign(window, { Sidebar });
