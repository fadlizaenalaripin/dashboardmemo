import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';

export function VoiceCustomerPage() {
  const feedback = [
    { topic: 'Permintaan Ukuran Jumbo (XXL & XXXL)', sentiment: 'Positive Opportunity', count: '48 Requests', priority: 'High' },
    { topic: 'Request Warna Pastel Batik Sogan', sentiment: 'Positive Opportunity', count: '34 Requests', priority: 'Medium' },
    { topic: 'Permintaan Bahan Katun Mercerized', sentiment: 'Positive Opportunity', count: '28 Requests', priority: 'Medium' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="VOC">Voice of Customer & Masukan Pelanggan</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🗣️" label="Total Feedback Masuk" value="110 Feedback" sub="Bulan Juli 2026" acc="#C9A84C" />
        <MetricCard icon="😃" label="Sentiment Positif" value="88.2%" badge="Sangat Baik" acc="#22C55E" />
        <MetricCard icon="💡" label="Top Feature Request" value="Ukuran XXL/3XL" sub="48 Pelanggan" acc="#3B82F6" />
        <MetricCard icon="❤️" label="Customer Satisfaction Score" value="4.85 / 5.0" acc="#833AB4" />
      </div>

      <div className="card mb18">
        <div className="card-title">Masukan & Aspirasi Utama Pelanggan (VOC)</div>
        <table className="data-table">
          <thead>
            <tr><th>Topik Aspirasi / Masukan</th><th>Kategori Sentiment</th><th>Jumlah Permintaan</th><th>Prioritas Produk</th></tr>
          </thead>
          <tbody>
            {feedback.map((f, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{f.topic}</td>
                <td><span className="badge badge-green">{f.sentiment}</span></td>
                <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{f.count}</td>
                <td><span className={`badge ${f.priority === 'High' ? 'badge-red' : 'badge-gold'}`}>{f.priority}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
