import { SectionLabel } from '../components/common/UIComponents.jsx';

export function PlaceholderPage({ name }) {
  return (
    <div className="page-body">
      <SectionLabel>{name}</SectionLabel>
      <div className="card" style={{ padding: '40px', textAlign: 'center' }}>
        <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚧</div>
        <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--gold)', marginBottom: '6px' }}>
          Modul {name} Sedang Dalam Pengembangan
        </div>
        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
          Fitur ini akan segera tersedia pada pembaruan sistem berikutnya.
        </div>
      </div>
    </div>
  );
}
