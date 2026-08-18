import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';

export function AdsPage() {
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
