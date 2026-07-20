/* ═══════════════════════════════════════════════════════════════
   MOMEN Marketing Monitor — Pages
   File: js/pages.js
   Defines: window.Pages
═══════════════════════════════════════════════════════════════ */

window.Pages = (function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const D = window.AppData;
  const C = window.Components;

  /* ══════════════════════════════════
     PAGE: OVERVIEW
  ══════════════════════════════════ */
  function OverviewPage() {
    const [period, setPeriod] = useState('30d');
    const [selectedAccountId, setSelectedAccountId] = useState(null);
    const accounts = D.getAllAccounts();
    const igAccounts = accounts.filter(a => a.platform === 'instagram');
    const ttAccounts = accounts.filter(a => a.platform === 'tiktok');

    // Aggregate totals
    const totals = useMemo(() => {
      let totalFollowers = 0, totalReach = 0, totalProfileVisits = 0, totalEngagement = 0;
      let engCount = 0;
      accounts.forEach(acc => {
        const m = D.getMetrics(acc.id, period);
        totalFollowers += acc.followers;
        if (m) {
          totalReach += m.current.reach;
          totalProfileVisits += m.current.profileVisits;
          totalEngagement += m.current.engagementRate;
          engCount++;
        }
      });
      return {
        followers: totalFollowers,
        reach: totalReach,
        profileVisits: totalProfileVisits,
        avgER: engCount > 0 ? totalEngagement / engCount : 0,
      };
    }, [period]);

    // Comparison chart
    const compData = D.getComparisonData();
    const colors = {
      'ig-main': '#833AB4',
      'ig-women': '#E1306C',
      'ig-men': '#1E3A5F',
      'ig-official': '#FF5722',
      'ig-gangs': '#4CAF50',
      'tt-official': '#FE2C55',
      'tt-gangs': '#25F4EE'
    };
    const chartDatasets = D.getAllAccounts().map(a => ({
      label: a.handle + (a.platform === 'instagram' ? ' (IG)' : ' (TT)'),
      data: compData.accounts[a.id] || [],
      borderColor: colors[a.id] || '#C9A84C',
      backgroundColor: 'transparent',
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 3
    }));

    return (
      <div className="page-body">
        {/* Summary KPI row */}
        <C.SectionLabel badge={period === '7d' ? '7 Hari Terakhir' : period === '30d' ? '30 Hari Terakhir' : '90 Hari Terakhir'}>
          Ringkasan Semua Akun
        </C.SectionLabel>

        <div className="grid-4 mb-20">
          <C.MetricCard icon="👥" label="Total Followers" value={totals.followers} accentColor="#C9A84C" />
          <C.MetricCard icon="👁️" label="Total Reach" value={totals.reach} trend={14.2} trendLabel="vs periode lalu" accentColor="#833AB4" />
          <C.MetricCard icon="🔍" label="Total Kunjungan Profil" value={totals.profileVisits} trend={18.8} trendLabel="vs periode lalu" accentColor="#E1306C" />
          <C.MetricCard icon="💫" label="Rata-rata Engagement" value={totals.avgER.toFixed(1) + '%'} trend={0.8} trendLabel="vs periode lalu" accentColor="#22C55E" format={v => v} />
        </div>

        {/* Account cards */}
        <C.SectionLabel>Instagram ({igAccounts.length} akun)</C.SectionLabel>
        <div className="grid-3 mb-20">
          {igAccounts.map(acc => (
            <C.AccountCard
              key={acc.id}
              account={acc}
              metrics={D.getMetrics(acc.id, period)}
              period={period}
              selected={selectedAccountId === acc.id}
              onClick={() => setSelectedAccountId(acc.id === selectedAccountId ? null : acc.id)}
            />
          ))}
        </div>

        <C.SectionLabel>TikTok ({ttAccounts.length} akun)</C.SectionLabel>
        <div className="grid-2 mb-20">
          {ttAccounts.map(acc => (
            <C.AccountCard
              key={acc.id}
              account={acc}
              metrics={D.getMetrics(acc.id, period)}
              period={period}
              selected={selectedAccountId === acc.id}
              onClick={() => setSelectedAccountId(acc.id === selectedAccountId ? null : acc.id)}
            />
          ))}
        </div>

        {/* Follower Growth Comparison */}
        <div className="card mb-20">
          <div className="card-head">
            <div>
              <div className="card-title">📈 Pertumbuhan Followers — Semua Akun</div>
              <div className="card-sub">Perbandingan jumlah followers Jan–Jul 2026</div>
            </div>
          </div>
          <C.MultiLineChart datasets={chartDatasets} labels={compData.months} height={220} />
        </div>

        {/* Platform comparison */}
        <div className="grid-2">
          <div className="card">
            <div className="card-title" style={{ marginBottom: 16 }}>📊 Distribusi Followers per Platform</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24 }}>
              <C.DonutChart
                size={140}
                segments={[
                  { label: 'Instagram', value: igAccounts.reduce((s,a) => s+a.followers,0), color: '#E1306C' },
                  { label: 'TikTok', value: ttAccounts.reduce((s,a) => s+a.followers,0), color: '#FE2C55' },
                ]}
                centerVal={D.formatNumber(accounts.reduce((s,a) => s+a.followers,0))}
                centerLabel="Total"
              />
              <div className="legend-list" style={{ flex: 1 }}>
                {[
                  { label: 'Instagram', color: '#E1306C', value: igAccounts.reduce((s,a)=>s+a.followers,0), icon: '📷' },
                  { label: 'TikTok', color: '#FE2C55', value: ttAccounts.reduce((s,a)=>s+a.followers,0), icon: '🎵' },
                ].map(item => (
                  <div key={item.label} className="legend-item">
                    <div className="legend-left">
                      <div className="legend-dot" style={{ background: item.color }} />
                      <span className="legend-name">{item.icon} {item.label}</span>
                    </div>
                    <div>
                      <span className="legend-val">{D.formatNumber(item.value)}</span>
                      <span className="legend-pct" style={{ marginLeft: 6 }}>
                        {Math.round(item.value / accounts.reduce((s,a)=>s+a.followers,0) * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title" style={{ marginBottom: 4 }}>🏆 Performa Akun Terbaik</div>
            <div className="card-sub" style={{ marginBottom: 16 }}>Berdasarkan Engagement Rate {period === '7d' ? '7 hari' : period === '30d' ? '30 hari' : '90 hari'} terakhir</div>
            {accounts
              .map(acc => {
                const m = D.getMetrics(acc.id, period);
                return { acc, er: m ? m.current.engagementRate : 0 };
              })
              .sort((a, b) => b.er - a.er)
              .map(({ acc, er }, i) => (
                <div key={acc.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{
                    width: 24, height: 24, borderRadius: 6,
                    background: i === 0 ? 'var(--gold-pale-2)' : 'var(--bg-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 800,
                    color: i === 0 ? 'var(--gold-dark)' : 'var(--text-dim)',
                  }}>#{i+1}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-dark)' }}>{acc.handle}</span>
                      <C.PlatformTag platform={acc.platform} />
                    </div>
                    <div className="progress-bar-bg" style={{ height: 5 }}>
                      <div className="progress-bar-fill" style={{
                        width: (er / 12 * 100) + '%',
                        background: acc.platform === 'instagram' ? 'var(--ig-pink)' : 'var(--tt-red)',
                      }} />
                    </div>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-dark)', minWidth: 45, textAlign: 'right' }}>{er.toFixed(1)}%</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════
     PAGE: DETAIL AKUN (IG or TT)
  ══════════════════════════════════ */
  function AccountDetailPage({ accountId }) {
    const [period, setPeriod] = useState('30d');
    const account = D.getAccount(accountId);
    const metrics = D.getMetrics(accountId, period);
    const posts = D.getTopPosts(accountId);
    const isIG = account.platform === 'instagram';

    if (!account || !metrics) return <div className="page-body"><div className="empty-state"><div className="empty-icon">😕</div><div className="empty-text">Data tidak ditemukan</div></div></div>;

    const m = metrics.current;
    const platformColor = isIG ? '#E1306C' : '#FE2C55';
    const platformGrad = isIG ? 'var(--ig-grad)' : 'var(--tt-grad)';

    return (
      <div className="page-body">
        {/* Account Header */}
        <div className="card mb-20" style={{ background: `linear-gradient(135deg, ${isIG ? 'rgba(131,58,180,0.06)' : 'rgba(1,1,1,0.04)'}, white)` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: platformGrad,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 32, flexShrink: 0,
            }}>
              {account.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-dark)' }}>{account.handle}</span>
                {account.verified && <span style={{ fontSize: 16 }}>✓</span>}
                <C.PlatformTag platform={account.platform} />
                <span className="badge badge-gold">{account.accountType}</span>
              </div>
              <div style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 8 }}>{account.name} · {account.category}</div>
              <div style={{ fontSize: 12, color: 'var(--text-dim)', fontStyle: 'italic' }}>"{account.bio}"</div>
            </div>
            <div style={{ display: 'flex', gap: 24 }}>
              {[
                { label: 'Followers', val: D.formatNumber(account.followers) },
                { label: 'Following', val: account.following.toLocaleString('id-ID') },
                { label: 'Posts', val: account.posts },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-dark)' }}>{stat.val}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{stat.label}</div>
                </div>
              ))}
            </div>
            <C.PeriodSelector value={period} onChange={setPeriod} />
          </div>
        </div>

        {/* Key Metrics */}
        <C.SectionLabel badge="Awareness & Reach">Jangkauan & Visibilitas</C.SectionLabel>
        <div className="grid-4 mb-20">
          <C.MetricCard icon="🔍" label="Kunjungan Profil" value={m.profileVisits} trend={m.profileVisitsTrend} trendLabel="vs periode lalu" accentColor="#C9A84C" />
          <C.MetricCard icon="👁️" label="Reach (Jangkauan)" value={m.reach} trend={m.reachTrend} trendLabel="vs periode lalu" accentColor="#833AB4" />
          <C.MetricCard icon="📢" label="Impressions" value={m.impressions} trend={m.impressionsTrend} trendLabel="vs periode lalu" accentColor="#3B82F6" />
          <C.MetricCard icon="💫" label="Engagement Rate" value={m.engagementRate.toFixed(1) + '%'} trend={m.engagementRateTrend} trendLabel="vs periode lalu" accentColor="#22C55E" format={v => v} />
        </div>

        <C.SectionLabel badge="Interaksi">Reaksi & Engagement</C.SectionLabel>
        <div className="grid-4 mb-20">
          <C.MetricCard icon="❤️" label="Likes" value={m.likes} trend={m.likesTrend} trendLabel="vs periode lalu" accentColor="#EF4444" />
          <C.MetricCard icon="💬" label="Komentar" value={m.comments} trend={m.commentsTrend} trendLabel="vs periode lalu" accentColor="#F59E0B" />
          <C.MetricCard icon="↗️" label="Dibagikan (Shares)" value={m.shares} trend={m.sharesTrend} trendLabel="vs periode lalu" accentColor="#22C55E" />
          {isIG
            ? <C.MetricCard icon="🔖" label="Disimpan (Saves)" value={m.saves} trend={m.savesTrend} trendLabel="vs periode lalu" accentColor="#8B5CF6" />
            : <C.MetricCard icon="▶️" label="Video Views" value={m.videoViews} trend={m.videoViewsTrend} trendLabel="vs periode lalu" accentColor="#FE2C55" />
          }
        </div>

        <C.SectionLabel badge="Pertumbuhan">Perkembangan Akun</C.SectionLabel>
        <div className="grid-3 mb-20">
          <C.MetricCard icon="📈" label="Pertambahan Followers" value={m.followerGrowth} trend={m.followerGrowthTrend} trendLabel="vs periode lalu" accentColor="#C9A84C" />
          {isIG && <C.MetricCard icon="📖" label="Story Views" value={m.storyViews} trend={m.storyViewsTrend} trendLabel="vs periode lalu" accentColor="#F77737" />}
          {isIG && <C.MetricCard icon="🎬" label="Reel Plays" value={m.reelPlays} trend={m.reelPlaysTrend} trendLabel="vs periode lalu" accentColor="#833AB4" />}
          {!isIG && <C.MetricCard icon="🌐" label="Klik Website" value={m.websiteClicks} trend={m.websiteClicksTrend} trendLabel="vs periode lalu" accentColor="#25F4EE" />}
          {!isIG && <C.MetricCard icon="📈" label="Total Video Views" value={m.videoViews} trend={m.videoViewsTrend} trendLabel="vs periode lalu" accentColor="#FE2C55" />}
        </div>

        {/* Charts Row */}
        <div className="grid-2 mb-20">
          <div className="card">
            <div className="card-head">
              <div>
                <div className="card-title">📊 Jangkauan Harian</div>
                <div className="card-sub">Reach per hari (7 hari terakhir)</div>
              </div>
            </div>
            <C.LineChart
              data={metrics.reachData.map(d => d.value)}
              labels={metrics.reachData.map(d => d.day)}
              color={platformColor}
              height={180}
            />
          </div>

          <div className="card">
            <div className="card-head">
              <div>
                <div className="card-title">📈 Pertumbuhan Followers</div>
                <div className="card-sub">Penambahan follower per hari</div>
              </div>
            </div>
            <C.LineChart
              data={metrics.followerGrowthData.map(d => d.value)}
              labels={metrics.followerGrowthData.map(d => d.day)}
              color="#22C55E"
              height={180}
            />
          </div>
        </div>

        {/* Engagement Breakdown */}
        <div className="grid-2-1 mb-20">
          <div className="card">
            <div className="card-head">
              <div className="card-title">🎯 Breakdown Engagement</div>
            </div>
            <C.BarChart
              data={isIG
                ? [m.likes, m.comments, m.shares, m.saves, m.storyViews]
                : [m.likes, m.comments, m.shares, m.videoViews]
              }
              labels={isIG
                ? ['Likes','Komentar','Shares','Saves','Story Views']
                : ['Likes','Komentar','Shares','Video Views']
              }
              height={180}
            />
          </div>

          <div className="card">
            <div className="card-head">
              <div className="card-title">🕐 Waktu Terbaik</div>
              <div className="card-sub" style={{ fontSize: 10 }}>untuk posting</div>
            </div>
            {metrics.bestPostTime.map((bt, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0',
                borderBottom: i < metrics.bestPostTime.length - 1 ? '1px solid var(--bg-2)' : 'none'
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 8,
                  background: i === 0 ? 'var(--gold-pale-2)' : 'var(--bg-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16,
                }}>
                  {i === 0 ? '🥇' : i === 1 ? '🥈' : '🥉'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dark)' }}>{bt.day}, {bt.time}</div>
                  <div className="progress-bar-bg" style={{ marginTop: 6 }}>
                    <div className="progress-bar-fill" style={{ width: bt.score + '%', background: platformColor }} />
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-dark)' }}>{bt.score}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Audience */}
        <C.SectionLabel>Profil Audiens</C.SectionLabel>
        <div className="grid-3 mb-20">
          {/* Gender */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: 16 }}>👥 Gender</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
              <C.DonutChart
                size={120}
                segments={[
                  { label: 'Perempuan', value: metrics.audienceGender.female, color: '#E1306C' },
                  { label: 'Laki-laki', value: metrics.audienceGender.male, color: '#3B82F6' },
                ]}
                centerVal={metrics.audienceGender.female + '%'}
                centerLabel="Wanita"
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: '#E1306C' }} />
                  <span style={{ fontSize: 12 }}>Perempuan</span>
                  <strong style={{ fontSize: 14 }}>{metrics.audienceGender.female}%</strong>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: '#3B82F6' }} />
                  <span style={{ fontSize: 12 }}>Laki-laki</span>
                  <strong style={{ fontSize: 14 }}>{metrics.audienceGender.male}%</strong>
                </div>
              </div>
            </div>
          </div>

          {/* Age */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: 16 }}>🎂 Kelompok Usia</div>
            {metrics.audienceAge.map(a => (
              <C.ProgressRow key={a.range} label={a.range} value={a.pct} max={100} color={platformColor} />
            ))}
          </div>

          {/* City */}
          <div className="card">
            <div className="card-title" style={{ marginBottom: 16 }}>📍 Kota Terbanyak</div>
            {metrics.audienceCity.map((c, i) => (
              <C.ProgressRow key={c.city} label={c.city} value={c.pct} max={50}
                color={`hsl(${35 + i * 15}, 70%, ${45 - i * 4}%)`} />
            ))}
          </div>
        </div>

        {/* Top Posts */}
        <C.SectionLabel badge={posts.length + ' konten'}>Konten Terbaik</C.SectionLabel>
        <div className="card">
          {posts.map((post, i) => (
            <C.TopPostRow key={post.id} post={post} platform={account.platform} rank={i + 1} />
          ))}
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════
     PAGE: SEMUA INSTAGRAM
  ══════════════════════════════════ */
  function InstagramPage() {
    const [period, setPeriod] = useState('30d');
    const [activeAccount, setActiveAccount] = useState('ig-official');
    const igAccounts = D.getAllAccounts().filter(a => a.platform === 'instagram');

    return (
      <div className="page-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div className="tab-row" style={{ flex: 1, marginBottom: 0, marginRight: 16 }}>
            {igAccounts.map(acc => (
              <button
                key={acc.id}
                className={`tab-btn ${activeAccount === acc.id ? 'active' : ''}`}
                onClick={() => setActiveAccount(acc.id)}
              >
                <span>{acc.avatar}</span>
                <span>{acc.handle}</span>
              </button>
            ))}
          </div>
          <C.PeriodSelector value={period} onChange={setPeriod} />
        </div>
        <AccountDetailPage accountId={activeAccount} key={activeAccount + period} />
      </div>
    );
  }

  /* ══════════════════════════════════
     PAGE: SEMUA TIKTOK
  ══════════════════════════════════ */
  function TikTokPage() {
    const [period, setPeriod] = useState('30d');
    const [activeAccount, setActiveAccount] = useState('tt-official');
    const ttAccounts = D.getAllAccounts().filter(a => a.platform === 'tiktok');

    return (
      <div className="page-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div className="tab-row" style={{ flex: 1, marginBottom: 0, marginRight: 16 }}>
            {ttAccounts.map(acc => (
              <button
                key={acc.id}
                className={`tab-btn ${activeAccount === acc.id ? 'active' : ''}`}
                onClick={() => setActiveAccount(acc.id)}
              >
                <span>{acc.avatar}</span>
                <span>{acc.handle}</span>
              </button>
            ))}
          </div>
          <C.PeriodSelector value={period} onChange={setPeriod} />
        </div>
        <AccountDetailPage accountId={activeAccount} key={activeAccount + period} />
      </div>
    );
  }

  /* ══════════════════════════════════
     PAGE: PERBANDINGAN
  ══════════════════════════════════ */
  function ComparePage() {
    const [period, setPeriod] = useState('30d');
    const accounts = D.getAllAccounts();

    const metrics = accounts.map(acc => ({
      acc,
      m: D.getMetrics(acc.id, period).current,
    }));

    const cols = ['profileVisits', 'reach', 'impressions', 'engagementRate', 'followerGrowth', 'likes', 'comments'];
    const colLabels = {
      profileVisits: '🔍 Profil Visit',
      reach: '👁️ Reach',
      impressions: '📢 Impressions',
      engagementRate: '💫 Eng. Rate',
      followerGrowth: '📈 Follower +',
      likes: '❤️ Likes',
      comments: '💬 Komentar',
    };

    return (
      <div className="page-body">
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 20 }}>
          <C.PeriodSelector value={period} onChange={setPeriod} />
        </div>

        <C.SectionLabel badge="Semua Akun">Tabel Perbandingan Metrik</C.SectionLabel>
        <div className="card mb-20" style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Akun</th>
                <th>Platform</th>
                <th>Followers</th>
                {cols.map(c => <th key={c}>{colLabels[c]}</th>)}
              </tr>
            </thead>
            <tbody>
              {metrics.map(({ acc, m }) => (
                <tr key={acc.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{acc.avatar}</span>
                      <div>
                        <div style={{ fontWeight: 700 }}>{acc.handle}</div>
                        <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{acc.name}</div>
                      </div>
                    </div>
                  </td>
                  <td><C.PlatformTag platform={acc.platform} /></td>
                  <td>{D.formatNumber(acc.followers)}</td>
                  {cols.map(c => (
                    <td key={c}>
                      {c === 'engagementRate'
                        ? <span style={{ fontWeight: 700, color: m[c] >= 7 ? 'var(--green)' : m[c] >= 4 ? 'var(--amber)' : 'var(--text-dark)' }}>{m[c].toFixed(1)}%</span>
                        : D.formatNumber(m[c])
                      }
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Best of each metric */}
        <C.SectionLabel>Juara per Kategori</C.SectionLabel>
        <div className="grid-3">
          {[
            { key: 'reach', label: '👁️ Reach Terbesar', color: '#833AB4' },
            { key: 'engagementRate', label: '💫 Engagement Rate Tertinggi', color: '#22C55E' },
            { key: 'followerGrowth', label: '📈 Pertumbuhan Tercepat', color: '#C9A84C' },
            { key: 'profileVisits', label: '🔍 Profil Visits Terbanyak', color: '#3B82F6' },
            { key: 'likes', label: '❤️ Paling Disukai', color: '#EF4444' },
            { key: 'comments', label: '💬 Paling Banyak Komentar', color: '#F59E0B' },
          ].map(item => {
            const winner = [...metrics].sort((a, b) => b.m[item.key] - a.m[item.key])[0];
            return (
              <div className="card" key={item.key} style={{ borderLeft: `4px solid ${item.color}` }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', marginBottom: 10 }}>{item.label}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 24 }}>{winner.acc.avatar}</span>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--text-dark)' }}>{winner.acc.handle}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: item.color }}>
                      {item.key === 'engagementRate' ? winner.m[item.key].toFixed(1) + '%' : D.formatNumber(winner.m[item.key])}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════
     PAGE: KONTEN
  ══════════════════════════════════ */
  function ContentPage() {
    const [ideas, setIdeas] = useState(D.getContentIdeas());
    const [showModal, setShowModal] = useState(false);
    const [filter, setFilter] = useState('semua');
    const [newIdea, setNewIdea] = useState({ title: '', platform: 'instagram', type: 'Post', priority: 'Sedang', dueDate: '', status: 'Direncanakan' });

    const filtered = filter === 'semua' ? ideas : ideas.filter(i => i.platform === filter);

    const statusColor = {
      'Direncanakan': '#3B82F6',
      'Draft': '#F59E0B',
      'Siap Publish': '#22C55E',
      'Sudah Tayang': '#8B5CF6',
    };

    const priorityColor = {
      'Tinggi': '#EF4444',
      'Sedang': '#F59E0B',
      'Rendah': '#22C55E',
    };

    function handleAdd() {
      if (!newIdea.title.trim()) return;
      setIdeas(prev => [...prev, { ...newIdea, id: Date.now() }]);
      setShowModal(false);
      setNewIdea({ title: '', platform: 'instagram', type: 'Post', priority: 'Sedang', dueDate: '', status: 'Direncanakan' });
    }

    function handleStatusChange(id, status) {
      setIdeas(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    }

    function handleDelete(id) {
      setIdeas(prev => prev.filter(i => i.id !== id));
    }

    return (
      <div className="page-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div className="tab-row" style={{ marginBottom: 0 }}>
            {[
              { val: 'semua', label: '📋 Semua' },
              { val: 'instagram', label: '📷 Instagram' },
              { val: 'tiktok', label: '🎵 TikTok' },
            ].map(f => (
              <button key={f.val} className={`tab-btn ${filter === f.val ? 'active' : ''}`} onClick={() => setFilter(f.val)}>
                {f.label}
              </button>
            ))}
          </div>
          <button className="btn btn-gold" onClick={() => setShowModal(true)}>+ Tambah Ide Konten</button>
        </div>

        {/* Summary */}
        <div className="grid-4 mb-20">
          {['Direncanakan','Draft','Siap Publish','Sudah Tayang'].map(status => (
            <div className="card card-sm" key={status} style={{ borderTop: `3px solid ${statusColor[status]}` }}>
              <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-dark)' }}>
                {ideas.filter(i => i.status === status).length}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>{status}</div>
            </div>
          ))}
        </div>

        <C.SectionLabel badge={filtered.length + ' konten'}>Daftar Ide Konten</C.SectionLabel>
        <div className="card">
          {filtered.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <div className="empty-text">Belum ada ide konten</div>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Judul Konten</th>
                  <th>Platform</th>
                  <th>Tipe</th>
                  <th>Prioritas</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(idea => (
                  <tr key={idea.id}>
                    <td>{idea.title}</td>
                    <td><C.PlatformTag platform={idea.platform} /></td>
                    <td><span className="badge badge-blue">{idea.type}</span></td>
                    <td>
                      <span style={{ fontSize: 11, fontWeight: 700, color: priorityColor[idea.priority] }}>
                        ● {idea.priority}
                      </span>
                    </td>
                    <td style={{ color: 'var(--text-muted)' }}>{idea.dueDate || '—'}</td>
                    <td>
                      <select
                        className="form-select"
                        value={idea.status}
                        onChange={e => handleStatusChange(idea.id, e.target.value)}
                        style={{ borderColor: statusColor[idea.status] + '40', color: statusColor[idea.status] }}
                      >
                        {['Direncanakan','Draft','Siap Publish','Sudah Tayang'].map(s => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(idea.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)', fontSize: 16, padding: '2px 6px' }}
                        title="Hapus"
                      >🗑️</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Add Modal */}
        <C.Modal isOpen={showModal} onClose={() => setShowModal(false)} title="➕ Tambah Ide Konten">
          <div className="form-group">
            <label className="form-label">Judul Konten *</label>
            <input className="form-input" placeholder="contoh: Tutorial GRWM Batik Momen" value={newIdea.title}
              onChange={e => setNewIdea(p => ({...p, title: e.target.value}))} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Platform</label>
              <select className="form-select" style={{ width: '100%', padding: '10px 14px' }} value={newIdea.platform}
                onChange={e => setNewIdea(p => ({...p, platform: e.target.value}))}>
                <option value="instagram">📷 Instagram</option>
                <option value="tiktok">🎵 TikTok</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Tipe Konten</label>
              <select className="form-select" style={{ width: '100%', padding: '10px 14px' }} value={newIdea.type}
                onChange={e => setNewIdea(p => ({...p, type: e.target.value}))}>
                {['Post','Reels','Carousel','Story','Video','Duet','Live'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Prioritas</label>
              <select className="form-select" style={{ width: '100%', padding: '10px 14px' }} value={newIdea.priority}
                onChange={e => setNewIdea(p => ({...p, priority: e.target.value}))}>
                {['Tinggi','Sedang','Rendah'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Deadline</label>
              <input className="form-input" placeholder="contoh: 20 Jul" value={newIdea.dueDate}
                onChange={e => setNewIdea(p => ({...p, dueDate: e.target.value}))} />
            </div>
          </div>
          <div className="btn-row">
            <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Batal</button>
            <button className="btn btn-gold" onClick={handleAdd}>Simpan Ide</button>
          </div>
        </C.Modal>
      </div>
    );
  }

  /* ══════════════════════════════════
     PAGE: LAPORAN / EXPORT
  ══════════════════════════════════ */
  function ReportPage() {
    const [period, setPeriod] = useState('30d');
    const [showSuccess, setShowSuccess] = useState(false);
    const accounts = D.getAllAccounts();

    function handleExport() {
      // Build CSV
      const rows = [
        ['Akun','Platform','Followers','Profil Visit','Reach','Impressions','Eng. Rate (%)','Likes','Komentar','Shares','Follower +'],
        ...accounts.map(acc => {
          const m = D.getMetrics(acc.id, period).current;
          return [
            acc.handle, acc.platform, acc.followers,
            m.profileVisits, m.reach, m.impressions, m.engagementRate.toFixed(1),
            m.likes, m.comments, m.shares, m.followerGrowth
          ];
        })
      ];
      const csv = rows.map(r => r.join(',')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `momen-marketing-report-${period}-${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }

    return (
      <div className="page-body">
        <C.SectionLabel>Laporan Kinerja Marketing</C.SectionLabel>

        <div className="card mb-20" style={{ background: 'linear-gradient(135deg, var(--gold-pale), white)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--text-dark)', marginBottom: 6 }}>
                📊 Ekspor Data ke CSV
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Download semua data metrik dalam format spreadsheet yang bisa dibuka di Excel atau Google Sheets.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <C.PeriodSelector value={period} onChange={setPeriod} />
              <button className="btn btn-gold" onClick={handleExport}>⬇️ Download CSV</button>
            </div>
          </div>
          {showSuccess && (
            <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(34,197,94,0.1)', borderRadius: 8, fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>
              ✅ File berhasil didownload!
            </div>
          )}
        </div>

        {/* Summary table */}
        <C.SectionLabel badge={period === '7d' ? '7 Hari' : period === '30d' ? '30 Hari' : '90 Hari'}>
          Rekap Metrik Semua Akun
        </C.SectionLabel>
        <div className="card mb-20" style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Akun</th>
                <th>Platform</th>
                <th>Followers</th>
                <th>Profil Visit</th>
                <th>Reach</th>
                <th>Impressions</th>
                <th>Eng. Rate</th>
                <th>Likes</th>
                <th>Komentar</th>
                <th>Shares</th>
                <th>Follower +</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map(acc => {
                const m = D.getMetrics(acc.id, period).current;
                return (
                  <tr key={acc.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 16 }}>{acc.avatar}</span>
                        <div>
                          <div>{acc.handle}</div>
                          <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{acc.accountType}</div>
                        </div>
                      </div>
                    </td>
                    <td><C.PlatformTag platform={acc.platform} /></td>
                    <td style={{ fontWeight: 700 }}>{D.formatNumber(acc.followers)}</td>
                    <td>{D.formatNumber(m.profileVisits)}</td>
                    <td>{D.formatNumber(m.reach)}</td>
                    <td>{D.formatNumber(m.impressions)}</td>
                    <td>
                      <span style={{ fontWeight: 800, color: m.engagementRate >= 7 ? 'var(--green)' : m.engagementRate >= 4 ? 'var(--amber)' : 'var(--text-dark)' }}>
                        {m.engagementRate.toFixed(1)}%
                      </span>
                    </td>
                    <td>{D.formatNumber(m.likes)}</td>
                    <td>{D.formatNumber(m.comments)}</td>
                    <td>{D.formatNumber(m.shares)}</td>
                    <td style={{ color: 'var(--green)', fontWeight: 700 }}>+{D.formatNumber(m.followerGrowth)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Trend charts */}
        <C.SectionLabel>Trend Reach Semua Akun</C.SectionLabel>
        <div className="grid-2">
          {accounts.filter(a => a.platform === 'instagram').map(acc => {
            const m = D.getMetrics(acc.id, period);
            return (
              <div className="card" key={acc.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ fontSize: 18 }}>{acc.avatar}</span>
                  <div className="card-title">{acc.handle}</div>
                  <C.PlatformTag platform={acc.platform} />
                </div>
                <C.LineChart data={m.reachData.map(d => d.value)} labels={m.reachData.map(d => d.day)} color="#E1306C" height={140} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════
     PAGE: ADS
  ══════════════════════════════════ */
  function AdsPage() {
    const [period, setPeriod] = useState('30d');
    
    const adsData = {
      '7d': {
        spend: 9800000, spendTrend: 8.5, revenue: 53900000, revenueTrend: 12.4,
        clicks: 19800, clicksTrend: 10.2, conversions: 640, conversionsTrend: 14.8,
        roas: 5.5, roasTrend: 0.2, ctr: 4.1, ctrTrend: 0.15, cpc: 495,
        spendMeta: 6100000, spendTiktok: 3700000,
        chartLabels: ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'],
        spendHistory: [1.2, 1.4, 1.3, 1.5, 1.6, 1.5, 1.3],
        revenueHistory: [6.5, 7.8, 7.2, 8.5, 9.0, 8.2, 6.7]
      },
      '30d': {
        spend: 42500000, spendTrend: 12.4, revenue: 230150000, revenueTrend: 18.2,
        clicks: 84200, clicksTrend: 14.2, conversions: 2840, conversionsTrend: 22.1,
        roas: 5.4, roasTrend: 0.6, ctr: 4.0, ctrTrend: 0.3, cpc: 505,
        spendMeta: 26800000, spendTiktok: 15700000,
        chartLabels: ['Mgu 1', 'Mgu 2', 'Mgu 3', 'Mgu 4'],
        spendHistory: [9.5, 10.5, 11.2, 11.3],
        revenueHistory: [51.2, 56.8, 60.5, 61.6]
      },
      '90d': {
        spend: 128400000, spendTrend: 18.2, revenue: 706200000, revenueTrend: 24.5,
        clicks: 254000, clicksTrend: 22.4, conversions: 8640, conversionsTrend: 31.8,
        roas: 5.5, roasTrend: 0.8, ctr: 4.2, ctrTrend: 0.5, cpc: 502,
        spendMeta: 80900000, spendTiktok: 47500000,
        chartLabels: ['Bln 1', 'Bln 2', 'Bln 3'],
        spendHistory: [40.2, 42.8, 45.4],
        revenueHistory: [218.4, 235.2, 252.6]
      }
    };

    const curr = adsData[period] || adsData['30d'];

    const platformSegments = [
      { label: 'Meta Ads', value: Math.round((curr.spendMeta / curr.spend) * 100), color: '#3B82F6' },
      { label: 'TikTok Ads', value: Math.round((curr.spendTiktok / curr.spend) * 100), color: '#FE2C55' }
    ];

    const campaigns = [
      { name: 'Momen Batik Classic - Purchase - Meta', platform: 'instagram', spend: curr.spendMeta * 0.6, clicks: curr.clicks * 0.55, ctr: curr.ctr + 0.3, conversions: Math.round(curr.conversions * 0.6), roas: 5.8, status: 'Aktif' },
      { name: 'TikTok Spark Ads - New Arrival Dress', platform: 'tiktok', spend: curr.spendTiktok * 0.7, clicks: curr.clicks * 0.28, ctr: curr.ctr - 0.2, conversions: Math.round(curr.conversions * 0.25), roas: 5.1, status: 'Aktif' },
      { name: 'Meta Catalog Sales - Retargeting WA', platform: 'instagram', spend: curr.spendMeta * 0.25, clicks: curr.clicks * 0.12, ctr: curr.ctr + 0.8, conversions: Math.round(curr.conversions * 0.1), roas: 6.2, status: 'Aktif' },
      { name: 'TikTok Live Traffic Booster - Mega Sale', platform: 'tiktok', spend: curr.spendTiktok * 0.3, clicks: curr.clicks * 0.05, ctr: curr.ctr - 0.5, conversions: Math.round(curr.conversions * 0.05), roas: 4.8, status: 'Selesai' }
    ];

    const creatives = [
      { title: 'Premium Silk Batik Dress Video', type: 'TikTok Ads Video', ctr: '4.8%', roas: '6.1x', img: '👗', bg: '#fef2f2' },
      { title: 'Modern Men Shirt Carousel', type: 'Meta Ads Carousel', ctr: '4.2%', roas: '5.8x', img: '👔', bg: '#eff6ff' },
      { title: 'Classic Batik Couple Promo Post', type: 'Meta Ads Photo', ctr: '3.9%', roas: '5.2x', img: '👘', bg: '#fdfbeb' },
      { title: 'Mega Sale 7.7 Live Highlight', type: 'TikTok Live Clip', ctr: '4.5%', roas: '5.0x', img: '🔥', bg: '#faf5ff' }
    ];

    return (
      <div className="page-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <C.SectionLabel badge="Ad Performance">Analisis Iklan Berbayar</C.SectionLabel>
          <C.PeriodSelector value={period} onChange={setPeriod} />
        </div>

        <div className="grid-4" style={{ marginBottom: 18 }}>
          <C.MetricCard icon="💸" label="Biaya Iklan (Spend)" value={'Rp ' + curr.spend.toLocaleString('id-ID')} trend={curr.spendTrend} trendLabel="vs bln lalu" accentColor="#C9A84C"/>
          <C.MetricCard icon="💰" label="Ad Revenue" value={'Rp ' + curr.revenue.toLocaleString('id-ID')} trend={curr.revenueTrend} trendLabel="vs bln lalu" accentColor="#22C55E"/>
          <C.MetricCard icon="📈" label="ROAS Rata-rata" value={curr.roas.toFixed(1) + 'x'} trend={curr.roasTrend} trendLabel="vs bln lalu" accentColor="#EF4444"/>
          <C.MetricCard icon="🎯" label="CTR Rata-rata" value={curr.ctr.toFixed(2) + '%'} trend={curr.ctrTrend} trendLabel="vs bln lalu" accentColor="#3B82F6"/>
        </div>

        <div className="grid-3" style={{ marginBottom: 18 }}>
          <div className="card" style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding: '12px 14px'}}>
            <div>
              <div style={{fontSize:11, fontWeight:600, color:'var(--text-muted)'}}>Link Clicks</div>
              <div style={{fontSize:18, fontWeight:800, color:'var(--text-dark)', marginTop:4}}>{curr.clicks.toLocaleString('id-ID')}</div>
            </div>
            <div className="badge badge-green" style={{fontSize:11}}>+{curr.clicksTrend}%</div>
          </div>
          <div className="card" style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding: '12px 14px'}}>
            <div>
              <div style={{fontSize:11, fontWeight:600, color:'var(--text-muted)'}}>Conversions (Sales)</div>
              <div style={{fontSize:18, fontWeight:800, color:'var(--text-dark)', marginTop:4}}>{curr.conversions.toLocaleString('id-ID')}</div>
            </div>
            <div className="badge badge-green" style={{fontSize:11}}>+{curr.conversionsTrend}%</div>
          </div>
          <div className="card" style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding: '12px 14px'}}>
            <div>
              <div style={{fontSize:11, fontWeight:600, color:'var(--text-muted)'}}>Cost Per Click (CPC)</div>
              <div style={{fontSize:18, fontWeight:800, color:'var(--text-dark)', marginTop:4}}>{'Rp ' + curr.cpc.toLocaleString('id-ID')}</div>
            </div>
            <div className="badge badge-neutral" style={{fontSize:11}}>-0.8%</div>
          </div>
        </div>

        <div className="grid-2-1" style={{ marginBottom: 18 }}>
          <div className="card">
            <div className="card-title" style={{marginBottom:10}}>📉 Tren Biaya & Pendapatan Iklan (Juta Rp)</div>
            <C.MultiLineChart 
              labels={curr.chartLabels} 
              datasets={[
                { label: 'Spend (Biaya)', data: curr.spendHistory, borderColor: '#C9A84C', backgroundColor: 'transparent', borderWidth: 2 },
                { label: 'Revenue (Omset)', data: curr.revenueHistory, borderColor: '#22C55E', backgroundColor: 'transparent', borderWidth: 2 }
              ]} 
              height={200}
            />
          </div>
          
          <div className="card" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <div className="card-title" style={{alignSelf:'flex-start', marginBottom:12}}>📊 Share Anggaran Iklan</div>
            <div style={{display:'flex', alignItems:'center', gap:18}}>
              <C.DonutChart segments={platformSegments} cVal={platformSegments[0].value + '%'} cLabel="Meta Ads" size={120} />
              <div style={{display:'flex', flexDirection:'column', gap:8}}>
                {platformSegments.map(s => (
                  <div key={s.label} style={{display:'flex', alignItems:'center', gap:6, fontSize:12, fontWeight:700}}>
                    <div style={{width:10, height:10, borderRadius:2, background:s.color}}/>
                    <div style={{color:'var(--text-body)'}}>{s.label}: <span style={{color:'var(--text-dark)'}}>{s.value}%</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <C.SectionLabel>Tabel Performa Campaign Iklan</C.SectionLabel>
        <div className="card mb18" style={{overflowX:'auto'}}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Nama Campaign</th>
                <th>Platform</th>
                <th>Spend</th>
                <th>Clicks</th>
                <th>CTR</th>
                <th>Conversions</th>
                <th>ROAS</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((c, i) => (
                <tr key={i}>
                  <td style={{fontWeight:700}}>{c.name}</td>
                  <td><C.PlatformTag platform={c.platform}/></td>
                  <td>{'Rp ' + Math.round(c.spend).toLocaleString('id-ID')}</td>
                  <td>{Math.round(c.clicks).toLocaleString('id-ID')}</td>
                  <td style={{fontWeight:700}}>{c.ctr.toFixed(2)}%</td>
                  <td>{c.conversions.toLocaleString('id-ID')}</td>
                  <td style={{fontWeight:800, color:'var(--green)'}}>{c.roas.toFixed(1)}x</td>
                  <td>
                    <span style={{
                      fontSize:10, 
                      fontWeight:700, 
                      padding:'2px 8px', 
                      borderRadius:12, 
                      background: c.status==='Aktif' ? 'var(--gold-pale-2)' : 'var(--border)', 
                      color: c.status==='Aktif' ? 'var(--gold-dark)' : 'var(--text-muted)'
                    }}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <C.SectionLabel>Performa Materi Kreatif Teratas</C.SectionLabel>
        <div className="grid-4">
          {creatives.map((c, i) => (
            <div className="card" key={i} style={{transition:'all 0.2s', display:'flex', flexDirection:'column', height:'100%', position:'relative', borderTop:`3px solid var(--gold-light)`}}>
              <div style={{width:38, height:38, borderRadius:8, background:c.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:18, marginBottom:10, alignSelf:'flex-start'}}>{c.img}</div>
              <div style={{fontSize:12, fontWeight:700, color:'var(--text-dark)', marginBottom:4, flex:1}}>{c.title}</div>
              <div style={{fontSize:10, color:'var(--text-muted)', marginBottom:12}}>{c.type}</div>
              <div style={{display:'flex', justifyContent:'space-between', borderTop:'1px solid var(--border)', paddingTop:8, fontSize:11}}>
                <div>CTR: <span style={{fontWeight:700, color:'var(--text-dark)'}}>{c.ctr}</span></div>
                <div>ROAS: <span style={{fontWeight:700, color:'var(--green)'}}>{c.roas}</span></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════
     PAGE: CAMPAIGN
  ══════════════════════════════════ */
  function CampaignPage() {
    const [period, setPeriod] = useState('30d');

    const campaignData = {
      '7d': {
        activeCount: 2,
        totalBudget: 40000000,
        totalRevenue: 48500000,
        achievement: 121,
        targetRevenue: 40000000,
        campaignsList: [
          { id: 1, name: 'Promo Kemerdekaan 17s', status: 'Aktif', start: '10 Agt', end: '25 Agt', budget: 15000000, target: 80000000, current: 48500000, color: 'var(--red)', pct: 61, channels: ['instagram', 'tiktok', 'whatsapp'] },
          { id: 2, name: 'Launching New Batik Men', status: 'Perencanaan', start: '01 Sep', end: '15 Sep', budget: 25000000, target: 150000000, current: 0, color: 'var(--blue)', pct: 0, channels: ['instagram', 'facebook'] },
          { id: 3, name: 'Mega Sale 7.7 Shopping Fest', status: 'Selesai', start: '01 Jul', end: '10 Jul', budget: 12000000, target: 60000000, current: 68200000, color: 'var(--green)', pct: 114, channels: ['tiktok', 'marketplace'] }
        ]
      },
      '30d': {
        activeCount: 2,
        totalBudget: 40000000,
        totalRevenue: 116700000,
        achievement: 55,
        targetRevenue: 210000000,
        campaignsList: [
          { id: 1, name: 'Promo Kemerdekaan 17s', status: 'Aktif', start: '10 Agt', end: '25 Agt', budget: 15000000, target: 80000000, current: 48500000, color: 'var(--red)', pct: 61, channels: ['instagram', 'tiktok', 'whatsapp'] },
          { id: 2, name: 'Launching New Batik Men', status: 'Perencanaan', start: '01 Sep', end: '15 Sep', budget: 25000000, target: 150000000, current: 0, color: 'var(--blue)', pct: 0, channels: ['instagram', 'facebook'] },
          { id: 3, name: 'Mega Sale 7.7 Shopping Fest', status: 'Selesai', start: '01 Jul', end: '10 Jul', budget: 12000000, target: 60000000, current: 68200000, color: 'var(--green)', pct: 114, channels: ['tiktok', 'marketplace'] }
        ]
      },
      '90d': {
        activeCount: 3,
        totalBudget: 52000000,
        totalRevenue: 116700000,
        achievement: 40,
        targetRevenue: 290000000,
        campaignsList: [
          { id: 1, name: 'Promo Kemerdekaan 17s', status: 'Aktif', start: '10 Agt', end: '25 Agt', budget: 15000000, target: 80000000, current: 48500000, color: 'var(--red)', pct: 61, channels: ['instagram', 'tiktok', 'whatsapp'] },
          { id: 2, name: 'Launching New Batik Men', status: 'Perencanaan', start: '01 Sep', end: '15 Sep', budget: 25000000, target: 150000000, current: 0, color: 'var(--blue)', pct: 0, channels: ['instagram', 'facebook'] },
          { id: 3, name: 'Mega Sale 7.7 Shopping Fest', status: 'Selesai', start: '01 Jul', end: '10 Jul', budget: 12000000, target: 60000000, current: 68200000, color: 'var(--green)', pct: 114, channels: ['tiktok', 'marketplace'] }
        ]
      }
    };

    const curr = campaignData[period] || campaignData['30d'];

    const waBlastList = [
      { title: 'Blast Katalog Merdeka - Member VIP', date: '12 Agt, 09:00', sent: 3500, read: 3120, ctr: '18.4%', status: 'Sukses' },
      { title: 'Remind Abandoned Checkout - Shopee & WA', date: 'Setiap Hari (Realtime)', sent: 1284, read: 1150, ctr: '24.2%', status: 'Aktif' },
      { title: 'Promo Merdeka Free Ongkir - All Customer', date: '17 Agt, 10:00', sent: 15000, read: 0, ctr: '0%', status: 'Direncanakan' }
    ];

    return (
      <div className="page-body">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <C.SectionLabel badge="Kampanye">Marketing Campaigns Tracker</C.SectionLabel>
          <C.PeriodSelector value={period} onChange={setPeriod} />
        </div>

        <div className="grid-3" style={{ marginBottom: 18 }}>
          <C.MetricCard icon="🎯" label="Kampanye Rencana & Aktif" value={curr.activeCount + ' Campaign'} accentColor="#C9A84C"/>
          <C.MetricCard icon="💸" label="Total Anggaran Campaign" value={'Rp ' + curr.totalBudget.toLocaleString('id-ID')} accentColor="#3B82F6"/>
          <C.MetricCard icon="💰" label="Omset Realisasi Campaign" value={'Rp ' + curr.totalRevenue.toLocaleString('id-ID')} trend={curr.achievement} trendLabel="target tercapai" accentColor="#22C55E"/>
        </div>

        <C.SectionLabel>Timeline Kampanye (Juli - September 2026)</C.SectionLabel>
        <div className="card mb18" style={{padding:'20px 24px'}}>
          <div style={{display:'flex', flexDirection:'column', gap:18}}>
            <div style={{display:'grid', gridTemplateColumns:'200px 1fr 1fr 1fr', gap:10, fontSize:10, fontWeight:800, color:'var(--text-dim)', borderBottom:'1px solid var(--border)', paddingBottom:8, textTransform:'uppercase', letterSpacing:'1px'}}>
              <div>Nama Kampanye</div>
              <div style={{textAlign:'center', borderLeft:'1px solid var(--bg-2)'}}>Juli 2026</div>
              <div style={{textAlign:'center', borderLeft:'1px solid var(--bg-2)'}}>Agustus 2026</div>
              <div style={{textAlign:'center', borderLeft:'1px solid var(--bg-2)'}}>September 2026</div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'200px 1fr 1fr 1fr', gap:10, alignItems:'center', position:'relative'}}>
              <div style={{fontSize:12, fontWeight:700, color:'var(--text-dark)'}}>
                📢 Promo Kemerdekaan 17s
                <div style={{fontSize:10, fontWeight:400, color:'var(--text-muted)', marginTop:2}}>10 Agt - 25 Agt (Realisasi 61%)</div>
              </div>
              <div style={{gridColumn:'3', position:'relative', height:18, display:'flex', alignItems:'center'}}>
                <div style={{position:'absolute', left:'30%', right:'10%', height:12, background:'var(--red)', borderRadius:6, opacity:0.85, boxShadow:'0 2px 8px rgba(239,68,68,0.2)'}}/>
              </div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'200px 1fr 1fr 1fr', gap:10, alignItems:'center', position:'relative'}}>
              <div style={{fontSize:12, fontWeight:700, color:'var(--text-dark)'}}>
                👔 Launching New Batik Men
                <div style={{fontSize:10, fontWeight:400, color:'var(--text-muted)', marginTop:2}}>01 Sep - 15 Sep (Rencana)</div>
              </div>
              <div style={{gridColumn:'4', position:'relative', height:18, display:'flex', alignItems:'center'}}>
                <div style={{position:'absolute', left:'0%', right:'50%', height:12, background:'var(--blue)', borderRadius:6, opacity:0.85, boxShadow:'0 2px 8px rgba(59,130,246,0.2)'}}/>
              </div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'200px 1fr 1fr 1fr', gap:10, alignItems:'center', position:'relative'}}>
              <div style={{fontSize:12, fontWeight:700, color:'var(--text-dark)'}}>
                🛒 Mega Sale 7.7 Shopping Fest
                <div style={{fontSize:10, fontWeight:400, color:'var(--text-muted)', marginTop:2}}>01 Jul - 10 Jul (Selesai 114%)</div>
              </div>
              <div style={{gridColumn:'2', position:'relative', height:18, display:'flex', alignItems:'center'}}>
                <div style={{position:'absolute', left:'3%', right:'66%', height:12, background:'var(--green)', borderRadius:6, opacity:0.85, boxShadow:'0 2px 8px rgba(34,197,94,0.2)'}}/>
              </div>
            </div>
          </div>
        </div>

        <C.SectionLabel>Daftar & Progress Kampanye</C.SectionLabel>
        <div className="grid-3 mb18">
          {curr.campaignsList.map(c => (
            <div className="card" key={c.id} style={{display:'flex', flexDirection:'column', borderTop:`4px solid ${c.color}`}}>
              <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12}}>
                <div>
                  <span style={{
                    fontSize:9, 
                    fontWeight:800, 
                    padding:'2px 6px', 
                    borderRadius:4, 
                    background: c.status === 'Aktif' ? 'rgba(34,197,94,0.1)' : c.status === 'Selesai' ? 'rgba(138,126,106,0.1)' : 'rgba(59,130,246,0.1)',
                    color: c.status === 'Aktif' ? 'var(--green)' : c.status === 'Selesai' ? 'var(--text-muted)' : 'var(--blue)',
                    textTransform: 'uppercase'
                  }}>{c.status}</span>
                  <div style={{fontSize:14, fontWeight:800, color:'var(--text-dark)', marginTop:6}}>{c.name}</div>
                </div>
                <span style={{fontSize:10, color:'var(--text-muted)', fontWeight:600}}>{c.start} - {c.end}</span>
              </div>

              <div style={{fontSize:12, color:'var(--text-body)', marginBottom:12, flex:1}}>
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:4}}>
                  <span>Anggaran: <b>{'Rp ' + c.budget.toLocaleString('id-ID')}</b></span>
                  <span>Target: <b>{'Rp ' + c.target.toLocaleString('id-ID')}</b></span>
                </div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11, color:'var(--text-muted)', marginTop:2}}>
                  <span>Realisasi: <b>{'Rp ' + c.current.toLocaleString('id-ID')}</b></span>
                </div>
              </div>

              <div style={{marginBottom:14}}>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:11, fontWeight:700, color:'var(--text-dark)', marginBottom:4}}>
                  <span>Progress Pencapaian</span>
                  <span style={{color: c.pct >= 100 ? 'var(--green)' : 'var(--text-dark)'}}>{c.pct}%</span>
                </div>
                <div style={{height:6, background:'var(--bg-2)', borderRadius:3, overflow:'hidden'}}>
                  <div style={{height:'100%', width:`${Math.min(c.pct, 100)}%`, background:c.color, borderRadius:3, transition:'width 0.4s'}}/>
                </div>
              </div>

              <div style={{display:'flex', gap:6, flexWrap:'wrap', borderTop:'1px solid var(--border)', paddingTop:10}}>
                {c.channels.map(ch => (
                  <span key={ch} style={{
                    fontSize:10, 
                    fontWeight:700, 
                    padding:'2px 8px', 
                    borderRadius:20, 
                    background:'var(--bg-2)', 
                    color:'var(--text-body)'
                  }}>
                    {ch === 'instagram' ? '📷 Instagram' : ch === 'tiktok' ? '🎵 TikTok' : ch === 'whatsapp' ? '💬 WhatsApp' : ch === 'marketplace' ? '🛍️ Marketplace' : ch}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <C.SectionLabel>WhatsApp Blast & Broadcast Schedule</C.SectionLabel>
        <div className="card" style={{overflowX:'auto'}}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Judul Broadcast</th>
                <th>Jadwal / Waktu</th>
                <th>Jumlah Kirim</th>
                <th>Dibaca (Rate)</th>
                <th>CTR Link</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {waBlastList.map((w, idx) => (
                <tr key={idx}>
                  <td style={{fontWeight:700}}>💬 {w.title}</td>
                  <td>{w.date}</td>
                  <td>{w.sent.toLocaleString('id-ID')}</td>
                  <td>{w.read > 0 ? `${w.read.toLocaleString('id-ID')} (${Math.round((w.read/w.sent)*100)}%)` : '-'}</td>
                  <td style={{fontWeight:700, color:'var(--gold-dark)'}}>{w.ctr}</td>
                  <td>
                    <span style={{
                      fontSize:10, 
                      fontWeight:700, 
                      padding:'2px 8px', 
                      borderRadius:12, 
                      background: w.status==='Sukses' ? 'rgba(34,197,94,0.1)' : w.status==='Aktif' ? 'rgba(201,168,76,0.15)' : 'rgba(59,130,246,0.1)', 
                      color: w.status==='Sukses' ? 'var(--green)' : w.status==='Aktif' ? 'var(--gold-dark)' : 'var(--blue)'
                    }}>{w.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return { OverviewPage, InstagramPage, TikTokPage, ComparePage, ContentPage, ReportPage, AdsPage, CampaignPage };
})();
