import { useState } from 'react';
import { MetricCard, SectionLabel, PTag } from '../components/common/UIComponents.jsx';

export function ContentPage() {
  const [contents, setContents] = useState([
    { id: 1, title: 'Behind the Scenes Tulis Batik Cirebon', channel: 'ig', pic: 'Tim Creative', date: '05 Jul 2026', status: 'Udah Selesai', views: '9.4k' },
    { id: 2, title: 'Tips Mix & Match Batik untuk Kondangan', channel: 'ig', pic: 'Siti Rahma', date: '08 Jul 2026', status: 'Udah Selesai', views: '11.8k' },
    { id: 3, title: 'Batik Challenge 2026 Viral Dance', channel: 'tt', pic: 'Rizki Ananda', date: '12 Jul 2026', status: 'Lagi Berjalan', views: '1.2M' },
    { id: 4, title: 'Launch Koleksi Batik Edisi Kemerdekaan', channel: 'ig', pic: 'Dewi Lestari', date: '20 Jul 2026', status: 'Lagi Berjalan', views: '-' },
    { id: 5, title: 'Tutorial Lipat Hem Batik Anti Kusut', channel: 'tt', pic: 'Tim Video', date: '25 Jul 2026', status: 'Planing', views: '-' },
    { id: 6, title: 'Spill Fabric Quality Outer Premium', channel: 'ig', pic: 'Tim Content', date: '28 Jul 2026', status: 'Planing', views: '-' },
  ]);

  const [filterStatus, setFilterStatus] = useState('All');

  // New Content Form State
  const [newTitle, setNewTitle] = useState('');
  const [newChannel, setNewChannel] = useState('ig');
  const [newPic, setNewPic] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newStatus, setNewStatus] = useState('Planing');
  const [showForm, setShowForm] = useState(false);

  const handleAddContent = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem = {
      id: Date.now(),
      title: newTitle,
      channel: newChannel,
      pic: newPic || 'Tim Marketing',
      date: newDate || '2026-07-30',
      status: newStatus,
      views: '-'
    };

    setContents([newItem, ...contents]);
    setNewTitle('');
    setNewPic('');
    setNewDate('');
    setNewStatus('Planing');
    setShowForm(false);
  };

  const handleStatusChange = (id, nextStatus) => {
    setContents(contents.map(item => item.id === id ? { ...item, status: nextStatus } : item));
  };

  const handleDelete = (id) => {
    setContents(contents.filter(item => item.id !== id));
  };

  const filteredContents = contents.filter(item => {
    if (filterStatus === 'All') return true;
    return item.status === filterStatus;
  });

  const countPlaning = contents.filter(c => c.status === 'Planing').length;
  const countProgress = contents.filter(c => c.status === 'Lagi Berjalan').length;
  const countDone = contents.filter(c => c.status === 'Udah Selesai').length;

  return (
    <div className="page-body">
      <SectionLabel badge="Konten Marketing">Jadwal & Manajemen Rencana Konten</SectionLabel>

      {/* Summary Cards */}
      <div className="g4 mb18">
        <MetricCard icon="📝" label="Total Rencana Konten" value={`${contents.length} Konten`} sub="Juli 2026" acc="#C9A84C" />
        <MetricCard icon="📋" label="Baru Planning" value={`${countPlaning} Konten`} badge="Planning" acc="#3B82F6" />
        <MetricCard icon="⚡" label="Lagi Berjalan" value={`${countProgress} Konten`} badge="In Progress" acc="#833AB4" />
        <MetricCard icon="✅" label="Udah Selesai" value={`${countDone} Konten`} badge="Completed" acc="#22C55E" />
      </div>

      {/* Add New Content Form Toggle Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          {['All', 'Planing', 'Lagi Berjalan', 'Udah Selesai'].map(st => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: filterStatus === st ? '1px solid var(--gold)' : '1px solid rgba(255,255,255,0.1)',
                background: filterStatus === st ? 'rgba(201,168,76,0.15)' : 'transparent',
                color: filterStatus === st ? 'var(--gold)' : 'var(--text-muted)',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {st === 'All' ? 'Semua Konten' : st}
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            background: showForm ? 'rgba(224,85,85,0.2)' : 'var(--gold)',
            color: showForm ? '#E05555' : '#000',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 800,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            transition: 'all 0.2s'
          }}
        >
          {showForm ? '✕ Batal' : '➕ Input Rencana Konten Baru'}
        </button>
      </div>

      {/* Interactive Form */}
      {showForm && (
        <div className="card mb18" style={{ border: '1px solid var(--gold)', background: 'var(--bg2)' }}>
          <div className="card-title">📝 Form Input Rencana Konten</div>
          <form onSubmit={handleAddContent} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14, marginTop: 10 }}>
            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4, color: 'var(--text-muted)' }}>Judul Konten / Konsep</label>
              <input
                type="text"
                placeholder="Contoh: Behind the Scenes Batik Sogan..."
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: '#fff', fontSize: 12 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4, color: 'var(--text-muted)' }}>Platform</label>
              <select
                value={newChannel}
                onChange={e => setNewChannel(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: '#fff', fontSize: 12 }}
              >
                <option value="ig">📸 Instagram</option>
                <option value="tt">🎵 TikTok</option>
                <option value="yt">▶️ YouTube</option>
                <option value="fb">📘 Facebook</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4, color: 'var(--text-muted)' }}>PIC / Penanggung Jawab</label>
              <input
                type="text"
                placeholder="Nama / Tim..."
                value={newPic}
                onChange={e => setNewPic(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: '#fff', fontSize: 12 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4, color: 'var(--text-muted)' }}>Tanggal Rencana</label>
              <input
                type="text"
                placeholder="Contoh: 30 Jul 2026"
                value={newDate}
                onChange={e => setNewDate(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: '#fff', fontSize: 12 }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 700, marginBottom: 4, color: 'var(--text-muted)' }}>Status Saat Ini</label>
              <select
                value={newStatus}
                onChange={e => setNewStatus(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--border)', background: 'var(--bg)', color: '#fff', fontSize: 12 }}
              >
                <option value="Planing">📋 Baru Planning</option>
                <option value="Lagi Berjalan">⚡ Lagi Berjalan</option>
                <option value="Udah Selesai">✅ Udah Selesai</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
              <button
                type="submit"
                style={{
                  background: 'var(--gold)',
                  color: '#000',
                  border: 'none',
                  padding: '9px 24px',
                  borderRadius: 6,
                  fontWeight: 800,
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                💾 Simpan Rencana Konten
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content Table */}
      <div className="card mb18">
        <div className="card-title">📝 Daftar & Status Rencana Konten ({filteredContents.length})</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Judul Konten</th>
              <th>Platform</th>
              <th>PIC</th>
              <th>Tanggal Rencana</th>
              <th>Status Konten</th>
              <th>Reach / Views</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredContents.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                  Tidak ada rencana konten dengan status "{filterStatus}".
                </td>
              </tr>
            ) : (
              filteredContents.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 700 }}>{c.title}</td>
                  <td><PTag platform={c.channel} /></td>
                  <td style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>{c.pic}</td>
                  <td style={{ fontSize: 12 }}>{c.date}</td>
                  <td>
                    <select
                      value={c.status}
                      onChange={(e) => handleStatusChange(c.id, e.target.value)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '12px',
                        border: 'none',
                        fontSize: '11px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        background: c.status === 'Udah Selesai' ? 'rgba(34,197,94,0.2)' : c.status === 'Lagi Berjalan' ? 'rgba(131,58,180,0.2)' : 'rgba(59,130,246,0.2)',
                        color: c.status === 'Udah Selesai' ? '#22C55E' : c.status === 'Lagi Berjalan' ? '#C084FC' : '#3B82F6',
                        outline: 'none'
                      }}
                    >
                      <option value="Planing" style={{ background: '#1c1c1c', color: '#3B82F6' }}>📋 Baru Planning</option>
                      <option value="Lagi Berjalan" style={{ background: '#1c1c1c', color: '#C084FC' }}>⚡ Lagi Berjalan</option>
                      <option value="Udah Selesai" style={{ background: '#1c1c1c', color: '#22C55E' }}>✅ Udah Selesai</option>
                    </select>
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{c.views}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(c.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#E05555',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                      title="Hapus Konten"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
