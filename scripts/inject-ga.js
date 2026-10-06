#!/usr/bin/env node
/**
 * 自动把 GA4 gtag 注入到所有 HTML 文件的 </head> 之前
 */
const fs = require("fs");
const path = require("path");

const GA_ID = process.env.GA_MEASUREMENT_ID?.trim() || "G-0M988Y84GV";
const ROOT_DIR = path.join(__dirname, "..");

const snippet = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_ID}');
</script>`;

function inject(filePath) {
  const html = fs.readFileSync(filePath, "utf8");
  // 如果已经注入过，跳过
  if (html.includes("googletagmanager.com/gtag")) return false;
  if (!html.includes("</head>")) return false;
  const updated = html.replace("</head>", `${snippet}\n</head>`);
  fs.writeFileSync(filePath, updated);
  return true;
}

function walk(dir) {
  let count = 0;
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) {
      count += walk(full);
    } else if (name.endsWith(".html")) {
      if (inject(full)) {
        console.log(`✓ 已注入: ${path.relative(ROOT_DIR, full)}`);
        count++;
      }
    }
  }
  return count;
}

const total = walk(ROOT_DIR);
console.log(`完成，共注入 ${total} 个 HTML 文件`);