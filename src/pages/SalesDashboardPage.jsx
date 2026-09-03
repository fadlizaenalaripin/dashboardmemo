import { useMemo } from 'react';
import { DATA } from '../data/mockData.js';
import { MetricCard, SectionLabel, ProgRow } from '../components/common/UIComponents.jsx';
import { MultiLineChart, ComboBarLineChart } from '../components/charts/Charts.jsx';

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

const Icons = {
  wa: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#22C55E" style={{ flexShrink: 0 }}>
      <path d="M12.012 2c-5.506 0-9.989 4.478-9.989 9.984 0 1.76.459 3.475 1.332 4.992l-1.417 5.178 5.305-1.391c1.458.796 3.104 1.217 4.767 1.217 5.507 0 9.99-4.478 9.99-9.984 0-5.506-4.483-9.996-9.988-9.996zm5.836 14.2c-.244.686-1.424 1.31-1.956 1.365-.503.052-1.144.075-1.848-.15-.436-.139-1.002-.323-1.745-.644-3.111-1.343-5.132-4.48-5.289-4.688-.156-.208-1.272-1.696-1.272-3.234 0-1.538.804-2.296 1.09-2.589.287-.293.626-.365.835-.365.209 0 .417.002.599.011.196.009.458-.074.717.547.261.621.887 2.164.965 2.322.079.158.13.344.026.551-.104.208-.156.337-.313.518-.156.182-.329.406-.47.544-.156.156-.319.325-.137.637.182.312.808 1.334 1.733 2.158 1.187 1.058 2.188 1.387 2.499 1.543.313.156.496.13.679-.078.182-.208.783-.912.991-1.224.208-.312.417-.26.704-.156.287.104 1.826.86 2.139 1.017.313.156.522.234.6.364.079.13.079.755-.165 1.441z"/>
    </svg>
  ),
  ig: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  shopee: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#EE4D2D" style={{ flexShrink: 0 }}>
      <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h6v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z"/>
    </svg>
  ),
  tiktok: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#00F2FE" style={{ flexShrink: 0 }}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-3.04-4.54z"/>
    </svg>
  ),
  storeCirebon: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#C9A84C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
  storeJakarta: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  ),
};

const annualComboDatasets = [
  {
    type: 'line',
    label: 'Trend Target Tahunan (2026)',
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
    label: 'Sales Store BT Cirebon',
    data: [57000000, 66000000, 63000000, 78000000, 72000000, 69000000, 84000000, 81000000, 90000000, 87000000, 96000000, 108000000],
    backgroundColor: '#C9A84C',
    order: 2
  },
  {
    type: 'bar',
    label: 'Sales Store BT Jakarta',
    data: [38000000, 44000000, 42000000, 52000000, 48000000, 46000000, 56000000, 54000000, 60000000, 58000000, 64000000, 72000000],
    backgroundColor: '#A855F7',
    order: 3
  },
  {
    type: 'bar',
    label: 'Sales Online',
    data: [240000000, 270000000, 290000000, 340000000, 330000000, 310000000, 380000000, 370000000, 410000000, 420000000, 450000000, 490000000],
    backgroundColor: '#3B82F6',
    order: 4
  }
];

export function SalesDashboardPage({ period }) {
  const d = DATA;

  const trendDatasets = useMemo(() => [
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
  ], [d.trendTarget, d.trendActual]);

  return (
    <div className="page-body">
      <SectionLabel badge="Sales Overview">Dashboard Penjualan Sales Store & Sales Online</SectionLabel>

      {/* Metric Summary Cards */}
      <div className="g3 mb18">
        <MetricCard 
          label="Sales Store BT Cirebon" 
          value="Rp 32.400.000" 
          badge="40.5%" 
          sub="Target: Rp 80.000.000" 
          acc="#C9A84C" 
        />
        <MetricCard 
          label="Sales Store BT Jakarta" 
          value="Rp 20.888.726" 
          badge="34.8%" 
          sub="Target: Rp 60.000.000" 
          acc="#A855F7" 
        />
        <MetricCard 
          label="Sales Online" 
          value="Rp 148.550.000" 
          badge="37.1%" 
          sub="Target: Rp 400.000.000" 
          acc="#3B82F6" 
        />
      </div>

      {/* COMBO CHART POSISI DI ATAS (BAR BULAN JAN-DES + TREND LINE TAHUNAN) */}
      <div className="card mb18">
        <div className="card-title">Perbandingan Omset Store BT Cirebon, Store BT Jakarta & Sales Online (Januari – Desember 2026)</div>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
          Grafik kombinasi Bar Chart omset bulanan Sales Store BT Cirebon, Sales Store BT Jakarta & Sales Online dengan overlay Trend Line Target Sales 2026
        </div>
        <ComboBarLineChart labels={monthLabels} datasets={annualComboDatasets} height={260} />
      </div>

      {/* GRID BAWAH: TREN HARIAN (LINE CHART) & RINCIAN CHANNEL */}
      <div className="g2 mb18">
        {/* Tren Harian Penjualan */}
        <div className="card">
          <div className="card-title">Tren Harian Penjualan Bulan Ini (Actual vs Target)</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '10px' }}>
            Grafik tren harian per pergerakan tanggal
          </div>
          <MultiLineChart labels={d.trendLabels} datasets={trendDatasets} height={220} />
        </div>

        {/* Breakdown Channel Store vs Online */}
        <div className="card">
          <div className="card-title">Rincian Channel Penjualan & Target Store</div>
          
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>SALES ONLINE</span>
              <span>Realisasi Rp 148.550.000 / Target Rp 400jt (37.1%)</span>
            </div>
            <ProgRow icon={Icons.wa} label="WhatsApp Sales" value="Rp 67.800.000" pct={45.6} color="#22C55E" />
            <ProgRow icon={Icons.ig} label="Instagram DM & Shop" value="Rp 40.500.000" pct={27.2} color="#E1306C" />
            <ProgRow icon={Icons.shopee} label="Shopee Official Store" value="Rp 22.450.000" pct={15.1} color="#EE4D2D" />
            <ProgRow icon={Icons.tiktok} label="TikTok Shop" value="Rp 17.800.000" pct={12.0} color="#00F2FE" />

            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', margin: '14px 0 10px' }} />

            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
              <span>SALES STORE (OFFLINE)</span>
              <span>Realisasi Rp 53.288.726 / Target Rp 140jt (38.1%)</span>
            </div>
            <ProgRow icon={Icons.storeCirebon} label="Sales Store BT Cirebon (Target: Rp 80.000.000)" value="Rp 32.400.000" pct={40.5} color="#C9A84C" />
            <ProgRow icon={Icons.storeJakarta} label="Sales Store BT Jakarta (Target: Rp 60.000.000)" value="Rp 20.888.726" pct={34.8} color="#A855F7" />
          </div>
        </div>
      </div>
    </div>
  );
}
