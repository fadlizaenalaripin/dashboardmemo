import { MetricCard, SectionLabel } from '../components/common/UIComponents.jsx';

export function StockAvailabilityPage() {
  const warehouses = [
    { location: 'Gudang Utama Cirebon', stock: '3.200 Pcs', capacity: '5.000 Pcs', status: 'Healthy' },
    { location: 'Store & Hub Jakarta', stock: '1.150 Pcs', capacity: '2.000 Pcs', status: 'Healthy' },
    { location: 'Fulfillment Shopee & Tokopedia', stock: '500 Pcs', capacity: '1.000 Pcs', status: 'Reorder Needed' }
  ];

  return (
    <div className="page-body">
      <SectionLabel badge="Stock">Ketersediaan Stok & Alokasi Warehouse</SectionLabel>

      <div className="g4 mb18">
        <MetricCard icon="🏬" label="Total Units Stok" value="4.850 Pcs" sub="3 Lokasi Gudang" acc="#C9A84C" />
        <MetricCard icon="🔄" label="Stock Turnover Rate" value="4.2x / thn" sub="Sirkulasi Cepat" acc="#22C55E" />
        <MetricCard icon="⚠️" label="Stok Reorder Point" value="8 SKU" badge="Perlu Restock" acc="#E05555" />
        <MetricCard icon="🔒" label="Reserved Stock Order" value="180 Pcs" sub="Pending Dispatch" acc="#3B82F6" />
      </div>

      <div className="card mb18">
        <div className="card-title">🏬 Kapasitas & Status Stok Per Gudang</div>
        <table className="data-table">
          <thead>
            <tr><th>Lokasi Gudang</th><th>Stok Saat Ini</th><th>Kapasitas Maksimal</th><th>Status Gudang</th></tr>
          </thead>
          <tbody>
            {warehouses.map((w, i) => (
              <tr key={i}>
                <td style={{ fontWeight: 700 }}>{w.location}</td>
                <td style={{ fontWeight: 700, color: 'var(--green)' }}>{w.stock}</td>
                <td>{w.capacity}</td>
                <td>
                  <span className={`badge ${w.status === 'Healthy' ? 'badge-green' : 'badge-gold'}`}>
                    {w.status}
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
