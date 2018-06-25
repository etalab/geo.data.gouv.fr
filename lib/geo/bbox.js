// Compute the absolute sum of the differences between two
// bbox coordinates.
export function diffBbox(bbox, referenceBbox) {
  return bbox.reduce((total, value, i) => {
    return total + Math.abs(value - referenceBbox[i])
  }, 0)
}

// Flip the coordinates of a bbox.
export function flipBbox(bbox) {
  return [
    bbox[1],
    bbox[0],
    bbox[3],
    bbox[2]
  ]
}

// Compare two bbox and determine whether the coordinates
// in the first one are flipped.
export function isBboxFlipped(bbox, referenceBbox) {
  const reversedBbox = flipBbox(bbox)

  const diff = diffBbox(bbox, referenceBbox)
  const reversedDiff = diffBbox(reversedBbox, referenceBbox)

  return reversedDiff < diff
}

// Make sure the passed bbox is valid.
export function isBboxValid(bbox) {
  return (
    bbox.length === 4 &&
    bbox[0] >= -180 && bbox[0] <= 180 &&
    bbox[2] >= -180 && bbox[2] <= 180 &&
    bbox[1] >= -90 && bbox[1] <= 90 &&
    bbox[3] >= -90 && bbox[3] <= 90
  )
}
