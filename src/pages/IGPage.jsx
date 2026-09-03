import { MetricCard, SectionLabel, TopPostRow, AccountCard } from '../components/common/UIComponents.jsx';
import { LineChart, BarChart } from '../components/charts/Charts.jsx';

export function IGPage({ period }) {
  const igData = {
    followers: '284.500',
    growth: 4.2,
    reach: '1.420.000',
    engagement: '4.8%',
    posts: [
      { rank: 1, title: 'Koleksi Batik Modern Summer 2026', likes: '14.2k', comments: '842', shares: '1.2k', platform: 'ig', date: '10 Jul' },
      { rank: 2, title: 'Tips Mix & Match Batik untuk Kondangan', likes: '11.8k', comments: '620', shares: '940', platform: 'ig', date: '08 Jul' },
      { rank: 3, title: 'Behind the Scenes Tulis Batik Cirebon', likes: '9.4k', comments: '412', shares: '520', platform: 'ig', date: '05 Jul' }
    ]
  };

  return (
    <div className="page-body">
      <SectionLabel badge="Instagram">Analisis Performa Instagram Momen</SectionLabel>

      <div className="g4 mb18">
        <MetricCard label="Total Followers" value={igData.followers} trend={igData.growth} trendLabel="bulan ini" acc="#E1306C" />
        <MetricCard label="Total Reach" value={igData.reach} trend={12.4} trendLabel="vs bulan lalu" acc="#F77737" />
        <MetricCard label="Engagement Rate" value={igData.engagement} trend={0.6} trendLabel="vs bulan lalu" acc="#C9A84C" />
        <MetricCard label="Total Posts" value="48 Posts" sub="Bulan Juli 2026" acc="#833AB4" />
      </div>

      <div className="g21 mb18">
        <div className="card">
          <div className="card-title">Tren Jangkauan Instagram (Reach)</div>
          <LineChart labels={['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4']} data={[320000, 380000, 410000, 420000]} color="#E1306C" height={200} />
        </div>

        <div className="card">
          <div className="card-title">Top Post Instagram</div>
          {igData.posts.map(p => (
            <TopPostRow key={p.rank} {...p} />
          ))}
        </div>
      </div>
    </div>
  );
}
