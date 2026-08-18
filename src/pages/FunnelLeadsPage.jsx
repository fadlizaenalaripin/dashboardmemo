import { MetricCard, SectionLabel, ProgRow } from '../components/common/UIComponents.jsx';
import { BarChart } from '../components/charts/Charts.jsx';

export function FunnelLeadsPage() {
  const funnelStages = [
    { stage: '1. New Leads Masuk', count: 1842, pct: 100, color: '#3B82F6' },
    { stage: '2. Contacted & Responded', count: 1240, pct: 67.3, color: '#833AB4' },
    { stage: '3. Qualified Prospect', count: 612, pct: 33.2, color: '#F77737' },
    { stage: '4. Sent Catalog & Price', count: 418, pct: 22.6, color: '#E8C878' },
    { stage: '5. Closed / Order Success', count: 236, pct: 12.8, color: '#22C55E' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Funnel">Analisis Funnel Leads & Konversi Sales</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="⏳" label="Total Leads Masuk" value="1.842 Leads" trend={14.2} acc="#3B82F6" />
        <MetricCard icon="🎯" label="Leads Qualified" value="612 Leads" trend={9.8} acc="#833AB4" />
        <MetricCard icon="💳" label="Closing Rate" value="38.5%" sub="Dari Qualified Prospect" acc="#22C55E" />
        <MetricCard icon="🔄" label="Win Rate Total" value="12.8%" sub="Leads to Customer" acc="#C9A84C" />
      </div>

      <div className="g2 mb18">
        <div className="card">
          <div className="card-title">⏳ Funnel Conversion Stage</div>
          <div style={{ marginTop: 10 }}>
            {funnelStages.map((s, idx) => (
              <ProgRow key={idx} label={s.stage} value={`${s.count} Leads`} pct={s.pct} color={s.color} />
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">📊 Sumber Leads per Channel</div>
          <BarChart labels={['WhatsApp', 'Instagram DM', 'TikTok Shop', 'Marketplace', 'Store Visit']} data={[840, 520, 240, 160, 82]} color="#C9A84C" height={220} />
        </div>
      </div>
    </div>
  );
}
