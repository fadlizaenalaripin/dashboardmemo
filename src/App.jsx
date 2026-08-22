import { useState, useEffect, useMemo } from 'react';

import { NAV, INFO } from './data/mockData.js';
import { Sidebar } from './components/layout/Sidebar.jsx';
import { Modal, Calendar, triggerConfetti } from './components/common/UIComponents.jsx';

import { OverviewPage } from './pages/OverviewPage.jsx';
import { InsightPage } from './pages/InsightPage.jsx';
import { SalesDashboardPage } from './pages/SalesDashboardPage.jsx';
import { TargetAchievementPage } from './pages/TargetAchievementPage.jsx';
import { FunnelLeadsPage } from './pages/FunnelLeadsPage.jsx';
import { ProductSalesPage } from './pages/ProductSalesPage.jsx';
import { SalesDatabasePage } from './pages/SalesDatabasePage.jsx';
import { MarketingDashboardPage } from './pages/MarketingDashboardPage.jsx';
import { SocialMediaHub } from './pages/SocialMediaHub.jsx';
import { CampaignContentHub } from './pages/CampaignContentHub.jsx';
import { AdsPage } from './pages/AdsPage.jsx';
import { BudgetRoiPage } from './pages/BudgetRoiPage.jsx';
import { ProductPage } from './pages/ProductPage.jsx';
import { ProductReadinessPage } from './pages/ProductReadinessPage.jsx';
import { QualityExecutionPage } from './pages/QualityExecutionPage.jsx';
import { StockAvailabilityPage } from './pages/StockAvailabilityPage.jsx';
import { JourneyPage } from './pages/JourneyPage.jsx';
import { RatingReviewPage } from './pages/RatingReviewPage.jsx';
import { ComplaintManagementPage } from './pages/ComplaintManagementPage.jsx';
import { RetentionRepeatPage } from './pages/RetentionRepeatPage.jsx';
import { VoiceCustomerPage } from './pages/VoiceCustomerPage.jsx';
import { ReportPage } from './pages/ReportPage.jsx';
import { DataManagementPage } from './pages/DataManagementPage.jsx';
import { PlaceholderPage } from './pages/PlaceholderPage.jsx';

export default function App() {
  const [page, setPage] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const info = INFO[page] || INFO.overview;

  const [globalPeriod, setGlobalPeriod] = useState('30d');
  const [globalRange, setGlobalRange] = useState({ start: '2026-06-15', end: '2026-07-15' });
  const [dateModal, setDateModal] = useState(false);

  const [tempPeriod, setTempPeriod] = useState('30d');
  const [tempRange, setTempRange] = useState({ start: '2026-06-15', end: '2026-07-15' });

  const [baseMonth, setBaseMonth] = useState(5);
  const [baseYear, setBaseYear] = useState(2026);

  // Live real-time clock state
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const d = new Date();
      const hh = String(d.getHours()).padStart(2, '0');
      const mm = String(d.getMinutes()).padStart(2, '0');
      const ss = String(d.getSeconds()).padStart(2, '0');
      setTimeStr(`${hh}:${mm}:${ss} WIB`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loading = document.getElementById('loading');
    if (loading) {
      loading.style.opacity = '0';
      loading.style.transition = 'opacity 0.4s';
      setTimeout(() => loading.remove(), 400);
    }
  }, []);

  const formatDateLong = (str) => {
    if (!str) return '';
    const d = new Date(str);
    if (isNaN(d.getTime())) return str;
    const day = String(d.getDate()).padStart(2, '0');
    const months = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
    const month = months[d.getMonth()];
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const datePillText = useMemo(() => {
    if (globalPeriod === '7d') return '📅 7 Hari Terakhir';
    if (globalPeriod === '30d') return '📅 30 Hari Terakhir';
    if (globalPeriod === '90d') return '📅 90 Hari Terakhir';
    
    if (globalRange.start && globalRange.end) {
      return `📅 ${formatDateLong(globalRange.start)} - ${formatDateLong(globalRange.end)}`;
    }
    return '📅 Pilih Periode';
  }, [globalPeriod, globalRange]);

  const resolvedPeriod = useMemo(() => {
    if (globalPeriod === '7d' || globalPeriod === '30d' || globalPeriod === '90d') {
      return globalPeriod;
    }
    
    if (!globalRange.start || !globalRange.end) return '30d';
    
    const start = new Date(globalRange.start);
    const end = new Date(globalRange.end);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 7) return '7d';
    if (diffDays <= 30) return '30d';
    return '90d';
  }, [globalPeriod, globalRange]);

  const handleDayClick = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    if (!tempRange.start || (tempRange.start && tempRange.end)) {
      setTempRange({ start: dateStr, end: '' });
      setTempPeriod('custom');
    } else {
      if (dateStr < tempRange.start) {
        setTempRange({ start: dateStr, end: '' });
      } else {
        setTempRange(p => ({ ...p, end: dateStr }));
      }
      setTempPeriod('custom');
    }
  };

  const selectPreset = (presetId) => {
    setTempPeriod(presetId);
    const today = new Date();
    let start = new Date();
    let end = new Date();

    switch(presetId) {
      case 'today':
        break;
      case 'yesterday':
        start.setDate(today.getDate() - 1);
        end.setDate(today.getDate() - 1);
        break;
      case '7d':
        start.setDate(today.getDate() - 7);
        break;
      case '30d':
        start.setDate(today.getDate() - 30);
        break;
      case 'this_month':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      case 'last_month':
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
        break;
      default:
        break;
    }
    
    setTempRange({
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    });
  };

  const nextMonth = () => {
    if (baseMonth === 11) {
      setBaseMonth(0);
      setBaseYear(p => p + 1);
    } else {
      setBaseMonth(p => p + 1);
    }
  };

  const prevMonth = () => {
    if (baseMonth === 0) {
      setBaseMonth(11);
      setBaseYear(p => p - 1);
    } else {
      setBaseMonth(p => p - 1);
    }
  };

  const bottomMonth = baseMonth === 11 ? 0 : baseMonth + 1;
  const bottomYear = baseMonth === 11 ? baseYear + 1 : baseYear;

  function renderPage(){
    switch(page){
      case 'overview':              return <OverviewPage period={resolvedPeriod} range={globalRange}/>;
      case 'insight':               return <InsightPage period={resolvedPeriod} range={globalRange}/>;
      
      case 'sales_dashboard':       return <SalesDashboardPage period={resolvedPeriod} range={globalRange}/>;
      case 'target_achievement':    return <TargetAchievementPage period={resolvedPeriod} range={globalRange}/>;
      case 'funnel_leads':          return <FunnelLeadsPage period={resolvedPeriod} range={globalRange}/>;
      case 'product_sales':         return <ProductSalesPage period={resolvedPeriod} range={globalRange}/>;
      case 'sales_database':        return <SalesDatabasePage period={resolvedPeriod} range={globalRange}/>;
      
      case 'marketing_dashboard':   return <MarketingDashboardPage period={resolvedPeriod} range={globalRange}/>;
      case 'social_media':          return <SocialMediaHub period={resolvedPeriod} range={globalRange}/>;
      case 'campaign_content':      return <CampaignContentHub period={resolvedPeriod} range={globalRange}/>;
      case 'ads_performance':       return <AdsPage period={resolvedPeriod} range={globalRange}/>;
      case 'budget_roi':            return <BudgetRoiPage period={resolvedPeriod} range={globalRange}/>;
      
      case 'product_dashboard':     return <ProductPage period={resolvedPeriod} range={globalRange}/>;
      case 'product_readiness':     return <ProductReadinessPage period={resolvedPeriod} range={globalRange}/>;
      case 'quality_execution':     return <QualityExecutionPage period={resolvedPeriod} range={globalRange}/>;
      case 'stock_availability':    return <StockAvailabilityPage period={resolvedPeriod} range={globalRange}/>;
      
      case 'customer_journey':       return <JourneyPage period={resolvedPeriod} range={globalRange}/>;
      case 'rating_review':         return <RatingReviewPage period={resolvedPeriod} range={globalRange}/>;
      case 'complaint_management':  return <ComplaintManagementPage period={resolvedPeriod} range={globalRange}/>;
      case 'retention_repeat':      return <RetentionRepeatPage period={resolvedPeriod} range={globalRange}/>;
      case 'voice_customer':        return <VoiceCustomerPage period={resolvedPeriod} range={globalRange}/>;
      
      case 'report_export':         return <ReportPage period={resolvedPeriod} range={globalRange}/>;
      case 'data_management':       return <DataManagementPage period={resolvedPeriod} range={globalRange}/>;
      default: {
        const item = NAV.find(n => n.id === page);
        return <PlaceholderPage name={item ? item.label : page} />;
      }
    }
  }

  return(
    <div className="app">
      <Sidebar active={page} onNav={setPage} mobileOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="main">
        <header className="topbar">
          <div style={{display:'flex', alignItems:'center', gap:12}}>
            <button 
              className="mobile-toggle"
              style={{
                background:'none',
                border:'none',
                fontSize:22,
                cursor:'pointer',
                color:'var(--text-white)',
                display:'none',
                outline:'none'
              }}
              onClick={() => setMobileMenuOpen(true)}
            >
              ☰
            </button>
            <div>
              <div className="page-title">{info.title}</div>
              <div className="page-sub">{info.sub}</div>
            </div>
          </div>
          <div className="topbar-right">
            <button 
              className="celebrate-btn"
              onClick={triggerConfetti}
            >
              🎉 Selebrasi!
            </button>

            {timeStr && (
              <div className="clock-pill">
                ⏰ {timeStr}
              </div>
            )}

            <button 
              className="date-pill-btn" 
              onClick={() => {
                setTempPeriod(globalPeriod);
                setTempRange(globalRange);
                setDateModal(true);
              }}
            >
              {datePillText}
            </button>

            <div className="live-pill">
              <span className="live-pulse"></span>
              LIVE DATA
            </div>
          </div>
        </header>
        {renderPage()}
      </div>

      <Modal open={dateModal} onClose={()=>setDateModal(false)} title="📅 Date Range Picker">
        <div style={{display:'flex', flexDirection:'column'}}>
          <div style={{display:'flex', gap:8, marginBottom:16}}>
            <div style={{display:'flex', flex:1, border:'1px solid var(--border-gold)', borderRadius:10, overflow:'hidden', background:'rgba(30, 41, 59, 0.6)'}}>
              <input
                type="text"
                disabled
                style={{flex:1, border:'none', padding:'10px 14px', fontSize: 13, fontWeight:700, background:'transparent', color:'var(--text-white)'}}
                value={tempRange.start && tempRange.end ? `${formatDateLong(tempRange.start)} - ${formatDateLong(tempRange.end)}` : 'Pilih rentang tanggal...'}
              />
              <div style={{background:'var(--gold-pale2)', display:'flex', alignItems:'center', justifyContent:'center', width:44, color:'var(--gold)', fontWeight:800}}>
                🔍
              </div>
            </div>
          </div>

          <div style={{display:'flex', gap:18, minHeight: '340px'}}>
            <div style={{display:'flex', flexDirection:'column', width:'140px', borderRight:'1px solid var(--border)', paddingRight:12, gap:6, flexShrink:0}}>
              {[
                { id: 'today', label: 'Today' },
                { id: 'yesterday', label: 'Yesterday' },
                { id: '7d', label: 'Last 7 Days' },
                { id: '30d', label: 'Last 30 Days' },
                { id: 'this_month', label: 'This Month' },
                { id: 'last_month', label: 'Last Month' },
                { id: 'custom', label: 'Custom Range' }
              ].map(o => (
                <button
                  key={o.id}
                  style={{
                    textAlign:'left',
                    padding:'8px 12px',
                    background:tempPeriod===o.id?'var(--gold-pale2)':'transparent',
                    color:tempPeriod===o.id?'var(--gold)':'var(--text-muted)',
                    border:tempPeriod===o.id?'1px solid var(--gold)':'1px solid transparent',
                    borderRadius:8,
                    fontWeight:700,
                    fontSize:12,
                    cursor:'pointer',
                    transition:'all 0.15s'
                  }}
                  onClick={() => selectPreset(o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>

            <div style={{flex:1, display:'flex', flexDirection:'column', gap:20, overflowY:'auto', maxHeight:'340px', paddingRight:6}}>
              <div style={{borderBottom:'1px solid var(--border)', paddingBottom:14}}>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontWeight:800, fontSize:12, marginBottom:10, textTransform:'uppercase', color:'var(--gold)'}}>
                  <span onClick={prevMonth} style={{cursor:'pointer', padding:'2px 8px', background:'rgba(30, 41, 59, 0.8)', borderRadius:4}}>❮</span>
                  <span>{new Date(baseYear, baseMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  <span style={{visibility:'hidden'}}>❯</span>
                </div>
                <Calendar
                  month={baseMonth}
                  year={baseYear}
                  selectedStart={tempRange.start}
                  selectedEnd={tempRange.end}
                  onDayClick={handleDayClick}
                />
              </div>

              <div>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', fontWeight:800, fontSize:12, marginBottom:10, textTransform:'uppercase', color:'var(--gold)'}}>
                  <span style={{visibility:'hidden'}}>❮</span>
                  <span>{new Date(bottomYear, bottomMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  <span onClick={nextMonth} style={{cursor:'pointer', padding:'2px 8px', background:'rgba(30, 41, 59, 0.8)', borderRadius:4}}>❯</span>
                </div>
                <Calendar
                  month={bottomMonth}
                  year={bottomYear}
                  selectedStart={tempRange.start}
                  selectedEnd={tempRange.end}
                  onDayClick={handleDayClick}
                />
              </div>
            </div>
          </div>

          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', borderTop:'1px solid var(--border)', paddingTop:14, marginTop:14}}>
            <div style={{fontSize:12.5, fontWeight:700, color:'var(--gold)'}}>
              {tempRange.start && tempRange.end ? `${formatDateLong(tempRange.start)} - ${formatDateLong(tempRange.end)}` : ''}
            </div>
            <div style={{display:'flex', gap:10}}>
              <button 
                onClick={() => setDateModal(false)} 
                style={{cursor:'pointer', border:'1px solid var(--border)', background:'transparent', color:'var(--text-muted)', padding:'8px 16px', borderRadius:8, fontSize:12, fontWeight:700}}
              >
                Batal
              </button>
              <button 
                style={{background:'var(--gold)', color:'#000', border:'none', padding:'8px 18px', borderRadius:8, fontSize:12, fontWeight:800, cursor:'pointer', boxShadow:'0 0 12px rgba(245, 158, 11, 0.3)'}}
                onClick={() => {
                  setGlobalPeriod(tempPeriod);
                  setGlobalRange(tempRange);
                  setDateModal(false);
                }}
              >
                Terapkan
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
