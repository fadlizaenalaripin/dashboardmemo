import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';

export function ComplaintManagementPage() {
  const tickets = [
    { id: 'TKT-001', customer: 'Budi Santoso', category: 'Tukar Size', status: 'Resolved', duration: '4 Jam', date: '11 Jul 2026' },
    { id: 'TKT-002', customer: 'Dewi Lestari', category: 'Keterlambatan Ekspedisi', status: 'In Progress', duration: '2 Jam', date: '13 Jul 2026' },
    { id: 'TKT-003', customer: 'Ahmad Faisal', category: 'Informasi Bahan', status: 'Resolved', duration: '15 Menit', date: '09 Jul 2026' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Complaint">Penanganan & Management Keluhan Pelanggan</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="📂" label="Total Tiket Keluhan" value="12 Tiket" sub="Juli 2026 (0.9% Sales)" acc="#C9A84C" />
        <MetricCard icon="✅" label="Tiket Terselesaikan" value="11 Tiket" badge="91.6%" acc="#22C55E" />
        <MetricCard icon="⏳" label="Tiket In Progress" value="1 Tiket" sub="Sedang Ditangani" acc="#3B82F6" />
        <MetricCard icon="⏱️" label="Rata-rata Waktu Respon" value="18 Menit" badge="Fast SLA" acc="#22C55E" />
      </div>

      <div className="card mb18">
        <div className="card-title">📂 Daftar Tiket Keluhan & Customer Support</div>
        <table className="data-table">
          <thead>
            <tr><th>No Tiket</th><th>Nama Pelanggan</th><th>Kategori Keluhan</th><th>Status Tiket</th><th>Waktu Penyelesaian</th><th>Tanggal</th></tr>
          </thead>
          <tbody>
            {tickets.map(t => (
              <tr key={t.id}>
                <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{t.id}</td>
                <td style={{ fontWeight: 700 }}>{t.customer}</td>
                <td>{t.category}</td>
                <td>
                  <span className={`badge ${t.status === 'Resolved' ? 'badge-green' : 'badge-gold'}`}>
                    {t.status}
                  </span>
                </td>
                <td>{t.duration}</td>
                <td>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
