const fs = require('fs');
const path = require('path');

const servicePath = path.join(__dirname, 'src', 'utils', 'cloudinaryUpload.service.ts');

try {
  if (fs.existsSync(servicePath)) {
    fs.unlinkSync(servicePath);
    console.log('✅ Deleted cloudinaryUpload.service.ts');
  } else {
    console.log('❌ File not found:', servicePath);
  }
} catch (error) {
  console.error('Error deleting file:', error);
}
