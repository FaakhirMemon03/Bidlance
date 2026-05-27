# Stack Research: Bidlance Marketplace

## Recommended Stack (2025 Standard)

| Layer | Technology | Rationale | Confidence |
|-------|------------|-----------|------------|
| **Frontend** | Next.js 15 (React) | Best for SEO (marketplace discovery) and performance. App Router provides clean architecture. | High |
| **Backend** | Node.js (NestJS) | Structured backend, excellent built-in support for WebSockets and Microservices. Express is also viable but harder to scale cleanly. | High |
| **Database** | MongoDB 8.0 | Document-oriented, flexible schema for varied project types. Use with Mongoose. | Medium-High |
| **Real-time** | Socket.IO | Industry standard for bidirectional communication. Essential for live bidding and chat. | High |
| **State/Cache** | Redis | Crucial for caching active bids and scaling Socket.IO horizontally across server instances. | High |
| **Payments** | Stripe Connect | Simplifies Escrow logic, 1099 reporting, and payout splitting. For Pakistan-specific: JazzCash/Easypaisa via local gateways. | High |
| **Storage** | Cloudinary | Optimized image and video handling for project portfolios and avatars. | Medium-High |
| **Auth** | NextAuth.js / Clerk | Secure, production-ready auth with Google/GitHub/Social integrations. | High |

## Why MongoDB?
The user explicitly requested MERN. While PostgreSQL is often safer for financial ledgers, MongoDB 4.0+ supports multi-document ACID transactions. For a freelance marketplace:
- **Pros**: Flexible schema for metadata-heavy projects; easy to scale horizontally.
- **Cons**: Requires careful architecture to ensure "bid" consistency (use atomic operators like `.findOneAndUpdate`).

## What NOT to use
- **Plain WebSockets**: Too low-level; Socket.IO handles heartbeats and reconnections automatically.
- **Firebase Realtime Database**: Can get expensive quickly at scale and has limited querying compared to MongoDB.

## Versioning Strategy
- **Node.js**: 20.x (LTS)
- **Next.js**: 15.x
- **Tailwind CSS**: 3.x (or 4.x if stable)
- **Socket.IO**: 4.x
