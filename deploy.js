const fs = require('fs');
const { execSync } = require('child_process');

console.log("=== CEM-AS GUNCELLEME SISTEMI ===");
console.log("1. Logo kopyalaniyor...");

const src = 'C:\\Users\\cemas\\.gemini\\antigravity-ide\\brain\\c6b63222-7cb0-4fc5-9f47-edbcc4a9d46c\\.user_uploaded\\media_1788558696680.jpg';
const dest = 'C:\\Users\\cemas\\Desktop\\cemas_repo\\public\\images\\cemas-logo.jpg';

try {
  fs.copyFileSync(src, dest);
  console.log("Logo basariyla eklendi: cemas-logo.jpg");
} catch (e) {
  console.log("Logo kopyalama hatasi (Bu adimi daha once yaptiysaniz sorun yok):", e.message);
}

console.log("\n2. GitHub'a yukleniyor (Vercel icin)...");
try {
  process.chdir('C:\\Users\\cemas\\Desktop\\cemas_repo');
  execSync('git add .', { stdio: 'inherit' });
  execSync('git commit -m "Yeni logo ve Google Haritalar eklendi, anasayfa tasarimi guncellendi"', { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log("\nHarika! Guncellemeler basariyla GitHub'a gonderildi.");
  console.log("Vercel sitenizi 1-2 dakika icinde otomatik guncelleyecek.");
} catch (e) {
  console.error("Git yukleme hatasi (Belki degisiklik yoktur veya baglanti koptu):", e.message);
}
