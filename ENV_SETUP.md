# Environment Configuration Guide

## Overview
This application requires environment variables to connect the frontend and backend properly.

## Local Development

Create a file named `.env.local` in the `synopsis` directory with:

```env
PYTHON_API_URL=http://localhost:8000
```

This file is gitignored and won't be committed to your repository.

## Production Deployment

### Vercel (Frontend)
In your Vercel project settings, add:

| Variable | Value | Example |
|----------|-------|---------|
| `PYTHON_API_URL` | Your Python backend URL | `https://your-app.railway.app` |

### Railway/Render (Backend)
In your Railway/Render project settings, add:

| Variable | Value | Example |
|----------|-------|---------|
| `FRONTEND_URL` | Your Vercel frontend URL | `https://your-app.vercel.app` |

## How to Set Environment Variables

### Creating .env.local (Local Development)

**Windows (PowerShell):**
```powershell
cd synopsis
"PYTHON_API_URL=http://localhost:8000" | Out-File -FilePath .env.local -Encoding utf8
```

**macOS/Linux:**
```bash
cd synopsis
echo "PYTHON_API_URL=http://localhost:8000" > .env.local
```

**Or manually:**
1. Navigate to `synopsis` folder
2. Create a new file named `.env.local`
3. Add the line: `PYTHON_API_URL=http://localhost:8000`
4. Save the file

### Vercel Dashboard

1. Go to your project on [vercel.com](https://vercel.com)
2. Click on "Settings" tab
3. Click on "Environment Variables" in the sidebar
4. Add variable:
   - **Name**: `PYTHON_API_URL`
   - **Value**: Your Railway/Render backend URL
   - **Environments**: Select all (Production, Preview, Development)
5. Click "Save"
6. Redeploy your application

### Railway Dashboard

1. Go to your project on [railway.app](https://railway.app)
2. Click on your service
3. Go to "Variables" tab
4. Click "+ New Variable"
5. Add:
   - **Key**: `FRONTEND_URL`
   - **Value**: Your Vercel URL
6. Railway will automatically redeploy

### Render Dashboard

1. Go to your service on [render.com](https://render.com)
2. Click on "Environment" in the sidebar
3. Click "Add Environment Variable"
4. Add:
   - **Key**: `FRONTEND_URL`
   - **Value**: Your Vercel URL
5. Click "Save Changes"
6. Render will automatically redeploy

## Troubleshooting

### "Cannot find PYTHON_API_URL"
- Make sure `.env.local` exists in the `synopsis` folder (not root)
- Restart Next.js dev server after creating `.env.local`
- Check file encoding is UTF-8

### CORS errors in production
- Verify `FRONTEND_URL` in backend matches your exact Vercel URL
- Don't include trailing slash in URLs
- Wait for backend to fully redeploy after changing variables

### Environment variable not updating
- **Vercel**: Redeploy after adding variables
- **Railway/Render**: Should auto-redeploy, but you can force redeploy
- **Local**: Restart `npm run dev` after changing `.env.local`
