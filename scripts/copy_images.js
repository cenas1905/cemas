const fs = require('fs');
const path = require('path');

const sourceDir = 'C:\\Users\\cemas\\OneDrive\\Desktop\\website';
const targetDir = 'C:\\Users\\cemas\\.gemini\\antigravity\\scratch\\cemas\\public\\images';

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const categories = ['Merdivenler', 'cambalkon', 'duşakabin', 'korkuluk'];

const results = {};

categories.forEach(category => {
  const catPath = path.join(sourceDir, category);
  if (fs.existsSync(catPath)) {
    const files = fs.readdirSync(catPath);
    
    // Create target category dir
    const targetCatDir = path.join(targetDir, category.toLowerCase().replace('ş', 's'));
    if (!fs.existsSync(targetCatDir)) {
      fs.mkdirSync(targetCatDir, { recursive: true });
    }
    
    results[category] = [];
    
    let counter = 1;
    files.forEach(file => {
      if (file.endsWith('.jpeg') || file.endsWith('.jpg') || file.endsWith('.png')) {
        const ext = path.extname(file);
        const newName = `${category.toLowerCase().replace('ş', 's')}-${counter}${ext}`;
        const sourceFile = path.join(catPath, file);
        const targetFile = path.join(targetCatDir, newName);
        
        fs.copyFileSync(sourceFile, targetFile);
        results[category].push(`/images/${category.toLowerCase().replace('ş', 's')}/${newName}`);
        counter++;
      }
    });
  }
});

fs.writeFileSync(
  path.join('C:\\Users\\cemas\\.gemini\\antigravity\\scratch\\cemas', 'image_map.json'), 
  JSON.stringify(results, null, 2)
);

console.log('Images copied successfully.');
console.log(JSON.stringify(results, null, 2));
