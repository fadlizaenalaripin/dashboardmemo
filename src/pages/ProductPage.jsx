import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';

export function ProductPage() {
  const products = [
    { code: 'SKU-001', name: 'Kemeja Batik Momen Classic', category: 'Men', stock: 142, status: 'Ready' },
    { code: 'SKU-002', name: 'Outer Batik Momen Premium', category: 'Women', stock: 86, status: 'Ready' },
    { code: 'SKU-003', name: 'Tunik Batik Wanita Momen', category: 'Women', stock: 18, status: 'Low Stock' },
    { code: 'SKU-004', name: 'Hem Batik Lengan Pendek', category: 'Men', stock: 210, status: 'Ready' },
    { code: 'SKU-005', name: 'Scarf Batik Eksklusif', category: 'Accessories', stock: 5, status: 'Critical' },
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Product">Stok & Performa Produk Momen</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="📦" label="Total Active SKU" value="128 SKU" sub="Aktif di Katalog" acc="#C9A84C" />
        <MetricCard icon="🏬" label="Total Stock Units" value="4.850 Pcs" sub="Gudang Utama & Store" acc="#3B82F6" />
        <MetricCard icon="⚠️" label="Stok Menipis" value="8 SKU" badge="Perlu Restock" acc="#E05555" />
        <MetricCard icon="⭐" label="Rata-rata Rating" value="4.92 / 5.0" sub="Dari 1.2k Ulasan" acc="#22C55E" />
      </div>

      <div className="card mb18">
        <div className="card-title">📦 Inventaris & Ketersediaan Produk</div>
        <table className="data-table">
          <thead>
            <tr><th>SKU</th><th>Nama Produk</th><th>Kategori</th><th>Stok Tersedia</th><th>Status</th></tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.code}>
                <td style={{ fontWeight: 700, color: 'var(--gold)' }}>{p.code}</td>
                <td style={{ fontWeight: 700 }}>{p.name}</td>
                <td>{p.category}</td>
                <td>{p.stock} pcs</td>
                <td>
                  <span className={`badge ${p.status === 'Ready' ? 'badge-green' : p.status === 'Low Stock' ? 'badge-gold' : 'badge-red'}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
