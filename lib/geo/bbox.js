// Compute the absolute sum of the differences between two
// bbox coordinates.
function diffBbox(bbox, referenceBbox) {
  return bbox.reduce((total, value, i) => {
    return total + Math.abs(value - referenceBbox[i])
  }, 0)
}

// Flip the coordinates of a bbox.
function flipBbox(bbox) {
  return [
    bbox[1],
    bbox[0],
    bbox[3],
    bbox[2]
  ]
}

// Compare two bbox and determine whether the coordinates
// in the first one are flipped.
function isBboxFlipped(bbox, referenceBbox) {
  const reversedBbox = flipBbox(bbox)

  const diff = diffBbox(bbox, referenceBbox)
  const reversedDiff = diffBbox(reversedBbox, referenceBbox)

  return reversedDiff < diff
}

module.exports = {
  diffBbox,
  flipBbox,
  isBboxFlipped
}
