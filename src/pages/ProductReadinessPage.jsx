import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';

export function ProductReadinessPage() {
  const launches = [
    { collection: 'Koleksi Batik Kemerdekaan 2026', launchDate: '10 Agustus 2026', sampleStatus: 'Approved', stockStatus: '85% Produced', readiness: 'Ready for Launch' },
    { collection: 'Momen Executive Workwear Batch 2', launchDate: '25 Agustus 2026', sampleStatus: 'In Review', stockStatus: '40% Produced', readiness: 'On Track' },
    { collection: 'Limited Silk Batik Heritage', launchDate: '15 September 2026', sampleStatus: 'Prototype', stockStatus: '0% Produced', readiness: 'Preparation' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Readiness">Kesiapan Peluncuran Produk Baru</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="✅" label="Peluncuran Koleksi" value="3 Koleksi Baru" sub="Q3 2026 Pipeline" acc="#C9A84C" />
        <MetricCard icon="🧵" label="Kesiapan Sampel" value="88%" badge="Approved" acc="#22C55E" />
        <MetricCard icon="📦" label="Progress Produksi" value="1.500 Pcs" sub="Target 2.000 Pcs" acc="#3B82F6" />
        <MetricCard icon="⏱️" label="Peluncuran Terdekat" value="7 Hari Lagi" sub="Edisi Kemerdekaan" acc="#833AB4" />
      </div>

      <div className="card mb18">
        <div className="card-title">✅ Status Pipeline Peluncuran Koleksi Batik</div>
        <table className="data-table">
          <thead>
            <tr><th>Nama Koleksi</th><th>Rencana Launch</th><th>Status Sampel</th><th>Status Produksi</th><th>Kesiapan</th></tr>
          </thead>
          <tbody>
            {launches.map((l, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{l.collection}</td>
                <td>{l.launchDate}</td>
                <td><span className="badge badge-gold">{l.sampleStatus}</span></td>
                <td>{l.stockStatus}</td>
                <td>
                  <span className={`badge ${l.readiness === 'Ready for Launch' ? 'badge-green' : l.readiness === 'On Track' ? 'badge-gold' : 'badge-neutral'}`}>
                    {l.readiness}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
