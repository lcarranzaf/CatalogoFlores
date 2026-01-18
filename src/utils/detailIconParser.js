export const getDetailIcon = (detail) => {
  const lowerDetail = detail.toLowerCase()

  if (lowerDetail.includes('rosa') || lowerDetail.includes('rosas')) {
    return '🌹'
  }

  return '⭐'
}

export const parseDetails = (detailsText) => {
  if (!detailsText) {
    return []
  }

  return detailsText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .map(line => ({
      text: line,
      icon: getDetailIcon(line)
    }))
}