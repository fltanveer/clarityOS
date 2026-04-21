function App() {
  // Persisted tweaks
  const defaults = useMemo(() => {
    try { return JSON.parse(document.getElementById('editmode-defaults').textContent); }
    catch { return { density: 'comfortable', theme: 'light', accentHue: 142, showProperties: true }; }
  }, []);
  const [tweaks, setTweaks] = useState(() => {
    try { return { ...defaults, ...JSON.parse(localStorage.getItem('clarityos:tweaks') || '{}') }; }
    catch { return defaults; }
  });
  useEffect(() => {
    localStorage.setItem('clarityos:tweaks', JSON.stringify(tweaks));
    document.documentElement.setAttribute('data-theme', tweaks.theme);
    document.documentElement.setAttribute('data-density', tweaks.density);
    document.documentElement.style.setProperty('--accent-h', tweaks.accentHue);
  }, [tweaks]);

  const [showTweaks, setShowTweaks] = useState(false);

  // App state
  const [companies, setCompanies] = useState(INITIAL_COMPANIES);
  const [sidebarActive, setSidebarActive] = useState('metrics');
  const [mode, setMode] = useState('model');
  
  // Update hue based on mode
  useEffect(() => {
    setTweaks(s => ({ ...s, accentHue: mode === 'data' ? 221 : 145 }));
  }, [mode]);
  const [tabs, setTabs] = useState(TABS);
  const [activeTab, setActiveTab] = useState('company');
  const [bottomTab, setBottomTab] = useState('companies');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [sort, setSort] = useState({ key: 'updated', dir: 'desc' });
  const [visibleColumns, setVisibleColumns] = useState(DEFAULT_VISIBLE);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(25);

  const filtered = useMemo(() => {
    if (!search.trim()) return companies;
    const q = search.toLowerCase();
    return companies.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.owner.toLowerCase().includes(q) ||
      c.type.toLowerCase().includes(q)
    );
  }, [companies, search]);

  const selected = companies.find(c => c.id === selectedId);

  function patchCompany(id, patch) {
    setCompanies(cs => cs.map(c => c.id === id ? { ...c, ...patch, updated: new Date().toISOString() } : c));
  }
  function closeTab(id) {
    setTabs(ts => {
      const next = ts.filter(t => t.id !== id);
      if (id === activeTab && next.length) setActiveTab(next[0].id);
      return next;
    });
  }

  return (
    <div className="app">
      <Sidebar active={sidebarActive} onSelect={setSidebarActive} />
      <div className="workspace">
        <Topbar mode={mode} setMode={setMode} onToggleTweaks={() => setShowTweaks(s => !s)} />
        <TabBar tabs={tabs} active={activeTab} onSelect={setActiveTab} onClose={closeTab} />

        <div className={`main ${tweaks.showProperties ? '' : 'no-props'}`}>
          <TreePane
            companies={filtered}
            selectedId={selectedId}
            onSelect={setSelectedId}
            search={search}
            setSearch={setSearch}
          />
          <TablePane
            rows={filtered}
            columns={COLUMNS_ALL}
            visibleColumns={visibleColumns}
            setVisibleColumns={setVisibleColumns}
            sort={sort}
            setSort={setSort}
            selectedId={selectedId}
            onSelect={setSelectedId}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            onRefresh={() => {/* noop */}}
          />
          {tweaks.showProperties && (
            <PropertiesPane
              company={selected}
              mode={mode}
              onClose={() => setTweaks(s => ({ ...s, showProperties: false }))}
              onPatch={patchCompany}
            />
          )}
        </div>

        <div className="bottom-tabs">
          {BOTTOM_TABS.map(t => (
            <button key={t.id} className="bottom-tab"
              aria-selected={bottomTab === t.id}
              onClick={() => setBottomTab(t.id)}>
              {t.label}
            </button>
          ))}
          <button className="fab" aria-label="Quick action" onClick={() => setShowTweaks(s => !s)}>
            <Icons.Sparkle size={16} />
          </button>
        </div>
      </div>

      <footer className="status-bar">
        <span className="status-dot" />
        <span className="ok">Ready</span>
        <span>·</span>
        <span>{filtered.length} companies</span>
        {selected && <><span>·</span><span>Selected: {selected.name}</span></>}
        <span className="spacer" />
        <span>App v1.4.81</span>
        <span>·</span>
        <span>Schema 63D.2</span>
        <span>·</span>
        <span>Build 2026-04-22</span>
      </footer>

      {showTweaks && <TweaksPanel state={tweaks} setState={setTweaks} onClose={() => setShowTweaks(false)} />}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
