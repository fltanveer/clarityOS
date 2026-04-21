// Shared primitives — tooltip, popover, status badge, date formatting
const { useState, useEffect, useRef, useCallback, useMemo } = React;

function Tooltip({ children, label, side = 'right' }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  return (
    <span
      ref={ref}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      style={{ position: 'relative', display: 'inline-flex' }}
    >
      {children}
      {show && (
        <span style={{
          position: 'absolute',
          [side === 'right' ? 'left' : side === 'left' ? 'right' : 'left']: side === 'right' ? 'calc(100% + 10px)' : side === 'left' ? 'calc(100% + 10px)' : '50%',
          [side === 'top' ? 'bottom' : side === 'bottom' ? 'top' : 'top']: side === 'top' || side === 'bottom' ? 'calc(100% + 8px)' : '50%',
          transform: side === 'right' || side === 'left' ? 'translateY(-50%)' : 'translateX(-50%)',
          background: 'var(--fg)',
          color: 'var(--bg)',
          padding: '4px 8px',
          borderRadius: 5,
          fontSize: 11.5,
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 200,
          boxShadow: 'var(--shadow)',
        }}>
          {label}
        </span>
      )}
    </span>
  );
}

function useClickOutside(ref, onClose) {
  useEffect(() => {
    function onDown(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [ref, onClose]);
}

function Popover({ open, onClose, anchor, children, align = 'left' }) {
  const ref = useRef(null);
  useClickOutside(ref, () => open && onClose());
  if (!open) return null;
  const r = anchor?.getBoundingClientRect?.();
  if (!r) return null;
  const style = {
    top: r.bottom + 6,
    [align === 'right' ? 'right' : 'left']:
      align === 'right' ? window.innerWidth - r.right : r.left,
  };
  return (
    <div ref={ref} className="popover" style={style}>{children}</div>
  );
}

function StatusBadge({ status }) {
  if (status === 'active') return <span className="badge active"><span className="pip" />Active</span>;
  if (status === 'draft') return <span className="badge inactive"><span className="pip" />Draft</span>;
  return <span className="badge inactive"><span className="pip" />Inactive</span>;
}

function fmtDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso.includes('T') ? iso : iso + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}
function fmtDateTime(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (isNaN(d)) return fmtDate(iso);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
}

Object.assign(window, { Tooltip, Popover, useClickOutside, StatusBadge, fmtDate, fmtDateTime });
