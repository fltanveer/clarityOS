// Lightweight inline SVG icons, lucide-style (shadcn uses lucide).
const Ico = ({ d, size = 14, stroke = 1.75, children, viewBox = "0 0 24 24", style }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none" stroke="currentColor"
    strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" style={style}>
    {d ? <path d={d} /> : children}
  </svg>
);

const Icons = {
  Chart: (p) => <Ico {...p}><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 5-6"/></Ico>,
  Box: (p) => <Ico {...p}><path d="M21 8l-9-5-9 5 9 5 9-5z"/><path d="M3 8v8l9 5 9-5V8"/><path d="M12 13v8"/></Ico>,
  Dollar: (p) => <Ico {...p}><path d="M12 2v20"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></Ico>,
  Trend: (p) => <Ico {...p}><path d="M22 7L13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/></Ico>,
  Stack: (p) => <Ico {...p}><rect x="3" y="4" width="18" height="4" rx="1"/><rect x="3" y="10" width="18" height="4" rx="1"/><rect x="3" y="16" width="18" height="4" rx="1"/></Ico>,
  Shield: (p) => <Ico {...p}><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z"/></Ico>,
  Workflow: (p) => <Ico {...p}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><path d="M10 6.5h4a3 3 0 0 1 3 3V14"/></Ico>,
  Bars: (p) => <Ico {...p}><path d="M7 19V9"/><path d="M12 19V5"/><path d="M17 19v-6"/></Ico>,
  Gear: (p) => <Ico {...p}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></Ico>,
  Pencil: (p) => <Ico {...p}><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></Ico>,

  Search: (p) => <Ico {...p}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></Ico>,
  Plus: (p) => <Ico {...p}><path d="M12 5v14M5 12h14"/></Ico>,
  Minus: (p) => <Ico {...p}><path d="M5 12h14"/></Ico>,
  X: (p) => <Ico {...p}><path d="M18 6L6 18M6 6l12 12"/></Ico>,
  Check: (p) => <Ico {...p}><path d="M20 6L9 17l-5-5"/></Ico>,
  ChevR: (p) => <Ico {...p}><path d="M9 18l6-6-6-6"/></Ico>,
  ChevL: (p) => <Ico {...p}><path d="M15 18l-6-6 6-6"/></Ico>,
  ChevD: (p) => <Ico {...p}><path d="M6 9l6 6 6-6"/></Ico>,
  ChevDD: (p) => <Ico {...p}><path d="M7 13l5 5 5-5"/><path d="M7 6l5 5 5-5"/></Ico>,
  ChevUU: (p) => <Ico {...p}><path d="M7 11l5-5 5 5"/><path d="M7 18l5-5 5 5"/></Ico>,
  Dots: (p) => <Ico {...p}><circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/></Ico>,
  DotsV: (p) => <Ico {...p}><circle cx="12" cy="5" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="12" cy="19" r="1.2"/></Ico>,
  Download: (p) => <Ico {...p}><path d="M12 3v12"/><path d="M7 10l5 5 5-5"/><path d="M5 21h14"/></Ico>,
  Upload: (p) => <Ico {...p}><path d="M12 21V9"/><path d="M7 14l5-5 5 5"/><path d="M5 3h14"/></Ico>,
  Columns: (p) => <Ico {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/></Ico>,
  Filter: (p) => <Ico {...p}><path d="M22 3H2l8 9.5V19l4 2v-8.5L22 3z"/></Ico>,
  Sort: (p) => <Ico {...p}><path d="M3 6h18"/><path d="M6 12h12"/><path d="M10 18h4"/></Ico>,
  Refresh: (p) => <Ico {...p}><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></Ico>,
  Folder: (p) => <Ico {...p}><path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></Ico>,
  FolderOpen: (p) => <Ico {...p}><path d="M3 6a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v1H3z"/><path d="M3 9h18l-2.5 8.5a2 2 0 0 1-1.9 1.5H5.4a2 2 0 0 1-1.9-1.5L3 9z"/></Ico>,
  File: (p) => <Ico {...p}><path d="M13 2H5a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10z"/><path d="M13 2v8h8"/></Ico>,
  Lock: (p) => <Ico {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Ico>,
  Help: (p) => <Ico {...p}><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2.5 2-2.5 4"/><path d="M12 17h.01"/></Ico>,
  Sparkle: (p) => <Ico {...p}><path d="M12 3v3M12 18v3M5 12H2M22 12h-3M6 6l2 2M16 16l2 2M6 18l2-2M16 8l2-2"/></Ico>,
  PanelLeft: (p) => <Ico {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16"/></Ico>,
  PanelRight: (p) => <Ico {...p}><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M15 4v16"/></Ico>,
  List: (p) => <Ico {...p}><path d="M8 6h13M8 12h13M8 18h13"/><circle cx="4" cy="6" r="1"/><circle cx="4" cy="12" r="1"/><circle cx="4" cy="18" r="1"/></Ico>,
  Tree: (p) => <Ico {...p}><rect x="3" y="4" width="6" height="6" rx="1"/><rect x="15" y="14" width="6" height="6" rx="1"/><path d="M6 10v4a2 2 0 0 0 2 2h7"/></Ico>,
  Circle: (p) => <Ico {...p}><circle cx="12" cy="12" r="9"/></Ico>,
  Tag: (p) => <Ico {...p}><path d="M20.5 13.5L13 21l-9-9V4h8z"/><circle cx="8" cy="8" r="1.2"/></Ico>,
};

Object.assign(window, { Ico, Icons });
