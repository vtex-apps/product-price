interface HideProductPriceParams {
  alwaysShow: boolean
  AvailableQuantity: number
}
/**
 * hideProductPrice -> Logic to hide or show block based on props passed by store theme
 *
 * @export
 * @param {HideProductPriceParams} {
 *   alwaysShow,
 *   AvailableQuantity,
 * }
 * @returns {boolean}
 */
export function hideProductPrice({
  alwaysShow,
  AvailableQuantity,
}: HideProductPriceParams): boolean {
  if (alwaysShow) {
    return false
  }

  return AvailableQuantity <= 0
}
