import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';
import { MultiLineChart } from '../components/charts/Charts.jsx';

export function ComparePage({ period }) {
  return (
    <div className="page-body">
      <SectionLabel badge="Perbandingan">Perbandingan Platform Instagram vs TikTok</SectionLabel>

      <div className="g2 mb18">
        <MetricCard icon="📸" label="Instagram Reach" value="1.420.000" trend={12.4} trendLabel="vs bulan lalu" acc="#E1306C" />
        <MetricCard icon="🎵" label="TikTok Video Views" value="4.800.000" trend={24.2} trendLabel="vs bulan lalu" acc="#00f2fe" />
      </div>

      <div className="card mb18">
        <div className="card-title">📈 Perbandingan Pertumbuhan Audience (Weekly)</div>
        <MultiLineChart 
          labels={['Mgu 1', 'Mgu 2', 'Mgu 3', 'Mgu 4']}
          datasets={[
            { label: 'Instagram Reach', data: [320, 380, 410, 420], borderColor: '#E1306C', backgroundColor: 'transparent' },
            { label: 'TikTok Views (Ribu)', data: [980, 1120, 1340, 1360], borderColor: '#00f2fe', backgroundColor: 'transparent' }
          ]}
          height={220}
        />
      </div>
    </div>
  );
}
