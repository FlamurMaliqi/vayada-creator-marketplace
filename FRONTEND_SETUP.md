# Frontend Setup Guide

## Connecting to the Backend

### Step 1: Create Environment File

Create a `.env.local` file in the frontend root directory:

```bash
cd vayada-creator-marketplace-frontend
touch .env.local
```

### Step 2: Configure Backend URL

Add the following to `.env.local`:

```env
# Backend API URL
# For local development (backend running in Docker)
NEXT_PUBLIC_API_URL=http://localhost:8000

# For production, update this to your backend URL
# NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

**Important Notes:**
- The `.env.local` file is already in `.gitignore` (won't be committed)
- Next.js automatically loads `.env.local` files
- Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Restart the Next.js dev server after creating/modifying `.env.local`

### Step 3: Restart Development Server

After creating `.env.local`, restart your Next.js dev server:

```bash
npm run dev
```

## Testing the Connection

The frontend API client is already configured to use `NEXT_PUBLIC_API_URL`. You can test the connection by:

1. **Check browser console** - The API client will log errors if connection fails
2. **Test health endpoint** - Once authentication is implemented, you can call the health endpoint

## Current Status

✅ **Already Configured:**
- API client uses `NEXT_PUBLIC_API_URL` environment variable
- Falls back to `/api` if not set (for Next.js API routes)
- Error handling in place

⚠️ **What's Needed:**
- Create `.env.local` file with backend URL
- Restart dev server after creating `.env.local`

## Environment Variables Reference

### Development
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Production
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

## Troubleshooting

### CORS Errors
If you see CORS errors, make sure:
1. Backend CORS is configured to allow your frontend origin
2. Backend `.env` has your frontend URL in `CORS_ORIGINS`
3. Both services are running

### Connection Refused
If you see "connection refused":
1. Make sure backend is running: `docker-compose ps` (in backend directory)
2. Check backend is accessible: `curl http://localhost:8000/health`
3. Verify `.env.local` has correct URL

### API Not Found
If API calls go to `/api` instead of backend:
1. Check `.env.local` exists and has `NEXT_PUBLIC_API_URL`
2. Restart Next.js dev server
3. Check browser console for the actual URL being used

