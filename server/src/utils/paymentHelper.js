/**
 * Calculates the breakdown of a project payment.
 * @param {number} projectAmount - The base price of the project.
 * @param {number} sellerFeePercent - Default 7% (0.07)
 * @param {number} buyerFeePercent - Default 4% (0.04)
 */
const calculatePaymentBreakdown = (projectAmount, sellerFeePercent = 0.07, buyerFeePercent = 0.04) => {
    const buyerFee = projectAmount * buyerFeePercent;
    const sellerFee = projectAmount * sellerFeePercent;

    const totalBuyerPays = projectAmount + buyerFee;
    const sellerReceives = projectAmount - sellerFee;
    const totalAdminProfit = buyerFee + sellerFee;

    return {
        projectAmount,
        buyerFee,
        sellerFee,
        totalBuyerPays,
        sellerReceives,
        totalAdminProfit
    };
};

module.exports = { calculatePaymentBreakdown };
