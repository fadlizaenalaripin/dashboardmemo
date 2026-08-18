import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';

export function QualityExecutionPage() {
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
