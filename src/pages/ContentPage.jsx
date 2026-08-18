import { SectionLabel, PTag } from '../components/common/UIComponents.jsx';

export function ContentPage() {
  const contents = [
    { title: 'Behind the Scenes Tulis Batik Cirebon', channel: 'ig', status: 'Published', date: '05 Jul 2026', views: '9.4k' },
    { title: 'Tips Mix & Match Batik untuk Kondangan', channel: 'ig', status: 'Published', date: '08 Jul 2026', views: '11.8k' },
    { title: 'Batik Challenge 2026 Viral Dance', channel: 'tt', status: 'Published', date: '12 Jul 2026', views: '1.2M' },
    { title: 'Launch Koleksi Batik Edisi Kemerdekaan', channel: 'ig', status: 'Scheduled', date: '20 Jul 2026', views: '-' },
    { title: 'Tutorial Lipat Hem Batik Anti Kusut', channel: 'tt', status: 'Draft', date: '25 Jul 2026', views: '-' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Konten">Jadwal & Rencana Konten Social Media</SectionLabel>

      <div className="card mb18">
        <div className="card-title">📝 Daftar Konten Marketing</div>
        <table className="data-table">
          <thead>
            <tr><th>Judul Konten</th><th>Platform</th><th>Tanggal</th><th>Status</th><th>Reach / Views</th></tr>
          </thead>
          <tbody>
            {contents.map((c, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{c.title}</td>
                <td><PTag platform={c.channel} /></td>
                <td>{c.date}</td>
                <td>
                  <span className={`badge ${c.status === 'Published' ? 'badge-green' : c.status === 'Scheduled' ? 'badge-gold' : 'badge-neutral'}`}>
                    {c.status}
                  </span>
                </td>
                <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{c.views}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
