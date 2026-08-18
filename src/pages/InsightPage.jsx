import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';

export function InsightPage() {
  const insights = [
    { type: 'High Priority', title: 'Tingkatkan Budget Ads TikTok Video Dance', desc: 'ROAS TikTok mencapai 5.2x melebihi target Meta. Alokasikan 20% budget dari Meta Ads ke TikTok Spark Ads.', impact: '+Rp 35.000.000 Omset' },
    { type: 'Opportunity', title: 'Optimasi Restock Outer Batik Momen Premium', desc: 'Stok Outer Batik tinggal 18 pcs sedangkan permintaan meningkat 34% minggu ini.', impact: 'Cegah Loss Sales Rp 25.000.000' },
    { type: 'Action Required', title: 'Follow Up Leads WhatsApp Unclosed > 48 Jam', desc: 'Terdapat 142 leads qualified di WhatsApp yang belum diproses ulang oleh tim sales.', impact: 'Potensi Konversi 25%' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="AI Insight">Executive Insight & Rekomendasi Performa</SectionLabel>

      <div className="g3 mb18">
        <MetricCard icon="💡" label="Insight Aktif" value="3 Rekomendasi" sub="Dianalisis dari Data Juli" acc="#C9A84C" />
        <MetricCard icon="🎯" label="Potensi Kenaikan Omset" value="+Rp 60.000.000" sub="Jika rekomendasi dijalankan" acc="#22C55E" />
        <MetricCard icon="⚡" label="Skor Kesehatan Bisnis" value="92 / 100" badge="Sangat Baik" acc="#3B82F6" />
      </div>

      <div className="card mb18">
        <div className="card-title">💡 Rekomendasi Strategis & Peningkatan Performa</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {insights.map((item, idx) => (
            <div key={idx} style={{ background: 'var(--bg2)', padding: '14px 16px', borderRadius: '8px', borderLeft: '4px solid var(--gold)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-white)' }}>{item.title}</span>
                <span className={`badge ${item.type === 'High Priority' ? 'badge-red' : item.type === 'Opportunity' ? 'badge-green' : 'badge-gold'}`}>
                  {item.type}
                </span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--text-body)', lineHeight: 1.5, marginBottom: 8 }}>{item.desc}</p>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gold)' }}>🚀 Estimasi Dampak: {item.impact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
