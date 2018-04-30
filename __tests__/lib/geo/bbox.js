import {diffBbox, flipBbox, isBboxFlipped} from '../../../lib/geo/bbox'

describe('diffBbox', () => {
  it('should return 0 for equal bboxes', () => {
    const bbox = [164.6188, -22.37823333, 166.8929, -20.97443333]

    expect(diffBbox(bbox, bbox)).toBe(0)
  })

  it('should return a positive number for different bboxes', () => {
    const bbox1 = [164.6188, -22.37823333, 166.8929, -20.97443333]
    const bbox2 = [163.983, -22.6739, 168.131, -20.0879]

    expect(diffBbox(bbox1, bbox2)).toBeGreaterThan(0)
  })

  it('should return a higher number for very different bboxes', () => {
    const bbox1 = [164.6188, -22.37823333, 166.8929, -20.97443333]
    const bbox2 = [163.983, -22.6739, 168.131, -20.0879]
    const bbox3 = [-22.37823333, 164.6188, -20.97443333, 166.8929]

    const similar = diffBbox(bbox1, bbox2)
    const different = diffBbox(bbox1, bbox3)

    expect(similar).toBeLessThan(different)
  })
})

describe('flipBbox', () => {
  it('should flip the coordinates of a bbox', () => {
    const bbox1 = [164.6188, -22.37823333, 166.8929, -20.97443333]
    const bbox2 = [-22.37823333, 164.6188, -20.97443333, 166.8929]

    expect(flipBbox(bbox1)).toEqual(bbox2)
  })
})

describe('isBboxFlipped', () => {
  it('should return false for similar bboxes', () => {
    const bbox1 = [164.6188, -22.37823333, 166.8929, -20.97443333]
    const bbox2 = [163.983, -22.6739, 168.131, -20.0879]

    expect(isBboxFlipped(bbox1, bbox2)).toBe(false)
  })

  it('should return true for flipped bboxes', () => {
    const bbox = [164.6188, -22.37823333, 166.8929, -20.97443333]
    const flipped = flipBbox(bbox)

    expect(isBboxFlipped(bbox, flipped)).toBe(true)
  })
})
