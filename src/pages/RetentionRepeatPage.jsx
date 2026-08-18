import { MetricCard, SectionLabel, ProgRow } from '../components/common/UIComponents.jsx';

export function RetentionRepeatPage() {
  return (
    <div className="page-body">
      <SectionLabel badge="Retention">Retensi Pelanggan & Pembelian Berulang (Repeat Order)</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🔄" label="Repeat Order Rate" value="35.8%" trend={3.2} acc="#22C55E" />
        <MetricCard icon="👥" label="Repeat Customers" value="446 Pelanggan" sub="Pembelian > 1 Kali" acc="#C9A84C" />
        <MetricCard icon="💰" label="Customer Lifetime Value" value="Rp 2.450.000" sub="Rata-rata 12 Bulan" acc="#3B82F6" />
        <MetricCard icon="🎁" label="Loyalty Member Active" value="820 Member" badge="Momen Club" acc="#833AB4" />
      </div>

      <div className="card mb18">
        <div className="card-title">🔄 Cohort Pembelian Berulang Pelanggan (90 Hari)</div>
        <div style={{ marginTop: 10 }}>
          <ProgRow label="Bulan ke-1 (Pembelian Pertama)" value="1.248 Customer" pct={100} color="#3B82F6" />
          <ProgRow label="Bulan ke-2 (Repeat Order Pertama)" value="446 Customer" pct={35.8} color="#C9A84C" />
          <ProgRow label="Bulan ke-3 (Repeat Order Kedua)" value="218 Customer" pct={17.4} color="#22C55E" />
        </div>
      </div>
    </div>
  );
}
