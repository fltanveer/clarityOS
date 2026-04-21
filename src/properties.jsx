function PropertiesPane({ company, mode, onClose, onPatch, onUpdateMode }) {
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

  const [form, setForm] = useState(company);
  useEffect(() => setForm(company), [company]);

  const handleChange = (key, val) => setForm(s => ({ ...s, [key]: val }));

  const Field = ({ label, value, badge, children, subtitle, required }) => (
    <div className="field-group" style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <label style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', color: 'var(--fg)' }}>
          {label} {required && '*'}
        </label>
        {badge && <span className="kbd" style={{ fontSize: 9, padding: '1px 4px', background: 'var(--muted)', borderRadius: 3, border: 'none' }}>{badge}</span>}
      </div>
      {subtitle && <div style={{ fontSize: 11, color: 'var(--muted-fg)', marginTop: -4, marginBottom: 8 }}>{subtitle}</div>}
      {children || <input className="v" style={{ width: '100%', height: 38, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--card)', fontSize: 13 }} value={value || ''} readOnly />}
    </div>
  );

  return (
    <aside className="pane props-pane" aria-label="Properties" style={{ width: 340 }}>
      <div className="props-header" style={{ padding: '16px 20px 12px', borderBottom: 'none' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
             <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0 }}>{company.name}</h3>
             <Icons.ChevR size={14} style={{ color: 'var(--muted-fg)' }} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted-fg)', marginTop: 2 }}>Companies</div>
          {mode === 'data' && (
            <div className="badge active" style={{ marginTop: 10, padding: '4px 10px', fontSize: 11, fontWeight: 600 }}>
              DATA Mode • Editing Data
            </div>
          )}
        </div>
      </div>

      <div className="props-body" style={{ padding: '0 20px 100px' }}>
        <div className="prop-section" style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <h4>BASIC INFORMATION</h4>
          <Field label="NAME" badge="SYSTEM" required>
             <input className="v" value={form.name} onChange={e => handleChange('name', e.target.value)} style={{ width: '100%', height: 38, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--card)' }} />
          </Field>
          <Field label="STATUS" badge="SYSTEM">
            <select className="select" style={{ width: '100%', height: 38 }} value={form.status} onChange={e => handleChange('status', e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="draft">Draft</option>
            </select>
          </Field>
        </div>

        <div className="prop-section" style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <h4>COMPANIES PROPERTIES</h4>
          <div style={{ fontSize: 12, color: 'var(--muted-fg)', marginTop: -6, marginBottom: 12 }}>Custom fields for this companies</div>
          <Field label="COMPANY ID" required>
             <input className="v" placeholder="Enter company id" style={{ width: '100%', height: 38, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--card)' }} />
          </Field>
          <Field label="PLURAL NAME">
             <input className="v" placeholder="Sample Field" style={{ width: '100%', height: 38, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--card)' }} />
          </Field>
          <Field label="ABC">
             <input className="v" placeholder="Enter abc" style={{ width: '100%', height: 38, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--card)' }} />
          </Field>
          <Field label="DEF">
             <input className="v" placeholder="Enter def" style={{ width: '100%', height: 38, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--card)' }} />
          </Field>
          <Field label="G">
             <input className="v" placeholder="Enter g" style={{ width: '100%', height: 38, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--card)' }} />
          </Field>
        </div>

        <div className="prop-section" style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <h4>CLASSIFICATIONS</h4>
          <div style={{ fontSize: 12, color: 'var(--muted-fg)', marginTop: -6, marginBottom: 12 }}>1-to-1 classifications for this companies</div>
          <Field label="COMPANY TYPES">
            <select className="select" style={{ width: '100%', height: 38 }} value={form.type} onChange={e => handleChange('type', e.target.value)}>
              <option value="Enterprise">Enterprise</option>
              <option value="SMB">SMB</option>
              <option value="Group">Group</option>
              <option value="Type1">Type1</option>
              <option value="Type2">Type2</option>
              <option value="Type3">Type3</option>
            </select>
            <div style={{ fontSize: 11, color: 'var(--muted-fg)', marginTop: 6 }}>Current: {form.type}</div>
          </Field>
        </div>

        <div className="prop-section" style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
          <h4>METADATA</h4>
          <Field label="CREATED">
            <input className="v" readOnly value={fmtDateTime(company.created)} style={{ width: '100%', height: 38, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--muted)', color: 'var(--fg)' }} />
          </Field>
          <Field label="UPDATED">
            <input className="v" readOnly value={fmtDateTime(company.updated)} style={{ width: '100%', height: 38, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--muted)', color: 'var(--fg)' }} />
          </Field>
          <Field label="ID">
            <div style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--muted)', wordBreak: 'break-all', fontSize: 11.5, fontFamily: 'JetBrains Mono', lineHeight: 1.5, color: 'var(--fg)' }}>
              {company.id}
            </div>
          </Field>
        </div>
      </div>

      <div className="props-footer" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 20px', background: 'var(--bg)', borderTop: '1px solid var(--border)', display: 'flex', gap: 10 }}>
        <button className="btn" style={{ flex: 1, borderColor: '#fee2e2', color: '#ef4444', height: 40, fontWeight: 600 }}>
          <Icons.Trash size={14} style={{ marginRight: 6 }} /> Delete
        </button>
        <button className="btn btn-primary" style={{ flex: 1, height: 40, fontWeight: 600, background: 'var(--selected)', borderColor: 'var(--border-strong)', color: 'var(--fg)' }}>
          <Icons.Save size={14} style={{ marginRight: 6 }} /> Save
        </button>
      </div>
    </aside>
  );
}

Object.assign(window, { PropertiesPane });
