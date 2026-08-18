import { useEffect, useRef } from 'react';

export function LineChart({ labels, data, label = 'Data', color = '#C9A84C', height = 220, filled = true }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    const ctx = canvasRef.current.getContext('2d');
    let bgGradient = 'rgba(201,168,76,0.1)';

    if (filled) {
      bgGradient = ctx.createLinearGradient(0, 0, 0, height);
      bgGradient.addColorStop(0, color.startsWith('#') ? color + '44' : 'rgba(201,168,76,0.3)');
      bgGradient.addColorStop(1, 'rgba(0,0,0,0)');
    }

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label,
          data,
          borderColor: color,
          backgroundColor: bgGradient,
          fill: filled,
          tension: 0.35,
          borderWidth: 2,
          pointRadius: 3,
          pointBackgroundColor: color,
          pointHoverRadius: 6,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#222',
            titleColor: '#C9A84C',
            bodyColor: '#E0D8C8',
            borderColor: '#333',
            borderWidth: 1,
            padding: 10,
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } }
          }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [labels, data, color, filled, height]);

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export function MultiLineChart({ labels, datasets, height = 220 }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'line',
      data: {
        labels,
        datasets: datasets.map(d => ({
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 6,
          ...d
        }))
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: { color: '#8a8070', font: { family: 'Outfit', size: 11 }, boxWidth: 12, usePointStyle: true }
          },
          tooltip: {
            backgroundColor: '#222',
            titleColor: '#C9A84C',
            bodyColor: '#E0D8C8',
            borderColor: '#333',
            borderWidth: 1,
          }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } } }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [labels, datasets, height]);

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export function BarChart({ labels, data, label = 'Data', color = '#C9A84C', height = 200 }) {
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
          backgroundColor: color,
          borderRadius: 6,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#222',
            titleColor: '#C9A84C',
            bodyColor: '#E0D8C8',
            borderColor: '#333',
            borderWidth: 1,
          }
        },
        scales: {
          x: { grid: { display: false }, ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#8a8070', font: { family: 'Outfit', size: 10 } } }
        }
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [labels, data, color, height]);

  return (
    <div style={{ position: 'relative', height, width: '100%' }}>
      <canvas ref={canvasRef} />
    </div>
  );
}

export function DonutChart({ labels, data, colors, centerText, segments, cVal, cLabel, size }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  const displayLabels = labels || (segments ? segments.map(s => s.label) : []);
  const displayData = data || (segments ? segments.map(s => s.value) : []);
  const displayColors = colors || (segments ? segments.map(s => s.color) : ['#C9A84C', '#E8C878', '#A07830']);
  const displayText = centerText || cVal || '';

  useEffect(() => {
    if (!canvasRef.current) return;
    if (chartRef.current) chartRef.current.destroy();

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data: {
        labels: displayLabels,
        datasets: [{
          data: displayData,
          backgroundColor: displayColors,
          borderWidth: 2,
          borderColor: '#1a1a1a',
          hoverOffset: 4,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (ctx) => ` ${ctx.label}: ${ctx.parsed}%` },
            backgroundColor: '#222',
            titleColor: '#C9A84C',
            bodyColor: '#E0D8C8',
            borderColor: '#333',
            borderWidth: 1,
          }
        },
        animation: { animateRotate: true, duration: 900 },
      }
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [displayLabels, displayData, displayColors]);

  const wrapperSize = size || 90;

  return (
    <div style={{ position: 'relative', width: wrapperSize, height: wrapperSize, margin: '0 auto' }}>
      <canvas ref={canvasRef} />
      {displayText && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none'
        }}>
          <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--text-white)', lineHeight: 1.2 }}>{displayText}</div>
          {cLabel && <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>{cLabel}</div>}
        </div>
      )}
    </div>
  );
}
