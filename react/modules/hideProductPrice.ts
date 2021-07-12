interface HideProductPriceParams {
  alwaysShow: boolean
  availableQuantity: number
}
/**
 * hideProductPrice -> Logic to hide or show block based on props passed by store theme
 *
 * @export
 * @param {HideProductPriceParams} {
 *   alwaysShow,
 *   availableQuantity,
 * }
 * @returns {boolean}
 */
export function hideProductPrice({
  alwaysShow,
  availableQuantity,
}: HideProductPriceParams): boolean {
  if (alwaysShow) {
    return false
  }

  return availableQuantity <= 0
}
