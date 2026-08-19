import { DATA } from '../data/mockData.js';
import { MetricCard, SectionLabel, ProgRow } from '../components/common/UIComponents.jsx';
import { MultiLineChart, ComboBarLineChart } from '../components/charts/Charts.jsx';

export function SalesDashboardPage({ period }) {
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
