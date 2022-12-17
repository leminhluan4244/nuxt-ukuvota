interface WeightingOptions {
  value: number
  label: string
}
export function weightingOptions() {
  const options: WeightingOptions[] = []

  for (let i = 1; i <= 6; i++) {
    options.push({
      value: i,
      label: `x${i}`,
    })
  }

  options.push({
    value: -1,
    label: '∞',
  })

  return options
}
