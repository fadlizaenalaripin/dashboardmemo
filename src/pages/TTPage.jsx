import { MetricCard, SectionLabel, TopPostRow } from '../components/common/UIComponents.jsx';
import { LineChart, BarChart } from '../components/charts/Charts.jsx';

export function TTPage({ period }) {
  const ttData = {
    followers: '512.000',
    growth: 14.8,
    views: '4.800.000',
    engagement: '6.2%',
    posts: [
      { rank: 1, title: 'Batik Challenge 2026 Viral Dance', likes: '48.5k', comments: '3.4k', shares: '12.8k', views: '1.2M', platform: 'tt', date: '12 Jul' },
      { rank: 2, title: 'OOTD Batik Tulis vs Batik Cap', likes: '34.2k', comments: '2.1k', shares: '8.4k', views: '850K', platform: 'tt', date: '09 Jul' },
      { rank: 3, title: 'Spill Promo Diskon Batik Momen 50%', likes: '28.9k', comments: '1.8k', shares: '6.2k', views: '710K', platform: 'tt', date: '04 Jul' }
    ]
  };

  return (
    <div className="page-body">
      <SectionLabel badge="TikTok">Analisis Performa TikTok Momen</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🎵" label="Total Followers" value={ttData.followers} trend={ttData.growth} trendLabel="bulan ini" acc="#00f2fe" />
        <MetricCard icon="👁️" label="Total Video Views" value={ttData.views} trend={24.2} trendLabel="vs bulan lalu" acc="#3B82F6" />
        <MetricCard icon="⚡" label="Engagement Rate" value={ttData.engagement} trend={1.2} trendLabel="vs bulan lalu" acc="#22C55E" />
        <MetricCard icon="🎥" label="Total Video Upload" value={36} sub="Bulan Juli 2026" acc="#C9A84C" />
      </div>

      <div className="g21 mb18">
        <div className="card">
          <div className="card-title">📈 Tren View Video TikTok</div>
          <LineChart labels={['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4']} data={[980000, 1120000, 1340000, 1360000]} color="#00f2fe" height={200} />
        </div>

        <div className="card">
          <div className="card-title">🔥 Top Viral TikTok Videos</div>
          {ttData.posts.map(p => (
            <TopPostRow key={p.rank} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
