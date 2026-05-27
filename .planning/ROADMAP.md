# Roadmap: Bidlance

## Overview

Bidlance will be built in 7 logical phases, moving from the technical foundation and authentication to the complex real-time bidding engine and secure escrow wallet system. The journey concludes with a comprehensive admin dashboard and production-ready polish.

## Phases

- [ ] **Phase 1: Foundation & Authentication** - Core MERN setup and secure multi-role auth system.
- [ ] **Phase 2: Project Blueprint & Discovery** - Service/Project listings with search and category filters.
- [ ] **Phase 3: Wallet Engine & Escrow Ledger** - Virtual wallet, automatic fee calculations, and escrow holding logic.
- [ ] **Phase 4: Live Bidding Console** - Real-time auction engine using Socket.IO and Redis.
- [ ] **Phase 5: Order Lifecycle & Real-time Chat** - Transaction flow from bid win to delivery and approval.
- [ ] **Phase 6: Admin Command Center** - Centralized management for disputes, users, and platform revenue.
- [ ] **Phase 7: Production Hardening & Launch** - Security audits, performance tuning, and final launch prep.

## Phase Details

### Phase 1: Foundation & Authentication
**Goal**: Establish the base infrastructure and enable secure access for all user roles.
**Depends on**: Nothing
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, WALT-01
**Success Criteria**:
  1. User can sign up/login as Buyer or Seller.
  2. Google and GitHub OAuth work correctly.
  3. User can view an empty wallet with zero balance.
  4. Profiles are editable and persist in MongoDB.
**Plans**: 3 plans
- [ ] 01-01: Backend scaffolding and Database modeling.
- [ ] 01-02: Authentication flow (JWT, Social, Email).
- [ ] 01-03: Frontend shell and Profile components.

### Phase 2: Project Blueprint & Discovery
**Goal**: Allow sellers to list products and buyers to find them.
**Depends on**: Phase 1
**Requirements**: PROJ-01, PROJ-02, PROJ-03, PROJ-04, PROJ-05
**Success Criteria**:
  1. Seller can post a fixed-price or auction project.
  2. Images/Videos are uploaded and displayed via Cloudinary/S3.
  3. Search page works with category and price filters.
**Plans**: 2 plans
- [ ] 02-01: Project CRUD and Media handling.
- [ ] 02-02: Marketplace Search and Filtering logic.

### Phase 3: Wallet Engine & Escrow Ledger
**Goal**: Implement the financial core of the platform.
**Depends on**: Phase 1
**Requirements**: WALT-02, WALT-03, WALT-04, WALT-05
**Success Criteria**:
  1. System correctly calculates 4% Buyer fee and 7% Seller fee.
  2. Funds can be "held" in escrow when a purchase starts.
  3. Ledger records every transaction entry.
**Plans**: 2 plans
- [ ] 03-01: Escrow logic and Transaction ledger.
- [ ] 03-02: Withdrawal request and payout simulation.

### Phase 4: Live Bidding Console
**Goal**: Enable real-time dynamic pricing.
**Depends on**: Phase 1, Phase 2
**Requirements**: BID-01, BID-02, BID-03, BID-04, BID-05
**Success Criteria**:
  1. Multiple users see bid updates instantly without refresh.
  2. Timer extends if a bid is placed in the final minute.
  3. Server rejects bids lower than current highest.
**Plans**: 3 plans
- [ ] 04-01: Socket.IO server setup and Room management.
- [ ] 04-02: Bidding logic and Atomic DB updates.
- [ ] 04-03: Real-time UI updates and Notifications.

### Phase 5: Order Lifecycle & Real-time Chat
**Goal**: Complete the transaction loop from delivery to approval.
**Depends on**: Phase 2, Phase 3, Phase 4
**Requirements**: ORD-01, ORD-02, ORD-03, ORD-04, ORD-05
**Success Criteria**:
  1. Buyer and Seller can chat in a dedicated order room.
  2. Seller can "Submit Work" and Buyer can "Approve".
  3. Escrow is released to Seller wallet upon approval.
**Plans**: 2 plans
- [ ] 05-01: Order status machine and Chat integration.
- [ ] 05-02: Workflow for work submission and escrow release.

### Phase 6: Admin Command Center
**Goal**: Provide tools for platform oversight.
**Depends on**: All previous phases
**Requirements**: ADM-01, ADM-02, ADM-03, ADM-04
**Success Criteria**:
  1. Admin can see total revenue (platform fees).
  2. Admin can resolve a dispute by manually releasing or refunding funds.
  3. Admin can ban problematic users.
**Plans**: 2 plans
- [ ] 06-01: Admin dashboard and Analytics.
- [ ] 06-02: Moderation tools and Dispute workflows.

### Phase 7: Production Hardening & Launch
**Goal**: Prepare the platform for real-world usage.
**Depends on**: Phase 6
**Requirements**: Trust & Security Polish
**Success Criteria**:
  1. Rate limiting and Security headers are active.
  2. Performance scores (Lighthouse) are 90+.
  3. End-to-end testing of the full project/bid/pay flow passes.
**Plans**: 1 plan
- [ ] 07-01: Security audit, Optimization, and Deployment.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Auth | 0/3 | Not started | - |
| 2. Project & Discovery | 0/2 | Not started | - |
| 3. Wallet & Escrow | 0/2 | Not started | - |
| 4. Live Bidding | 0/3 | Not started | - |
| 5. Order & Chat | 0/2 | Not started | - |
| 6. Admin Panel | 0/2 | Not started | - |
| 7. Final Polish | 0/1 | Not started | - |

---
*Roadmap defined: 2026-05-28*
