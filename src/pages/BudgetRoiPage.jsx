import { MetricCard, SectionLabel, ProgRow } from '../components/common/UIComponents.jsx';

export function BudgetRoiPage() {
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
