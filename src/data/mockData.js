export const DATA = {
  period: '01 – 13 Juli 2026',
  compare: '1 – 13 Juni 2026',
  lastUpdate: '13 Juli 2026 · 15:07',
  salesOverview: {
    target: 'Rp 540.000.000',
    achievement: { pct: '37,38%', value: 'Rp 201.838.726' },
    storeCirebon: { target: 'Rp 80.000.000', actual: 'Rp 32.400.000', pct: '40,5%' },
    storeJakarta: { target: 'Rp 60.000.000', actual: 'Rp 20.888.726', pct: '34,8%' },
    salesOnline: { target: 'Rp 400.000.000', actual: 'Rp 148.550.000', pct: '37,1%' },
    qty: { value: '1.248', change: -8.3 },
    transaksi: { value: '236', change: 12.6 },
    basket: { value: 'Rp 855.248', change: 5.2 },
  },
  trendLabels: Array.from({length:13},(_,i)=> `${i+1} Jul`),
  trendTarget: [12,25,37,50,62,75,87,100,112,125,137,150,162].map(v=>v*1000000),
  trendActual: [8,18,30,45,58,70,82,95,108,120,135,148,162].map(v=>v*985000),
  breakdown: {
    channel: {
      labels: ['WhatsApp','Instagram','Marketplace','Offline Store','Lainnya'],
      data: [45.7,27.3,15.5,8.6,2.9],
      colors: ['#C9A84C','#E8C878','#A07830','#8B6914','#4a3a10'],
    },
    produk: {
      labels: ['Momen Men','Momen Women','Accessories','Limited Ed.'],
      data: [62.1,21.3,9.8,6.8],
      colors: ['#C9A84C','#E8C878','#A07830','#8B6914'],
    },
    customer: {
      labels: ['New Customer','Repeat Customer'],
      data: [64.2,35.8],
      colors: ['#C9A84C','#8B6914'],
    },
    area: {
      labels: ['Jawa Barat','Jawa Tengah','Jabodetabek','Jawa Timur','Lainnya'],
      data: [48.2,22.7,18.6,6.1,4.4],
      colors: ['#C9A84C','#E8C878','#A07830','#8B6914','#4a3a10'],
    },
  },
  bestSeller: [
    { rank:1, name:'Kemeja Batik Momen Classic', qty:248, revenue:'Rp 42.350.000' },
    { rank:2, name:'Outer Batik Momen Premium', qty:186, revenue:'Rp 35.180.000' },
    { rank:3, name:'Tunik Batik Wanita Momen', qty:152, revenue:'Rp 28.920.000' },
    { rank:4, name:'Hem Batik Lengan Pendek', qty:134, revenue:'Rp 21.480.000' },
    { rank:5, name:'Scarf Batik Eksklusif', qty:98, revenue:'Rp 15.760.000' },
  ],
  leads: {
    total: { value: '1.842', change: 14.2 },
    qualified: { value: '612', change: 9.8 },
    kontak: { value: '418', change: 6.4 },
    transaksi: '236',
    conversionRate: '12,8%',
    closingRate: '38,5%',
    winRate: '56,5%',
  },
  channelBar: {
    labels: ['WhatsApp','Instagram','Marketplace','Offline Store','Lainnya'],
    data: [92.1,54.9,31.2,17.3,6.3],
  },
};

export const NAV = [
  // Overview
  { id: 'overview', icon: '🖥️', label: 'Executive Dashboard', sec: 'overview' },
  { id: 'insight', icon: '💡', label: 'Insight & Improvement', sec: 'overview' },
  
  // SALES
  { id: 'sales_dashboard', icon: '📊', label: 'Sales Dashboard', sec: 'sales' },
  { id: 'funnel_leads', icon: '⏳', label: 'Funnel & Leads', sec: 'sales' },
  { id: 'product_sales', icon: '🛍️', label: 'Product Sales', sec: 'sales' },
  { id: 'sales_database', icon: '🗄️', label: 'Sales Database', sec: 'sales' },
  
  // MARKETING
  { id: 'marketing_dashboard', icon: '📢', label: 'Marketing Dashboard', sec: 'marketing' },
  { id: 'social_media', icon: '📈', label: 'Social Media Analytics', sec: 'marketing' },
  { id: 'campaign_content', icon: '📝', label: 'Campaign & Content', sec: 'marketing' },
  { id: 'ads_performance', icon: '📣', label: 'Ads Performance', sec: 'marketing' },
  { id: 'budget_roi', icon: '💰', label: 'Budget & ROI', sec: 'marketing' },
  
  // PRODUCT
  { id: 'product_dashboard', icon: '📦', label: 'Product Dashboard', sec: 'product' },
  { id: 'product_readiness', icon: '✅', label: 'Product Readiness', sec: 'product' },
  { id: 'quality_execution', icon: '🎖️', label: 'Quality & Execution', sec: 'product' },
  { id: 'stock_availability', icon: '🏬', label: 'Stock & Availability', sec: 'product' },
  
  // CUSTOMER POV
  { id: 'customer_journey', icon: '👣', label: 'Customer Journey', sec: 'customer' },
  { id: 'rating_review', icon: '⭐', label: 'Rating & Review', sec: 'customer' },
  { id: 'complaint_management', icon: '📂', label: 'Complaint Management', sec: 'customer' },
  { id: 'retention_repeat', icon: '🔄', label: 'Retention & Repeat Order', sec: 'customer' },
  { id: 'voice_customer', icon: '🗣️', label: 'Voice of Customer', sec: 'customer' },
  
  // REPORTING
  { id: 'report_export', icon: '📄', label: 'Laporan & Ekspor', sec: 'reporting' },
  { id: 'data_management', icon: '⚙️', label: 'Data Management', sec: 'reporting' }
];

export const INFO = {
  overview: { title: 'Executive Dashboard', sub: 'Pantau performa bisnis dan ringkasan eksekutif' },
  insight: { title: 'Insight & Improvement', sub: 'Analisis rekomendasi dan peningkatan performa' },
  
  sales_dashboard: { title: 'Dashboard Sales Momen', sub: 'Target sales, realisasi, outstanding, transaksi, dan retensi' },
  funnel_leads: { title: 'Funnel & Leads', sub: 'Analisis konversi prospek dan leads funnel' },
  product_sales: { title: 'Product Sales', sub: 'Rincian penjualan produk Momen Batik' },
  sales_database: { title: 'Sales Database', sub: 'Database transaksi dan rekap order sales' },
  
  marketing_dashboard: { title: 'Marketing Dashboard', sub: 'Ringkasan performa aktivitas pemasaran' },
  social_media: { title: 'Social Media Analytics', sub: 'Performa detail akun Instagram & TikTok Momen' },
  campaign_content: { title: 'Campaign & Content', sub: 'Kelola rencana konten dan kampanye aktif' },
  ads_performance: { title: 'Ads Performance', sub: 'Pantau biaya iklan, reach, CTR, ROAS, dan status iklan' },
  budget_roi: { title: 'Budget & ROI', sub: 'Analisis alokasi budget dan return on investment' },
  
  product_dashboard: { title: 'Product Dashboard', sub: 'Pantau performa & kategori koleksi produk Momen Batik' },
  product_readiness: { title: 'Product Readiness', sub: 'Kesiapan stok dan peluncuran produk baru' },
  quality_execution: { title: 'Quality & Execution', sub: 'Kualitas produk dan pemenuhan pesanan' },
  stock_availability: { title: 'Stock & Availability', sub: 'Ketersediaan produk di gudang dan toko' },
  
  customer_journey: { title: 'Customer Journey', sub: 'Lacak perjalanan pelanggan dari Awareness hingga Loyalitas' },
  rating_review: { title: 'Rating & Review', sub: 'Ulasan dan penilaian dari pelanggan' },
  complaint_management: { title: 'Complaint Management', sub: 'Pengelolaan keluhan pelanggan' },
  retention_repeat: { title: 'Retention & Repeat Order', sub: 'Retensi pelanggan dan pembelian berulang' },
  voice_customer: { title: 'Voice of Customer', sub: 'Masukan dan aspirasi pelanggan' },
  
  report_export: { title: 'Laporan & Ekspor', sub: 'Rekap data dan download laporan kinerja' },
  data_management: { title: 'Data Management', sub: 'Pengaturan basis data dan sinkronisasi data' }
};
