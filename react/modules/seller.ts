import { ProductTypes } from 'vtex.product-context'

export function getDefaultSeller(sellers?: ProductTypes.Seller[]) {
  if (!sellers || sellers.length === 0) {
    return
  }

  const defaultSeller = sellers.find(seller => seller.sellerDefault)

  if (defaultSeller) {
    return defaultSeller
  }

  const availableSeller = sellers.find(
    seller => seller.commertialOffer.AvailableQuantity !== 0
  )

  return availableSeller
}
