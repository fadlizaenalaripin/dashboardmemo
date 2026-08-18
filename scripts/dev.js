import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const PORT = process.env.PORT || 5173;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

function generateBundle() {
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

      // Strip React hook destructuring declarations (e.g. const { useState } = React;)
      content = content.replace(/^const\s*\{[\s\S]*?\}\s*=\s*React\s*;/gm, '');
      
      // Convert exports
      content = content.replace(/export\s+default\s+function\s+/g, 'function ');
      content = content.replace(/export\s+function\s+/g, 'function ');
      content = content.replace(/export\s+const\s+/g, 'const ');
      content = content.replace(/export\s+let\s+/g, 'let ');
      content = content.replace(/export\s+var\s+/g, 'var ');
      
      codeParts.push(`// --- Module: ${relPath} ---\n` + content);
    }
  }

  return codeParts.join('\n\n');
}

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];

  if (reqPath === '/bundle.jsx' || reqPath === '/src/bundle.jsx' || reqPath === '/bundle.js') {
    const bundleContent = generateBundle();
    res.writeHead(200, { 
      'Content-Type': 'text/javascript; charset=utf-8',
      'Access-Control-Allow-Origin': '*' 
    });
    return res.end(bundleContent);
  }

  if (reqPath === '/') reqPath = '/index.html';

  let filePath = path.join(rootDir, reqPath);

  if (!fs.existsSync(filePath)) {
    const srcPath = path.join(rootDir, 'src', reqPath);
    if (fs.existsSync(srcPath)) {
      filePath = srcPath;
    }
  }

  if (!path.extname(filePath) && !fs.existsSync(filePath)) {
    if (fs.existsSync(filePath + '.jsx')) filePath += '.jsx';
    else if (fs.existsSync(filePath + '.js')) filePath += '.js';
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const contentType = MIME_TYPES[ext] || 'text/plain';
    res.writeHead(200, { 'Content-Type': contentType, 'Access-Control-Allow-Origin': '*' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    const indexPath = path.join(rootDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(indexPath).pipe(res);
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  }
});

server.listen(PORT, () => {
  console.log(`\n  🚀 MOMEN Dashboard Monitor Server running at:`);
  console.log(`  > Local:   http://localhost:${PORT}/`);
  console.log(`  > Mode:    Development (npm run dev)\n`);
});
