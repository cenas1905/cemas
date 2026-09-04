const fs = require('fs');
const src = 'C:\\Users\\cemas\\.gemini\\antigravity-ide\\brain\\c6b63222-7cb0-4fc5-9f47-edbcc4a9d46c\\.user_uploaded\\media_1788558696680.jpg';
const dest = 'C:\\Users\\cemas\\Desktop\\cemas_repo\\public\\images\\cemas-logo.jpg';
fs.copyFileSync(src, dest);
console.log('Copied successfully!');
