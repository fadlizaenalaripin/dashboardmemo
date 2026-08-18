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
            background: 'rgba(0,0,0,0.5)',
            zIndex: 190,
            backdropFilter: 'blur(2px)',
            transition: 'opacity 0.3s'
          }}
        />
      )}
      <aside className={`sidebar${mobileOpen ? ' mobile-open' : ''}`}>
        <div className="sb-logo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div className="sb-logo-img" style={{ background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
              <img src="/asset/logo-momen.png" alt="Momen" style={{ width: '34px', height: '34px', objectFit: 'contain' }} />
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
              fontSize: 20,
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              display: 'none',
              outline: 'none'
            }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        
        <div className="sb-nav" style={{ marginTop: 10 }}>
          {Object.entries(secs).map(([key, label], idx) => (
            <div key={key}>
              {idx > 0 && <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', margin: '8px 10px' }} />}
              <div className="sb-section" style={{ padding: '8px 12px 4px' }}>{label}</div>
              {NAV.filter(n => n.sec === key).map(n => (
                <div key={n.id} className={`nav-item${active === n.id ? ' active' : ''}`} onClick={() => { onNav(n.id); onClose(); }}>
                  <span className="nav-icon" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={n.id} />
                  </span>
                  <span>{n.label}</span>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 'auto',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--gold)',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '12px',
              fontWeight: 800
            }}>
              RA
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>Rizki Ananda</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>Marketing Manager</div>
            </div>
          </div>
          <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>▼</span>
        </div>

        <div className="sb-footer" style={{ borderTop: 'none', paddingTop: 0 }}>
          © 2026 BT Batik Trusmi<br />
          Update: <span>15 Juli 2026, 15:07</span>
        </div>
      </aside>
    </>
  );
}
