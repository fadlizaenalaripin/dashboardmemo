import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const filesOrder = [
  'src/data/mockData.js',
  'src/components/charts/Charts.jsx',
  'src/components/common/UIComponents.jsx',
  'src/components/layout/Icon.jsx',
  'src/components/layout/Sidebar.jsx',
  'src/pages/OverviewPage.jsx',
  'src/pages/InsightPage.jsx',
  'src/pages/IGPage.jsx',
  'src/pages/TTPage.jsx',
  'src/pages/ComparePage.jsx',
  'src/pages/ContentPage.jsx',
  'src/pages/CampaignPage.jsx',
  'src/pages/SocialMediaHub.jsx',
  'src/pages/CampaignContentHub.jsx',
  'src/pages/SalesDashboardPage.jsx',
  'src/pages/TargetAchievementPage.jsx',
  'src/pages/FunnelLeadsPage.jsx',
  'src/pages/ProductSalesPage.jsx',
  'src/pages/SalesDatabasePage.jsx',
  'src/pages/MarketingDashboardPage.jsx',
  'src/pages/BudgetRoiPage.jsx',
  'src/pages/ProductPage.jsx',
  'src/pages/ProductReadinessPage.jsx',
  'src/pages/QualityExecutionPage.jsx',
  'src/pages/StockAvailabilityPage.jsx',
  'src/pages/JourneyPage.jsx',
  'src/pages/RatingReviewPage.jsx',
  'src/pages/ComplaintManagementPage.jsx',
  'src/pages/RetentionRepeatPage.jsx',
  'src/pages/VoiceCustomerPage.jsx',
  'src/pages/ReportPage.jsx',
  'src/pages/DataManagementPage.jsx',
  'src/pages/AdsPage.jsx',
  'src/pages/PlaceholderPage.jsx',
  'src/App.jsx',
  'src/main.jsx'
];

let codeParts = [
  'const { useState, useEffect, useRef, useMemo } = React;'
];

for (const relPath of filesOrder) {
  const fullPath = path.join(rootDir, relPath);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Strip import statements
    content = content.replace(/^import\s+[\s\S]*?;/gm, '');

    // Strip React hook destructuring declarations
    content = content.replace(/^const\s*\{[\s\S]*?\}\s*=\s*React\s*;/gm, '');
    
    // Convert exports
    content = content.replace(/export\s+default\s+function\s+/g, 'function ');
    content = content.replace(/export\s+function\s+/g, 'function ');
    content = content.replace(/export\s+const\s+/g, 'const ');
    content = content.replace(/export\s+let\s+/g, 'let ');
    content = content.replace(/export\s+var\s+/g, 'var ');
    
    codeParts.push(`// --- Module: ${relPath} ---\n` + content);
  } else {
    console.warn(`⚠️  File not found: ${relPath}`);
  }
}

const bundleContent = codeParts.join('\n\n');
const outPath = path.join(rootDir, 'bundle.jsx');
fs.writeFileSync(outPath, bundleContent, 'utf8');

console.log(`✅ Bundle generated: bundle.jsx (${(bundleContent.length / 1024).toFixed(1)} KB)`);
console.log(`   Included ${filesOrder.length} modules`);
