function PropertiesPane({ company, onClose, onPatch }) {
  if (!company) {
    return (
      <aside className="pane props-pane">
        <div className="props-header">
          <h3>Properties</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Hide panel">
            <Icons.PanelRight size={14} />
          </button>
        </div>
        <div className="props-empty">
          <div className="icon-wrap"><Icons.Tag size={18} style={{ color: 'var(--muted-fg)' }}/></div>
          <div className="title">No selection</div>
          <div className="sub">Select a company in the table to view and edit its properties.</div>
        </div>
      </aside>
    );
  }

  const [editing, setEditing] = useState(null);
  const [draft, setDraft] = useState('');

  function startEdit(field) {
    setEditing(field);
    setDraft(String(company[field] ?? ''));
  }
  function commit() {
    if (editing) onPatch(company.id, { [editing]: draft });
    setEditing(null);
  }

  const row = (key, label, val, opts = {}) => (
    <div className="prop-row">
      <span className="k">{label}</span>
      {editing === key ? (
        <input
          className="v"
          autoFocus
          value={draft}
          onChange={e => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(null); }}
        />
      ) : opts.plain ? (
        <span className="v">{val}</span>
      ) : (
        <span className="v editable" onClick={() => startEdit(key)}>{val}</span>
      )}
    </div>
  );

  return (
    <aside className="pane props-pane" aria-label="Properties">
      <div className="props-header">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
          <h3 style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{company.name}</h3>
          <div style={{ fontSize: 11.5, color: 'var(--muted-fg)' }}>
            <span className="mono">{company.id}</span> · {company.type}
          </div>
        </div>
        <button className="icon-btn" onClick={onClose} aria-label="Hide panel">
          <Icons.PanelRight size={14} />
        </button>
      </div>

      <div className="props-body">
        <div className="prop-section">
          <h4>General</h4>
          {row('name', 'Name', company.name)}
          {row('type', 'Type', company.type)}
          <div className="prop-row">
            <span className="k">Status</span>
            <span className="v"><StatusBadge status={company.status} /></span>
          </div>
          {row('owner', 'Owner', company.owner)}
          {row('region', 'Region', company.region)}
        </div>

        <div className="prop-section">
          <h4>Metrics</h4>
          {row('revenue', 'Revenue', company.revenue)}
          {row('employees', 'Employees', company.employees.toLocaleString())}
        </div>

        <div className="prop-section">
          <h4>Timestamps</h4>
          {row('created', 'Created', fmtDate(company.created), { plain: true })}
          {row('updated', 'Updated', fmtDateTime(company.updated), { plain: true })}
        </div>

        <div className="prop-section">
          <h4>Tags</h4>
          <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
            {company.tags.length === 0 && <span style={{ color: 'var(--muted-fg)', fontSize: 12 }}>No tags</span>}
            {company.tags.map(t => (
              <span key={t} className="badge">{t}</span>
            ))}
            <button className="badge" style={{ cursor: 'pointer' }}><Icons.Plus size={10} /> Add</button>
          </div>
        </div>
      </div>

      <div className="props-actions">
        <button className="btn btn-sm"><Icons.Pencil size={12} /> Edit</button>
        <button className="btn btn-sm"><Icons.Dots size={12} /> More</button>
      </div>
    </aside>
  );
}

Object.assign(window, { PropertiesPane });
