function TreePane({ companies, selectedId, onSelect, search, setSearch }) {
  const [open, setOpen] = useState(true);
  const [allExpanded, setAllExpanded] = useState(true);

  const filtered = useMemo(() => {
    if (!search.trim()) return companies;
    const q = search.toLowerCase();
    return companies.filter(c => c.name.toLowerCase().includes(q));
  }, [companies, search]);

  return (
    <aside className="pane tree-pane" aria-label="Member tree">
      <div className="toolbar" style={{ gap: 6 }}>
        <button className="btn btn-primary btn-sm" style={{ flex: 1 }}>
          <Icons.Plus size={14} /> Add Company
        </button>
        <button className="btn btn-sm btn-icon" aria-label="More">
          <Icons.Dots size={14} />
        </button>
      </div>

      <div style={{ padding: '0 12px 8px', display: 'flex', gap: 6 }}>
        <div className="search" style={{ flex: 1 }}>
          <Icons.Search size={13} />
          <input
            placeholder="Search members…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="kbd">⌘K</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 4, padding: '0 12px 4px' }}>
        <button className="btn btn-sm btn-ghost" style={{ flex: 1, justifyContent: 'flex-start' }}>
          <Icons.Download size={13} /> Export
        </button>
        <button className="btn btn-sm btn-ghost" style={{ flex: 1, justifyContent: 'flex-start' }}>
          <Icons.Upload size={13} /> Import
        </button>
      </div>

      <div className="tree-toolbar">
        <span>Members · {filtered.length}</span>
        <div className="actions">
          <button onClick={() => setAllExpanded(true)}>Expand</button>
          <button onClick={() => setAllExpanded(false)}>Collapse</button>
        </div>
      </div>

      <div className="tree">
        <div
          className="tree-node"
          onClick={() => setOpen(!open)}
          role="treeitem"
          aria-expanded={open}
        >
          <span className={`chev ${open ? 'open' : ''}`}><Icons.ChevR size={12} /></span>
          <span className="ico">{open ? <Icons.FolderOpen size={14} /> : <Icons.Folder size={14} />}</span>
          <span className="name" style={{ fontWeight: 500 }}>Companies</span>
          <span className="count">{filtered.length}</span>
        </div>
        {open && allExpanded && (
          <div className="tree-children">
            {filtered.map(c => (
              <div
                key={c.id}
                className={`tree-node ${selectedId === c.id ? 'selected' : ''}`}
                onClick={() => onSelect(c.id)}
                role="treeitem"
                aria-selected={selectedId === c.id}
              >
                <span className="chev hidden"><Icons.ChevR size={12} /></span>
                <span className="ico">
                  {c.locked ? <Icons.Lock size={13} /> : <Icons.File size={13} />}
                </span>
                <span className="name">{c.name}</span>
                <span className="meta">{c.type}</span>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ padding: '16px 12px', color: 'var(--muted-fg)', fontSize: 12 }}>
                No matches
              </div>
            )}
          </div>
        )}
      </div>
    </aside>
  );
}

Object.assign(window, { TreePane });
