# MMStore AI Social Media Growth Agent

> **Production-Ready Autonomous Social Media Marketing Platform for Fashion E-Commerce**  
> Specially architected for MMStore to automatically create, schedule, publish, analyze, and optimize daily social media content (videos, 9:16 vertical Reels, TikToks, Shorts, image carousels, and channel drops) across all major social media platforms without requiring manual daily interaction.

---

## 1. System Architecture & High-Level Overview

```
                                 ┌───────────────────────────┐
                                 │     MMStore Catalog       │
                                 │  (Real Inventory & Margin)│
                                 └─────────────┬─────────────┘
                                               │
                                 ┌─────────────▼─────────────┐
                                 │   AI Marketing Agent      │
                                 │  (Multi-Agent Coordinator)│
                                 └─────────────┬─────────────┘
                                               │
      ┌────────────────────────┬───────────────┴───────────────┬────────────────────────┐
      │                        │                               │                        │
┌─────▼──────────┐   ┌─────────▼────────────┐       ┌──────────▼──────────┐   ┌─────────▼───────────┐
│ Content        │   │ Video & Reels        │       │ Autonomous Daily    │   │ Unified Customer    │
│ Strategist &   │   │ Studio (9:16)        │       │ Scheduler Cron      │   │ Engagement Inbox    │
│ Copywriter     │   │ • 0-3s Viral Hooks   │       │ • Peak engagement   │   │ • Arabic Intent AI  │
│ (Egyptian Ar   │   │ • Storyboards        │       │ • Idempotency key   │   │ • Sizing & Stock    │
│  & English)    │   │ • Canvas Compositor  │       │ • Multi-platform    │   │ • Dispute Escalate  │
└─────┬──────────┘   └─────────┬────────────┘       └──────────┬──────────┘   └─────────┬───────────┘
      │                        │                               │                        │
      └────────────────────────┴───────────────┬───────────────┴────────────────────────┘
                                               │
                                 ┌─────────────▼─────────────┐
                                 │ Social Platform Registry  │
                                 │   & Modular Connectors    │
                                 └─────────────┬─────────────┘
                                               │
        ┌─────────────┬──────────────┬─────────┴────┬─────────────┬─────────────┐
        │             │              │              │             │             │
   ┌────▼────┐   ┌────▼────┐    ┌────▼────┐    ┌────▼────┐   ┌────▼────┐   ┌────▼────┐
   │Instagram│   │ TikTok  │    │Facebook │    │YouTube  │   │Telegram │   │ X /     │
   │ Graph   │   │ Content │    │ Pages   │    │ Shorts  │   │ Bot     │   │ Pinterest│
   └─────────┘   └─────────┘    └─────────┘    └─────────┘   └─────────┘   └─────────┘
```

---

## 2. Key Features

1. **Daily Autopilot (No Manual Interaction Required)**:
   - Automatically runs on daily schedules (e.g. 06:00 AM UTC / 08:00 AM Cairo time).
   - Scans MMStore inventory, filters products with safe stock (`totalStock >= safetyInventoryThreshold`), and selects high-margin winners.
   - Generates diversified social drops: 9:16 Video Reels (TikTok, Instagram, Shorts), lookbook carousels, and instant-order Telegram broadcasts.
   - Publishes directly through authorized platform connectors with idempotency keys to eliminate duplicate posting.

2. **Grounded Egyptian Arabic & English Copywriting**:
   - Uses authentic Egyptian fashion vocabulary (العامية المصرية: ستايل، خامة قطن 100% تقيل، الفيت مظبوط، معاينة قبل الاستلام).
   - Strictly utilizes real product specs (actual sizes: M, L, XL, XXL / footwear 41-45, real retail prices in EGP, true inventory counts).
   - **Never hallucinates fake discounts, phantom inventory, or non-existent reviews.**

3. **AI Video & Reels Studio (9:16 Vertical)**:
   - 0–3 second attention-grabbing viral hook generator.
   - Scene-by-scene storyboard sequencer with camera motion prompts (macro fabric zooms, drop-shoulder fit checks, flat lays).
   - Interactive HTML5 Canvas video compositor preview with animated subtitles, branded overlays, and audio track selectors.

4. **AI Financial Growth Engine (Profit > Vanity Metrics)**:
   - Calculates **Net Contribution Profit** = Attributed Revenue − COGS − Shipping − Discounts − Processing Fees − Ad Spend.
   - Real **ROAS** = Attributed Revenue / Advertising Spend.
   - Enforceable safety limits: The agent will **never** spend advertising money automatically without explicit authorization and configured budget caps.

5. **Unified Customer Engagement Inbox**:
   - Multichannel comments and DMs from Meta, TikTok, and WhatsApp.
   - Sentiment and intent classification (`purchase_inquiry`, `size_fit_question`, `stock_check`, `complaint_refund`).
   - Auto-drafts helpful Egyptian Arabic responses.
   - **Strict Escalation Guardrail**: Customer disputes and refund requests are automatically locked for human staff review.

6. **Enterprise Multi-Tenant Security & RBAC**:
   - Organization-level tenancy with 5 distinct roles: `owner`, `admin`, `marketer`, `analyst`, and `editor`.
   - Tamper-proof immutable audit logging (`auditLogs` cannot be mutated or deleted).
   - Encrypted token storage segregated in private subcollections accessible only by organization owners and backend Cloud Functions.

7. **GitHub Marketplace & Subscription Plan Tool**:
   - Tiered plans: **Community Free**, **Starter Growth** ($29/mo or 850 EGP), **Pro Autopilot Scale** ($79/mo or 2,400 EGP), and **Enterprise VIP** ($199/mo or 6,000 EGP).
   - Automated quota gating for connected channels, daily autopilot drops, and video duration.
   - Dedicated GitHub Marketplace webhook endpoint (`/githubMarketplaceWebhook`) with HMAC signature verification.
   - License key activation tool to unlock enterprise features immediately.
   - One-click publishing scripts to push to a private GitHub repository (`scripts/publish-to-github.sh` & `scripts/publish-to-github.ps1`).

---

## 3. Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React, Framer Motion, Recharts.
- **Backend**: Firebase Cloud Functions (v2), Cloud Firestore, Firebase Storage, Firebase Auth, Cloud Scheduler.
- **AI Runtimes**: Google Gemini API via official SDK for structured copywriting, video hooks, and customer intent classification.
- **Local Development**: Firebase Emulator Suite (Auth: `9099`, Firestore: `8080`, Storage: `9199`, Functions: `5001`, UI: `4000`).

---

## 4. Setup & Running the Project

### Prerequisites
- Node.js >= 20.x
- npm >= 10.x
- Firebase CLI (`npm install -g firebase-tools` or via local script)

---

### Step A: Terminal Commands (Linux / macOS)

```bash
# 1. Clone or navigate to the project directory
cd /path/to/mmstore-ai-growth-agent

# 2. Install root dependencies and setup environment
cp .env.example .env

# 3. Install frontend dependencies
cd frontend
npm install
cd ..

# 4. Install backend functions dependencies
cd functions
npm install
npm run build
cd ..

# 5. Start the local frontend development server
npm --prefix frontend run dev
```

The frontend will start at `http://localhost:3000`.

---

### Step B: Terminal Commands (Windows PowerShell)

```powershell
# 1. Navigate to the project directory
Set-Location -Path "C:\path\to\mmstore-ai-growth-agent"

# 2. Copy environment file
Copy-Item -Path ".env.example" -Destination ".env"

# 3. Install frontend dependencies
Set-Location -Path "frontend"
npm install
Set-Location -Path ".."

# 4. Install backend functions dependencies and build
Set-Location -Path "functions"
npm install
npm run build
Set-Location -Path ".."

# 5. Start the Vite development server
npm --prefix frontend run dev
```

---

### Step C: Running the Firebase Emulator Suite

To simulate the real backend locally without incurring Google Cloud costs:

```bash
# Linux / macOS
firebase emulators:start

# Windows PowerShell
firebase emulators:start
```

Access the **Firebase Emulator UI** at: `http://localhost:4000`

---

## 5. Running Backend Tests

Run the built-in test suite validating financial calculations, product selection rules, and platform capability checks:

```bash
# In the functions directory
cd functions
npm test
```

---

## 6. Official Social Platform Integration Setup Guides

### 1. Instagram Graph API
- **Requirements**: Meta Business Account + Instagram Professional/Creator account connected to a Facebook Page.
- **Required OAuth Scopes**: `instagram_basic`, `instagram_content_publish`, `instagram_manage_insights`, `instagram_manage_comments`.
- **How Publishing Works**:
  1. Upload video/image to a publicly accessible Firebase Storage URL.
  2. Call `POST https://graph.facebook.com/v20.0/{ig_user_id}/media` with `media_type=REELS` or `image_url`.
  3. Call `POST https://graph.facebook.com/v20.0/{ig_user_id}/media_publish` with the returned container ID.

### 2. TikTok Content Posting API v2
- **Requirements**: Approved TikTok Developer App with **Content Posting API** scope.
- **OAuth Scopes**: `video.publish`, `video.upload`, `user.info.basic`.
- **API Endpoint**: `POST https://open.tiktokapis.com/v2/post/publish/video/init/` with `source_info.source="PULL_FROM_URL"`.

### 3. YouTube Data API v3 (Shorts & Videos)
- **Requirements**: Google Cloud Project with YouTube Data API v3 enabled.
- **OAuth Scopes**: `https://www.googleapis.com/auth/youtube.upload`.
- **Shorts Requirement**: Video duration must be $\le$ 60 seconds with vertical 9:16 aspect ratio (1080x1920). Include `#Shorts` in title or description.

### 4. Telegram Bot API (Instant Broadcasts with Buttons)
- **Requirements**: Create a bot via `@BotFather` on Telegram. Obtain the `TELEGRAM_BOT_TOKEN`.
- **Setup**: Add your bot as an **Administrator** in your Telegram fashion channel (e.g., `@mmstore_egypt`).
- **Endpoint**: `POST https://api.telegram.org/bot<TOKEN>/sendPhoto` or `sendVideo` with `inline_keyboard` buy buttons.

### 5. Meta Webhooks (Instagram / Facebook / WhatsApp)
- Set Webhook URL to: `https://<YOUR_REGION>-<PROJECT_ID>.cloudfunctions.net/socialWebhook`
- Set Verify Token to: Value of `META_WEBHOOK_VERIFY_TOKEN` in `.env`.
- Subscriptions: `messages`, `messaging_postbacks`, `feed`, `comments`.

---

## 7. Implementation Checklist

| Module / Feature | Status | Implementation Details |
|---|---|---|
| **Multi-Tenant Org Data Model** | ✅ Completed | Fully secured Firestore rules authored with strict RBAC & tenant isolation. |
| **Daily Autopilot Engine** | ✅ Completed | Runs scheduled background cron or manual trigger without user interaction. |
| **Product-to-Content Studio** | ✅ Completed | Egyptian Arabic & English copywriting strictly grounded in actual catalog. |
| **Video & Reels Studio (9:16)** | ✅ Completed | Storyboard sequencer, 0-3s hooks, and interactive HTML5 Canvas previewer. |
| **Platform Capability Registry** | ✅ Completed | Matrix for Instagram, TikTok, Facebook, YouTube, Telegram, X, Pinterest, etc. |
| **Smart Social Calendar** | ✅ Completed | Daily/Weekly/Monthly calendar with status tracking and retry handlers. |
| **Financial Growth Engine** | ✅ Completed | Net contribution profit, ROAS, CAC, AOV, and enforceable budget limits. |
| **Unified Customer Inbox** | ✅ Completed | Intent detection, Egyptian Arabic suggestions, and dispute human escalation. |
| **Product Catalog & Stock Guard** | ✅ Completed | Full variant management, prevent out-of-stock promotion or fake discounts. |
| **Firebase Cloud Functions v2** | ✅ Completed | Scheduler, callable APIs, webhooks, and order attribution endpoints. |
| **Live Social Account OAuth** | ⚙️ Configurable | Modular connectors ready; toggle to connect live accounts with real tokens. |
| **Cloud Video Transcoder (FFmpeg)**| ⚙️ Configurable | Canvas frame preview runs in-browser; optional external FFmpeg worker adapter included. |

---

## 8. Definition of Success Checklist

- [x] Owner can view and filter authentic fashion catalog (T-shirts, hoodies, sneakers, accessories).
- [x] AI Agent automatically selects products with high stock and margins.
- [x] Generates Egyptian Arabic and English copy adhering to true prices and sizes.
- [x] Produces 9:16 vertical video storyboards with 0-3s retention hooks.
- [x] Dispatches scheduled posts to configured social platforms automatically.
- [x] Accurately computes true e-commerce ROAS and Net Contribution Profit.
- [x] Enforces strict safety guardrails on ad budgets and sensitive customer complaints.
