export const calculateTotalPrice = (basePrice: number, taxes: number, discount: number = 0): number => {
  const discountAmount = (basePrice * discount) / 100
  const priceAfterDiscount = basePrice - discountAmount
  const taxAmount = (priceAfterDiscount * taxes) / 100
  const totalPrice = priceAfterDiscount + taxAmount
  return totalPrice
}

export const calculateDiscountPrice = (price: number, discount: number = 0): number => {
  const discountAmount = (price * discount) / 100
  const priceAfterDiscount = price - discountAmount
  return priceAfterDiscount
}

export const calculateTaxPrice = (price: number, taxes: number = 0): number => {
  const taxAmount = (price * taxes) / 100
  return taxAmount
}
