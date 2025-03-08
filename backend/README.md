# Healthcare Portal Backend

This is the backend server for the Healthcare Portal application, which provides API endpoints for file upload and analysis using Google's Gemini AI.

## Setup

1. Install dependencies:

   ```
   npm install
   ```

2. Create a `.env` file in the root directory with the following content:

   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   Replace `your_gemini_api_key_here` with your actual Gemini API key.

3. Make sure the `uploads` directory exists (it will be created automatically when the server starts).

## Running the Server

Start the server with:

```
node index.js
```

The server will run on port 5000 by default.

## API Endpoints

### Upload and Analyze Image

**Endpoint:** `POST /upload`

**Description:** Upload an image file (jpg, jpeg, or png) for analysis by Gemini AI.

**Request:**

- Content-Type: multipart/form-data
- Body:
  - file: The image file to upload

**Response:**

```json
{
  "extractedText": "Full text extracted from the image",
  "summary": "Summary of the extracted text"
}
```

## Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key for accessing the AI services.

## Dependencies

- express: Web server framework
- multer: File upload handling
- cors: Cross-origin resource sharing
- dotenv: Environment variable management
- @google/generative-ai: Google's Generative AI client library
