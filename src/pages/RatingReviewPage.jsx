import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';

export function RatingReviewPage() {
  const reviews = [
    { name: 'Andi Saputra', rating: '⭐⭐⭐⭐⭐ (5.0)', product: 'Kemeja Batik Momen Classic', comment: 'Bahan sangat halus, motif batik presisi dan elegan untuk acara resmi.', date: '12 Jul 2026' },
    { name: 'Rina Marlina', rating: '⭐⭐⭐⭐⭐ (5.0)', product: 'Outer Batik Momen Premium', comment: 'Jahitan super rapi dan jahitan inner lembut. Packaging gold-nya mewah banget!', date: '10 Jul 2026' },
    { name: 'Deni Setiawan', rating: '⭐⭐⭐⭐ (4.0)', product: 'Hem Batik Lengan Pendek', comment: 'Warna agak sedikit berbeda dari foto tapi kualitas batik sangat memuaskan.', date: '08 Jul 2026' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Review">Ulasan & Penilaian Pelanggan (Customer Rating)</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="⭐" label="Rata-rata Rating" value="4.92 / 5.0" badge="Sangat Memuaskan" acc="#C9A84C" />
        <MetricCard icon="💬" label="Total Ulasan" value="1.240 Review" sub="Dari Pelanggan Terverifikasi" acc="#3B82F6" />
        <MetricCard icon="😍" label="Ulasan 5 Bintang" value="94.2%" sub="1.168 Ulasan Positif" acc="#22C55E" />
        <MetricCard icon="👍" label="Net Promoter Score (NPS)" value="78" badge="Excellent" acc="#833AB4" />
      </div>

      <div className="card mb18">
        <div className="card-title">⭐ Ulasan Pelanggan Terbaru</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: 'var(--bg2)', padding: 14, borderRadius: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-white)' }}>{r.name}</span>
                <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{r.date}</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--gold)', marginBottom: 4 }}>{r.rating} · {r.product}</div>
              <p style={{ fontSize: 11, color: 'var(--text-body)', lineHeight: 1.4 }}>"{r.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
