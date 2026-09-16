# MedTrack Web Deployment

The MedTrack web app is built from the same Expo client as iOS/Android. It exports as a static SPA and talks to the existing NestJS API.

## Build

From `Client/`:

```bash
# Set production API URL at build time (required when mock data is disabled)
EXPO_PUBLIC_API_URL=https://api.example.com/api/v1
EXPO_PUBLIC_USE_MOCK_DATA=false

npm run export:web
```

Output is written to `Client/dist/`.

## Host the static files

Upload `dist/` to any static host:

- Vercel / Netlify / Cloudflare Pages
- nginx or IIS on a VPS
- A clinic LAN server (`http://10.0.0.25`)

### SPA routing (required)

Expo Router uses client-side routes such as `/patients/123`. The host must serve `index.html` for unknown paths.

**Vercel** (`vercel.json`):

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify** (`public/_redirects` or `netlify.toml`):

```
/*    /index.html   200
```

**nginx**:

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

## Backend / CORS

The web app calls `EXPO_PUBLIC_API_URL` from the browser. Lock Nest CORS to the web origin in production:

```env
CORS_ORIGINS=https://app.example.com
```

Keep `CORS_ORIGINS=*` for local development.

## Local web dev

```bash
cd Client
npm run web
```

Use `EXPO_PUBLIC_USE_MOCK_DATA=true` in `.env` when the API is not running.

## Notes

- Web does **not** use the Apple App Store or Google Play.
- Native mobile builds still use EAS (`eas build`) separately.
- `EXPO_PUBLIC_*` values are baked in at export time; change them and rebuild to point at a new API.
