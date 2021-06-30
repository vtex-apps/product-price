interface Props {
  showWhenUnavailable: boolean
  AvailableQuantity: number
}
/**
 * hideWhenUnavailable -> Logic to hide or show block based on props passed by store theme
 *
 * @export
 * @param {Props} {
 *   showWhenUnavailable,
 *   AvailableQuantity,
 * }
 * @returns {boolean}
 */
export function hideWhenUnavailable({
  showWhenUnavailable,
  AvailableQuantity,
}: Props): boolean {
  if (showWhenUnavailable) {
    return false
  }

  return AvailableQuantity <= 0
}
