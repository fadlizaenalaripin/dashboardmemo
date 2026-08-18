import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';

export function DataManagementPage() {
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
