export const getCatalogForManagement = (state) => {
    return state.catalog.catalog.map(catalogRecord => {
        return {...catalogRecord, vendorCode: catalogRecord.detail.vendorCode, dealer: catalogRecord.dealer.name}
    });
}