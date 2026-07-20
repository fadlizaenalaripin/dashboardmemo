/* ═══════════════════════════════════════════════════════════════
   MOMEN Marketing Monitor — Data Layer
   File: js/data.js
   Defines: window.AppData
═══════════════════════════════════════════════════════════════ */

window.AppData = (function () {

  /* ── ACCOUNTS ── */
  const accounts = [
    {
      id: 'ig-official',
      platform: 'instagram',
      handle: '@momen.officialid',
      name: 'Momen Official ID',
      category: 'Apparel & Clothing',
      avatar: '⭐',
      avatarColor: '#FF5722',
      followers: 35400,
      following: 512,
      posts: 284,
      bio: 'Akun resmi MOMEN. Temukan koleksi batik terbaik kami.',
      verified: true,
      accountType: 'Business',
    },
    {
      id: 'ig-gangs',
      platform: 'instagram',
      handle: '@momengangs',
      name: 'Momen Gangs',
      category: 'Community',
      avatar: '👥',
      avatarColor: '#4CAF50',
      followers: 12300,
      following: 184,
      posts: 92,
      bio: 'Ruang kreatif & komunitas Momen. Tag us to get featured!',
      verified: false,
      accountType: 'Creator',
    },
    {
      id: 'tt-official',
      platform: 'tiktok',
      handle: '@momenofficial.id',
      name: 'Momen Official TikTok',
      category: 'Fashion & Lifestyle',
      avatar: '🎵',
      avatarColor: '#010101',
      followers: 62400,
      following: 180,
      posts: 94,
      bio: 'Batik keren, konten seru 🔥',
      verified: false,
      accountType: 'Business',
    },
    {
      id: 'tt-gangs',
      platform: 'tiktok',
      handle: '@momen.gangs',
      name: 'Momen Gangs TikTok',
      category: 'Fashion',
      avatar: '✨',
      avatarColor: '#FE2C55',
      followers: 24800,
      following: 92,
      posts: 67,
      bio: 'Outfit batik hits & kekinian',
      verified: false,
      accountType: 'Creator',
    },
  ];

  /* ── GENERATE WEEKLY DATA ── */
  function genWeekly(base, variance = 0.15) {
    const days = ['Sen','Sel','Rab','Kam','Jum','Sab','Min'];
    return days.map(day => ({
      day,
      value: Math.round(base * (1 + (Math.random() - 0.5) * variance))
    }));
  }

  function genMonthly(base, months = 12, trend = 0.04) {
    const labels = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    return labels.slice(0, months).map((month, i) => ({
      month,
      value: Math.round(base * Math.pow(1 + trend, i) * (1 + (Math.random() - 0.5) * 0.08))
    }));
  }

  /* ── METRICS PER ACCOUNT ── */
  const metricsData = {
    'ig-official': {
      period: {
        '7d': {
          profileVisits: 11200,
          profileVisitsTrend: 15.4,
          reach: 72000,
          reachTrend: 10.2,
          impressions: 142000,
          impressionsTrend: 7.8,
          engagementRate: 5.0,
          engagementRateTrend: 0.2,
          likes: 4200,
          likesTrend: 12.1,
          comments: 710,
          commentsTrend: 18.4,
          shares: 290,
          sharesTrend: 7.4,
          saves: 1020,
          savesTrend: 24.8,
          storyViews: 54000,
          storyViewsTrend: 8.4,
          reelPlays: 54000,
          reelPlaysTrend: 21.6,
          followerGrowth: 510,
          followerGrowthTrend: 12.4,
          websiteClicks: 2200,
          websiteClicksTrend: 4.8,
        },
        '30d': {
          profileVisits: 44800,
          profileVisitsTrend: 18.2,
          reach: 288000,
          reachTrend: 12.4,
          impressions: 568000,
          impressionsTrend: 9.8,
          engagementRate: 4.8,
          engagementRateTrend: 0.3,
          likes: 16800,
          likesTrend: 15.4,
          comments: 2840,
          commentsTrend: 22.1,
          shares: 1160,
          sharesTrend: 10.2,
          saves: 4080,
          savesTrend: 31.4,
          storyViews: 216000,
          storyViewsTrend: 12.1,
          reelPlays: 216000,
          reelPlaysTrend: 26.8,
          followerGrowth: 2040,
          followerGrowthTrend: 15.2,
          websiteClicks: 8800,
          websiteClicksTrend: 7.2,
        },
        '90d': {
          profileVisits: 134400,
          profileVisitsTrend: 24.8,
          reach: 864000,
          reachTrend: 18.4,
          impressions: 1704000,
          impressionsTrend: 15.2,
          engagementRate: 4.6,
          engagementRateTrend: 0.5,
          likes: 50400,
          likesTrend: 21.2,
          comments: 8520,
          commentsTrend: 28.4,
          shares: 3480,
          sharesTrend: 15.4,
          saves: 12240,
          savesTrend: 38.2,
          storyViews: 648000,
          storyViewsTrend: 16.4,
          reelPlays: 648000,
          reelPlaysTrend: 34.2,
          followerGrowth: 6120,
          followerGrowthTrend: 21.6,
          websiteClicks: 26400,
          websiteClicksTrend: 11.4,
        }
      },
      audienceGender: { female: 62, male: 38 },
      audienceAge: [
        { range: '13–17', pct: 4 },
        { range: '18–24', pct: 30 },
        { range: '25–34', pct: 40 },
        { range: '35–44', pct: 18 },
        { range: '45+', pct: 8 },
      ],
      audienceCity: [
        { city: 'Jakarta', pct: 26 },
        { city: 'Bandung', pct: 21 },
        { city: 'Surabaya', pct: 15 },
        { city: 'Yogyakarta', pct: 12 },
        { city: 'Semarang', pct: 10 },
        { city: 'Lainnya', pct: 16 },
      ],
      bestPostTime: [
        { day: 'Selasa', time: '19:00', score: 90 },
        { day: 'Kamis', time: '20:00', score: 87 },
        { day: 'Sabtu', time: '10:00', score: 85 },
      ],
      reachData: genWeekly(10200),
      followerGrowthData: genWeekly(72),
    },
    'ig-gangs': {
      period: {
        '7d': {
          profileVisits: 3100,
          profileVisitsTrend: 6.2,
          reach: 18500,
          reachTrend: 4.8,
          impressions: 36000,
          impressionsTrend: 3.9,
          engagementRate: 4.2,
          engagementRateTrend: 0.1,
          likes: 1100,
          likesTrend: 8.4,
          comments: 180,
          commentsTrend: 10.2,
          shares: 85,
          sharesTrend: 5.3,
          saves: 310,
          savesTrend: 14.8,
          storyViews: 14000,
          storyViewsTrend: 5.6,
          reelPlays: 14000,
          reelPlaysTrend: 12.8,
          followerGrowth: 110,
          followerGrowthTrend: 6.2,
          websiteClicks: 580,
          websiteClicksTrend: 2.4,
        },
        '30d': {
          profileVisits: 12400,
          profileVisitsTrend: 9.4,
          reach: 74000,
          reachTrend: 7.2,
          impressions: 144000,
          impressionsTrend: 5.8,
          engagementRate: 4.0,
          engagementRateTrend: 0.2,
          likes: 4400,
          likesTrend: 11.2,
          comments: 720,
          commentsTrend: 14.8,
          shares: 340,
          sharesTrend: 8.4,
          saves: 1240,
          savesTrend: 19.8,
          storyViews: 56000,
          storyViewsTrend: 8.2,
          reelPlays: 56000,
          reelPlaysTrend: 18.4,
          followerGrowth: 440,
          followerGrowthTrend: 9.4,
          websiteClicks: 2320,
          websiteClicksTrend: 4.8,
        },
        '90d': {
          profileVisits: 37200,
          profileVisitsTrend: 14.2,
          reach: 222000,
          reachTrend: 12.4,
          impressions: 432000,
          impressionsTrend: 10.2,
          engagementRate: 3.8,
          engagementRateTrend: 0.3,
          likes: 13200,
          likesTrend: 16.4,
          comments: 2160,
          commentsTrend: 21.2,
          shares: 1020,
          sharesTrend: 12.4,
          saves: 3720,
          savesTrend: 28.4,
          storyViews: 168000,
          storyViewsTrend: 12.8,
          reelPlays: 168000,
          reelPlaysTrend: 24.2,
          followerGrowth: 1320,
          followerGrowthTrend: 14.2,
          websiteClicks: 6960,
          websiteClicksTrend: 8.4,
        }
      },
      audienceGender: { female: 50, male: 50 },
      audienceAge: [
        { range: '13–17', pct: 8 },
        { range: '18–24', pct: 42 },
        { range: '25–34', pct: 35 },
        { range: '35–44', pct: 11 },
        { range: '45+', pct: 4 },
      ],
      audienceCity: [
        { city: 'Jakarta', pct: 22 },
        { city: 'Bandung', pct: 20 },
        { city: 'Surabaya', pct: 16 },
        { city: 'Yogyakarta', pct: 14 },
        { city: 'Medan', pct: 10 },
        { city: 'Lainnya', pct: 18 },
      ],
      bestPostTime: [
        { day: 'Rabu', time: '18:00', score: 86 },
        { day: 'Jumat', time: '19:00', score: 89 },
        { day: 'Sabtu', time: '13:00', score: 83 },
      ],
      reachData: genWeekly(2600),
      followerGrowthData: genWeekly(18),
    },
    'tt-official': {
      period: {
        '7d': {
          profileVisits: 32400,
          profileVisitsTrend: 28.4,
          reach: 284000,
          reachTrend: 34.2,
          impressions: 512000,
          impressionsTrend: 28.8,
          engagementRate: 8.4,
          engagementRateTrend: 1.2,
          likes: 28400,
          likesTrend: 38.4,
          comments: 2840,
          commentsTrend: 44.2,
          shares: 1420,
          sharesTrend: 52.8,
          saves: 0,
          savesTrend: 0,
          videoViews: 512000,
          videoViewsTrend: 42.4,
          followerGrowth: 2840,
          followerGrowthTrend: 38.4,
          websiteClicks: 8420,
          websiteClicksTrend: 28.4,
        },
        '30d': {
          profileVisits: 124000,
          profileVisitsTrend: 34.8,
          reach: 1120000,
          reachTrend: 42.4,
          impressions: 2040000,
          impressionsTrend: 36.2,
          engagementRate: 8.2,
          engagementRateTrend: 1.4,
          likes: 112000,
          likesTrend: 44.8,
          comments: 11200,
          commentsTrend: 52.4,
          shares: 5600,
          sharesTrend: 62.8,
          saves: 0,
          savesTrend: 0,
          videoViews: 2040000,
          videoViewsTrend: 52.4,
          followerGrowth: 11200,
          followerGrowthTrend: 46.8,
          websiteClicks: 33600,
          websiteClicksTrend: 36.4,
        },
        '90d': {
          profileVisits: 368000,
          profileVisitsTrend: 42.4,
          reach: 3380000,
          reachTrend: 52.8,
          impressions: 6120000,
          impressionsTrend: 46.4,
          engagementRate: 7.8,
          engagementRateTrend: 1.8,
          likes: 336000,
          likesTrend: 54.8,
          comments: 33200,
          commentsTrend: 62.4,
          shares: 16800,
          sharesTrend: 74.2,
          saves: 0,
          savesTrend: 0,
          videoViews: 6120000,
          videoViewsTrend: 64.8,
          followerGrowth: 33600,
          followerGrowthTrend: 58.4,
          websiteClicks: 100800,
          websiteClicksTrend: 48.2,
        }
      },
      audienceGender: { female: 58, male: 42 },
      audienceAge: [
        { range: '13–17', pct: 12 },
        { range: '18–24', pct: 44 },
        { range: '25–34', pct: 30 },
        { range: '35–44', pct: 10 },
        { range: '45+', pct: 4 },
      ],
      audienceCity: [
        { city: 'Jakarta', pct: 26 },
        { city: 'Bandung', pct: 18 },
        { city: 'Surabaya', pct: 16 },
        { city: 'Yogyakarta', pct: 14 },
        { city: 'Medan', pct: 10 },
        { city: 'Lainnya', pct: 16 },
      ],
      bestPostTime: [
        { day: 'Jumat', time: '20:00', score: 96 },
        { day: 'Sabtu', time: '19:00', score: 94 },
        { day: 'Minggu', time: '21:00', score: 91 },
      ],
      reachData: genWeekly(40571),
      followerGrowthData: genWeekly(406),
    },
    'tt-gangs': {
      period: {
        '7d': {
          profileVisits: 14200,
          profileVisitsTrend: 22.4,
          reach: 124000,
          reachTrend: 28.4,
          impressions: 228000,
          impressionsTrend: 22.8,
          engagementRate: 9.2,
          engagementRateTrend: 1.4,
          likes: 14400,
          likesTrend: 34.4,
          comments: 1280,
          commentsTrend: 42.8,
          shares: 820,
          sharesTrend: 48.2,
          saves: 0,
          savesTrend: 0,
          videoViews: 228000,
          videoViewsTrend: 38.4,
          followerGrowth: 1120,
          followerGrowthTrend: 32.4,
          websiteClicks: 3840,
          websiteClicksTrend: 24.8,
        },
        '30d': {
          profileVisits: 54000,
          profileVisitsTrend: 28.4,
          reach: 488000,
          reachTrend: 36.2,
          impressions: 912000,
          impressionsTrend: 29.8,
          engagementRate: 8.8,
          engagementRateTrend: 1.6,
          likes: 56000,
          likesTrend: 42.8,
          comments: 4960,
          commentsTrend: 52.4,
          shares: 3200,
          sharesTrend: 58.8,
          saves: 0,
          savesTrend: 0,
          videoViews: 912000,
          videoViewsTrend: 46.4,
          followerGrowth: 4480,
          followerGrowthTrend: 40.8,
          websiteClicks: 15200,
          websiteClicksTrend: 32.4,
        },
        '90d': {
          profileVisits: 158000,
          profileVisitsTrend: 36.8,
          reach: 1440000,
          reachTrend: 46.4,
          impressions: 2680000,
          impressionsTrend: 38.4,
          engagementRate: 8.4,
          engagementRateTrend: 2.1,
          likes: 164000,
          likesTrend: 52.4,
          comments: 14400,
          commentsTrend: 62.8,
          shares: 9600,
          sharesTrend: 72.4,
          saves: 0,
          savesTrend: 0,
          videoViews: 2680000,
          videoViewsTrend: 58.4,
          followerGrowth: 13200,
          followerGrowthTrend: 52.8,
          websiteClicks: 44800,
          websiteClicksTrend: 42.4,
        }
      },
      audienceGender: { female: 78, male: 22 },
      audienceAge: [
        { range: '13–17', pct: 16 },
        { range: '18–24', pct: 48 },
        { range: '25–34', pct: 26 },
        { range: '35–44', pct: 8 },
        { range: '45+', pct: 2 },
      ],
      audienceCity: [
        { city: 'Jakarta', pct: 30 },
        { city: 'Bandung', pct: 24 },
        { city: 'Surabaya', pct: 14 },
        { city: 'Yogyakarta', pct: 13 },
        { city: 'Makassar', pct: 8 },
        { city: 'Lainnya', pct: 11 },
      ],
      bestPostTime: [
        { day: 'Sabtu', time: '20:00', score: 98 },
        { day: 'Minggu', time: '19:30', score: 95 },
        { day: 'Jumat', time: '21:00', score: 92 },
      ],
      reachData: genWeekly(17714),
      followerGrowthData: genWeekly(160),
    },
  };

  /* ── TOP POSTS ── */
  const topPosts = {
    'ig-official': [
      { id: 1, thumb: '✨', caption: 'Momen Official Launching: New Signature Batik Collection 2026', likes: 1520, comments: 112, saves: 410, shares: 96, er: 6.8, type: 'Reels', date: '14 Jul' },
      { id: 2, thumb: '🛍️', caption: 'Store Tour: Kunjungi outlet resmi Momen Batik terdekat', likes: 1120, comments: 82, saves: 310, shares: 74, er: 6.0, type: 'Video', date: '11 Jul' },
      { id: 3, thumb: '🧵', caption: 'Dedikasi di balik setiap detail motif batik premium kami', likes: 940, comments: 68, saves: 240, shares: 52, er: 5.3, type: 'Carousel', date: '09 Jul' },
    ],
    'ig-gangs': [
      { id: 1, thumb: '🔥', caption: 'Gangs Meetup: Keseruan komunitas Momen akhir pekan lalu! 🙌', likes: 680, comments: 56, saves: 120, shares: 38, er: 7.2, type: 'Carousel', date: '13 Jul' },
      { id: 2, thumb: '👟', caption: 'Street Style: Padu padan batik dengan sneakers favoritmu', likes: 510, comments: 42, saves: 98, shares: 26, er: 6.4, type: 'Post', date: '10 Jul' },
    ],
    'tt-official': [
      { id: 1, thumb: '🔥', caption: 'POV: Kamu pakai batik ke acara dan semua noleh 😎', likes: 12400, comments: 842, saves: 0, shares: 2840, er: 14.2, views: 284000, type: 'Video', date: '13 Jul' },
      { id: 2, thumb: '✨', caption: 'Batik tulis vs batik cap — bedanya apa sih?? 🤔', likes: 8420, comments: 1240, saves: 0, shares: 1420, er: 11.8, views: 212000, type: 'Duet', date: '11 Jul' },
      { id: 3, thumb: '💫', caption: 'Transition outfit batik sebelum & sesudah ✨', likes: 6840, comments: 584, saves: 0, shares: 984, er: 9.4, views: 168000, type: 'Video', date: '9 Jul' },
      { id: 4, thumb: '🎵', caption: 'Get ready with me pake batik momen ke kondangan', likes: 5240, comments: 428, saves: 0, shares: 748, er: 8.2, views: 128000, type: 'Video', date: '7 Jul' },
    ],
    'tt-gangs': [
      { id: 1, thumb: '💃', caption: 'Batik outfit check! Momen Women edisi terbaru 🔥', likes: 8420, comments: 624, saves: 0, shares: 1840, er: 16.4, views: 212000, type: 'Video', date: '12 Jul' },
      { id: 2, thumb: '👸', caption: 'GRWM kondangan pakai batik Momen Women 💕', likes: 6240, comments: 484, saves: 0, shares: 1240, er: 13.2, views: 168000, type: 'Video', date: '10 Jul' },
      { id: 3, thumb: '🌺', caption: 'Unboxing koleksi baru Momen Women! Cantik banget 😍', likes: 4840, comments: 342, saves: 0, shares: 840, er: 10.8, views: 124000, type: 'Video', date: '8 Jul' },
    ],
  };

  /* ── COMPARISON CHART ── */
  const comparisonData = {
    months: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul'],
    accounts: {
      'ig-official': [31200, 32000, 32800, 33400, 34200, 34900, 35400],
      'ig-gangs': [10200, 10500, 10900, 11300, 11600, 12000, 12300],
      'tt-official': [48200, 50400, 53200, 56400, 58800, 61200, 62400],
      'tt-gangs': [20200, 21400, 22400, 23200, 23800, 24400, 24800],
    }
  };

  /* ── CONTENT IDEAS ── */
  const contentIdeas = [
    { id: 1, title: 'Batik Outfit Challenge', platform: 'tiktok', type: 'Video', priority: 'Tinggi', dueDate: '18 Jul', status: 'Direncanakan' },
    { id: 2, title: 'Behind the Scenes Produksi Batik', platform: 'instagram', type: 'Reels', priority: 'Tinggi', dueDate: '20 Jul', status: 'Draft' },
    { id: 3, title: 'Tips Style Batik Wanita Masa Kini', platform: 'instagram', type: 'Carousel', priority: 'Sedang', dueDate: '22 Jul', status: 'Direncanakan' },
    { id: 4, title: 'Kolaborasi dengan Fashion Influencer', platform: 'tiktok', type: 'Duet', priority: 'Tinggi', dueDate: '25 Jul', status: 'Direncanakan' },
    { id: 5, title: 'Review Produk oleh Customer', platform: 'instagram', type: 'Story', priority: 'Rendah', dueDate: '27 Jul', status: 'Siap Publish' },
    { id: 6, title: 'Lookbook Koleksi Agustus 2026', platform: 'instagram', type: 'Post', priority: 'Tinggi', dueDate: '1 Agu', status: 'Draft' },
  ];

  /* ── HELPERS ── */
  function formatNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'jt';
    if (n >= 1000) return (n / 1000).toFixed(1) + 'rb';
    return n.toString();
  }

  function formatPct(n) { return n > 0 ? '+' + n.toFixed(1) + '%' : n.toFixed(1) + '%'; }

  function getMetrics(accountId, period = '30d') {
    const m = metricsData[accountId];
    if (!m) return null;
    return { ...m, current: m.period[period] };
  }

  function getAccount(id) { return accounts.find(a => a.id === id); }

  function getAllAccounts() { return accounts; }

  function getTopPosts(accountId) { return topPosts[accountId] || []; }

  function getComparisonData() { return comparisonData; }

  function getContentIdeas() { return contentIdeas; }

  return {
    accounts,
    metricsData,
    comparisonData,
    contentIdeas,
    getAccount,
    getAllAccounts,
    getMetrics,
    getTopPosts,
    getComparisonData,
    getContentIdeas,
    formatNumber,
    formatPct,
    genWeekly,
    genMonthly,
  };
})();
