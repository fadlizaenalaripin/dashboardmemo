import { useState } from 'react';
import { ContentPage } from './ContentPage.jsx';
import { CampaignPage } from './CampaignPage.jsx';

export function CampaignContentHub({ period, range }) {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="card card-sm" style={{ padding: '8px 12px', margin: '16px 20px 0 20px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveTab('content')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'content' ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: activeTab === 'content' ? 'var(--gold-dark)' : 'var(--text-muted)',
              transition: 'all 0.15s'
            }}
          >
            📝 Rencana Konten
          </button>
          <button 
            onClick={() => setActiveTab('campaign')}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '12.5px',
              fontWeight: 700,
              cursor: 'pointer',
              background: activeTab === 'campaign' ? 'rgba(201,168,76,0.15)' : 'transparent',
              color: activeTab === 'campaign' ? 'var(--gold-dark)' : 'var(--text-muted)',
              transition: 'all 0.15s'
            }}
          >
            🎯 Campaign Marketing
          </button>
        </div>
      </div>

      {activeTab === 'content' && <ContentPage period={period} range={range} />}
      {activeTab === 'campaign' && <CampaignPage period={period} range={range} />}
    </div>
  );
}
