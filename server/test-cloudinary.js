// Simple test to verify Cloudinary configuration
const cloudinary = require('./dist/utils/cloudinary');

try {
  console.log('Testing Cloudinary configuration...');
  console.log('Cloudinary config:', {
    cloud_name: process.env.CLOUDINARY_NAME ? 'SET' : 'NOT SET',
    api_key: process.env.CLOUDINARY_KEY ? 'SET' : 'NOT SET',
    api_secret: process.env.CLOUDINARY_SECRET ? 'SET' : 'NOT SET'
  });
  
  if (cloudinary.config().cloud_name) {
    console.log('✅ Cloudinary is properly configured');
  } else {
    console.log('❌ Cloudinary configuration is missing');
  }
} catch (error) {
  console.error('Error testing Cloudinary:', error.message);
}
