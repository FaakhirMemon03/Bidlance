import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
        balance: 0,
        pendingBalance: 0,
        withdrawableBalance: 0,
        transactions: [],
        isLoading: false,
    },
    reducers: {
        setWallet(state, action) {
            const w = action.payload;
            state.balance = w.balance;
            state.pendingBalance = w.pendingBalance;
            state.withdrawableBalance = w.withdrawableBalance;
        },
        setTransactions(state, action) {
            state.transactions = action.payload;
        },
        setWalletLoading(state, action) {
            state.isLoading = action.payload;
        },
    },
});

export const { setWallet, setTransactions, setWalletLoading } = walletSlice.actions;
export default walletSlice.reducer;
