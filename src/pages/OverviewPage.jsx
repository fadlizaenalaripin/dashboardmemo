import { DATA } from '../data/mockData.js';
import { MetricCard, SectionLabel, ProgRow, AccountCard, TopPostRow, PTag } from '../components/common/UIComponents.jsx';
import { LineChart, DonutChart, BarChart } from '../components/charts/Charts.jsx';

export function OverviewPage({ period }) {
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
