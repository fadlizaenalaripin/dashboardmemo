import { useState } from 'react';

export function triggerConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = [];
  const numberOfPieces = 120;
  const colors = ['#f43f5e', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#3b82f6', '#ffd700'];

  for (let i = 0; i < numberOfPieces; i++) {
    pieces.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 350,
      y: canvas.height / 3 + (Math.random() - 0.5) * 100,
      size: Math.random() * 9 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vx: (Math.random() - 0.5) * 14,
      vy: Math.random() * -14 - 4,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 12,
      opacity: 1
    });
  }

  let startTime = Date.now();

  function render() {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    pieces.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.45; // gravity
      p.rotation += p.rotationSpeed;
      if (elapsed > 1200) p.opacity -= 0.025;

      ctx.save();
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (elapsed < 2400 && pieces.some(p => p.opacity > 0)) {
      requestAnimationFrame(render);
    } else {
      canvas.remove();
    }
  }

  render();
}

export function PTag({ platform }) {
  if (platform === 'instagram' || platform === 'ig') return <span className="ptag ptag-ig">📸 Instagram</span>;
  if (platform === 'tiktok' || platform === 'tt') return <span className="ptag ptag-tt">🎵 TikTok</span>;
  return <span className="ptag badge-neutral">{platform}</span>;
}

export function MetricCard({ icon, label, value, sub, trend, trendLabel, acc = '#F59E0B', badge }) {
  return (
    <div className="metric-card">
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${acc} 0%, transparent 100%)`, opacity: 0.8 }} />
      <div className="mc-header">
        <span className="mc-label">{label}</span>
        <span className="mc-icon">{icon}</span>
      </div>
      <div className="mc-value">{value}</div>
      {(trend !== undefined || sub || badge) && (
        <div className="mc-sub" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            {trend !== undefined && (
              <span className={`badge ${trend >= 0 ? 'badge-green' : 'badge-red'}`}>
                {trend >= 0 ? `▲ +${trend}%` : `▼ ${trend}%`}
              </span>
            )}
            {sub && !trendLabel && <span style={{ color: 'var(--text-muted)' }}>{sub}</span>}
            {trendLabel && <span style={{ color: 'var(--text-muted)' }}>{trendLabel}</span>}
          </div>
          {badge && (
            <span 
              className="badge badge-gold" 
              style={acc ? { background: acc + '22', color: acc, border: `1px solid ${acc}44`, marginLeft: 'auto' } : { marginLeft: 'auto' }}
            >
              {badge}
            </span>
          )}
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

export function ProgRow({ label, value, pct, color = 'var(--gold)', icon }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 11.5, marginBottom: 5 }}>
        <span style={{ color: 'var(--text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 7 }}>
          {icon}
          {label}
        </span>
        <span style={{ color: 'var(--text-light)', fontWeight: 700 }}>{value} ({pct}%)</span>
      </div>
      <div style={{ height: 7, background: 'rgba(30, 41, 59, 0.8)', borderRadius: 4, overflow: 'hidden', border: '1px solid var(--border)' }}>
        <div style={{ height: '100%', width: `${Math.min(pct, 100)}%`, background: color, borderRadius: 4, transition: 'width 0.4s ease' }} />
      </div>
    </div>
  );
}

export function AccountCard({ name, handle, avatar, followers, growth, engagement, platform, onSelect }) {
  return (
    <div className="card card-sm" style={{ cursor: 'pointer', transition: 'all 0.2s ease' }} onClick={onSelect}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--gold-pale2)', border: '1px solid var(--border-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: 'var(--gold)' }}>
            {avatar || name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text-white)' }}>{name}</div>
            <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{handle}</div>
          </div>
        </div>
        <PTag platform={platform} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, background: 'rgba(30, 41, 59, 0.5)', border: '1px solid var(--border)', padding: 10, borderRadius: 8, textAlign: 'center' }}>
        <div>
          <div style={{ fontSize: 9.5, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Followers</div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--text-white)', marginTop: 2 }}>{followers}</div>
        </div>
        <div>
          <div style={{ fontSize: 9.5, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 0.5 }}>Growth</div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: growth >= 0 ? 'var(--green)' : 'var(--red)', marginTop: 2 }}>{growth >= 0 ? `+${growth}%` : `${growth}%`}</div>
        </div>
        <div>
          <div style={{ fontSize: 9.5, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 0.5 }}>ER</div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: 'var(--gold)', marginTop: 2 }}>{engagement}</div>
        </div>
      </div>
    </div>
  );
}

export function TopPostRow({ rank, title, likes, comments, shares, views, platform, date }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 800, color: 'var(--gold)', width: 20 }}>#{rank}</span>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-white)' }}>{title}</div>
          <div style={{ fontSize: 10, color: 'var(--text-muted)', display: 'flex', gap: 8, marginTop: 3 }}>
            <span>{date}</span>
            <PTag platform={platform} />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--text-light)', fontWeight: 600 }}>
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
            bg = 'var(--gold)';
            color = '#000';
            borderRadius = isStart ? '8px 0 0 8px' : '0 8px 8px 0';
            if (isStart && !endStr) borderRadius = '8px';
            if (isStart && isEnd) borderRadius = '8px';
          } else if (inRange) {
            bg = 'var(--gold-pale2)';
            color = 'var(--gold)';
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
