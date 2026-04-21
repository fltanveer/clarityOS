function TablePane({
  rows, columns, visibleColumns, setVisibleColumns,
  sort, setSort,
  selectedId, onSelect,
  page, setPage, pageSize, setPageSize,
  onRefresh
}) {
  const [colsOpen, setColsOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const colsRef = useRef(null);
  const filterRef = useRef(null);

  const sorted = useMemo(() => {
    const copy = [...rows];
    if (!sort.key) return copy;
    copy.sort((a, b) => {
      const A = a[sort.key]; const B = b[sort.key];
      if (A === B) return 0;
      return (A > B ? 1 : -1) * (sort.dir === 'asc' ? 1 : -1);
    });
    return copy;
  }, [rows, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paged = sorted.slice(page * pageSize, (page + 1) * pageSize);

  const shownCols = columns.filter(c => visibleColumns.includes(c.id));

  function toggleSort(key) {
    setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });
  }

  function renderCell(col, row) {
    switch (col.id) {
      case 'name':
        return (
          <span className="cell-primary">
            <span className={`dot ${row.locked ? 'locked' : ''}`} />
            {row.name}
          </span>
        );
      case 'status': return <StatusBadge status={row.status} />;
      case 'owner': return <span>{row.owner}</span>;
      case 'type': return <span className="cell-muted">{row.type}</span>;
      case 'region': return <span className="cell-muted">{row.region}</span>;
      case 'revenue': return <span className="mono" style={{fontVariantNumeric:'tabular-nums'}}>{row.revenue}</span>;
      case 'employees': return <span className="mono" style={{fontVariantNumeric:'tabular-nums'}}>{row.employees.toLocaleString()}</span>;
      case 'created': return <span className="cell-date">{fmtDate(row.created)}</span>;
      case 'updated': return <span className="cell-date">{fmtDateTime(row.updated)}</span>;
      default: return row[col.id];
    }
  }

  return (
    <section className="pane table-pane" aria-label="Companies table">
      <div className="table-toolbar">
        <button ref={filterRef} className="btn btn-sm" onClick={() => setFilterOpen(o => !o)}>
          <Icons.Filter size={13} /> Filter
          <span style={{ color: 'var(--muted-fg)', marginLeft: 4 }}>·</span>
          <span className="mono" style={{ fontSize: 11 }}>0</span>
        </button>
        <button className="btn btn-sm">
          <Icons.Sort size={13} /> Sort
        </button>
        <div className="divider-v" />
        <button className="btn btn-sm btn-ghost"><Icons.Download size={13} /> Export</button>
        <button className="btn btn-sm btn-ghost"><Icons.Upload size={13} /> Import</button>
        <div className="spacer" />
        <button ref={colsRef} className="btn btn-sm" onClick={() => setColsOpen(o => !o)}>
          <Icons.Columns size={13} /> Columns
        </button>
        <Tooltip label="Refresh" side="bottom">
          <button className="btn btn-sm btn-icon" onClick={onRefresh}>
            <Icons.Refresh size={13} />
          </button>
        </Tooltip>
      </div>

      <Popover open={colsOpen} anchor={colsRef.current} onClose={() => setColsOpen(false)} align="right">
        <div style={{ padding: '6px 10px', fontSize: 11, color: 'var(--muted-fg)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Toggle columns</div>
        {columns.map(c => {
          const on = visibleColumns.includes(c.id);
          return (
            <button
              key={c.id}
              className="item"
              aria-checked={on}
              disabled={c.always}
              onClick={() => {
                if (c.always) return;
                setVisibleColumns(v => on ? v.filter(x => x !== c.id) : [...v, c.id]);
              }}
            >
              <span style={{ opacity: c.always ? 0.5 : 1 }}>{c.label}</span>
              <Icons.Check size={13} className="check" />
            </button>
          );
        })}
      </Popover>

      <Popover open={filterOpen} anchor={filterRef.current} onClose={() => setFilterOpen(false)}>
        <div style={{ padding: 6, minWidth: 240 }}>
          <div style={{ fontSize: 11, color: 'var(--muted-fg)', textTransform: 'uppercase', letterSpacing: '0.06em', padding: '4px 6px 8px' }}>Add filter</div>
          {['Status is Active','Type is Enterprise','Region is NA','Owner is me','Updated this week'].map(f => (
            <button key={f} className="item">
              <Icons.Plus size={12} style={{color:'var(--muted-fg)'}} /> {f}
            </button>
          ))}
        </div>
      </Popover>

      <div className="table-wrap">
        <table className="data">
          <thead>
            <tr>
              {shownCols.map(c => (
                <th key={c.id} style={{ width: c.width, textAlign: c.align || 'left' }}>
                  <span className="th-inner" onClick={() => toggleSort(c.id)}>
                    {c.label}
                    {sort.key === c.id && (
                      <Icons.ChevD size={11} style={{ transform: sort.dir === 'asc' ? 'rotate(180deg)' : 'none' }} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paged.map(row => (
              <tr
                key={row.id}
                className={selectedId === row.id ? 'selected' : ''}
                onClick={() => onSelect(row.id)}
              >
                {shownCols.map(c => (
                  <td key={c.id} style={{ textAlign: c.align || 'left' }}>{renderCell(c, row)}</td>
                ))}
              </tr>
            ))}
            {paged.length === 0 && (
              <tr><td colSpan={shownCols.length} style={{ padding: 48, textAlign: 'center', color: 'var(--muted-fg)' }}>
                No companies match your filters.
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span>{sorted.length} {sorted.length === 1 ? 'row' : 'rows'}</span>
        <div className="divider-v" />
        <span>Page size</span>
        <select className="select" value={pageSize} onChange={e => { setPageSize(+e.target.value); setPage(0); }}>
          {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <div className="spacer" />
        <span>Page {page + 1} of {totalPages}</span>
        <div className="pager">
          <button onClick={() => setPage(0)} disabled={page === 0}><Icons.ChevL size={12} /><Icons.ChevL size={12} style={{marginLeft:-8}} /></button>
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}><Icons.ChevL size={12} /></button>
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}><Icons.ChevR size={12} /></button>
          <button onClick={() => setPage(totalPages - 1)} disabled={page >= totalPages - 1}><Icons.ChevR size={12} /><Icons.ChevR size={12} style={{marginLeft:-8}} /></button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { TablePane });
