# Pitfalls Research: Bidlance Marketplace

## Critical Risks

| Pitfall | Prevention Strategy | Phase |
|---------|---------------------|-------|
| **Financial Compliance** | Use licensed providers (Stripe/PayFast) instead of holding funds in personal bank accounts. Implement KYC early. | Phase 1 |
| **Race Conditions** | Never trust client-side bid validation. Use atomic MongoDB updates (`$gt`) to ensure bids are sequential. | Phase 4 |
| **Platform Leakage** | Detect emails/phone numbers in chat and block them. Offer clear value for staying on-platform (Escrow). | Phase 5 |
| **Bid Sniping** | Implement "Extended Bidding": If a bid is placed in the last 60 seconds, add 60 more seconds to the timer. | Phase 4 |
| **Escrow Disputes** | Clear Terms of Service and mandatory milestone approvals. Use partial refunds to resolve simple conflicts. | Phase 3 |

## Warning Signs
- **Laggy Bid Updates**: Indicates websocket bottlenecks or unoptimized DB queries.
- **High Refund Rate**: Indicates poor seller vetting or unclear requirement gathering.
- **Low Bid Participation**: Indicates "reserve price" is too high or onboarding is too friction-heavy.

## Technical Debt to Avoid
- **Hard-coding Fee Percentages**: Store these in a central config or DB settings to allow adjustments (e.g., 7% to 5%) without code changes.
- **No Ledger Logging**: Every wallet movement must have a corresponding transaction log entry for auditing.
