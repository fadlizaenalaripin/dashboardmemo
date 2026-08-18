import { MetricCard, SectionLabel, ProgRow } from '../components/common/UIComponents.jsx';

export function JourneyPage() {
  return (
    <div className="page-body">
      <SectionLabel badge="Journey">Tahapan Customer Journey & Retention</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="👀" label="1. Awareness" value="1.842.000" sub="Total Reach Social Media" acc="#3B82F6" />
        <MetricCard icon="🤔" label="2. Consideration" value="48.500" sub="Profile Visits & Clicks" acc="#833AB4" />
        <MetricCard icon="💳" label="3. Purchase" value="1.248" sub="Orders Completed" acc="#22C55E" />
        <MetricCard icon="🔄" label="4. Retention" value="35.8%" sub="Repeat Customer Rate" acc="#C9A84C" />
      </div>

      <div className="card mb18">
        <div className="card-title">👣 Customer Conversion Flow</div>
        <div style={{ padding: '10px 0' }}>
          <ProgRow label="Awareness → Click / Inquiry" value="48.500" pct={2.6} color="#3B82F6" />
          <ProgRow label="Inquiry → Add to Cart / Checkout" value="4.120" pct={8.5} color="#833AB4" />
          <ProgRow label="Checkout → Completed Purchase" value="1.248" pct={30.2} color="#22C55E" />
          <ProgRow label="Completed → Repeat Order (within 90d)" value="446" pct={35.8} color="#C9A84C" />
        </div>
      </div>
    </div>
  );
}
