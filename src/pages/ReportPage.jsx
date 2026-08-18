import { SectionLabel } from '../components/common/UIComponents.jsx';

export function ReportPage() {
  const reports = [
    { title: 'Laporan Penjualan Harian (Juli 2026)', format: 'XLSX / PDF', size: '2.4 MB', updated: '13 Jul 2026' },
    { title: 'Rekap Lead Funnel & Conversion Rate', format: 'PDF', size: '1.8 MB', updated: '10 Jul 2026' },
    { title: 'Analisis Performa Campaign & Ads', format: 'CSV / PDF', size: '4.1 MB', updated: '08 Jul 2026' },
    { title: 'Evaluasi Customer Satisfaction & Review', format: 'XLSX', size: '1.2 MB', updated: '01 Jul 2026' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Laporan">Pusat Laporan & Ekspor Data</SectionLabel>

      <div className="card mb18">
        <div className="card-title">📄 File Laporan Siap Unduh</div>
        <table className="data-table">
          <thead>
            <tr><th>Nama Laporan</th><th>Format</th><th>Ukuran File</th><th>Terakhir Diperbarui</th><th>Aksi</th></tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{r.title}</td>
                <td><span className="badge badge-neutral">{r.format}</span></td>
                <td>{r.size}</td>
                <td>{r.updated}</td>
                <td>
                  <button className="btn" style={{ background: 'var(--gold-pale2)', color: 'var(--gold)', border: '1px solid var(--gold)', padding: '4px 10px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer' }}>
                    📥 Unduh
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
