# Deployment Guide for Synopsis Text Summarizer

This guide explains how to deploy the Synopsis application to production. The architecture uses:
- **Frontend (Next.js)**: Deployed on **Vercel**
- **Backend (Python/FastAPI)**: Deployed on **Railway** or **Render**

## Architecture Overview

```
User → Vercel (Next.js Frontend) → Railway/Render (Python Backend + T5 Model)
```

The Python backend must be deployed separately because:
- The T5 model requires PyTorch (~1GB+ with dependencies)
- Vercel serverless functions have size/memory limitations
- ML model inference needs longer execution times

---

## Part 1: Deploy Python Backend

You have two options for deploying the Python backend:

### Option A: Railway (Recommended - Easier)

1. **Create Railway Account**: Go to [railway.app](https://railway.app)

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository
   - Select the main branch

3. **Configure Environment Variables**:
   - Go to your project → Variables
   - Add: `FRONTEND_URL` = `https://your-vercel-app.vercel.app`
   - Add: `PORT` = `8000` (Railway will auto-assign, but we specify for clarity)

4. **Deploy**:
   - Railway will auto-detect Python and use `Procfile`
   - Wait for build to complete (~5-10 minutes for first deploy)
   - Copy your Railway app URL (e.g., `https://your-app.railway.app`)

### Option B: Render

1. **Create Render Account**: Go to [render.com](https://render.com)

2. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Connect your repository
   - Configure:
     - **Name**: `synopsis-api`
     - **Environment**: `Python 3`
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn api_server:app --host 0.0.0.0 --port $PORT`

3. **Environment Variables**:
   - Add: `FRONTEND_URL` = `https://your-vercel-app.vercel.app`
   - Add: `PYTHON_VERSION` = `3.11.9`

4. **Deploy**:
   - Click "Create Web Service"
   - Wait for deployment (~10-15 minutes)
   - Copy your Render URL (e.g., `https://synopsis-api.onrender.com`)

---

## Part 2: Deploy Frontend to Vercel

### Prerequisites
- Have your Python backend URL from Part 1
- GitHub repository with your code

### Deployment Steps

1. **Go to Vercel**: Visit [vercel.com](https://vercel.com)

2. **Import Project**:
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Project**:
   - **Root Directory**: `synopsis` (important!)
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

4. **Environment Variables**:
   - Add: `PYTHON_API_URL` = Your backend URL from Part 1
     - Railway example: `https://your-app.railway.app`
     - Render example: `https://synopsis-api.onrender.com`

5. **Deploy**:
   - Click "Deploy"
   - Wait for build (~2-3 minutes)
   - Visit your deployed site!

6. **Update Backend CORS**:
   - Go back to Railway/Render
   - Update `FRONTEND_URL` environment variable with your actual Vercel URL
   - Example: `https://synopsis.vercel.app`
   - Redeploy backend

---

## Part 3: Verify Deployment

1. **Test Backend Health**:
   ```bash
   curl https://your-backend-url/health
   ```
   Should return: `{"status":"healthy","model_loaded":true}`

2. **Test Frontend**:
   - Visit your Vercel URL
   - Navigate to Summarizer section
   - Enter text and try generating a summary
   - Verify all three styles work

3. **Check Logs**:
   - **Backend logs**: Railway/Render dashboard
   - **Frontend logs**: Vercel dashboard → Deployments → View Function Logs

---

## Environment Variables Summary

### Backend (Railway/Render)
| Variable | Value | Purpose |
|----------|-------|---------|
| `FRONTEND_URL` | `https://your-vercel-app.vercel.app` | CORS configuration |
| `PORT` | Auto-assigned by platform | Server port |

### Frontend (Vercel)
| Variable | Value | Purpose |
|----------|-------|---------|
| `PYTHON_API_URL` | `https://your-backend-url` | Python backend endpoint |

---

## Cost Estimates

### Railway
- **Free Tier**: $5 credit/month (enough for hobby projects)
- **Hobby Plan**: $5/month for more resources
- Your app will use ~512MB RAM + CPU when active

### Render
- **Free Tier**: Available but sleeps after 15min inactivity
- **Starter Plan**: $7/month for always-on service

### Vercel
- **Hobby Plan**: Free for personal projects
- **Pro Plan**: $20/month if needed

**Recommended**: Railway Hobby ($5/mo) + Vercel Free

---

## Troubleshooting

### "Cannot connect to summarization service"
- Check if backend is running (visit `/health` endpoint)
- Verify `PYTHON_API_URL` is set correctly in Vercel
- Check backend logs for errors

### "CORS error" in browser console
- Verify `FRONTEND_URL` is set in backend environment variables
- Make sure it matches your exact Vercel URL (no trailing slash)
- Redeploy backend after changing CORS settings

### "Model not loaded" in backend
- Check backend logs during startup
- Model loading takes 5-10 seconds on first request
- Ensure model checkpoint exists in repository

### Backend is slow
- First request after idle period is slow (cold start)
- Consider upgrading to paid tier for better performance
- Model inference takes 3-10 seconds depending on text length

---

## Performance Optimization

### For Production Use

1. **Add Caching** (optional):
   ```python
   # In api_server.py, add simple cache
   from functools import lru_cache
   
   @lru_cache(maxsize=100)
   def cached_summarize(text_hash, style):
       # ... summarization logic
   ```

2. **Add Rate Limiting**:
   ```python
   from slowapi import Limiter
   limiter = Limiter(key_func=get_remote_address)
   
   @app.post("/summarize")
   @limiter.limit("10/minute")
   async def summarize(...):
   ```

3. **Monitor Usage**:
   - Railway/Render provide built-in metrics
   - Vercel Analytics for frontend performance

---

## Local Development → Production Checklist

- [x] Backend deployed to Railway/Render
- [x] `FRONTEND_URL` set in backend env vars
- [x] Backend health check works
- [x] Frontend deployed to Vercel  
- [x] `PYTHON_API_URL` set in Vercel env vars
- [x] Backend CORS updated with real Vercel URL
- [x] Test summarization end-to-end
- [x] All three summary styles working
- [x] Copy button works
- [x] Dark mode works

---

## Need Help?

**Railway Issues**: [railway.app/help](https://railway.app/help)  
**Render Issues**: [render.com/docs](https://render.com/docs)  
**Vercel Issues**: [vercel.com/docs](https://vercel.com/docs)

**Common issue**: Model too large?
- Check if checkpoint is in .gitignore
- You may need to upload model separately or use Git LFS
- Alternative: Use model from Hugging Face Hub directly
