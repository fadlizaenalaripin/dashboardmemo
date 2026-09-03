import { MetricCard, SectionLabel, ProgRow } from '../components/common/UIComponents.jsx';

export function TargetAchievementPage() {
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
        <MetricCard label="Target Total Sales" value="Rp 540.000.000" sub="Juli 2026" acc="#C9A84C" />
        <MetricCard label="Realisasi Total" value="Rp 201.838.726" badge="37.38%" acc="#22C55E" />
        <MetricCard label="Sisa Target" value="Rp 338.161.274" sub="18 Hari Tersisa" acc="#3B82F6" />
        <MetricCard label="Top Sales Executive" value="Siti Rahma" badge="48.6%" acc="#833AB4" />
      </div>

      <div className="card mb18">
        <div className="card-title">Rincian Performa & Bonus Per Sales Executive</div>
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
        <div className="card-title">Progress Pencapaian Visual</div>
        <div style={{ marginTop: 10 }}>
          {team.map((t, idx) => (
            <ProgRow key={idx} label={t.name} value={t.actual} pct={t.pct} color="var(--gold)" />
          ))}
        </div>
      </div>
    </div>
  );
}
