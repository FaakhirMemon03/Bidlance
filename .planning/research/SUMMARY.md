# Research Summary: Bidlance

## Executive Overview
Bidlance is a dual-revenue (Buyer & Seller fees) freelance marketplace featuring live auctions. The primary technical challenge is balancing real-time bidding synchronization with secure, transactional escrow management.

## Key Findings

### 1. The Technology Standard (2025)
- **Stack**: Next.js 15 + NestJS + MongoDB + Socket.IO + Redis.
- **Why**: This combination provides the best balance of SEO, development speed, and real-time concurrency. Redis is non-negotiable for scaling the bidding engine.

### 2. Market Table Stakes
- **Trust is Currency**: Without Escrow and identity verification (KYC), the platform will struggle to attract serious buyers.
- **Real-time is Expected**: Static bidding is obsolete; users expect "eBay-style" live updates with zero refresh.

### 3. Critical Differentiators
- **Extended Bidding**: Automatically extending timers on last-minute bids to prevent sniping and maximize project value.
- **Integrated Wallet**: Making the wallet feel like a core part of the UI, showing "Pending" vs "Withdrawable" funds clearly.

## Architecture Vision
- **Room-based Sockets**: Each project page is a websocket room.
- **Atomic Operations**: All bid processing happens on the server with atomicity checks.
- **Escrow Guard**: A dedicated service layer to handle the 7% and 4% fee logic automatically.

## Next Steps
- Define specific data models for Users, Projects, Bids, and Transactions.
- Prototype the Socket.IO bidding loop.
- Integrate a payment gateway sandbox.

---
*Synthesized on 2026-05-28*
