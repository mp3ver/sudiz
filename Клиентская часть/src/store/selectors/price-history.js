export const getPriceHistory = (state) => {
    return state.history.priceHistory.map(record => {
        return {...record, vendorCode: record.catalog.detail.vendorCode, dealer: record.catalog.dealer.name}
    });
}