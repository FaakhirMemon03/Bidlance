# Bidlance

## What This Is

Bidlance is a professional freelance marketplace and auction platform that combines traditional service selling with live bidding/auctions. It features a robust escrow-based wallet system to ensure trust between buyers and sellers, with a built-in commission structure for platform sustainability.

## Core Value

Creating a secure and transparent trust-based ecosystem for freelancers and buyers through escrow protection and live bidding competition.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **Multi-Role Authentication**: Secure signup/login for Buyers, Sellers, and Admins (including Google/GitHub OAuth).
- [ ] **Project Management**: Sellers can upload services/projects with fixed prices or enable live bidding.
- [ ] **Live Bidding System**: Real-time auction mechanism using WebSockets for dynamic price discovery.
- [ ] **Escrow Wallet System**: Multi-stage payment holding (Pending → In Progress → Released) with automatic fee deduction.
- [ ] **Admin Dashboard**: Comprehensive management of users, projects, transactions, and disputes.
- [ ] **Real-time Communication**: Live chat between buyers and sellers for project discussion and updates.
- [ ] **Trust & Security**: KYC verification, OTP login, and anti-fraud measures.
- [ ] **Platform Commissions**: Automatic calculation and deduction of 7% seller fee and 4% buyer fee.

### Out of Scope

- [ ] **Mobile App** — Deferred to later phases.
- [ ] **AI-driven Scam Detection** — Future enhancement.
- [ ] **Crypto Payments** — To be considered in post-MVP updates.
- [ ] **Subscription Plans** — Focus on transaction-based revenue first.

## Context

The platform aims to capture the trust gap in the freelance market, particularly in the Pakistani market, by providing a secure escrow system. It follows a professional architecture designed for scalability and real-time interactions.

## Constraints

- **Tech Stack**: MERN (MongoDB, Express, React, Node.js) with Tailwind CSS.
- **Real-time**: Must use Socket.IO for live bidding and chat.
- **Security**: Must handle financial transactions securely; password hashing with bcrypt, JWT for auth.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| MERN Stack | High performance for real-time apps and standard for modern web development. | — Pending |
| Dual Commission Model | 7% Seller fee and 4% Buyer fee for platform sustainability. | — Pending |
| Escrow System | Essential for building trust in the marketplace. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-28 after initialization*
