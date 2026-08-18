import { useState } from 'react';

export function PTag({ platform }) {
  if (platform === 'instagram' || platform === 'ig') return <span className="ptag ptag-ig">📸 Instagram</span>;
  if (platform === 'tiktok' || platform === 'tt') return <span className="ptag ptag-tt">🎵 TikTok</span>;
  return <span className="ptag ptag-neutral">{platform}</span>;
}

export function MetricCard({ icon, label, value, sub, trend, trendLabel, acc = '#C9A84C', badge }) {
  return (
    <div className="metric-card">
      <div style={{ position: 'absolute', top: 0, left: 0, width: 3, height: '100%', background: acc }} />
      <div className="mc-header">
        <span className="mc-label">{label}</span>
        <span className="mc-icon">{icon}</span>
      </div>
      <div className="mc-value">{value}</div>
      {(trend !== undefined || sub || badge) && (
        <div className="mc-sub">
          {trend !== undefined && (
            <span className={`badge ${trend >= 0 ? 'badge-green' : 'badge-red'}`}>
              {trend >= 0 ? `▲ +${trend}%` : `▼ ${trend}%`}
            </span>
          )}
          {badge && <span className="badge badge-gold">{badge}</span>}
          {trendLabel && <span>{trendLabel}</span>}
          {sub && !trendLabel && <span>{sub}</span>}
        </div>
      )}
    </div>
  );
}

export function SectionLabel({ children, badge }) {
  return (
    <div className="sec-label">
      <span>{children}</span>
      {badge && <span className="badge badge-gold">{badge}</span>}
    </div>
  );
}

export function PeriodSel({ active, onChange, options = ['7d', '30d', '90d'] }) {
  const labels = { '7d': '7 Hari', '30d': '30 Hari', '90d': '90 Hari' };
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {options.map(o => (
        <button key={o} className={`period-btn${active === o ? ' active' : ''}`} onClick={() => onChange(o)}>
          {labels[o] || o}
        </button>
      ))}
    </div>
  );
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export function ProgRow({ label, value, pct, color = 'var(--gold)' }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 4 }}>
        <span style={{ color: 'var(--text-muted)', fontWeight: 600 }}>{label}</span>
        <span style={{ color: 'var(--text-light)', fontWeight: 700 }}>{value} ({pct}%)</span>
      </div>
      <div style={{ height: 6, background: 'var(--bg2)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: color, borderRadius: 3, transition: 'width 0.4s' }} />
      </div>
    </div>
  );
}

export function AccountCard({ name, handle, avatar, followers, growth, engagement, platform, onSelect }) {
  return (
    <div className="card card-sm" style={{ cursor: 'pointer', transition: 'all 0.15s' }} onClick={onSelect}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gold-pale2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--gold)' }}>
            {avatar || name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-white)' }}>{name}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{handle}</div>
          </div>
        </div>
        <PTag platform={platform} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, background: 'var(--bg2)', padding: 8, borderRadius: 8, textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 9, color: 'var(--text-dim)' }}>Followers</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-white)' }}>{followers}</div>
        </div>
        <div>
          <div style={{ fontSize: 9, color: 'var(--text-dim)' }}>Growth</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: growth >= 0 ? 'var(--green)' : 'var(--red)' }}>{growth >= 0 ? `+${growth}%` : `${growth}%`}</div>
        </div>
        <div>
          <div style={{ fontSize: 9, color: 'var(--text-dim)' }}>ER</div>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)' }}>{engagement}</div>
        </div>
      </div>
    </div>
  );
}

export function TopPostRow({ rank, title, likes, comments, shares, views, platform, date }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--gold)', width: 16 }}>#{rank}</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-white)' }}>{title}</div>
          <div style={{ fontSize: 9, color: 'var(--text-muted)', display: 'flex', gap: 8, marginTop: 2 }}>
            <span>{date}</span>
            <PTag platform={platform} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, fontSize: 10, color: 'var(--text-light)', fontWeight: 600 }}>
        {views && <span>👁️ {views}</span>}
        <span>❤️ {likes}</span>
        <span>💬 {comments}</span>
        {shares && <span>🔄 {shares}</span>}
      </div>
    </div>
  );
}

export function Calendar({ month, year, selectedStart, selectedEnd, onDayClick }) {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const prevMonthTotalDays = new Date(year, month, 0).getDate();
  
  const cells = [];
  
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({
      date: new Date(year, month - 1, prevMonthTotalDays - i),
      isCurrentMonth: false
    });
  }
  
  for (let i = 1; i <= totalDays; i++) {
    cells.push({
      date: new Date(year, month, i),
      isCurrentMonth: true
    });
  }
  
  const remaining = 42 - cells.length;
  for (let i = 1; i <= remaining; i++) {
    cells.push({
      date: new Date(year, month + 1, i),
      isCurrentMonth: false
    });
  }

  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const formatDateString = (d) => d.toISOString().split('T')[0];

  const startStr = selectedStart ? formatDateString(new Date(selectedStart)) : '';
  const endStr = selectedEnd ? formatDateString(new Date(selectedEnd)) : '';

  return (
    <div style={{ width: '260px', userSelect: 'none' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', fontWeight: 700, fontSize: 11, color: 'var(--text-dim)', marginBottom: 6 }}>
        {weekdays.map(w => <div key={w}>{w}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', fontSize: 11 }}>
        {cells.map((cell, idx) => {
          const cellStr = formatDateString(cell.date);
          const isStart = cellStr === startStr;
          const isEnd = cellStr === endStr;
          const inRange = startStr && endStr && cellStr > startStr && cellStr < endStr;
          
          let bg = 'transparent';
          let color = cell.isCurrentMonth ? 'var(--text-dark)' : 'var(--text-dim)';
          let borderRadius = '0';
          
          if (isStart || isEnd) {
            bg = '#3B82F6';
            color = 'white';
            borderRadius = isStart ? '8px 0 0 8px' : '0 8px 8px 0';
            if (isStart && !endStr) borderRadius = '8px';
            if (isStart && isEnd) borderRadius = '8px';
          } else if (inRange) {
            bg = '#DBEAFE';
            color = '#1E40AF';
          }

          return (
            <div
              key={idx}
              onClick={() => onDayClick(cell.date)}
              style={{
                padding: '6px 0',
                background: bg,
                color,
                borderRadius,
                fontWeight: cell.isCurrentMonth || isStart || isEnd ? 700 : 400,
                cursor: 'pointer',
                transition: 'all 0.1s'
              }}
            >
              {cell.date.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}
