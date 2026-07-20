/* ═══════════════════════════════════════════════════════════════
   MOMEN Marketing Monitor — App Root
   File: js/app.js
   Defines: window.MomenApp (main React App)
═══════════════════════════════════════════════════════════════ */

window.MomenApp = (function () {
  const { useState } = React;
  const D = window.AppData;
  const C = window.Components;
  const P = window.Pages;

  /* ── NAV CONFIG ── */
  const navItems = [
    { id: 'overview',   icon: '⊞',  label: 'Ringkasan',       section: 'main' },
    { id: 'instagram',  icon: '📷',  label: 'Instagram',       section: 'platform' },
    { id: 'tiktok',     icon: '🎵',  label: 'TikTok',          section: 'platform' },
    { id: 'compare',    icon: '⚖️',  label: 'Perbandingan',    section: 'tools' },
    { id: 'content',    icon: '📝',  label: 'Rencana Konten',  section: 'tools' },
    { id: 'ads',        icon: '📣',  label: 'Ads',             section: 'tools' },
    { id: 'campaign',   icon: '🎯',  label: 'Campaign',        section: 'tools' },
    { id: 'report',     icon: '📊',  label: 'Laporan & Ekspor', section: 'tools' },
  ];

  const pageTitles = {
    overview:  { title: 'Ringkasan Marketing', sub: 'Pantau semua akun Instagram & TikTok Momen dalam satu tempat' },
    instagram: { title: 'Instagram Analytics', sub: 'Performa detail akun-akun Instagram Momen' },
    tiktok:    { title: 'TikTok Analytics',    sub: 'Performa detail akun-akun TikTok Momen' },
    compare:   { title: 'Perbandingan Akun',   sub: 'Bandingkan performa antar akun secara langsung' },
    content:   { title: 'Rencana Konten',      sub: 'Kelola dan rencanakan ide konten marketing' },
    ads:       { title: 'Facebook & TikTok Ads Analytics', sub: 'Pantau biaya iklan, reach, CTR, ROAS, dan status campaign iklan' },
    campaign:  { title: 'Campaign Marketing',      sub: 'Lacak target, realisasi, timeline, dan performa kampanye aktif' },
    report:    { title: 'Laporan & Ekspor',    sub: 'Rekap data dan download laporan kinerja' },
  };

  /* ── SIDEBAR ── */
  function Sidebar({ activePage, onNavigate }) {
    const sections = {
      main: 'Menu Utama',
      platform: 'Platform',
      tools: 'Alat Marketing',
    };

    return (
      <aside className="sidebar">
        {/* Logo */}
        <div className="sidebar-logo-area">
          <div className="sidebar-logo-img">
            <img src="../asset/logo momen 1x1.png" alt="Momen Logo" />
          </div>
          <div className="sidebar-logo-text">
            <div className="sidebar-brand">MOMEN</div>
            <div className="sidebar-tagline">Marketing Monitor</div>
          </div>
        </div>

        {/* Nav */}
        <div className="sidebar-nav" style={{ marginTop: 12 }}>
          {Object.entries(sections).map(([sectionKey, sectionLabel]) => {
            const items = navItems.filter(n => n.section === sectionKey);
            return (
              <div key={sectionKey}>
                <div className="sidebar-section-label">{sectionLabel}</div>
                {items.map(item => (
                  <div
                    key={item.id}
                    className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                    onClick={() => onNavigate(item.id)}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {/* Divider + Footer */}
        <div className="sidebar-divider" />
        <div style={{ padding: '12px 20px 20px', marginTop: 'auto' }}>
          <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.2)', lineHeight: 1.6 }}>
            <div>© 2026 BT Batik Trusmi</div>
            <div style={{ marginTop: 4 }}>Data: Real-time Simulasi</div>
            <div style={{ marginTop: 8, color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: 600 }}>
              Update terakhir:<br/>
              <span style={{ color: 'rgba(201,168,76,0.7)' }}>13 Juli 2026, 15:07</span>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  /* ── TOPBAR ── */
  function TopBar({ activePage }) {
    const info = pageTitles[activePage] || pageTitles.overview;
    const now = new Date();
    const dateStr = now.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    return (
      <header className="topbar">
        <div className="topbar-left">
          <div className="page-title">{info.title}</div>
          <div className="page-subtitle">{info.sub}</div>
        </div>
        <div className="topbar-right">
          <div className="date-range-display">
            📅 {dateStr}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 12px', background: 'var(--gold-pale)', border: '1px solid var(--gold-pale-2)', borderRadius: 8, fontSize: 12, fontWeight: 600, color: 'var(--gold-dark)' }}>
            🟢 Live
          </div>
        </div>
      </header>
    );
  }

  /* ── MAIN APP ── */
  function App() {
    const [activePage, setActivePage] = useState('overview');

    function renderPage() {
      switch (activePage) {
        case 'overview':  return <P.OverviewPage />;
        case 'instagram': return <P.InstagramPage />;
        case 'tiktok':    return <P.TikTokPage />;
        case 'compare':   return <P.ComparePage />;
        case 'content':   return <P.ContentPage />;
        case 'ads':       return <P.AdsPage />;
        case 'campaign':  return <P.CampaignPage />;
        case 'report':    return <P.ReportPage />;
        default:          return <P.OverviewPage />;
      }
    }

    return (
      <div className="app-layout">
        <Sidebar activePage={activePage} onNavigate={setActivePage} />
        <div className="main-content">
          <TopBar activePage={activePage} />
          {renderPage()}
        </div>
      </div>
    );
  }

  return { App };
})();

/* ── MOUNT ── */
const rootEl = document.getElementById('root');
const reactRoot = ReactDOM.createRoot(rootEl);
reactRoot.render(React.createElement(window.MomenApp.App));
