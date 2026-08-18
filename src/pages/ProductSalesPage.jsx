import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';

export function ProductSalesPage() {
  const items = [
    { code: 'SKU-001', name: 'Kemeja Batik Momen Classic', category: 'Men', sold: 248, price: 'Rp 175.000', total: 'Rp 43.400.000', margin: '42%' },
    { code: 'SKU-002', name: 'Outer Batik Momen Premium', category: 'Women', sold: 186, price: 'Rp 189.000', total: 'Rp 35.154.000', margin: '45%' },
    { code: 'SKU-003', name: 'Tunik Batik Wanita Momen', category: 'Women', sold: 152, price: 'Rp 169.000', total: 'Rp 25.688.000', margin: '40%' },
    { code: 'SKU-004', name: 'Hem Batik Lengan Pendek', category: 'Men', sold: 134, price: 'Rp 149.000', total: 'Rp 19.966.000', margin: '38%' },
    { code: 'SKU-005', name: 'Scarf Batik Eksklusif', category: 'Accessories', sold: 98, price: 'Rp 129.000', total: 'Rp 12.642.000', margin: '50%' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Penjualan Produk">Rincian Penjualan Produk Momen Batik</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🛍️" label="Total SKU Terjual" value="1.248 Pcs" sub="Juli 2026" acc="#C9A84C" />
        <MetricCard icon="💰" label="Omset Penjualan Produk" value="Rp 201.838.726" acc="#22C55E" />
        <MetricCard icon="📊" label="Rata-rata Margin" value="43.0%" badge="Profitable" acc="#3B82F6" />
        <MetricCard icon="⭐" label="Kategori Terlaris" value="Momen Men" sub="62.1% dari total sales" acc="#833AB4" />
      </div>

      <div className="card mb18">
        <div className="card-title">📦 Tabel Performa Penjualan Per SKU Produk</div>
        <table className="data-table">
          <thead>
            <tr><th>SKU</th><th>Nama Produk</th><th>Kategori</th><th>Qty Terjual</th><th>Harga Satuan</th><th>Total Omset</th><th>Margin</th></tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.code}>
                <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{item.code}</td>
                <td style={{ fontWeight: 700 }}>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.sold} pcs</td>
                <td>{item.price}</td>
                <td style={{ fontWeight: 700, color: 'var(--green)' }}>{item.total}</td>
                <td><span className="badge badge-green">{item.margin}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
