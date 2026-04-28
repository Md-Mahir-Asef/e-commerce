# Cloudinary Integration Documentation

## Overview

This backend has been successfully integrated with Cloudinary for file uploads, replacing the local file storage system with cloud-based image hosting.

## Changes Made

### 1. Updated Multer Middleware (`src/middlewares/multer.middleware.ts`)
- **Before**: Used `diskStorage` to save files locally
- **After**: Uses `memoryStorage` to keep files in memory for Cloudinary upload
- Removed local file system dependencies (UUID generation, directory creation)

### 2. Created Cloudinary Upload Service (`src/utils/cloudinaryUpload.service.ts`)
- New utility service for handling Cloudinary uploads
- Features:
  - Automatic image optimization (quality, format)
  - Folder organization (`robobazar/uploads`)
  - Error handling and retry logic
  - Delete functionality for cleanup
- Returns comprehensive upload result with URLs and metadata

### 3. Updated Upload Controller (`src/controllers/upload.controller.ts`)
- **Before**: Returned local file paths
- **After**: Returns Cloudinary URLs and metadata
- New response format includes:
  - `url`: Cloudinary URL
  - `secure_url`: HTTPS URL
  - `public_id`: Cloudinary resource identifier
  - `format`: Optimized image format
  - `resource_type`: Resource type (image, etc.)

### 4. Removed Static File Serving (`src/app.ts`)
- Removed `/api/v1/uploads` static route
- Files are now served directly from Cloudinary CDN

### 5. Enhanced Configuration (`src/config/config.ts`)
- Added validation for Cloudinary credentials
- Warning messages for missing configuration
- Better error handling for development

## API Response Format

### Upload Endpoint: `POST /api/v1/upload`

**Request:**
- Content-Type: `multipart/form-data`
- Field: `image` (file)

**Response:**
```json
{
  "filename": "original-filename.jpg",
  "url": "http://res.cloudinary.com/cloud_name/image/upload/v1234567890/robobazar/uploads/abc123.jpg",
  "secure_url": "https://res.cloudinary.com/cloud_name/image/upload/v1234567890/robobazar/uploads/abc123.jpg",
  "public_id": "robobazar/uploads/abc123",
  "size": 1234567,
  "mimetype": "image/jpeg",
  "format": "jpg",
  "resource_type": "image"
}
```

## Environment Variables Required

Ensure these are set in your `.env` file:

```env
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
CLOUDINARY_URL=cloudinary://your_api_key:your_api_secret@your_cloud_name
```

## Benefits

1. **Scalability**: No local storage limitations
2. **Performance**: CDN delivery through Cloudinary's global network
3. **Image Optimization**: Automatic format conversion and compression
4. **Security**: HTTPS delivery by default
5. **Reliability**: Cloud storage with built-in redundancy
6. **Features**: Built-in image transformations and effects

## Usage Examples

### Basic Upload
```javascript
const formData = new FormData();
formData.append('image', file);

fetch('/api/v1/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => {
  console.log('Cloudinary URL:', data.data.secure_url);
});
```

### Using Cloudinary URLs in Product Creation
```javascript
const productData = {
  name: "Product Name",
  price: 99.99,
  images: [
    "https://res.cloudinary.com/cloud_name/image/upload/v1234567890/robobazar/uploads/image1.jpg",
    "https://res.cloudinary.com/cloud_name/image/upload/v1234567890/robobazar/uploads/image2.jpg"
  ],
  categoryNames: ["Electronics"]
};
```

## Image Transformations

Cloudinary URLs can be modified for different sizes and formats:

```javascript
// Original: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/robobazar/uploads/image.jpg

// Thumbnail (200x200):
https://res.cloudinary.com/cloud_name/image/upload/w_200,h_200,c_fill/v1234567890/robobazar/uploads/image.jpg

// WebP format:
https://res.cloudinary.com/cloud_name/image/upload/f_webp/v1234567890/robobazar/uploads/image.jpg

// Compressed quality:
https://res.cloudinary.com/cloud_name/image/upload/q_80/v1234567890/robobazar/uploads/image.jpg
```

## Error Handling

The system handles various error scenarios:
- Missing file in request
- Invalid file types (non-images)
- Oversized files (>10MB)
- Cloudinary API errors
- Missing credentials

## Testing

To test the integration:

1. Ensure Cloudinary credentials are set
2. Start the server
3. Use a tool like Postman or curl to upload an image:

```bash
curl -X POST \
  http://localhost:3000/api/v1/upload \
  -F 'image=@/path/to/your/image.jpg'
```

## Migration Notes

- Existing local files remain in the `/uploads` directory
- No database changes required (products store URLs, not file paths)
- API is backward compatible for consumers expecting image URLs
- Static file serving has been removed but can be restored if needed

## Troubleshooting

### Common Issues

1. **"Cloudinary credentials not properly configured"**
   - Check environment variables
   - Verify `.env` file is being loaded

2. **Upload fails with 500 error**
   - Check Cloudinary account status
   - Verify API key permissions
   - Check file size and format

3. **Images not loading in frontend**
   - Use `secure_url` instead of `url` for HTTPS
   - Check CORS settings in Cloudinary dashboard

### Debug Mode

Set `NODE_ENV=development` to see detailed error messages and Cloudinary upload logs.
