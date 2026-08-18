import { useState } from 'react';
import { IGPage } from './IGPage.jsx';
import { TTPage } from './TTPage.jsx';
import { ComparePage } from './ComparePage.jsx';

export function SocialMediaHub({ period, range }) {
  const [activeTab, setActiveTab] = useState('instagram');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="card card-sm" style={{ padding: '8px 12px', margin: '16px 20px 0 20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('instagram')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'instagram' ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: activeTab === 'instagram' ? 'var(--gold-dark)' : 'var(--text-muted)',
              transition: 'all 0.15s'
            }}
          >
            📸 Instagram Analytics
          </button>
          <button 
            onClick={() => setActiveTab('tiktok')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'tiktok' ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: activeTab === 'tiktok' ? 'var(--gold-dark)' : 'var(--text-muted)',
              transition: 'all 0.15s'
            }}
          >
            🎵 TikTok Analytics
          </button>
          <button 
            onClick={() => setActiveTab('compare')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'compare' ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: activeTab === 'compare' ? 'var(--gold-dark)' : 'var(--text-muted)',
              transition: 'all 0.15s'
            }}
          >
            ⚖️ Perbandingan Platform
          </button>
        </div>
      </div>

      {activeTab === 'instagram' && <IGPage period={period} range={range} />}
      {activeTab === 'tiktok' && <TTPage period={period} range={range} />}
      {activeTab === 'compare' && <ComparePage period={period} range={range} />}
    </div>
  );
}
