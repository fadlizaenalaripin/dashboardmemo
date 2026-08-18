import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';

export function CampaignPage() {
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
