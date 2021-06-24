export const getSuppliesForManagement = (state) => {
    return state.supplies.supplies.map(supply => {
        return {...supply, dealer:supply.catalogRecord.dealer.name, detail:supply.catalogRecord.detail.vendorCode, user: supply.user.login}
    });
}