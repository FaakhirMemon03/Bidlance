# Requirements: Bidlance

**Defined:** 2026-05-28
**Core Value:** Creating a secure and transparent trust-based ecosystem for freelancers and buyers through escrow protection and live bidding competition.

## v1 Requirements

### Authentication & Profile
- [ ] **AUTH-01**: User can sign up with email/password (Roles: Buyer, Seller)
- [ ] **AUTH-02**: User can login with email/username and JWT token generation
- [ ] **AUTH-03**: Social Login (Google/GitHub) integration
- [ ] **AUTH-04**: Password recovery via email reset link
- [ ] **AUTH-05**: User can update profile (Avatar, Bio, Skills)
- [ ] **AUTH-06**: KYC verification status (Admin marked or basic document upload)

### Project Management
- [ ] **PROJ-01**: Seller can create service/project listings
- [ ] **PROJ-02**: Support for fixed-price projects
- [ ] **PROJ-03**: Support for live-bidding/auction projects with timers
- [ ] **PROJ-04**: Search projects with filters (Category, Price range)
- [ ] **PROJ-05**: Project status management (Open, Bidding Active, Closed)

### Live Bidding Engine
- [ ] **BID-01**: Real-time bid updates using Socket.IO (no page refresh)
- [ ] **BID-02**: Automatic validation of highest bid on server-side
- [ ] **BID-03**: Bid history display in real-time
- [ ] **BID-04**: "Extended Bidding": Timer resets if bid placed in last 60 seconds
- [ ] **BID-05**: Notification to bidders when outbid

### Wallet & Escrow
- [ ] **WALT-01**: Virtual wallet system showing balance (Pending, Withdrawable)
- [ ] **WALT-02**: Escrow logic: Hold payment when order is placed
- [ ] **WALT-03**: Automatic Fee Deduction: 4% from Buyer, 7% from Seller
- [ ] **WALT-04**: Withdrawal request system for sellers
- [ ] **WALT-05**: Transaction ledger logging for all money movements

### Order Management & Chat
- [ ] **ORD-01**: Buy/Order creation from fixed price or win-bid
- [ ] **ORD-02**: Work delivery submission by Seller
- [ ] **ORD-03**: Order approval by Buyer to release escrow
- [ ] **ORD-04**: Real-time chat between Buyer and Seller per project
- [ ] **ORD-05**: Dispute opening mechanism for failed orders

### Admin Management
- [ ] **ADM-01**: Dashboard showing revenue, users, and order stats
- [ ] **ADM-02**: User management (Ban/Verify/Suspend)
- [ ] **ADM-03**: Transaction approval (Withdrawals)
- [ ] **ADM-04**: Dispute resolution (Admin decides refund or release)

## v2 Requirements

### Analytics & AI
- **AI-01**: Intelligent talent matching based on project descriptions
- **AI-02**: Automated scam detection in chat/projects

### Advanced Features
- **FEAT-01**: Featured project listings (Paid promotion)
- **FEAT-02**: Subscription plans for Pro Sellers
- **FEAT-03**: Mobile Application (iOS/Android)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Crypto Payments | Stability and regulatory concerns for MVP |
| Video Streaming | Bandwidth costs; focus on chat and file sharing first |
| Multi-currency | Start with base currency (PKR/USD) for simplified escrow |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01..06 | Phase 1 | Pending |
| PROJ-01..05 | Phase 2 | Pending |
| WALT-01..05 | Phase 1/3 | Pending |
| ORD-01..03 | Phase 3 | Pending |
| BID-01..05 | Phase 4 | Pending |
| ORD-04 | Phase 5 | Pending |
| ADM-01..04 | Phase 6 | Pending |

**Coverage:**
- v1 requirements: 30 total
- Mapped to phases: 30
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-28*
*Last updated: 2026-05-28 after initial definition*
