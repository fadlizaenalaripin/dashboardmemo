/* ═══════════════════════════════════════════════════════════════
   MOMEN Marketing Monitor — Shared Components
   File: js/components.js
   Defines: window.Components
═══════════════════════════════════════════════════════════════ */

window.Components = (function () {
  const { useState, useEffect, useRef, useCallback } = React;
  const D = window.AppData;

  /* ─────────────────────────────────────────
     METRIC CARD
  ───────────────────────────────────────── */
  function MetricCard({ icon, label, value, trend, trendLabel, accentColor, format }) {
    const isUp = trend > 0;
    const isNeutral = trend === 0;
    const fmt = format || D.formatNumber;

    return (
      <div className="metric-card" style={{ '--accent-color': accentColor || 'var(--gold)' }}>
        <div className="metric-icon" style={{
          background: accentColor ? accentColor + '18' : 'var(--gold-pale)',
          color: accentColor || 'var(--gold-dark)'
        }}>
          {icon}
        </div>
        <div className="metric-label">{label}</div>
        <div className="metric-value">{typeof value === 'number' ? fmt(value) : value}</div>
        {trend !== undefined && (
          <div className={`metric-trend ${isNeutral ? 'trend-neutral' : isUp ? 'trend-up' : 'trend-down'}`}>
            <span>{isNeutral ? '→' : isUp ? '↑' : '↓'}</span>
            <span>{Math.abs(trend).toFixed(1)}%</span>
            {trendLabel && <span className="trend-vs">{trendLabel}</span>}
          </div>
        )}
      </div>
    );
  }

  /* ─────────────────────────────────────────
     SECTION LABEL
  ───────────────────────────────────────── */
  function SectionLabel({ children, badge }) {
    return (
      <div className="section-label">
        <span className="section-label-text">{children}</span>
        <div className="section-label-line" />
        {badge && <span className="section-badge">{badge}</span>}
      </div>
    );
  }

  /* ─────────────────────────────────────────
     PLATFORM TAG
  ───────────────────────────────────────── */
  function PlatformTag({ platform }) {
    if (platform === 'instagram') {
      return <span className="platform-tag tag-ig">📷 Instagram</span>;
    }
    return <span className="platform-tag tag-tt">🎵 TikTok</span>;
  }

  /* ─────────────────────────────────────────
     TREND BADGE
  ───────────────────────────────────────── */
  function TrendBadge({ value }) {
    if (value > 0) return <span className="badge badge-green">↑ {value.toFixed(1)}%</span>;
    if (value < 0) return <span className="badge badge-red">↓ {Math.abs(value).toFixed(1)}%</span>;
    return <span className="badge badge-blue">→ Stabil</span>;
  }

  /* ─────────────────────────────────────────
     LINE CHART
  ───────────────────────────────────────── */
  function LineChart({ data, labels, color = '#C9A84C', height = 200, fill = true, label = 'Nilai' }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
      if (!canvasRef.current) return;
      if (chartRef.current) chartRef.current.destroy();

      chartRef.current = new Chart(canvasRef.current, {
        type: 'line',
        data: {
          labels,
          datasets: [{
            label,
            data,
            borderColor: color,
            borderWidth: 2.5,
            pointRadius: 4,
            pointBackgroundColor: color,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            tension: 0.4,
            fill: fill ? { target: 'origin', above: color + '18' } : false,
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1C1811',
              titleColor: '#E8C878',
              bodyColor: '#E0D8C8',
              borderColor: '#2A2318',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 8,
            }
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: { color: '#B8AC98', font: { size: 10, family: 'Plus Jakarta Sans' } }
            },
            y: {
              grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false },
              border: { display: false },
              ticks: {
                color: '#B8AC98',
                font: { size: 10, family: 'Plus Jakarta Sans' },
                callback: v => D.formatNumber(v)
              }
            }
          },
          interaction: { mode: 'index', intersect: false },
        }
      });
      return () => { if (chartRef.current) chartRef.current.destroy(); };
    }, [data, labels, color]);

    return (
      <div style={{ height, position: 'relative' }}>
        <canvas ref={canvasRef} />
      </div>
    );
  }

  /* ─────────────────────────────────────────
     MULTI-LINE CHART
  ───────────────────────────────────────── */
  function MultiLineChart({ datasets, labels, height = 220 }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
      if (!canvasRef.current) return;
      if (chartRef.current) chartRef.current.destroy();

      chartRef.current = new Chart(canvasRef.current, {
        type: 'line',
        data: { labels, datasets },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: '#4A4035',
                font: { size: 11, family: 'Plus Jakarta Sans', weight: '600' },
                usePointStyle: true,
                pointStyleWidth: 10,
                padding: 16,
              }
            },
            tooltip: {
              backgroundColor: '#1C1811',
              titleColor: '#E8C878',
              bodyColor: '#E0D8C8',
              borderColor: '#2A2318',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 8,
              callbacks: {
                label: ctx => ` ${ctx.dataset.label}: ${D.formatNumber(ctx.parsed.y)}`
              }
            }
          },
          scales: {
            x: {
              grid: { display: false },
              border: { display: false },
              ticks: { color: '#B8AC98', font: { size: 10 } }
            },
            y: {
              grid: { color: 'rgba(0,0,0,0.05)' },
              border: { display: false },
              ticks: { color: '#B8AC98', font: { size: 10 }, callback: v => D.formatNumber(v) }
            }
          },
          interaction: { mode: 'index', intersect: false },
        }
      });
      return () => { if (chartRef.current) chartRef.current.destroy(); };
    }, [datasets, labels]);

    return (
      <div style={{ height, position: 'relative' }}>
        <canvas ref={canvasRef} />
      </div>
    );
  }

  /* ─────────────────────────────────────────
     BAR CHART
  ───────────────────────────────────────── */
  function BarChart({ data, labels, colors, height = 200, label = 'Nilai', horizontal = false }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
      if (!canvasRef.current) return;
      if (chartRef.current) chartRef.current.destroy();

      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels,
          datasets: [{
            label,
            data,
            backgroundColor: colors || data.map((_, i) => {
              const palette = ['#C9A84C','#A07830','#8B6914','#6B4F10','#4a3a10','#E8C878'];
              return palette[i % palette.length];
            }),
            borderRadius: 6,
            borderSkipped: false,
          }]
        },
        options: {
          indexAxis: horizontal ? 'y' : 'x',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1C1811',
              titleColor: '#E8C878',
              bodyColor: '#E0D8C8',
              borderColor: '#2A2318',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 8,
              callbacks: { label: ctx => ` ${ctx.parsed[horizontal ? 'x' : 'y'].toLocaleString('id-ID')}` }
            }
          },
          scales: {
            x: {
              grid: { display: horizontal },
              border: { display: false },
              ticks: { color: '#B8AC98', font: { size: 10 } }
            },
            y: {
              grid: { color: 'rgba(0,0,0,0.04)', display: !horizontal },
              border: { display: false },
              ticks: { color: '#B8AC98', font: { size: 10 }, callback: v => D.formatNumber(v) }
            }
          }
        }
      });
      return () => { if (chartRef.current) chartRef.current.destroy(); };
    }, [data, labels, colors, horizontal]);

    return (
      <div style={{ height, position: 'relative' }}>
        <canvas ref={canvasRef} />
      </div>
    );
  }

  /* ─────────────────────────────────────────
     DONUT CHART
  ───────────────────────────────────────── */
  function DonutChart({ segments, centerVal, centerLabel, size = 140 }) {
    const canvasRef = useRef(null);
    const chartRef = useRef(null);

    useEffect(() => {
      if (!canvasRef.current) return;
      if (chartRef.current) chartRef.current.destroy();

      chartRef.current = new Chart(canvasRef.current, {
        type: 'doughnut',
        data: {
          labels: segments.map(s => s.label),
          datasets: [{
            data: segments.map(s => s.value),
            backgroundColor: segments.map(s => s.color),
            borderWidth: 2,
            borderColor: '#FFFFFF',
            hoverOffset: 5,
          }]
        },
        options: {
          cutout: '72%',
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: '#1C1811',
              titleColor: '#E8C878',
              bodyColor: '#E0D8C8',
              borderColor: '#2A2318',
              borderWidth: 1,
              padding: 10,
              cornerRadius: 8,
              callbacks: { label: ctx => ` ${ctx.label}: ${ctx.parsed}%` }
            }
          }
        }
      });
      return () => { if (chartRef.current) chartRef.current.destroy(); };
    }, [segments]);

    return (
      <div style={{ position: 'relative', width: size, height: size }}>
        <canvas ref={canvasRef} />
        {centerVal && (
          <div className="donut-center-label">
            <div className="donut-center-val">{centerVal}</div>
            {centerLabel && <div className="donut-center-sub">{centerLabel}</div>}
          </div>
        )}
      </div>
    );
  }

  /* ─────────────────────────────────────────
     ACCOUNT CARD
  ───────────────────────────────────────── */
  function AccountCard({ account, metrics, period, selected, onClick }) {
    const m = metrics ? metrics.current : null;
    const followers = D.formatNumber(account.followers);
    const growth = m ? D.formatNumber(m.followerGrowth) : '—';
    const er = m ? m.engagementRate.toFixed(1) + '%' : '—';

    const platformGrad = account.platform === 'instagram'
      ? 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)'
      : 'linear-gradient(135deg, #010101, #FE2C55)';

    return (
      <div className={`account-card ${selected ? 'selected' : ''}`} onClick={onClick}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 46,
              height: 46,
              borderRadius: '50%',
              background: platformGrad,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              flexShrink: 0,
            }}>
              {account.avatar}
            </div>
            <div>
              <div className="account-handle">{account.handle}</div>
              <div className="account-name">{account.name}</div>
            </div>
          </div>
          <PlatformTag platform={account.platform} />
        </div>

        <div className="account-stats-row">
          <div className="account-stat-item">
            <div className="account-stat-val">{followers}</div>
            <div className="account-stat-label">Followers</div>
          </div>
          <div className="account-stat-item">
            <div className="account-stat-val" style={{ color: 'var(--green)' }}>+{growth}</div>
            <div className="account-stat-label">Pertumbuhan</div>
          </div>
          <div className="account-stat-item">
            <div className="account-stat-val" style={{ color: 'var(--gold-dark)' }}>{er}</div>
            <div className="account-stat-label">Eng. Rate</div>
          </div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────
     TOP POST ROW
  ───────────────────────────────────────── */
  function TopPostRow({ post, platform, rank }) {
    const isTT = platform === 'tiktok';
    return (
      <div className="post-item">
        <div style={{
          width: 28, height: 28,
          background: 'var(--gold-pale)',
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 11, fontWeight: 700, color: 'var(--gold-dark)',
          flexShrink: 0,
        }}>
          #{rank}
        </div>
        <div className="post-thumb">{post.thumb}</div>
        <div className="post-info">
          <div className="post-caption">{post.caption}</div>
          <div className="post-meta">
            <span className="post-meta-item">❤️ {D.formatNumber(post.likes)}</span>
            <span className="post-meta-item">💬 {D.formatNumber(post.comments)}</span>
            {isTT
              ? <span className="post-meta-item">↗️ {D.formatNumber(post.shares)}</span>
              : <span className="post-meta-item">🔖 {D.formatNumber(post.saves)}</span>
            }
            {isTT && <span className="post-meta-item">▶️ {D.formatNumber(post.views)}</span>}
            <span className="badge badge-amber" style={{ fontSize: 9, padding: '1px 5px' }}>{post.type}</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', flexShrink: 0 }}>
          <div className="post-er" style={{ color: post.er >= 8 ? 'var(--green)' : post.er >= 5 ? 'var(--amber)' : 'var(--text-muted)' }}>
            {post.er}%
          </div>
          <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>ER</div>
          <div style={{ fontSize: 10, color: 'var(--text-dim)', marginTop: 2 }}>{post.date}</div>
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────
     PROGRESS ROW
  ───────────────────────────────────────── */
  function ProgressRow({ label, value, max, color }) {
    const pct = Math.round((value / max) * 100);
    return (
      <div style={{ marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 12, color: 'var(--text-body)', fontWeight: 500 }}>{label}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-dark)' }}>{pct}%</span>
        </div>
        <div className="progress-bar-bg">
          <div className="progress-bar-fill" style={{ width: pct + '%', background: color || 'var(--gold)' }} />
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────
     MODAL
  ───────────────────────────────────────── */
  function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;
    return (
      <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
        <div className="modal-box">
          <div className="modal-head">
            <div className="modal-title">{title}</div>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          {children}
        </div>
      </div>
    );
  }

  /* ─────────────────────────────────────────
     PERIOD SELECTOR
  ───────────────────────────────────────── */
  function PeriodSelector({ value, onChange }) {
    const opts = [
      { val: '7d', label: '7 Hari' },
      { val: '30d', label: '30 Hari' },
      { val: '90d', label: '90 Hari' },
    ];
    return (
      <div className="period-selector">
        {opts.map(o => (
          <button
            key={o.val}
            className={`period-btn ${value === o.val ? 'active' : ''}`}
            onClick={() => onChange(o.val)}
          >
            {o.label}
          </button>
        ))}
      </div>
    );
  }

  return {
    MetricCard,
    SectionLabel,
    PlatformTag,
    TrendBadge,
    LineChart,
    MultiLineChart,
    BarChart,
    DonutChart,
    AccountCard,
    TopPostRow,
    ProgressRow,
    Modal,
    PeriodSelector,
  };
})();
