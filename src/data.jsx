// Seed data for the ClarityOS Metrics / Company screen
const INITIAL_COMPANIES = [
  { id: 'c1', name: 'Northwind Trading Co.', type: 'Enterprise', status: 'active', owner: 'Avery Chen', created: '2026-03-19', updated: '2026-03-19T21:34:00', region: 'NA', revenue: '$12.4M', employees: 842, locked: false, tags: ['priority', 'tier-1'] },
  { id: 'c2', name: 'Harbor & Finch Ltd.', type: 'SMB', status: 'active', owner: 'Marcus Ibarra', created: '2026-02-22', updated: '2026-02-22T03:23:00', region: 'EU', revenue: '$3.8M', employees: 112, locked: false, tags: ['new'] },
  { id: 'c3', name: 'Uncat. Companies', type: 'Group', status: 'draft', owner: 'System', created: '2026-02-17', updated: '2026-04-01T02:57:00', region: '—', revenue: '—', employees: 0, locked: true, tags: ['system'] },
  { id: 'c4', name: 'Cedarwood Analytics', type: 'Enterprise', status: 'active', owner: 'Priya Raman', created: '2026-02-15', updated: '2026-02-15T17:56:00', region: 'NA', revenue: '$8.1M', employees: 421, locked: false, tags: ['tier-2'] },
  { id: 'c5', name: 'Meridian Logistics', type: 'Enterprise', status: 'active', owner: 'Sana Okafor', created: '2026-02-05', updated: '2026-02-05T15:33:00', region: 'APAC', revenue: '$21.7M', employees: 1320, locked: false, tags: ['tier-1', 'priority'] },
  { id: 'c6', name: 'Oakley Biotech', type: 'SMB', status: 'inactive', owner: 'Tomás Weiss', created: '2026-01-28', updated: '2026-02-02T09:12:00', region: 'NA', revenue: '$1.1M', employees: 48, locked: false, tags: [] },
  { id: 'c7', name: 'Fieldstone Capital', type: 'Enterprise', status: 'active', owner: 'Avery Chen', created: '2026-01-18', updated: '2026-01-30T11:44:00', region: 'EU', revenue: '$45.2M', employees: 2104, locked: false, tags: ['tier-1'] },
  { id: 'c8', name: 'Lumen & Quill', type: 'SMB', status: 'active', owner: 'Rosa Delacroix', created: '2026-01-10', updated: '2026-01-22T08:02:00', region: 'NA', revenue: '$2.6M', employees: 87, locked: false, tags: ['new'] },
];

const TABS = [
  { id: 'company', label: 'Company' },
  { id: 'account', label: 'Account' },
  { id: 'time', label: 'Time' },
  { id: 'currency', label: 'Currency' },
  { id: 'version', label: 'Version' },
  { id: 'entity', label: 'Entity' },
  { id: 'product', label: 'Product & Service' },
  { id: 'picklist', label: 'Picklist' },
  { id: 'www', label: 'WWW' },
];

const BOTTOM_TABS = [
  { id: 'companies', label: 'Companies' },
  { id: 'types', label: 'Company Types' },
  { id: 'jim', label: 'JIM SUB' },
];

const SIDEBAR_ITEMS = [
  { id: 'metrics', icon: 'Chart', label: 'Metrics' },
  { id: 'assets', icon: 'Box', label: 'Assets' },
  { id: 'revenue', icon: 'Dollar', label: 'Revenue' },
  { id: 'insights', icon: 'Trend', label: 'Insights' },
  { id: 'ledger', icon: 'Stack', label: 'Ledger' },
  { id: 'policies', icon: 'Shield', label: 'Policies' },
  { id: 'flows', icon: 'Workflow', label: 'Flows' },
  { id: 'reports', icon: 'Bars', label: 'Reports' },
];

const COLUMNS_ALL = [
  { id: 'name', label: 'Name', width: 260, always: true },
  { id: 'type', label: 'Type', width: 120 },
  { id: 'status', label: 'Status', width: 110 },
  { id: 'owner', label: 'Owner', width: 160 },
  { id: 'region', label: 'Region', width: 90 },
  { id: 'revenue', label: 'Revenue', width: 110, align: 'right' },
  { id: 'employees', label: 'Employees', width: 110, align: 'right' },
  { id: 'created', label: 'Created', width: 110 },
  { id: 'updated', label: 'Updated', width: 170 },
];

const DEFAULT_VISIBLE = ['name','type','status','owner','revenue','created','updated'];

Object.assign(window, { INITIAL_COMPANIES, TABS, BOTTOM_TABS, SIDEBAR_ITEMS, COLUMNS_ALL, DEFAULT_VISIBLE });
