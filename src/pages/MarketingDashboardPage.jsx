import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';
import { DonutChart } from '../components/charts/Charts.jsx';

export function MarketingDashboardPage() {
  return (
    <div className="page-body">
      <SectionLabel badge="Marketing">Overview Aktivitas Pemasaran Momen</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="📢" label="Total Campaign Active" value="5 Campaign" sub="Meta, TikTok, Google" acc="#C9A84C" />
        <MetricCard icon="👁️" label="Total Impressions / Reach" value="2.840.000" trend={18.4} acc="#3B82F6" />
        <MetricCard icon="💸" label="Cost Per Lead (CPL)" value="Rp 13.570" trend={-6.2} trendLabel="Efisien" acc="#22C55E" />
        <MetricCard icon="💰" label="Customer Acquisition Cost" value="Rp 42.300" sub="CAC Ratio 1:4" acc="#833AB4" />
      </div>

      <div className="g2 mb18">
        <div className="card">
          <div className="card-title">📊 Distibusi Budget Pemasaran</div>
          <DonutChart 
            labels={['Meta Ads', 'TikTok Ads', 'Google Ads', 'KOL / Influencer']} 
            data={[45, 30, 15, 10]} 
            colors={['#E1306C', '#00f2fe', '#3B82F6', '#C9A84C']} 
            centerText="Rp 50jt" 
          />
        </div>

        <div className="card">
          <div className="card-title">🎯 Status Pemasaran Digital</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 10 }}>
            <div style={{ background: 'var(--bg2)', padding: 12, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Meta Ads (Instagram & Facebook)</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>ROAS: 4.8x · Spent: Rp 12.4jt</div>
              </div>
              <span className="badge badge-green">Running</span>
            </div>
            <div style={{ background: 'var(--bg2)', padding: 12, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>TikTok Spark Ads</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>ROAS: 5.2x · Spent: Rp 8.1jt</div>
              </div>
              <span className="badge badge-green">Running</span>
            </div>
            <div style={{ background: 'var(--bg2)', padding: 12, borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700 }}>Google Search Ads</div>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>ROAS: 3.9x · Spent: Rp 4.5jt</div>
              </div>
              <span className="badge badge-green">Running</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
