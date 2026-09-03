import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';

export function SalesDatabasePage() {
  const transactions = [
    { id: 'TRX-20260713-001', customer: 'Hadi Kurniawan', channel: 'WhatsApp', items: 'Kemeja Batik Momen Classic (2x)', amount: 'Rp 350.000', status: 'Completed', date: '13 Jul 2026 14:20' },
    { id: 'TRX-20260713-002', customer: 'Abyan Putra', channel: 'Instagram DM', items: 'Outer Batik Momen Premium (1x)', amount: 'Rp 189.000', status: 'Completed', date: '13 Jul 2026 13:45' },
    { id: 'TRX-20260713-003', customer: 'Ayus Pratama', channel: 'Shopee', items: 'Tunik Batik Wanita Momen (1x)', amount: 'Rp 169.000', status: 'Shipped', date: '13 Jul 2026 11:10' },
    { id: 'TRX-20260712-004', customer: 'Imam Syafe\'i', channel: 'Offline Store', items: 'Hem Batik Lengan Pendek (3x)', amount: 'Rp 447.000', status: 'Completed', date: '12 Jul 2026 16:30' },
    { id: 'TRX-20260712-005', customer: 'Cecil Wijaya', channel: 'TikTok Shop', items: 'Scarf Batik Eksklusif (2x)', amount: 'Rp 258.000', status: 'Processing', date: '12 Jul 2026 10:15' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Database">Database Transaksi Penjualan Momen</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🗄️" label="Total Record Transaksi" value="236 Transaksi" sub="Juli 2026" acc="#C9A84C" />
        <MetricCard icon="💳" label="Rata-rata Nilai Order" value="Rp 855.248" acc="#22C55E" />
        <MetricCard icon="🚚" label="Order Dalam Pengiriman" value="18 Order" badge="Processing" acc="#3B82F6" />
        <MetricCard icon="✅" label="Order Selesai" value="218 Order" badge="92.3%" acc="#22C55E" />
      </div>

      <div className="card mb18">
        <div className="card-title">Rekap Database Transaksi Terbaru</div>
        <table className="data-table">
          <thead>
            <tr><th>No Order</th><th>Pelanggan</th><th>Channel</th><th>Produk Dipesan</th><th>Total Nominal</th><th>Status</th><th>Tanggal & Waktu</th></tr>
          </thead>
          <tbody>
            {transactions.map(t => (
              <tr key={t.id}>
                <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{t.id}</td>
                <td style={{ fontWeight: 700 }}>{t.customer}</td>
                <td><span className="badge badge-neutral">{t.channel}</span></td>
                <td>{t.items}</td>
                <td style={{ fontWeight: 700, color: 'var(--green)' }}>{t.amount}</td>
                <td>
                  <span className={`badge ${t.status === 'Completed' ? 'badge-green' : t.status === 'Shipped' ? 'badge-gold' : 'badge-neutral'}`}>
                    {t.status}
                  </span>
                </td>
                <td style={{ fontSize: 10, color: 'var(--text-muted)' }}>{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
