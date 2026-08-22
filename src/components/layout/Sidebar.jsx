import { NAV } from '../../data/mockData.js';
import { Icon } from './Icon.jsx';

export function Sidebar({ active, onNav, mobileOpen, onClose }) {
  const secs = {
    overview: 'Overview',
    sales: 'SALES',
    marketing: 'MARKETING',
    product: 'PRODUCT',
    customer: 'CUSTOMER POV',
    reporting: 'REPORTING'
  };

  return (
    <>
      {mobileOpen && (
        <div 
          onClick={onClose} 
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(9, 13, 22, 0.75)',
            zIndex: 190,
            backdropFilter: 'blur(4px)',
            transition: 'opacity 0.3s'
          }}
        />
      )}
      <aside className={`sidebar${mobileOpen ? ' mobile-open' : ''}`}>
        <div className="sb-logo">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div className="sb-logo-img">
                <img src="/asset/logo-momen.png" alt="Momen" />
              </div>
              <div>
                <div className="sb-brand">MOMEN</div>
                <div className="sb-tagline">Dashboard Monitor</div>
              </div>
            </div>
            <button 
              className="mobile-toggle"
              style={{
                background: 'none',
                border: 'none',
                fontSize: 18,
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'none',
                outline: 'none'
              }}
              onClick={onClose}
            >
              ✕
            </button>
          </div>
        </div>
        
        <div className="sb-nav">
          {Object.entries(secs).map(([key, label], idx) => (
            <div key={key}>
              {idx > 0 && <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', margin: '10px 8px' }} />}
              <div className="sb-section">{label}</div>
              {NAV.filter(n => n.sec === key).map(n => (
                <div 
                  key={n.id} 
                  className={`nav-item${active === n.id ? ' active' : ''}`} 
                  onClick={() => { onNav(n.id); onClose(); }}
                >
                  <span className="nav-icon">
                    <Icon name={n.id} />
                  </span>
                  <span>{n.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="sb-user-card" style={{ cursor: 'pointer' }}>
          <div className="sb-avatar">RA</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-white)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Rizki Ananda
            </div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: '1px' }}>
              Marketing Manager
            </div>
          </div>
          <span style={{ fontSize: 10, color: 'var(--text-dim)' }}>▼</span>
        </div>

        <div className="sb-footer">
          © 2026 BT Batik Trusmi<br />
          Update: <span>15 Juli 2026, 15:07</span>
        </div>
      </aside>
    </>
  );
}
