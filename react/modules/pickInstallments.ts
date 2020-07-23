import { Installments } from '../components/InstallmentsContext'

type ClusterBy = keyof Installments

/**
 * Pick which installments should be used, first it cluster all installments
 * by the value of clusterBy, then pick the cluster with the biggest amount of
 * installments options and then return this list sorted by the amount of installments
 * @param installmentsList All installments
 * @param clusterBy
 */
export default function pickInstallments(
  installmentsList: Installments[],
  clusterBy: ClusterBy
) {
  const clusteredInstallments = clusterInstallments(installmentsList, clusterBy)

  const pickedInstallments = pickMaxOption(clusteredInstallments)

  return pickedInstallments.sort(
    (a, b) => a.NumberOfInstallments - b.NumberOfInstallments
  )
}

/**
 * Cluster installments by the passed key of installments type
 * @param installmentsList List of installments to be clustered
 * @param clusterBy Key to be clustered by
 */
function clusterInstallments(
  installmentsList: Installments[],
  clusterBy: keyof Installments
) {
  const clusteredInstallments: Record<string, Installments[]> = {}

  for (const installment of installmentsList) {
    if (!clusteredInstallments[installment[clusterBy]]) {
      clusteredInstallments[installment[clusterBy]] = []
    }

    clusteredInstallments[installment[clusterBy]].push(installment)
  }

  return clusteredInstallments
}

/**
 * Pick the cluster with the biggest amount of options
 * @param clusteredInstallments
 */
function pickMaxOption(clusteredInstallments: Record<string, Installments[]>) {
  const clusterKeys = Object.keys(clusteredInstallments)
  let maxOptionCount = clusteredInstallments[clusterKeys[0]].length
  let maxOption = clusteredInstallments[clusterKeys[0]]

  for (let i = 1; i < clusterKeys.length; i++) {
    const curOption = clusteredInstallments[clusterKeys[i]]

    if (maxOptionCount < curOption.length) {
      maxOptionCount = curOption.length
      maxOption = curOption
    }
  }

  return maxOption
}
