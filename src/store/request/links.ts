const PRODUCTS_API_HOST: string = "https://shop-api.aitschool.am";

type LinksType = {
    tokenLink: string,
    popProductsLink: string,
    currentProductLink: Function,
    addRemoveProductLink: string,
    updateCountLink: string,
    addCommentLink: string,
    rateLink: string,
    purchaseLink: string,
    categoriesLink: Function,
    collectionLink: string,
    limitedEditionLink: string,
    accessoriasLink: string,
}

export const links: LinksType = {
    tokenLink: `${PRODUCTS_API_HOST}/auth/login`,
    popProductsLink: `${PRODUCTS_API_HOST}/products/home`,
    currentProductLink: (value: string) => `${PRODUCTS_API_HOST}/products/current/${value}`,
    addRemoveProductLink: `${PRODUCTS_API_HOST}/basket`,
    updateCountLink: `${PRODUCTS_API_HOST}/basket/update_count`,
    addCommentLink: `${PRODUCTS_API_HOST}/products/comment`,
    rateLink: `${PRODUCTS_API_HOST}/products/react`,
    purchaseLink: `${PRODUCTS_API_HOST}/basket/purchase`,
    categoriesLink: (value: string) => `${PRODUCTS_API_HOST}/products/search?query=${value}`,
    collectionLink: `${PRODUCTS_API_HOST}/products/6f820745-765e-4c42-a9e1-281c0df22802`,
    limitedEditionLink: `${PRODUCTS_API_HOST}/products/ce913442-740f-4b5c-956d-bed0ea4d2e2b`,
    accessoriasLink: `${PRODUCTS_API_HOST}/products/1cd52a22-6a96-4aeb-8577-ec8f1de19c8d`
}

