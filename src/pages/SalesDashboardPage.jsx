import { DATA } from '../data/mockData.js';
import { MetricCard, SectionLabel, ProgRow } from '../components/common/UIComponents.jsx';
import { LineChart, BarChart } from '../components/charts/Charts.jsx';

export function SalesDashboardPage({ period }) {
  const d = DATA;
  return (
    <div className="page-body">
      <SectionLabel badge="Sales">Dashboard Penjualan Sales Momen</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🎯" label="Target Penjualan" value={d.salesOverview.target} sub="Juli 2026" acc="#C9A84C" />
        <MetricCard icon="💰" label="Realisasi Omset" value={d.salesOverview.achievement.value} badge={d.salesOverview.achievement.pct} acc="#22C55E" />
        <MetricCard icon="📦" label="Volume Terjual" value={d.salesOverview.qty.value + ' pcs'} trend={d.salesOverview.qty.change} acc="#3B82F6" />
        <MetricCard icon="🛍️" label="Jumlah Transaksi" value={d.salesOverview.transaksi.value + ' Transaksi'} trend={d.salesOverview.transaksi.change} acc="#833AB4" />
      </div>

      <div className="g2 mb18">
        <div className="card">
          <div className="card-title">📈 Tren Harian Penjualan</div>
          <LineChart labels={d.trendLabels} data={d.trendActual} color="#22C55E" height={200} />
        </div>

        <div className="card">
          <div className="card-title">🏆 Top Produk Sales Breakdown</div>
          <div style={{ marginTop: 10 }}>
            {d.bestSeller.map(b => (
              <ProgRow key={b.rank} label={b.name} value={b.revenue} pct={Math.round((b.qty / 500) * 100)} color="var(--gold)" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
