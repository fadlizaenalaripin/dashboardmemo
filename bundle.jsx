const { useState, useEffect, useRef, useMemo } = React;

// --- Module: src/data/mockData.js ---
const DATA = {
  period: '01 – 13 Juli 2026',
  compare: '1 – 13 Juni 2026',
  lastUpdate: '13 Juli 2026 · 15:07',
  salesOverview: {
    target: 'Rp 540.000.000',
    achievement: { pct: '37,38%', value: 'Rp 201.838.726' },
    qty: { value: '1.248', change: -8.3 },
    transaksi: { value: '236', change: 12.6 },
    basket: { value: 'Rp 855.248', change: 5.2 },
  },
  trendLabels: Array.from({length:13},(_,i)=> `${i+1} Jul`),
  trendTarget: [12,25,37,50,62,75,87,100,112,125,137,150,162].map(v=>v*1000000),
  trendActual: [8,18,30,45,58,70,82,95,108,120,135,148,162].map(v=>v*985000),
  breakdown: {
    channel: {
      labels: ['WhatsApp','Instagram','Marketplace','Offline Store','Lainnya'],
      data: [45.7,27.3,15.5,8.6,2.9],
      colors: ['#C9A84C','#E8C878','#A07830','#8B6914','#4a3a10'],
    },
    produk: {
      labels: ['Momen Men','Momen Women','Accessories','Limited Ed.'],
      data: [62.1,21.3,9.8,6.8],
      colors: ['#C9A84C','#E8C878','#A07830','#8B6914'],
    },
    customer: {
      labels: ['New Customer','Repeat Customer'],
      data: [64.2,35.8],
      colors: ['#C9A84C','#8B6914'],
    },
    area: {
      labels: ['Jawa Barat','Jawa Tengah','Jabodetabek','Jawa Timur','Lainnya'],
      data: [48.2,22.7,18.6,6.1,4.4],
      colors: ['#C9A84C','#E8C878','#A07830','#8B6914','#4a3a10'],
    },
  },
  bestSeller: [
    { rank:1, name:'Kemeja Batik Momen Classic', qty:248, revenue:'Rp 42.350.000' },
    { rank:2, name:'Outer Batik Momen Premium', qty:186, revenue:'Rp 35.180.000' },
    { rank:3, name:'Tunik Batik Wanita Momen', qty:152, revenue:'Rp 28.920.000' },
    { rank:4, name:'Hem Batik Lengan Pendek', qty:134, revenue:'Rp 21.480.000' },
    { rank:5, name:'Scarf Batik Eksklusif', qty:98, revenue:'Rp 15.760.000' },
  ],
  leads: {
    total: { value: '1.842', change: 14.2 },
    qualified: { value: '612', change: 9.8 },
    kontak: { value: '418', change: 6.4 },
    transaksi: '236',
    conversionRate: '12,8%',
    closingRate: '38,5%',
    winRate: '56,5%',
  },
  channelBar: {
    labels: ['WhatsApp','Instagram','Marketplace','Offline Store','Lainnya'],
    data: [92.1,54.9,31.2,17.3,6.3],
  },
};

const NAV = [
  // Overview
  { id: 'overview', icon: '🖥️', label: 'Executive Dashboard', sec: 'overview' },
  { id: 'insight', icon: '💡', label: 'Insight & Improvement', sec: 'overview' },
  
  // SALES
  { id: 'sales_dashboard', icon: '📊', label: 'Sales Dashboard', sec: 'sales' },
  { id: 'target_achievement', icon: '🎯', label: 'Target & Achievement', sec: 'sales' },
  { id: 'funnel_leads', icon: '⏳', label: 'Funnel & Leads', sec: 'sales' },
  { id: 'product_sales', icon: '🛍️', label: 'Product Sales', sec: 'sales' },
  { id: 'sales_database', icon: '🗄️', label: 'Sales Database', sec: 'sales' },
  
  // MARKETING
  { id: 'marketing_dashboard', icon: '📢', label: 'Marketing Dashboard', sec: 'marketing' },
  { id: 'social_media', icon: '📈', label: 'Social Media Analytics', sec: 'marketing' },
  { id: 'campaign_content', icon: '📝', label: 'Campaign & Content', sec: 'marketing' },
  { id: 'ads_performance', icon: '📣', label: 'Ads Performance', sec: 'marketing' },
  { id: 'budget_roi', icon: '💰', label: 'Budget & ROI', sec: 'marketing' },
  
  // PRODUCT
  { id: 'product_dashboard', icon: '📦', label: 'Product Dashboard', sec: 'product' },
  { id: 'product_readiness', icon: '✅', label: 'Product Readiness', sec: 'product' },
  { id: 'quality_execution', icon: '🎖️', label: 'Quality & Execution', sec: 'product' },
  { id: 'stock_availability', icon: '🏬', label: 'Stock & Availability', sec: 'product' },
  
  // CUSTOMER POV
  { id: 'customer_journey', icon: '👣', label: 'Customer Journey', sec: 'customer' },
  { id: 'rating_review', icon: '⭐', label: 'Rating & Review', sec: 'customer' },
  { id: 'complaint_management', icon: '📂', label: 'Complaint Management', sec: 'customer' },
  { id: 'retention_repeat', icon: '🔄', label: 'Retention & Repeat Order', sec: 'customer' },
  { id: 'voice_customer', icon: '🗣️', label: 'Voice of Customer', sec: 'customer' },
  
  // REPORTING
  { id: 'report_export', icon: '📄', label: 'Laporan & Ekspor', sec: 'reporting' },
  { id: 'data_management', icon: '⚙️', label: 'Data Management', sec: 'reporting' }
];

const INFO = {
  overview: { title: 'Executive Dashboard', sub: 'Pantau performa bisnis dan ringkasan eksekutif' },
  insight: { title: 'Insight & Improvement', sub: 'Analisis rekomendasi dan peningkatan performa' },
  
  sales_dashboard: { title: 'Dashboard Sales Momen', sub: 'Target sales, realisasi, outstanding, transaksi, dan retensi' },
  target_achievement: { title: 'Target & Achievement', sub: 'Pencapaian target penjualan sales' },
  funnel_leads: { title: 'Funnel & Leads', sub: 'Analisis konversi prospek dan leads funnel' },
  product_sales: { title: 'Product Sales', sub: 'Rincian penjualan produk Momen Batik' },
  sales_database: { title: 'Sales Database', sub: 'Database transaksi dan rekap order sales' },
  
  marketing_dashboard: { title: 'Marketing Dashboard', sub: 'Ringkasan performa aktivitas pemasaran' },
  social_media: { title: 'Social Media Analytics', sub: 'Performa detail akun Instagram & TikTok Momen' },
  campaign_content: { title: 'Campaign & Content', sub: 'Kelola rencana konten dan kampanye aktif' },
  ads_performance: { title: 'Ads Performance', sub: 'Pantau biaya iklan, reach, CTR, ROAS, dan status iklan' },
  budget_roi: { title: 'Budget & ROI', sub: 'Analisis alokasi budget dan return on investment' },
  
  product_dashboard: { title: 'Product Dashboard', sub: 'Pantau performa & kategori koleksi produk Momen Batik' },
  product_readiness: { title: 'Product Readiness', sub: 'Kesiapan stok dan peluncuran produk baru' },
  quality_execution: { title: 'Quality & Execution', sub: 'Kualitas produk dan pemenuhan pesanan' },
  stock_availability: { title: 'Stock & Availability', sub: 'Ketersediaan produk di gudang dan toko' },
  
  customer_journey: { title: 'Customer Journey', sub: 'Lacak perjalanan pelanggan dari Awareness hingga Loyalitas' },
  rating_review: { title: 'Rating & Review', sub: 'Ulasan dan penilaian dari pelanggan' },
  complaint_management: { title: 'Complaint Management', sub: 'Pengelolaan keluhan pelanggan' },
  retention_repeat: { title: 'Retention & Repeat Order', sub: 'Retensi pelanggan dan pembelian berulang' },
  voice_customer: { title: 'Voice of Customer', sub: 'Masukan dan aspirasi pelanggan' },
  
  report_export: { title: 'Laporan & Ekspor', sub: 'Rekap data dan download laporan kinerja' },
  data_management: { title: 'Data Management', sub: 'Pengaturan basis data dan sinkronisasi data' }
};


// --- Module: src/components/charts/Charts.jsx ---


function LineChart({ labels, data, label = 'Data', color = '#C9A84C', height = 220, filled = true }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const ctx = canvasRef.current.getContext('2d');
    let bgGradient = 'rgba(201,168,76,0.1)';

    if (filled) {
      bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, color.startsWith('#') ? color + '44' : 'rgba(201,168,76,0.3)');
      bgGradient.addColorStop(1, 'rgba(0,0,0,0)');
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label,
          data,
          borderColor: color,
          backgroundColor: bgGradient,
          fill: filled,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: color,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#222',
            titleColor: '#C9A84C',
            bodyColor: '#E0D8C8',
            borderColor: '#333',
            borderWidth: 1,
            padding: 10,
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } }
          }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [labels, data, color, filled, height]);

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

function MultiLineChart({ labels, datasets, height = 220 }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: datasets.map(d => ({
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 6,
          ...d
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: { color: '#8a8070', font: { family: 'Outfit', size: 11 }, boxWidth: 12, usePointStyle: true }
          },
          tooltip: {
            backgroundColor: '#222',
            titleColor: '#C9A84C',
            bodyColor: '#E0D8C8',
            borderColor: '#333',
            borderWidth: 1,
          }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } } }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [labels, datasets, height]);

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

function BarChart({ labels, data, label = 'Data', color = '#C9A84C', height = 200 }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label,
          data,
          backgroundColor: color,
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#222',
            titleColor: '#C9A84C',
            bodyColor: '#E0D8C8',
            borderColor: '#333',
            borderWidth: 1,
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } } }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [labels, data, color, height]);

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

function MultiBarChart({ labels, datasets, height = 200 }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: datasets.map(d => ({
          borderRadius: 6,
          borderSkipped: false,
          ...d
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: { color: '#8a8070', font: { family: 'Outfit', size: 11 }, boxWidth: 12, usePointStyle: true }
          },
          tooltip: {
            backgroundColor: '#222',
            titleColor: '#C9A84C',
            bodyColor: '#E0D8C8',
            borderColor: '#333',
            borderWidth: 1,
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } } }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [labels, datasets, height]);

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

function ComboBarLineChart({ labels, datasets, height = 260 }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'bar',
      data: {
        labels,
        datasets: datasets.map(d => ({
          borderRadius: 6,
          borderSkipped: false,
          ...d
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: { color: '#8a8070', font: { family: 'Outfit', size: 11 }, boxWidth: 12, usePointStyle: true }
          },
          tooltip: {
            backgroundColor: '#222',
            titleColor: '#C9A84C',
            bodyColor: '#E0D8C8',
            borderColor: '#333',
            borderWidth: 1,
            padding: 10
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } } },
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: {
              color: '#8a8070',
              font: { family: 'Outfit', size: 10 },
              callback: (value) => value >= 1000000 ? (value / 1000000) + ' Jt' : value
            }
          }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [labels, datasets, height]);

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

function DonutChart({ labels, data, colors, centerText, segments, cVal, cLabel, size }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const displayLabels = labels || (segments ? segments.map(s => s.label) : []);
  const displayData = data || (segments ? segments.map(s => s.value) : []);
  const displayColors = colors || (segments ? segments.map(s => s.color) : ['#C9A84C', '#E8C878', '#A07830']);
  const displayText = centerText || cVal || '';

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: displayLabels,
        datasets: [{
          data: displayData,
          backgroundColor: displayColors,
          borderWidth: 2,
          borderColor: '#1a1a1a',
          hoverOffset: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%` },
            backgroundColor: '#222',
            titleColor: '#C9A84C',
            bodyColor: '#E0D8C8',
            borderColor: '#333',
            borderWidth: 1,
          }
        },
        animation: { animateRotate: true, duration: 900 },
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [displayLabels, displayData, displayColors]);

  const wrapperSize = size || 90;

  return (
    <div style={{ position: 'relative', width: wrapperSize, height: wrapperSize, margin: '0 auto' }}>
      <canvas ref={canvasRef} />
      {displayText && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-white)', lineHeight: 1.2 }}>{displayText}</div>
          {cLabel && <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>{cLabel}</div>}
        </div>
      )}
    </div>
  );
}


// --- Module: src/components/common/UIComponents.jsx ---


function PTag({ platform }) {
  if (platform === 'instagram' || platform === 'ig') return <span className="ptag ptag-ig">📸 Instagram</span>;
  if (platform === 'tiktok' || platform === 'tt') return <span className="ptag ptag-tt">🎵 TikTok</span>;
  return <span className="ptag ptag-neutral">{platform}</span>;
}

function MetricCard({ icon, label, value, sub, trend, trendLabel, acc = '#C9A84C', badge }) {
  return (
    <div className="metric-card">
      <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: acc }} />
      <div className="mc-header">
        <span className="mc-label">{label}</span>
        <span className="mc-icon">{icon}</span>
      </div>
      <div className="mc-value">{value}</div>
      {(trend !== undefined || sub || badge) && (
        <div className="mc-sub">
          {trend !== undefined && (
            <span className={`badge ${trend >= 0 ? 'badge-green' : 'badge-red'}`}>
              {trend >= 0 ? `▲ +${trend}%` : `▼ ${trend}%`}
            </span>
          )}
          {badge && <span className="badge badge-gold">{badge}</span>}
          {trendLabel && <span>{trendLabel}</span>}
          {sub && !trendLabel && <span>{sub}</span>}
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children, badge }) {
  return (
    <div className="sec-label">
      <span>{children}</span>
      {badge && <span className="badge badge-gold">{badge}</span>}
    </div>
  );
}

function PeriodSel({ active, onChange, options = ['7d', '30d', '90d'] }) {
  const labels = { '7d': '7 Hari', '30d': '30 Hari', '90d': '90 Hari' };
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {options.map(o => (
        <button key={o} className={`period-btn${active === o ? ' active' : ''}`} onClick={() => onChange(o)}>
          {labels[o] || o}
        </button>
      ))}
    </div>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

function ProgRow({ label, value, pct, color = 'var(--gold)' }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
        <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{label}</span>
        <span style={{ color: 'var(--text-light)', fontWeight: 700 }}>{value} ({pct}%)</span>
      </div>
      <div style={{ height: 6, background: 'var(--bg2)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: color, borderRadius: 3, transition: 'width 0.4s' }} />
      </div>
    </div>
  );
}

function AccountCard({ name, handle, avatar, followers, growth, engagement, platform, onSelect }) {
  return (
    <div className="card card-sm" style={{ cursor: 'pointer', transition: 'all 0.15s' }} onClick={onSelect}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gold-pale2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--gold)' }}>
            {avatar || name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-white)' }}>{name}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{handle}</div>
          </div>
        </div>
        <PTag platform={platform} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, background: 'var(--bg2)', padding: 8, borderRadius: 8, textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 9, color: 'var(--text-dim)' }}>Followers</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-white)' }}>{followers}</div>
        </div>
        <div>
          <div style={{ fontSize: 9, color: 'var(--text-dim)' }}>Growth</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: growth >= 0 ? 'var(--green)' : 'var(--red)' }}>{growth >= 0 ? `+${growth}%` : `${growth}%`}</div>
        </div>
        <div>
          <div style={{ fontSize: 9, color: 'var(--text-dim)' }}>ER</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)' }}>{engagement}</div>
        </div>
      </div>
    </div>
  );
}

function TopPostRow({ rank, title, likes, comments, shares, views, platform, date }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--gold)', width: 16 }}>#{rank}</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-white)' }}>{title}</div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', display: 'flex', gap: 8, marginTop: 2 }}>
            <span>{date}</span>
            <PTag platform={platform} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, fontSize: 10, color: 'var(--text-light)', fontWeight: 600 }}>
        {views && <span>👁️ {views}</span>}
        <span>❤️ {likes}</span>
        <span>💬 {comments}</span>
        {shares && <span>🔄 {shares}</span>}
      </div>
    </div>
  );
}

function Calendar({ month, year, selectedStart, selectedEnd, onDayClick }) {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();
  
  const cells = [];
  
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      date: new Date(year, month - 1, prevMonthTotalDays - i),
      isCurrentMonth: false
    });
  }
  
  for (let i = 1; i <= totalDays; i++) {
    cells.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }
  
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const formatDateString = (d) => d.toISOString().split('T')[0];

  const startStr = selectedStart ? formatDateString(new Date(selectedStart)) : '';
  const endStr = selectedEnd ? formatDateString(new Date(selectedEnd)) : '';

  return (
    <div style={{ width: '260px', userSelect: 'none' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', fontWeight: 700, fontSize: 11, color: 'var(--text-dim)', marginBottom: 6 }}>
        {weekdays.map(w => <div key={w}>{w}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', fontSize: 11 }}>
        {cells.map((cell, idx) => {
          const cellStr = formatDateString(cell.date);
          const isStart = cellStr === startStr;
          const isEnd = cellStr === endStr;
          const inRange = startStr && endStr && cellStr > startStr && cellStr < endStr;
          
          let bg = 'transparent';
          let color = cell.isCurrentMonth ? 'var(--text-dark)' : 'var(--text-dim)';
          let borderRadius = '0';
          
          if (isStart || isEnd) {
            bg = '#3B82F6';
            color = 'white';
            borderRadius = isStart ? '8px 0 0 8px' : '0 8px 8px 0';
            if (isStart && !endStr) borderRadius = '8px';
            if (isStart && isEnd) borderRadius = '8px';
          } else if (inRange) {
            bg = '#DBEAFE';
            color = '#1E40AF';
          }

          return (
            <div
              key={idx}
              onClick={() => onDayClick(cell.date)}
              style={{
                padding: '6px 0',
                background: bg,
                color,
                borderRadius,
                fontWeight: cell.isCurrentMonth || isStart || isEnd ? 700 : 400,
                cursor: 'pointer',
                transition: 'all 0.1s'
              }}
            >
              {cell.date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}


// --- Module: src/components/layout/Icon.jsx ---
function Icon({ name }) {
  const style = { width: 14, height: 14, strokeWidth: 2, display: 'inline-block', verticalAlign: 'middle' };
  switch (name) {
    case 'overview':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="3" y="3" width="7" height="9" rx="1"/><rect x="14" y="3" width="7" height="5" rx="1"/><rect x="14" y="12" width="7" height="9" rx="1"/><rect x="3" y="16" width="7" height="5" rx="1"/></svg>;
    case 'insight':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'sales_dashboard':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 3v18h18M7 16l4-4 4 4 6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'target_achievement':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="9" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="1" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'funnel_leads':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'product_sales':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'sales_database':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'marketing_dashboard':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'social_media':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="4" r="2"/></svg>;
    case 'campaign_content':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'ads_performance':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'budget_roi':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'product_dashboard':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'product_readiness':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'quality_execution':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'stock_availability':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 017-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'customer_journey':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'rating_review':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.969 0 1.371 1.24.588 1.81l-3.97 2.881a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.88a1 1 0 00-1.178 0l-3.97 2.88c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118l-3.97-2.88c-.783-.57-.38-1.81.588-1.81h4.907a1 1 0 00.95-.69l1.519-4.674z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'complaint_management':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'retention_repeat':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17m-.001 8h.001" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'voice_customer':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'report_export':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    case 'data_management':
      return <svg style={style} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/></svg>;
    default:
      return null;
  }
}


// --- Module: src/components/layout/Sidebar.jsx ---



function Sidebar({ active, onNav, mobileOpen, onClose }) {
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


// --- Module: src/pages/OverviewPage.jsx ---




function OverviewPage({ period }) {
  const d = DATA;
  return (
    <div className="page-body">
      <SectionLabel badge="Performa Bisnis">Sales & Revenue Overview</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🎯" label="Target Sales" value={d.salesOverview.target} sub="Periode 01 – 13 Jul" acc="#C9A84C" />
        <MetricCard icon="💰" label="Pencapaian Omset" value={d.salesOverview.achievement.value} badge={d.salesOverview.achievement.pct} sub="vs target periode" acc="#22C55E" />
        <MetricCard icon="📦" label="Total Qty Terjual" value={d.salesOverview.qty.value + ' pcs'} trend={d.salesOverview.qty.change} trendLabel="vs periode lalu" acc="#3B82F6" />
        <MetricCard icon="💳" label="Nilai Keranjang (AOV)" value={d.salesOverview.basket.value} trend={d.salesOverview.basket.change} trendLabel="vs periode lalu" acc="#833AB4" />
      </div>

      <div className="g21 mb18">
        <div className="card">
          <div className="card-title">
            <span>📈 Tren Penjualan Harian vs Target</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Juli 2026</span>
          </div>
          <LineChart labels={d.trendLabels} data={d.trendActual} color="#C9A84C" height={200} />
        </div>

        <div className="card">
          <div className="card-title">📊 Rincian Penjualan Channel</div>
          <DonutChart labels={d.breakdown.channel.labels} data={d.breakdown.channel.data} colors={d.breakdown.channel.colors} centerText="100%" />
          <div style={{ marginTop: 14 }}>
            {d.breakdown.channel.labels.map((l, i) => (
              <ProgRow key={l} label={l} value={`${d.breakdown.channel.data[i]}%`} pct={d.breakdown.channel.data[i]} color={d.breakdown.channel.colors[i]} />
            ))}
          </div>
        </div>
      </div>

      <SectionLabel>Produk Terlaris & Konversi Leads</SectionLabel>
      <div className="g2 mb18">
        <div className="card">
          <div className="card-title">🏆 Top 5 Best Seller Product</div>
          <table className="data-table">
            <thead>
              <tr><th>Rank</th><th>Produk</th><th>Qty</th><th>Omset</th></tr>
            </thead>
            <tbody>
              {d.bestSeller.map(b => (
                <tr key={b.rank}>
                  <td style={{ fontWeight: 800, color: 'var(--gold)' }}>#{b.rank}</td>
                  <td style={{ fontWeight: 700 }}>{b.name}</td>
                  <td>{b.qty}</td>
                  <td style={{ fontWeight: 700, color: 'var(--green)' }}>{b.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-title">⏳ Funnel Leads & Prospect</div>
          <BarChart labels={d.channelBar.labels} data={d.channelBar.data} color="#3B82F6" height={190} />
        </div>
      </div>
    </div>
  );
}


// --- Module: src/pages/InsightPage.jsx ---


function InsightPage() {
  const insights = [
    { type: 'High Priority', title: 'Tingkatkan Budget Ads TikTok Video Dance', desc: 'ROAS TikTok mencapai 5.2x melebihi target Meta. Alokasikan 20% budget dari Meta Ads ke TikTok Spark Ads.', impact: '+Rp 35.000.000 Omset' },
    { type: 'Opportunity', title: 'Optimasi Restock Outer Batik Momen Premium', desc: 'Stok Outer Batik tinggal 18 pcs sedangkan permintaan meningkat 34% minggu ini.', impact: 'Cegah Loss Sales Rp 25.000.000' },
    { type: 'Action Required', title: 'Follow Up Leads WhatsApp Unclosed > 48 Jam', desc: 'Terdapat 142 leads qualified di WhatsApp yang belum diproses ulang oleh tim sales.', impact: 'Potensi Konversi 25%' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="AI Insight">Executive Insight & Rekomendasi Performa</SectionLabel>

      <div className="g3 mb18">
        <MetricCard icon="💡" label="Insight Aktif" value="3 Rekomendasi" sub="Dianalisis dari Data Juli" acc="#C9A84C" />
        <MetricCard icon="🎯" label="Potensi Kenaikan Omset" value="+Rp 60.000.000" sub="Jika rekomendasi dijalankan" acc="#22C55E" />
        <MetricCard icon="⚡" label="Skor Kesehatan Bisnis" value="92 / 100" badge="Sangat Baik" acc="#3B82F6" />
      </div>

      <div className="card mb18">
        <div className="card-title">💡 Rekomendasi Strategis & Peningkatan Performa</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {insights.map((item, idx) => (
            <div key={idx} style={{ background: 'var(--bg2)', padding: '14px 16px', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-white)' }}>{item.title}</span>
                <span className={`badge ${item.type === 'High Priority' ? 'badge-red' : item.type === 'Opportunity' ? 'badge-green' : 'badge-gold'}`}>
                  {item.type}
                </span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-body)', lineHeight: 1.5, marginBottom: 8 }}>{item.desc}</p>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gold)' }}>🚀 Estimasi Dampak: {item.impact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// --- Module: src/pages/IGPage.jsx ---



function IGPage({ period }) {
  const igData = {
    followers: '284.500',
    growth: 4.2,
    reach: '1.420.000',
    engagement: '4.8%',
    posts: [
      { rank: 1, title: 'Koleksi Batik Modern Summer 2026', likes: '14.2k', comments: '842', shares: '1.2k', platform: 'ig', date: '10 Jul' },
      { rank: 2, title: 'Tips Mix & Match Batik untuk Kondangan', likes: '11.8k', comments: '620', shares: '940', platform: 'ig', date: '08 Jul' },
      { rank: 3, title: 'Behind the Scenes Tulis Batik Cirebon', likes: '9.4k', comments: '412', shares: '520', platform: 'ig', date: '05 Jul' }
    ]
  };

  return (
    <div className="page-body">
      <SectionLabel badge="Instagram">Analisis Performa Instagram Momen</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="👥" label="Total Followers" value={igData.followers} trend={igData.growth} trendLabel="bulan ini" acc="#E1306C" />
        <MetricCard icon="👀" label="Total Reach" value={igData.reach} trend={12.4} trendLabel="vs bulan lalu" acc="#F77737" />
        <MetricCard icon="🔥" label="Engagement Rate" value={igData.engagement} trend={0.6} trendLabel="vs bulan lalu" acc="#C9A84C" />
        <MetricCard icon="📸" label="Total Posts" value="48 Posts" sub="Bulan Juli 2026" acc="#833AB4" />
      </div>

      <div className="g21 mb18">
        <div className="card">
          <div className="card-title">📈 Tren Jangkauan Instagram (Reach)</div>
          <LineChart labels={['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4']} data={[320000, 380000, 410000, 420000]} color="#E1306C" height={200} />
        </div>

        <div className="card">
          <div className="card-title">🏆 Top Post Instagram</div>
          {igData.posts.map(p => (
            <TopPostRow key={p.rank} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}


// --- Module: src/pages/TTPage.jsx ---



function TTPage({ period }) {
  const ttData = {
    followers: '512.000',
    growth: 14.8,
    views: '4.800.000',
    engagement: '6.2%',
    posts: [
      { rank: 1, title: 'Batik Challenge 2026 Viral Dance', likes: '48.5k', comments: '3.4k', shares: '12.8k', views: '1.2M', platform: 'tt', date: '12 Jul' },
      { rank: 2, title: 'OOTD Batik Tulis vs Batik Cap', likes: '34.2k', comments: '2.1k', shares: '8.4k', views: '850K', platform: 'tt', date: '09 Jul' },
      { rank: 3, title: 'Spill Promo Diskon Batik Momen 50%', likes: '28.9k', comments: '1.8k', shares: '6.2k', views: '710K', platform: 'tt', date: '04 Jul' }
    ]
  };

  return (
    <div className="page-body">
      <SectionLabel badge="TikTok">Analisis Performa TikTok Momen</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🎵" label="Total Followers" value={ttData.followers} trend={ttData.growth} trendLabel="bulan ini" acc="#00f2fe" />
        <MetricCard icon="👁️" label="Total Video Views" value={ttData.views} trend={24.2} trendLabel="vs bulan lalu" acc="#3B82F6" />
        <MetricCard icon="⚡" label="Engagement Rate" value={ttData.engagement} trend={1.2} trendLabel="vs bulan lalu" acc="#22C55E" />
        <MetricCard icon="🎥" label="Total Video Upload" value={36} sub="Bulan Juli 2026" acc="#C9A84C" />
      </div>

      <div className="g21 mb18">
        <div className="card">
          <div className="card-title">📈 Tren View Video TikTok</div>
          <LineChart labels={['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4']} data={[980000, 1120000, 1340000, 1360000]} color="#00f2fe" height={200} />
        </div>

        <div className="card">
          <div className="card-title">🔥 Top Viral TikTok Videos</div>
          {ttData.posts.map(p => (
            <TopPostRow key={p.rank} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}


// --- Module: src/pages/ComparePage.jsx ---



function ComparePage({ period }) {
  return (
    <div className="page-body">
      <SectionLabel badge="Perbandingan">Perbandingan Platform Instagram vs TikTok</SectionLabel>

      <div className="g2 mb18">
        <MetricCard icon="📸" label="Instagram Reach" value="1.420.000" trend={12.4} trendLabel="vs bulan lalu" acc="#E1306C" />
        <MetricCard icon="🎵" label="TikTok Video Views" value="4.800.000" trend={24.2} trendLabel="vs bulan lalu" acc="#00f2fe" />
      </div>

      <div className="card mb18">
        <div className="card-title">📈 Perbandingan Pertumbuhan Audience (Weekly)</div>
        <MultiLineChart 
          labels={['Mgu 1', 'Mgu 2', 'Mgu 3', 'Mgu 4']}
          datasets={[
            { label: 'Instagram Reach', data: [320, 380, 410, 420], borderColor: '#E1306C', backgroundColor: 'transparent' },
            { label: 'TikTok Views (Ribu)', data: [980, 1120, 1340, 1360], borderColor: '#00f2fe', backgroundColor: 'transparent' }
          ]}
          height={220}
        />
      </div>
    </div>
  );
}


// --- Module: src/pages/ContentPage.jsx ---



function ContentPage() {
  const [contents, setContents] = useState([
    { id: 1, title: 'Behind the Scenes Tulis Batik Cirebon', channel: 'ig', pic: 'Tim Creative', date: '05 Jul 2026', status: 'Udah Selesai', views: '9.4k' },
    { id: 2, title: 'Tips Mix & Match Batik untuk Kondangan', channel: 'ig', pic: 'Siti Rahma', date: '08 Jul 2026', status: 'Udah Selesai', views: '11.8k' },
    { id: 3, title: 'Batik Challenge 2026 Viral Dance', channel: 'tt', pic: 'Rizki Ananda', date: '12 Jul 2026', status: 'Lagi Berjalan', views: '1.2M' },
    { id: 4, title: 'Launch Koleksi Batik Edisi Kemerdekaan', channel: 'ig', pic: 'Dewi Lestari', date: '20 Jul 2026', status: 'Lagi Berjalan', views: '-' },
    { id: 5, title: 'Tutorial Lipat Hem Batik Anti Kusut', channel: 'tt', pic: 'Tim Video', date: '25 Jul 2026', status: 'Planing', views: '-' },
    { id: 6, title: 'Spill Fabric Quality Outer Premium', channel: 'ig', pic: 'Tim Content', date: '28 Jul 2026', status: 'Planing', views: '-' },
  ]);

  const [filterStatus, setFilterStatus] = useState('All');

  // New Content Form State
  const [newTitle, setNewTitle] = useState('');
  const [newChannel, setNewChannel] = useState('ig');
  const [newPic, setNewPic] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newStatus, setNewStatus] = useState('Planing');
  const [showForm, setShowForm] = useState(false);

  const handleAddContent = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: Date.now(),
      title: newTitle,
      channel: newChannel,
      pic: newPic || 'Tim Marketing',
      date: newDate || '2026-07-30',
      status: newStatus,
      views: '-'
    };

    setContents([newItem, ...contents]);
    setNewTitle('');
    setNewPic('');
    setNewDate('');
    setNewStatus('Planing');
    setShowForm(false);
  };

  const handleStatusChange = (id, nextStatus) => {
    setContents(contents.map(item => item.id === id ? { ...item, status: nextStatus } : item));
  };

  const handleDelete = (id) => {
    setContents(contents.filter(item => item.id !== id));
  };

  const filteredContents = contents.filter(item => {
    if (filterStatus === 'All') return true;
    return item.status === filterStatus;
  });

  const countPlaning = contents.filter(c => c.status === 'Planing').length;
  const countProgress = contents.filter(c => c.status === 'Lagi Berjalan').length;
  const countDone = contents.filter(c => c.status === 'Udah Selesai').length;

  return (
    <div className="page-body">
      <SectionLabel badge="Konten Marketing">Jadwal & Manajemen Rencana Konten</SectionLabel>

      {/* Summary Cards */}
      <div className="g4 mb18">
        <MetricCard icon="📝" label="Total Rencana Konten" value={`${contents.length} Konten`} sub="Juli 2026" acc="#C9A84C" />
        <MetricCard icon="📋" label="Baru Planning" value={`${countPlaning} Konten`} badge="Planning" acc="#3B82F6" />
        <MetricCard icon="⚡" label="Lagi Berjalan" value={`${countProgress} Konten`} badge="In Progress" acc="#833AB4" />
        <MetricCard icon="✅" label="Udah Selesai" value={`${countDone} Konten`} badge="Completed" acc="#22C55E" />
      </div>

      {/* Add New Content Form Toggle Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['All', 'Planing', 'Lagi Berjalan', 'Udah Selesai'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: filterStatus === st ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
                background: filterStatus === st ? 'rgba(201,168,76,0.15)' : 'transparent',
                color: filterStatus === st ? 'var(--gold)' : 'var(--text-muted)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {st === 'All' ? 'Semua Konten' : st}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: showForm ? 'rgba(224,85,85,0.2)' : 'var(--gold)',
            color: showForm ? '#E05555' : '#000',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.2s'
          }}
        >
          {showForm ? '✕ Batal' : '➕ Input Rencana Konten Baru'}
        </button>
      </div>

      {/* Interactive Form */}
      {showForm && (
        <div className="card mb18" style={{ border: '1px solid var(--gold)', background: 'var(--bg2)' }}>
          <div className="card-title">📝 Form Input Rencana Konten</div>
          <form onSubmit={handleAddContent} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginTop: 10 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4, color: 'var(--text-muted)' }}>Judul Konten / Konsep</label>
              <input
                type="text"
                placeholder="Contoh: Behind the Scenes Batik Sogan..."
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: '#fff', fontSize: 12 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4, color: 'var(--text-muted)' }}>Platform</label>
              <select
                value={newChannel}
                onChange={e => setNewChannel(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: '#fff', fontSize: 12 }}
              >
                <option value="ig">📸 Instagram</option>
                <option value="tt">🎵 TikTok</option>
                <option value="yt">▶️ YouTube</option>
                <option value="fb">📘 Facebook</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4, color: 'var(--text-muted)' }}>PIC / Penanggung Jawab</label>
              <input
                type="text"
                placeholder="Nama / Tim..."
                value={newPic}
                onChange={e => setNewPic(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: '#fff', fontSize: 12 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4, color: 'var(--text-muted)' }}>Tanggal Rencana</label>
              <input
                type="text"
                placeholder="Contoh: 30 Jul 2026"
                value={newDate}
                onChange={e => setNewDate(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: '#fff', fontSize: 12 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4, color: 'var(--text-muted)' }}>Status Saat Ini</label>
              <select
                value={newStatus}
                onChange={e => setNewStatus(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: '#fff', fontSize: 12 }}
              >
                <option value="Planing">📋 Baru Planning</option>
                <option value="Lagi Berjalan">⚡ Lagi Berjalan</option>
                <option value="Udah Selesai">✅ Udah Selesai</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
              <button
                type="submit"
                style={{
                  background: 'var(--gold)',
                  color: '#000',
                  border: 'none',
                  padding: '9px 24px',
                  borderRadius: 6,
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                💾 Simpan Rencana Konten
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content Table */}
      <div className="card mb18">
        <div className="card-title">📝 Daftar & Status Rencana Konten ({filteredContents.length})</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Judul Konten</th>
              <th>Platform</th>
              <th>PIC</th>
              <th>Tanggal Rencana</th>
              <th>Status Konten</th>
              <th>Reach / Views</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredContents.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                  Tidak ada rencana konten dengan status "{filterStatus}".
                </td>
              </tr>
            ) : (
              filteredContents.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 700 }}>{c.title}</td>
                  <td><PTag platform={c.channel} /></td>
                  <td style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{c.pic}</td>
                  <td style={{ fontSize: 12 }}>{c.date}</td>
                  <td>
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c.id, e.target.value)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: c.status === 'Udah Selesai' ? 'rgba(34,197,94,0.2)' : c.status === 'Lagi Berjalan' ? 'rgba(131,58,180,0.2)' : 'rgba(59,130,246,0.2)',
                        color: c.status === 'Udah Selesai' ? '#22C55E' : c.status === 'Lagi Berjalan' ? '#C084FC' : '#3B82F6',
                        outline: 'none'
                      }}
                    >
                      <option value="Planing" style={{ background: '#1c1c1c', color: '#3B82F6' }}>📋 Baru Planning</option>
                      <option value="Lagi Berjalan" style={{ background: '#1c1c1c', color: '#C084FC' }}>⚡ Lagi Berjalan</option>
                      <option value="Udah Selesai" style={{ background: '#1c1c1c', color: '#22C55E' }}>✅ Udah Selesai</option>
                    </select>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{c.views}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(c.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#E05555',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                      title="Hapus Konten"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/CampaignPage.jsx ---


function CampaignPage() {
  const campaigns = [
    { name: 'Promo Mahakarya Batik Juli', status: 'Active', budget: 'Rp 15.000.000', spent: 'Rp 8.400.000', roas: '4.2x' },
    { name: 'Grand Launch Edisi Kemerdekaan', status: 'Preparing', budget: 'Rp 25.000.000', spent: 'Rp 2.100.000', roas: '-' },
    { name: 'Mid-Year Clearance Sale 2026', status: 'Ended', budget: 'Rp 10.000.000', spent: 'Rp 10.000.000', roas: '5.1x' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Campaign">Status Kampanye Marketing Active</SectionLabel>

      <div className="g3 mb18">
        <MetricCard icon="🎯" label="Kampanye Aktif" value="2 Active" sub="Bulan Juli 2026" acc="#C9A84C" />
        <MetricCard icon="💰" label="Total Biaya Spent" value="Rp 20.500.000" sub="Dari total budget Rp 50jt" acc="#3B82F6" />
        <MetricCard icon="📈" label="Average ROAS" value="4.65x" trend={0.4} trendLabel="vs target 4.0x" acc="#22C55E" />
      </div>

      <div className="card mb18">
        <div className="card-title">🎯 Campaign Marketing Active & Upcoming</div>
        <table className="data-table">
          <thead>
            <tr><th>Nama Kampanye</th><th>Status</th><th>Budget</th><th>Spent</th><th>ROAS</th></tr>
          </thead>
          <tbody>
            {campaigns.map((c, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{c.name}</td>
                <td>
                  <span className={`badge ${c.status === 'Active' ? 'badge-green' : c.status === 'Preparing' ? 'badge-gold' : 'badge-neutral'}`}>
                    {c.status}
                  </span>
                </td>
                <td>{c.budget}</td>
                <td>{c.spent}</td>
                <td style={{ fontWeight: 800, color: 'var(--green)' }}>{c.roas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/SocialMediaHub.jsx ---





function SocialMediaHub({ period, range }) {
  const [activeTab, setActiveTab] = useState('instagram');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="card card-sm" style={{ padding: '8px 12px', margin: '16px 20px 0 20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('instagram')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'instagram' ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: activeTab === 'instagram' ? 'var(--gold-dark)' : 'var(--text-muted)',
              transition: 'all 0.15s'
            }}
          >
            📸 Instagram Analytics
          </button>
          <button 
            onClick={() => setActiveTab('tiktok')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'tiktok' ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: activeTab === 'tiktok' ? 'var(--gold-dark)' : 'var(--text-muted)',
              transition: 'all 0.15s'
            }}
          >
            🎵 TikTok Analytics
          </button>
          <button 
            onClick={() => setActiveTab('compare')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'compare' ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: activeTab === 'compare' ? 'var(--gold-dark)' : 'var(--text-muted)',
              transition: 'all 0.15s'
            }}
          >
            ⚖️ Perbandingan Platform
          </button>
        </div>
      </div>

      {activeTab === 'instagram' && <IGPage period={period} range={range} />}
      {activeTab === 'tiktok' && <TTPage period={period} range={range} />}
      {activeTab === 'compare' && <ComparePage period={period} range={range} />}
    </div>
  );
}


// --- Module: src/pages/CampaignContentHub.jsx ---




function CampaignContentHub({ period, range }) {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="card card-sm" style={{ padding: '8px 12px', margin: '16px 20px 0 20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('content')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'content' ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: activeTab === 'content' ? 'var(--gold-dark)' : 'var(--text-muted)',
              transition: 'all 0.15s'
            }}
          >
            📝 Rencana Konten
          </button>
          <button 
            onClick={() => setActiveTab('campaign')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'campaign' ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: activeTab === 'campaign' ? 'var(--gold-dark)' : 'var(--text-muted)',
              transition: 'all 0.15s'
            }}
          >
            🎯 Campaign Marketing
          </button>
        </div>
      </div>

      {activeTab === 'content' && <ContentPage period={period} range={range} />}
      {activeTab === 'campaign' && <CampaignPage period={period} range={range} />}
    </div>
  );
}


// --- Module: src/pages/SalesDashboardPage.jsx ---




function SalesDashboardPage({ period }) {
  const d = DATA;

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

  const annualComboDatasets = [
    {
      type: 'line',
      label: '📈 Trend Target Tahunan (2026)',
      data: [420000000, 440000000, 460000000, 480000000, 500000000, 520000000, 540000000, 560000000, 580000000, 600000000, 630000000, 660000000],
      borderColor: '#22C55E',
      borderWidth: 3,
      tension: 0.35,
      fill: false,
      pointRadius: 4,
      pointBackgroundColor: '#22C55E',
      order: 1
    },
    {
      type: 'bar',
      label: 'Sales Store (Offline)',
      data: [95000000, 110000000, 105000000, 130000000, 120000000, 115000000, 140000000, 135000000, 150000000, 145000000, 160000000, 180000000],
      backgroundColor: '#C9A84C',
      order: 2
    },
    {
      type: 'bar',
      label: 'Sales Online',
      data: [240000000, 270000000, 290000000, 340000000, 330000000, 310000000, 380000000, 370000000, 410000000, 420000000, 450000000, 490000000],
      backgroundColor: '#3B82F6',
      order: 3
    }
  ];

  const trendDatasets = [
    {
      label: 'Target Sales',
      data: d.trendTarget,
      borderColor: '#C9A84C',
      borderDash: [5, 5],
      fill: false,
    },
    {
      label: 'Actual Sales',
      data: d.trendActual,
      borderColor: '#22C55E',
      backgroundColor: 'rgba(34,197,94,0.15)',
      fill: true,
    }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Sales Overview">Dashboard Penjualan Sales Store & Sales Online</SectionLabel>

      {/* Metric Summary Cards */}
      <div className="g4 mb18">
        <MetricCard icon="🎯" label="Target Penjualan" value={d.salesOverview.target} sub="Juli 2026" acc="#C9A84C" />
        <MetricCard icon="💰" label="Total Realisasi Omset" value={d.salesOverview.achievement.value} badge={d.salesOverview.achievement.pct} acc="#22C55E" />
        <MetricCard icon="🏬" label="Sales Store (Offline)" value="Rp 53.288.726" badge="26.4%" sub="2 Outlet Store" acc="#C9A84C" />
        <MetricCard icon="🌐" label="Sales Online" value="Rp 148.550.000" badge="73.6%" sub="WA, IG, Marketplace" acc="#3B82F6" />
      </div>

      {/* COMBO CHART POSISI DI ATAS (BAR BULAN JAN-DES + TREND LINE TAHUNAN) */}
      <div className="card mb18">
        <div className="card-title">📊 Perbandingan Omset Sales Store vs Sales Online (Januari – Desember 2026)</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
          Grafik kombinasi Bar Chart omset bulanan Sales Store & Sales Online dengan overlay Trend Line Target Sales 2026
        </div>
        <ComboBarLineChart labels={monthLabels} datasets={annualComboDatasets} height={260} />
      </div>

      {/* GRID BAWAH: TREN HARIAN (LINE CHART) & RINCIAN CHANNEL */}
      <div className="g2 mb18">
        {/* Tren Harian Penjualan */}
        <div className="card">
          <div className="card-title">📈 Tren Harian Penjualan Bulan Ini (Actual vs Target)</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Grafik tren harian per pergerakan tanggal
          </div>
          <MultiLineChart labels={d.trendLabels} datasets={trendDatasets} height={220} />
        </div>

        {/* Breakdown Channel Store vs Online */}
        <div className="card">
          <div className="card-title">🏬 Rincian Channel Penjualan (Store & Online)</div>
          
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>🌐 SALES ONLINE</span>
              <span>Rp 148.550.000 (73.6%)</span>
            </div>
            <ProgRow label="WhatsApp Sales" value="Rp 67.800.000" pct={45.6} color="#22C55E" />
            <ProgRow label="Instagram DM & Shop" value="Rp 40.500.000" pct={27.2} color="#E1306C" />
            <ProgRow label="Shopee & TikTok Shop" value="Rp 40.250.000" pct={27.1} color="#3B82F6" />

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '14px 0 10px' }} />

            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>🏬 SALES STORE (OFFLINE)</span>
              <span>Rp 53.288.726 (26.4%)</span>
            </div>
            <ProgRow label="Store Utama Cirebon" value="Rp 32.400.000" pct={60.8} color="#C9A84C" />
            <ProgRow label="Store Hub Jakarta" value="Rp 20.888.726" pct={39.2} color="#A07830" />
          </div>
        </div>
      </div>
    </div>
  );
}


// --- Module: src/pages/TargetAchievementPage.jsx ---


function TargetAchievementPage() {
  const team = [
    { name: 'Siti Rahma (Sales WA 1)', target: 'Rp 120.000.000', actual: 'Rp 58.400.000', pct: 48.6, bonus: 'Rp 2.920.000' },
    { name: 'Budi Santoso (Sales WA 2)', target: 'Rp 100.000.000', actual: 'Rp 45.200.000', pct: 45.2, bonus: 'Rp 2.260.000' },
    { name: 'Dewi Lestari (Marketplace)', target: 'Rp 150.000.000', actual: 'Rp 62.100.000', pct: 41.4, bonus: 'Rp 3.105.000' },
    { name: 'Ahmad Faisal (Store Retail)', target: 'Rp 90.000.000', actual: 'Rp 36.138.000', pct: 40.1, bonus: 'Rp 1.806.000' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Sales Team">Pencapaian Target Penjualan Tim Sales</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🎯" label="Target Total Sales" value="Rp 540.000.000" sub="Juli 2026" acc="#C9A84C" />
        <MetricCard icon="💰" label="Realisasi Total" value="Rp 201.838.726" badge="37.38%" acc="#22C55E" />
        <MetricCard icon="⏳" label="Sisa Target" value="Rp 338.161.274" sub="18 Hari Tersisa" acc="#3B82F6" />
        <MetricCard icon="🏆" label="Top Sales Executive" value="Siti Rahma" badge="48.6%" acc="#833AB4" />
      </div>

      <div className="card mb18">
        <div className="card-title">📊 Rincian Performa & Bonus Per Sales Executive</div>
        <table className="data-table">
          <thead>
            <tr><th>Nama Sales</th><th>Target</th><th>Realisasi Omset</th><th>Pencapaian (%)</th><th>Estimasi Bonus</th></tr>
          </thead>
          <tbody>
            {team.map((t, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: 700 }}>{t.name}</td>
                <td>{t.target}</td>
                <td style={{ fontWeight: 700, color: 'var(--green)' }}>{t.actual}</td>
                <td>
                  <span className="badge badge-gold">{t.pct}%</span>
                </td>
                <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{t.bonus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card mb18">
        <div className="card-title">📈 Progress Pencapaian Visual</div>
        <div style={{ marginTop: 10 }}>
          {team.map((t, idx) => (
            <ProgRow key={idx} label={t.name} value={t.actual} pct={t.pct} color="var(--gold)" />
          ))}
        </div>
      </div>
    </div>
  );
}


// --- Module: src/pages/FunnelLeadsPage.jsx ---



function FunnelLeadsPage() {
  const funnelStages = [
    { stage: '1. New Leads Masuk', count: 1842, pct: 100, color: '#3B82F6' },
    { stage: '2. Contacted & Responded', count: 1240, pct: 67.3, color: '#833AB4' },
    { stage: '3. Qualified Prospect', count: 612, pct: 33.2, color: '#F77737' },
    { stage: '4. Sent Catalog & Price', count: 418, pct: 22.6, color: '#E8C878' },
    { stage: '5. Closed / Order Success', count: 236, pct: 12.8, color: '#22C55E' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Funnel">Analisis Funnel Leads & Konversi Sales</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="⏳" label="Total Leads Masuk" value="1.842 Leads" trend={14.2} acc="#3B82F6" />
        <MetricCard icon="🎯" label="Leads Qualified" value="612 Leads" trend={9.8} acc="#833AB4" />
        <MetricCard icon="💳" label="Closing Rate" value="38.5%" sub="Dari Qualified Prospect" acc="#22C55E" />
        <MetricCard icon="🔄" label="Win Rate Total" value="12.8%" sub="Leads to Customer" acc="#C9A84C" />
      </div>

      <div className="g2 mb18">
        <div className="card">
          <div className="card-title">⏳ Funnel Conversion Stage</div>
          <div style={{ marginTop: 10 }}>
            {funnelStages.map((s, idx) => (
              <ProgRow key={idx} label={s.stage} value={`${s.count} Leads`} pct={s.pct} color={s.color} />
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">📊 Sumber Leads per Channel</div>
          <BarChart labels={['WhatsApp', 'Instagram DM', 'TikTok Shop', 'Marketplace', 'Store Visit']} data={[840, 520, 240, 160, 82]} color="#C9A84C" height={220} />
        </div>
      </div>
    </div>
  );
}


// --- Module: src/pages/ProductSalesPage.jsx ---


function ProductSalesPage() {
  const items = [
    { code: 'SKU-001', name: 'Kemeja Batik Momen Classic', category: 'Men', sold: 248, price: 'Rp 175.000', total: 'Rp 43.400.000', margin: '42%' },
    { code: 'SKU-002', name: 'Outer Batik Momen Premium', category: 'Women', sold: 186, price: 'Rp 189.000', total: 'Rp 35.154.000', margin: '45%' },
    { code: 'SKU-003', name: 'Tunik Batik Wanita Momen', category: 'Women', sold: 152, price: 'Rp 169.000', total: 'Rp 25.688.000', margin: '40%' },
    { code: 'SKU-004', name: 'Hem Batik Lengan Pendek', category: 'Men', sold: 134, price: 'Rp 149.000', total: 'Rp 19.966.000', margin: '38%' },
    { code: 'SKU-005', name: 'Scarf Batik Eksklusif', category: 'Accessories', sold: 98, price: 'Rp 129.000', total: 'Rp 12.642.000', margin: '50%' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Penjualan Produk">Rincian Penjualan Produk Momen Batik</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🛍️" label="Total SKU Terjual" value="1.248 Pcs" sub="Juli 2026" acc="#C9A84C" />
        <MetricCard icon="💰" label="Omset Penjualan Produk" value="Rp 201.838.726" acc="#22C55E" />
        <MetricCard icon="📊" label="Rata-rata Margin" value="43.0%" badge="Profitable" acc="#3B82F6" />
        <MetricCard icon="⭐" label="Kategori Terlaris" value="Momen Men" sub="62.1% dari total sales" acc="#833AB4" />
      </div>

      <div className="card mb18">
        <div className="card-title">📦 Tabel Performa Penjualan Per SKU Produk</div>
        <table className="data-table">
          <thead>
            <tr><th>SKU</th><th>Nama Produk</th><th>Kategori</th><th>Qty Terjual</th><th>Harga Satuan</th><th>Total Omset</th><th>Margin</th></tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.code}>
                <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{item.code}</td>
                <td style={{ fontWeight: 700 }}>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.sold} pcs</td>
                <td>{item.price}</td>
                <td style={{ fontWeight: 700, color: 'var(--green)' }}>{item.total}</td>
                <td><span className="badge badge-green">{item.margin}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/SalesDatabasePage.jsx ---


function SalesDatabasePage() {
  const transactions = [
    { id: 'TRX-20260713-001', customer: 'Hadi Kurniawan', channel: 'WhatsApp', items: 'Kemeja Batik Momen Classic (2x)', amount: 'Rp 350.000', status: 'Completed', date: '13 Jul 2026 14:20' },
    { id: 'TRX-20260713-002', customer: 'Abyan Putra', channel: 'Instagram DM', items: 'Outer Batik Momen Premium (1x)', amount: 'Rp 189.000', status: 'Completed', date: '13 Jul 2026 13:45' },
    { id: 'TRX-20260713-003', customer: 'Ayus Pratama', channel: 'Shopee', items: 'Tunik Batik Wanita Momen (1x)', amount: 'Rp 169.000', status: 'Shipped', date: '13 Jul 2026 11:10' },
    { id: 'TRX-20260712-004', customer: 'Imam Syafe\'i', channel: 'Offline Store', items: 'Hem Batik Lengan Pendek (3x)', amount: 'Rp 447.000', status: 'Completed', date: '12 Jul 2026 16:30' },
    { id: 'TRX-20260712-005', customer: 'Cecil Wijaya', channel: 'TikTok Shop', items: 'Scarf Batik Eksklusif (2x)', amount: 'Rp 258.000', status: 'Processing', date: '12 Jul 2026 10:15' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Database">Database Transaksi Penjualan Momen</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🗄️" label="Total Record Transaksi" value="236 Transaksi" sub="Juli 2026" acc="#C9A84C" />
        <MetricCard icon="💳" label="Rata-rata Nilai Order" value="Rp 855.248" acc="#22C55E" />
        <MetricCard icon="🚚" label="Order Dalam Pengiriman" value="18 Order" badge="Processing" acc="#3B82F6" />
        <MetricCard icon="✅" label="Order Selesai" value="218 Order" badge="92.3%" acc="#22C55E" />
      </div>

      <div className="card mb18">
        <div className="card-title">🗄️ Rekap Database Transaksi Terbaru</div>
        <table className="data-table">
          <thead>
            <tr><th>No Order</th><th>Pelanggan</th><th>Channel</th><th>Produk Dipesan</th><th>Total Nominal</th><th>Status</th><th>Tanggal & Waktu</th></tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id}>
                <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{t.id}</td>
                <td style={{ fontWeight: 700 }}>{t.customer}</td>
                <td><span className="badge badge-neutral">{t.channel}</span></td>
                <td>{t.items}</td>
                <td style={{ fontWeight: 700, color: 'var(--green)' }}>{t.amount}</td>
                <td>
                  <span className={`badge ${t.status === 'Completed' ? 'badge-green' : t.status === 'Shipped' ? 'badge-gold' : 'badge-neutral'}`}>
                    {t.status}
                  </span>
                </td>
                <td style={{ fontSize: 10, color: 'var(--text-muted)' }}>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/MarketingDashboardPage.jsx ---



function MarketingDashboardPage() {
  return (
    <div className="page-body">
      <SectionLabel badge="Marketing">Overview Aktivitas Pemasaran Momen</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="📢" label="Total Campaign Active" value="5 Campaign" sub="Meta, TikTok, Google" acc="#C9A84C" />
        <MetricCard icon="👁️" label="Total Impressions / Reach" value="2.840.000" trend={18.4} acc="#3B82F6" />
        <MetricCard icon="💸" label="Cost Per Lead (CPL)" value="Rp 13.570" trend={-6.2} trendLabel="Efisien" acc="#22C55E" />
        <MetricCard icon="💰" label="Customer Acquisition Cost" value="Rp 42.300" sub="CAC Ratio 1:4" acc="#833AB4" />
      </div>

      <div className="g2 mb18">
        <div className="card">
          <div className="card-title">📊 Distibusi Budget Pemasaran</div>
          <DonutChart 
            labels={['Meta Ads', 'TikTok Ads', 'Google Ads', 'KOL / Influencer']} 
            data={[45, 30, 15, 10]} 
            colors={['#E1306C', '#00f2fe', '#3B82F6', '#C9A84C']} 
            centerText="Rp 50jt" 
          />
        </div>

        <div className="card">
          <div className="card-title">🎯 Status Pemasaran Digital</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
            <div style={{ background: 'var(--bg2)', padding: 12, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Meta Ads (Instagram & Facebook)</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>ROAS: 4.8x · Spent: Rp 12.4jt</div>
              </div>
              <span className="badge badge-green">Running</span>
            </div>
            <div style={{ background: 'var(--bg2)', padding: 12, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>TikTok Spark Ads</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>ROAS: 5.2x · Spent: Rp 8.1jt</div>
              </div>
              <span className="badge badge-green">Running</span>
            </div>
            <div style={{ background: 'var(--bg2)', padding: 12, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Google Search Ads</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>ROAS: 3.9x · Spent: Rp 4.5jt</div>
              </div>
              <span className="badge badge-green">Running</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// --- Module: src/pages/BudgetRoiPage.jsx ---


function BudgetRoiPage() {
  const channels = [
    { channel: 'Meta Ads (IG & FB)', budget: 'Rp 20.000.000', spent: 'Rp 12.400.000', revenue: 'Rp 59.520.000', roas: '4.80x' },
    { channel: 'TikTok Ads & Shop', budget: 'Rp 15.000.000', spent: 'Rp 8.100.000', revenue: 'Rp 42.120.000', roas: '5.20x' },
    { channel: 'Google Search Ads', budget: 'Rp 8.000.000', spent: 'Rp 4.500.000', revenue: 'Rp 17.550.000', roas: '3.90x' },
    { channel: 'KOL / Endorsement', budget: 'Rp 7.000.000', spent: 'Rp 5.000.000', revenue: 'Rp 21.500.000', roas: '4.30x' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="ROI">Alokasi Budget & Return on Investment (ROI)</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="💰" label="Total Budget Marketing" value="Rp 50.000.000" sub="Juli 2026" acc="#C9A84C" />
        <MetricCard icon="💸" label="Total Budget Realisasi" value="Rp 30.000.000" badge="60.0%" acc="#3B82F6" />
        <MetricCard icon="📈" label="Total Omset Dihasilkan" value="Rp 140.690.000" sub="Via Digital Channel" acc="#22C55E" />
        <MetricCard icon="🚀" label="Blended ROAS" value="4.69x" badge="Target 4.0x" acc="#833AB4" />
      </div>

      <div className="card mb18">
        <div className="card-title">💰 Tabel Efisiensi Budget & ROAS Per Channel</div>
        <table className="data-table">
          <thead>
            <tr><th>Channel Pemasaran</th><th>Alokasi Budget</th><th>Realisasi Spent</th><th>Omset Dihasilkan</th><th>ROAS</th></tr>
          </thead>
          <tbody>
            {channels.map((c, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{c.channel}</td>
                <td>{c.budget}</td>
                <td>{c.spent}</td>
                <td style={{ fontWeight: 700, color: 'var(--green)' }}>{c.revenue}</td>
                <td style={{ fontWeight: 800, color: 'var(--gold)' }}>{c.roas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/ProductPage.jsx ---


function ProductPage() {
  const products = [
    { code: 'SKU-001', name: 'Kemeja Batik Momen Classic', category: 'Men', stock: 142, status: 'Ready' },
    { code: 'SKU-002', name: 'Outer Batik Momen Premium', category: 'Women', stock: 86, status: 'Ready' },
    { code: 'SKU-003', name: 'Tunik Batik Wanita Momen', category: 'Women', stock: 18, status: 'Low Stock' },
    { code: 'SKU-004', name: 'Hem Batik Lengan Pendek', category: 'Men', stock: 210, status: 'Ready' },
    { code: 'SKU-005', name: 'Scarf Batik Eksklusif', category: 'Accessories', stock: 5, status: 'Critical' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Product">Stok & Performa Produk Momen</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="📦" label="Total Active SKU" value="128 SKU" sub="Aktif di Katalog" acc="#C9A84C" />
        <MetricCard icon="🏬" label="Total Stock Units" value="4.850 Pcs" sub="Gudang Utama & Store" acc="#3B82F6" />
        <MetricCard icon="⚠️" label="Stok Menipis" value="8 SKU" badge="Perlu Restock" acc="#E05555" />
        <MetricCard icon="⭐" label="Rata-rata Rating" value="4.92 / 5.0" sub="Dari 1.2k Ulasan" acc="#22C55E" />
      </div>

      <div className="card mb18">
        <div className="card-title">📦 Inventaris & Ketersediaan Produk</div>
        <table className="data-table">
          <thead>
            <tr><th>SKU</th><th>Nama Produk</th><th>Kategori</th><th>Stok Tersedia</th><th>Status</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.code}>
                <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{p.code}</td>
                <td style={{ fontWeight: 700 }}>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.stock} pcs</td>
                <td>
                  <span className={`badge ${p.status === 'Ready' ? 'badge-green' : p.status === 'Low Stock' ? 'badge-gold' : 'badge-red'}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/ProductReadinessPage.jsx ---


function ProductReadinessPage() {
  const launches = [
    { collection: 'Koleksi Batik Kemerdekaan 2026', launchDate: '10 Agustus 2026', sampleStatus: 'Approved', stockStatus: '85% Produced', readiness: 'Ready for Launch' },
    { collection: 'Momen Executive Workwear Batch 2', launchDate: '25 Agustus 2026', sampleStatus: 'In Review', stockStatus: '40% Produced', readiness: 'On Track' },
    { collection: 'Limited Silk Batik Heritage', launchDate: '15 September 2026', sampleStatus: 'Prototype', stockStatus: '0% Produced', readiness: 'Preparation' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Readiness">Kesiapan Peluncuran Produk Baru</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="✅" label="Peluncuran Koleksi" value="3 Koleksi Baru" sub="Q3 2026 Pipeline" acc="#C9A84C" />
        <MetricCard icon="🧵" label="Kesiapan Sampel" value="88%" badge="Approved" acc="#22C55E" />
        <MetricCard icon="📦" label="Progress Produksi" value="1.500 Pcs" sub="Target 2.000 Pcs" acc="#3B82F6" />
        <MetricCard icon="⏱️" label="Peluncuran Terdekat" value="7 Hari Lagi" sub="Edisi Kemerdekaan" acc="#833AB4" />
      </div>

      <div className="card mb18">
        <div className="card-title">✅ Status Pipeline Peluncuran Koleksi Batik</div>
        <table className="data-table">
          <thead>
            <tr><th>Nama Koleksi</th><th>Rencana Launch</th><th>Status Sampel</th><th>Status Produksi</th><th>Kesiapan</th></tr>
          </thead>
          <tbody>
            {launches.map((l, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{l.collection}</td>
                <td>{l.launchDate}</td>
                <td><span className="badge badge-gold">{l.sampleStatus}</span></td>
                <td>{l.stockStatus}</td>
                <td>
                  <span className={`badge ${l.readiness === 'Ready for Launch' ? 'badge-green' : l.readiness === 'On Track' ? 'badge-gold' : 'badge-neutral'}`}>
                    {l.readiness}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/QualityExecutionPage.jsx ---


function QualityExecutionPage() {
  const metrics = [
    { metric: 'QC Pass Rate (Pemeriksaan Kualitas)', value: '98.6%', status: 'Optimal', note: 'Target minimal 98%' },
    { metric: 'Fulfillment Speed (SLA Pengiriman)', value: '1.2 Hari', status: 'Optimal', note: 'Rata-rata order dikirim dalam 24-36 jam' },
    { metric: 'Packaging Integrity Score', value: '99.2%', status: 'Excellent', note: 'Menggunakan Dus Hardbox Momen Gold' },
    { metric: 'Defect / Return Rate', value: '0.4%', status: 'Low Risk', note: 'Hanya 5 retur dari 1.248 transaksi' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Quality">Kualitas Produk & Eksekusi Pemenuhan Order</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🎖️" label="QC Pass Rate" value="98.6%" badge="Sangat Bagus" acc="#22C55E" />
        <MetricCard icon="⚡" label="Speed Order SLA" value="1.2 Hari" sub="Order to Delivery" acc="#3B82F6" />
        <MetricCard icon="📦" label="Kemasan Sesuai Standar" value="99.2%" sub="Hardbox & Dustbag" acc="#C9A84C" />
        <MetricCard icon="🔄" label="Tingkat Retur (Defect)" value="0.4%" badge="Sangat Rendah" acc="#22C55E" />
      </div>

      <div className="card mb18">
        <div className="card-title">🎖️ Indikator Standar Kualitas & SLA Operasional</div>
        <table className="data-table">
          <thead>
            <tr><th>Indikator Kualitas</th><th>Nilai Capaian</th><th>Status</th><th>Catatan Evaluasi</th></tr>
          </thead>
          <tbody>
            {metrics.map((m, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{m.metric}</td>
                <td style={{ fontWeight: 800, color: 'var(--gold)' }}>{m.value}</td>
                <td><span className="badge badge-green">{m.status}</span></td>
                <td style={{ fontSize: 10, color: 'var(--text-muted)' }}>{m.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/StockAvailabilityPage.jsx ---


function StockAvailabilityPage() {
  const warehouses = [
    { location: 'Gudang Utama Cirebon', stock: '3.200 Pcs', capacity: '5.000 Pcs', status: 'Healthy' },
    { location: 'Store & Hub Jakarta', stock: '1.150 Pcs', capacity: '2.000 Pcs', status: 'Healthy' },
    { location: 'Fulfillment Shopee & Tokopedia', stock: '500 Pcs', capacity: '1.000 Pcs', status: 'Reorder Needed' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Stock">Ketersediaan Stok & Alokasi Warehouse</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🏬" label="Total Units Stok" value="4.850 Pcs" sub="3 Lokasi Gudang" acc="#C9A84C" />
        <MetricCard icon="🔄" label="Stock Turnover Rate" value="4.2x / thn" sub="Sirkulasi Cepat" acc="#22C55E" />
        <MetricCard icon="⚠️" label="Stok Reorder Point" value="8 SKU" badge="Perlu Restock" acc="#E05555" />
        <MetricCard icon="🔒" label="Reserved Stock Order" value="180 Pcs" sub="Pending Dispatch" acc="#3B82F6" />
      </div>

      <div className="card mb18">
        <div className="card-title">🏬 Kapasitas & Status Stok Per Gudang</div>
        <table className="data-table">
          <thead>
            <tr><th>Lokasi Gudang</th><th>Stok Saat Ini</th><th>Kapasitas Maksimal</th><th>Status Gudang</th></tr>
          </thead>
          <tbody>
            {warehouses.map((w, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{w.location}</td>
                <td style={{ fontWeight: 700, color: 'var(--green)' }}>{w.stock}</td>
                <td>{w.capacity}</td>
                <td>
                  <span className={`badge ${w.status === 'Healthy' ? 'badge-green' : 'badge-gold'}`}>
                    {w.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/JourneyPage.jsx ---


function JourneyPage() {
  return (
    <div className="page-body">
      <SectionLabel badge="Journey">Tahapan Customer Journey & Retention</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="👀" label="1. Awareness" value="1.842.000" sub="Total Reach Social Media" acc="#3B82F6" />
        <MetricCard icon="🤔" label="2. Consideration" value="48.500" sub="Profile Visits & Clicks" acc="#833AB4" />
        <MetricCard icon="💳" label="3. Purchase" value="1.248" sub="Orders Completed" acc="#22C55E" />
        <MetricCard icon="🔄" label="4. Retention" value="35.8%" sub="Repeat Customer Rate" acc="#C9A84C" />
      </div>

      <div className="card mb18">
        <div className="card-title">👣 Customer Conversion Flow</div>
        <div style={{ padding: '10px 0' }}>
          <ProgRow label="Awareness → Click / Inquiry" value="48.500" pct={2.6} color="#3B82F6" />
          <ProgRow label="Inquiry → Add to Cart / Checkout" value="4.120" pct={8.5} color="#833AB4" />
          <ProgRow label="Checkout → Completed Purchase" value="1.248" pct={30.2} color="#22C55E" />
          <ProgRow label="Completed → Repeat Order (within 90d)" value="446" pct={35.8} color="#C9A84C" />
        </div>
      </div>
    </div>
  );
}


// --- Module: src/pages/RatingReviewPage.jsx ---


function RatingReviewPage() {
  const reviews = [
    { name: 'Andi Saputra', rating: '⭐⭐⭐⭐⭐ (5.0)', product: 'Kemeja Batik Momen Classic', comment: 'Bahan sangat halus, motif batik presisi dan elegan untuk acara resmi.', date: '12 Jul 2026' },
    { name: 'Rina Marlina', rating: '⭐⭐⭐⭐⭐ (5.0)', product: 'Outer Batik Momen Premium', comment: 'Jahitan super rapi dan jahitan inner lembut. Packaging gold-nya mewah banget!', date: '10 Jul 2026' },
    { name: 'Deni Setiawan', rating: '⭐⭐⭐⭐ (4.0)', product: 'Hem Batik Lengan Pendek', comment: 'Warna agak sedikit berbeda dari foto tapi kualitas batik sangat memuaskan.', date: '08 Jul 2026' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Review">Ulasan & Penilaian Pelanggan (Customer Rating)</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="⭐" label="Rata-rata Rating" value="4.92 / 5.0" badge="Sangat Memuaskan" acc="#C9A84C" />
        <MetricCard icon="💬" label="Total Ulasan" value="1.240 Review" sub="Dari Pelanggan Terverifikasi" acc="#3B82F6" />
        <MetricCard icon="😍" label="Ulasan 5 Bintang" value="94.2%" sub="1.168 Ulasan Positif" acc="#22C55E" />
        <MetricCard icon="👍" label="Net Promoter Score (NPS)" value="78" badge="Excellent" acc="#833AB4" />
      </div>

      <div className="card mb18">
        <div className="card-title">⭐ Ulasan Pelanggan Terbaru</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: 'var(--bg2)', padding: 14, borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-white)' }}>{r.name}</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{r.date}</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>{r.rating} · {r.product}</div>
              <p style={{ fontSize: 11, color: 'var(--text-body)', lineHeight: 1.4 }}>"{r.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


// --- Module: src/pages/ComplaintManagementPage.jsx ---


function ComplaintManagementPage() {
  const tickets = [
    { id: 'TKT-001', customer: 'Budi Santoso', category: 'Tukar Size', status: 'Resolved', duration: '4 Jam', date: '11 Jul 2026' },
    { id: 'TKT-002', customer: 'Dewi Lestari', category: 'Keterlambatan Ekspedisi', status: 'In Progress', duration: '2 Jam', date: '13 Jul 2026' },
    { id: 'TKT-003', customer: 'Ahmad Faisal', category: 'Informasi Bahan', status: 'Resolved', duration: '15 Menit', date: '09 Jul 2026' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Complaint">Penanganan & Management Keluhan Pelanggan</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="📂" label="Total Tiket Keluhan" value="12 Tiket" sub="Juli 2026 (0.9% Sales)" acc="#C9A84C" />
        <MetricCard icon="✅" label="Tiket Terselesaikan" value="11 Tiket" badge="91.6%" acc="#22C55E" />
        <MetricCard icon="⏳" label="Tiket In Progress" value="1 Tiket" sub="Sedang Ditangani" acc="#3B82F6" />
        <MetricCard icon="⏱️" label="Rata-rata Waktu Respon" value="18 Menit" badge="Fast SLA" acc="#22C55E" />
      </div>

      <div className="card mb18">
        <div className="card-title">📂 Daftar Tiket Keluhan & Customer Support</div>
        <table className="data-table">
          <thead>
            <tr><th>No Tiket</th><th>Nama Pelanggan</th><th>Kategori Keluhan</th><th>Status Tiket</th><th>Waktu Penyelesaian</th><th>Tanggal</th></tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.id}>
                <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{t.id}</td>
                <td style={{ fontWeight: 700 }}>{t.customer}</td>
                <td>{t.category}</td>
                <td>
                  <span className={`badge ${t.status === 'Resolved' ? 'badge-green' : 'badge-gold'}`}>
                    {t.status}
                  </span>
                </td>
                <td>{t.duration}</td>
                <td>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/RetentionRepeatPage.jsx ---


function RetentionRepeatPage() {
  return (
    <div className="page-body">
      <SectionLabel badge="Retention">Retensi Pelanggan & Pembelian Berulang (Repeat Order)</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🔄" label="Repeat Order Rate" value="35.8%" trend={3.2} acc="#22C55E" />
        <MetricCard icon="👥" label="Repeat Customers" value="446 Pelanggan" sub="Pembelian > 1 Kali" acc="#C9A84C" />
        <MetricCard icon="💰" label="Customer Lifetime Value" value="Rp 2.450.000" sub="Rata-rata 12 Bulan" acc="#3B82F6" />
        <MetricCard icon="🎁" label="Loyalty Member Active" value="820 Member" badge="Momen Club" acc="#833AB4" />
      </div>

      <div className="card mb18">
        <div className="card-title">🔄 Cohort Pembelian Berulang Pelanggan (90 Hari)</div>
        <div style={{ marginTop: 10 }}>
          <ProgRow label="Bulan ke-1 (Pembelian Pertama)" value="1.248 Customer" pct={100} color="#3B82F6" />
          <ProgRow label="Bulan ke-2 (Repeat Order Pertama)" value="446 Customer" pct={35.8} color="#C9A84C" />
          <ProgRow label="Bulan ke-3 (Repeat Order Kedua)" value="218 Customer" pct={17.4} color="#22C55E" />
        </div>
      </div>
    </div>
  );
}


// --- Module: src/pages/VoiceCustomerPage.jsx ---


function VoiceCustomerPage() {
  const feedback = [
    { topic: 'Permintaan Ukuran Jumbo (XXL & XXXL)', sentiment: 'Positive Opportunity', count: '48 Requests', priority: 'High' },
    { topic: 'Request Warna Pastel Batik Sogan', sentiment: 'Positive Opportunity', count: '34 Requests', priority: 'Medium' },
    { topic: 'Permintaan Bahan Katun Mercerized', sentiment: 'Positive Opportunity', count: '28 Requests', priority: 'Medium' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="VOC">Voice of Customer & Masukan Pelanggan</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🗣️" label="Total Feedback Masuk" value="110 Feedback" sub="Bulan Juli 2026" acc="#C9A84C" />
        <MetricCard icon="😃" label="Sentiment Positif" value="88.2%" badge="Sangat Baik" acc="#22C55E" />
        <MetricCard icon="💡" label="Top Feature Request" value="Ukuran XXL/3XL" sub="48 Pelanggan" acc="#3B82F6" />
        <MetricCard icon="❤️" label="Customer Satisfaction Score" value="4.85 / 5.0" acc="#833AB4" />
      </div>

      <div className="card mb18">
        <div className="card-title">🗣️ Masukan & Aspirasi Utama Pelanggan (VOC)</div>
        <table className="data-table">
          <thead>
            <tr><th>Topik Aspirasi / Masukan</th><th>Kategori Sentiment</th><th>Jumlah Permintaan</th><th>Prioritas Produk</th></tr>
          </thead>
          <tbody>
            {feedback.map((f, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{f.topic}</td>
                <td><span className="badge badge-green">{f.sentiment}</span></td>
                <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{f.count}</td>
                <td><span className={`badge ${f.priority === 'High' ? 'badge-red' : 'badge-gold'}`}>{f.priority}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/ReportPage.jsx ---


function ReportPage() {
  const reports = [
    { title: 'Laporan Penjualan Harian (Juli 2026)', format: 'XLSX / PDF', size: '2.4 MB', updated: '13 Jul 2026' },
    { title: 'Rekap Lead Funnel & Conversion Rate', format: 'PDF', size: '1.8 MB', updated: '10 Jul 2026' },
    { title: 'Analisis Performa Campaign & Ads', format: 'CSV / PDF', size: '4.1 MB', updated: '08 Jul 2026' },
    { title: 'Evaluasi Customer Satisfaction & Review', format: 'XLSX', size: '1.2 MB', updated: '01 Jul 2026' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Laporan">Pusat Laporan & Ekspor Data</SectionLabel>

      <div className="card mb18">
        <div className="card-title">📄 File Laporan Siap Unduh</div>
        <table className="data-table">
          <thead>
            <tr><th>Nama Laporan</th><th>Format</th><th>Ukuran File</th><th>Terakhir Diperbarui</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{r.title}</td>
                <td><span className="badge badge-neutral">{r.format}</span></td>
                <td>{r.size}</td>
                <td>{r.updated}</td>
                <td>
                  <button className="btn" style={{ background: 'var(--gold-pale2)', color: 'var(--gold)', border: '1px solid var(--gold)', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                    📥 Unduh
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/DataManagementPage.jsx ---


function DataManagementPage() {
  const apis = [
    { name: 'WhatsApp Business API Gateway', status: 'Connected', lastSync: '13 Jul 2026 15:07', ping: '24 ms' },
    { name: 'Meta Pixel & Conversion API', status: 'Connected', lastSync: '13 Jul 2026 15:05', ping: '18 ms' },
    { name: 'TikTok Conversions API', status: 'Connected', lastSync: '13 Jul 2026 15:00', ping: '32 ms' },
    { name: 'Database POS Offline Cirebon', status: 'Connected', lastSync: '13 Jul 2026 14:30', ping: '12 ms' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="System">Pengaturan Data & Sinkronisasi API</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="⚙️" label="Status Engine Data" value="Online 100%" badge="Live" acc="#22C55E" />
        <MetricCard icon="🔗" label="Integrasi API Aktif" value="4 Channel" sub="WhatsApp, Meta, TikTok, POS" acc="#3B82F6" />
        <MetricCard icon="🗄️" label="Total Row Database" value="48.250 Row" sub="Database Momen" acc="#C9A84C" />
        <MetricCard icon="🔒" label="Keamanan & Backup" value="Auto Daily" badge="Encrypted" acc="#22C55E" />
      </div>

      <div className="card mb18">
        <div className="card-title">⚙️ Status Integrasi API & Basis Data</div>
        <table className="data-table">
          <thead>
            <tr><th>Nama Service / API</th><th>Status Integrasi</th><th>Terakhir Sinkronisasi</th><th>Latency</th></tr>
          </thead>
          <tbody>
            {apis.map((a, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{a.name}</td>
                <td><span className="badge badge-green">🟢 {a.status}</span></td>
                <td>{a.lastSync}</td>
                <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{a.ping}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/AdsPage.jsx ---


function AdsPage() {
  const ads = [
    { name: 'Meta Ads - Batik Collection Summer', platform: 'Meta', spend: 'Rp 12.400.000', ctr: '2.8%', roas: '4.8x', status: 'Active' },
    { name: 'TikTok Ads - Viral Dance Spark', platform: 'TikTok', spend: 'Rp 8.100.000', ctr: '3.4%', roas: '3.9x', status: 'Active' },
    { name: 'Google Search - Kata Kunci Batik Modern', platform: 'Google', spend: 'Rp 4.500.000', ctr: '4.1%', roas: '5.2x', status: 'Active' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Ads">Performa Iklan Berbayar (Paid Ads)</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="💸" label="Total Ads Spend" value="Rp 25.000.000" sub="Juli 2026" acc="#F77737" />
        <MetricCard icon="📊" label="Average CTR" value="3.43%" trend={0.5} trendLabel="vs target 2.5%" acc="#3B82F6" />
        <MetricCard icon="🚀" label="Average ROAS" value="4.63x" trend={0.3} trendLabel="vs target 4.0x" acc="#22C55E" />
        <MetricCard icon="🎯" label="Total Conversions" value="612 Sales" sub="Via Paid Channel" acc="#C9A84C" />
      </div>

      <div className="card mb18">
        <div className="card-title">📣 Campaign Ads Performance</div>
        <table className="data-table">
          <thead>
            <tr><th>Nama Campaign Ads</th><th>Platform</th><th>Spend</th><th>CTR</th><th>ROAS</th><th>Status</th></tr>
          </thead>
          <tbody>
            {ads.map((a, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{a.name}</td>
                <td><span className="badge badge-gold">{a.platform}</span></td>
                <td>{a.spend}</td>
                <td>{a.ctr}</td>
                <td style={{ fontWeight: 800, color: 'var(--green)' }}>{a.roas}</td>
                <td><span className="badge badge-green">{a.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- Module: src/pages/PlaceholderPage.jsx ---


function PlaceholderPage({ name }) {
  return (
    <div className="page-body">
      <SectionLabel>{name}</SectionLabel>
      <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚧</div>
        <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--gold)', marginBottom: '6px' }}>
          Modul {name} Sedang Dalam Pengembangan
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Fitur ini akan segera tersedia pada pembaruan sistem berikutnya.
        </div>
      </div>
    </div>
  );
}


// --- Module: src/App.jsx ---































function App() {
  const [page, setPage] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const info = INFO[page] || INFO.overview;

  const [globalPeriod, setGlobalPeriod] = useState('30d');
  const [globalRange, setGlobalRange] = useState({ start: '2026-06-15', end: '2026-07-15' });
  const [dateModal, setDateModal] = useState(false);

  const [tempPeriod, setTempPeriod] = useState('30d');
  const [tempRange, setTempRange] = useState({ start: '2026-06-15', end: '2026-07-15' });

  const [baseMonth, setBaseMonth] = useState(5);
  const [baseYear, setBaseYear] = useState(2026);

  useEffect(() => {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.style.opacity = '0';
      loading.style.transition = 'opacity 0.4s';
      setTimeout(() => loading.remove(), 400);
    }
  }, []);

  const formatDateLong = (str) => {
    if (!str) return '';
    const d = new Date(str);
    if (isNaN(d.getTime())) return str;
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const datePillText = useMemo(() => {
    if (globalPeriod === '7d') return '📅 7 Hari Terakhir';
    if (globalPeriod === '30d') return '📅 30 Hari Terakhir';
    if (globalPeriod === '90d') return '📅 90 Hari Terakhir';
    
    if (globalRange.start && globalRange.end) {
      return `📅 ${formatDateLong(globalRange.start)} - ${formatDateLong(globalRange.end)}`;
    }
    return '📅 Pilih Periode';
  }, [globalPeriod, globalRange]);

  const resolvedPeriod = useMemo(() => {
    if (globalPeriod === '7d' || globalPeriod === '30d' || globalPeriod === '90d') {
      return globalPeriod;
    }
    
    if (!globalRange.start || !globalRange.end) return '30d';
    
    const start = new Date(globalRange.start);
    const end = new Date(globalRange.end);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) return '7d';
    if (diffDays <= 30) return '30d';
    return '90d';
  }, [globalPeriod, globalRange]);

  const handleDayClick = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    if (!tempRange.start || (tempRange.start && tempRange.end)) {
      setTempRange({ start: dateStr, end: '' });
      setTempPeriod('custom');
    } else {
      if (dateStr < tempRange.start) {
        setTempRange({ start: dateStr, end: '' });
      } else {
        setTempRange(p => ({ ...p, end: dateStr }));
      }
      setTempPeriod('custom');
    }
  };

  const selectPreset = (presetId) => {
    setTempPeriod(presetId);
    const today = new Date();
    let start = new Date();
    let end = new Date();

    switch(presetId) {
      case 'today':
        break;
      case 'yesterday':
        start.setDate(today.getDate() - 1);
        end.setDate(today.getDate() - 1);
        break;
      case '7d':
        start.setDate(today.getDate() - 7);
        break;
      case '30d':
        start.setDate(today.getDate() - 30);
        break;
      case 'this_month':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'last_month':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      default:
        break;
    }
    
    setTempRange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    });
  };

  const nextMonth = () => {
    if (baseMonth === 11) {
      setBaseMonth(0);
      setBaseYear(p => p + 1);
    } else {
      setBaseMonth(p => p + 1);
    }
  };

  const prevMonth = () => {
    if (baseMonth === 0) {
      setBaseMonth(11);
      setBaseYear(p => p - 1);
    } else {
      setBaseMonth(p => p - 1);
    }
  };

  const bottomMonth = baseMonth === 11 ? 0 : baseMonth + 1;
  const bottomYear = baseMonth === 11 ? baseYear + 1 : baseYear;

  function renderPage(){
    switch(page){
      case 'overview':              return <OverviewPage period={resolvedPeriod} range={globalRange}/>;
      case 'insight':               return <InsightPage period={resolvedPeriod} range={globalRange}/>;
      
      case 'sales_dashboard':       return <SalesDashboardPage period={resolvedPeriod} range={globalRange}/>;
      case 'target_achievement':    return <TargetAchievementPage period={resolvedPeriod} range={globalRange}/>;
      case 'funnel_leads':          return <FunnelLeadsPage period={resolvedPeriod} range={globalRange}/>;
      case 'product_sales':         return <ProductSalesPage period={resolvedPeriod} range={globalRange}/>;
      case 'sales_database':        return <SalesDatabasePage period={resolvedPeriod} range={globalRange}/>;
      
      case 'marketing_dashboard':   return <MarketingDashboardPage period={resolvedPeriod} range={globalRange}/>;
      case 'social_media':          return <SocialMediaHub period={resolvedPeriod} range={globalRange}/>;
      case 'campaign_content':      return <CampaignContentHub period={resolvedPeriod} range={globalRange}/>;
      case 'ads_performance':       return <AdsPage period={resolvedPeriod} range={globalRange}/>;
      case 'budget_roi':            return <BudgetRoiPage period={resolvedPeriod} range={globalRange}/>;
      
      case 'product_dashboard':     return <ProductPage period={resolvedPeriod} range={globalRange}/>;
      case 'product_readiness':     return <ProductReadinessPage period={resolvedPeriod} range={globalRange}/>;
      case 'quality_execution':     return <QualityExecutionPage period={resolvedPeriod} range={globalRange}/>;
      case 'stock_availability':    return <StockAvailabilityPage period={resolvedPeriod} range={globalRange}/>;
      
      case 'customer_journey':       return <JourneyPage period={resolvedPeriod} range={globalRange}/>;
      case 'rating_review':         return <RatingReviewPage period={resolvedPeriod} range={globalRange}/>;
      case 'complaint_management':  return <ComplaintManagementPage period={resolvedPeriod} range={globalRange}/>;
      case 'retention_repeat':      return <RetentionRepeatPage period={resolvedPeriod} range={globalRange}/>;
      case 'voice_customer':        return <VoiceCustomerPage period={resolvedPeriod} range={globalRange}/>;
      
      case 'report_export':         return <ReportPage period={resolvedPeriod} range={globalRange}/>;
      case 'data_management':       return <DataManagementPage period={resolvedPeriod} range={globalRange}/>;
      default: {
        const item = NAV.find(n => n.id === page);
        return <PlaceholderPage name={item ? item.label : page} />;
      }
    }
  }

  return(
    <div className="app">
      <Sidebar active={page} onNav={setPage} mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="main">
        <header className="topbar">
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <button 
              className="mobile-toggle"
              style={{
                background:'none',
                border:'none',
                fontSize:22,
                cursor:'pointer',
                color:'var(--text-dark)',
                display:'none',
                outline:'none'
              }}
              onClick={() => setMobileMenuOpen(true)}
            >
              ☰
            </button>
            <div>
              <div className="page-title">{info.title}</div>
              <div className="page-sub">{info.sub}</div>
            </div>
          </div>
          <div className="topbar-right">
            <button 
              className="date-pill" 
              style={{
                background: 'var(--gold-pale)', 
                color: 'var(--gold-dark)', 
                border: '1px solid var(--gold)',
                borderRadius: '20px',
                padding: '6px 14px',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s',
                outline: 'none'
              }}
              onClick={() => {
                setTempPeriod(globalPeriod);
                setTempRange(globalRange);
                setDateModal(true);
              }}
            >
              {datePillText}
            </button>
            <div className="live-pill">🟢 Live</div>
          </div>
        </header>
        {renderPage()}
      </div>

      <Modal open={dateModal} onClose={()=>setDateModal(false)} title="📅 Date Range Picker">
        <div style={{display:'flex', flexDirection:'column'}}>
          <div style={{display:'flex', gap:8, marginBottom:16}}>
            <div style={{display:'flex', flex:1, border:'2px solid #3B82F6', borderRadius:8, overflow:'hidden'}}>
              <input
                type="text"
                disabled
                style={{flex:1, border:'none', padding:'10px 14px', fontSize: 14, fontWeight:700, background:'#F8FAFC', color:'#3B4048'}}
                value={tempRange.start && tempRange.end ? `${formatDateLong(tempRange.start)} - ${formatDateLong(tempRange.end)}` : 'Pilih rentang tanggal...'}
              />
              <div style={{background:'#0ea5e9', display:'flex', alignItems:'center', justifyContent:'center', width:44, color:'white', fontWeight:800}}>
                🔍
              </div>
            </div>
          </div>

          <div style={{display:'flex', gap:18, minHeight: '340px'}}>
            <div style={{display:'flex', flexDirection:'column', width:'130px', borderRight:'1px solid var(--bg2)', paddingRight:12, gap:6, flexShrink:0}}>
              {[
                { id: 'today', label: 'Today' },
                { id: 'yesterday', label: 'Yesterday' },
                { id: '7d', label: 'Last 7 Days' },
                { id: '30d', label: 'Last 30 Days' },
                { id: 'this_month', label: 'This Month' },
                { id: 'last_month', label: 'Last Month' },
                { id: 'custom', label: 'Custom Range' }
              ].map(o => (
                <button
                  key={o.id}
                  style={{
                    textAlign:'left',
                    padding:'8px 10px',
                    background:tempPeriod===o.id?'#3B82F6':'transparent',
                    color:tempPeriod===o.id?'white':'var(--text-dark)',
                    border:'none',
                    borderRadius:6,
                    fontWeight:700,
                    fontSize:12,
                    cursor:'pointer',
                    transition:'all 0.15s'
                  }}
                  onClick={() => selectPreset(o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <div style={{flex:1, display:'flex', flexDirection:'column', gap:20, overflowY:'auto', maxHeight:'340px', paddingRight:6}}>
              <div style={{borderBottom:'1px solid var(--bg2)', paddingBottom:14}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontWeight:800, fontSize:12, marginBottom:10, textTransform:'uppercase'}}>
                  <span onClick={prevMonth} style={{cursor:'pointer', padding:'2px 8px', background:'var(--bg2)', borderRadius:4}}>❮</span>
                  <span>{new Date(baseYear, baseMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  <span style={{visibility:'hidden'}}>❯</span>
                </div>
                <Calendar
                  month={baseMonth}
                  year={baseYear}
                  selectedStart={tempRange.start}
                  selectedEnd={tempRange.end}
                  onDayClick={handleDayClick}
                />
              </div>

              <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontWeight:800, fontSize:12, marginBottom:10, textTransform:'uppercase'}}>
                  <span style={{visibility:'hidden'}}>❮</span>
                  <span>{new Date(bottomYear, bottomMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  <span onClick={nextMonth} style={{cursor:'pointer', padding:'2px 8px', background:'var(--bg2)', borderRadius:4}}>❯</span>
                </div>
                <Calendar
                  month={bottomMonth}
                  year={bottomYear}
                  selectedStart={tempRange.start}
                  selectedEnd={tempRange.end}
                  onDayClick={handleDayClick}
                />
              </div>
            </div>
          </div>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--bg2)', paddingTop:12, marginTop:12}}>
            <div style={{fontSize:13, fontWeight:700, color:'var(--text-dark)'}}>
              {tempRange.start && tempRange.end ? `${formatDateLong(tempRange.start)} - ${formatDateLong(tempRange.end)}` : ''}
            </div>
            <div style={{display:'flex', gap:10}}>
              <button className="btn btn-ghost" onClick={() => setDateModal(false)} style={{cursor:'pointer', border:'none', background:'transparent', fontSize:13, fontWeight:700}}>Cancel</button>
              <button 
                className="btn" 
                style={{background:'#1E40AF', color:'white', border:'none', padding:'8px 18px', borderRadius:8, fontSize:13, fontWeight:700, cursor:'pointer'}}
                onClick={() => {
                  setGlobalPeriod(tempPeriod);
                  setGlobalRange(tempRange);
                  setDateModal(false);
                }}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}


// --- Module: src/main.jsx ---


ReactDOM.createRoot(document.getElementById('root')).render(<App />);
