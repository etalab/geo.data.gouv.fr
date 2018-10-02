import prune from '../../../lib/string/prune'

describe('string.prune', () => {
  it('should truncate strings', () => {
    expect(
      prune('aaaaaaaaaaaaaaaaaa', 10)
    ).toHaveLength(10)
  })

  it('should replace the last char with an elipsis', () => {
    expect(
      prune('aaa', 2)
    ).toEqual('a…')
  })

  it('should prefer truncating on whitespaces', () => {
    expect(
      prune('I prefer to split on a word', 15)
    ).toEqual('I prefer to…')
  })

  it('should truncate on newlines', () => {
    expect(
      prune('This is interesting\nYes thanks', 22)
    ).toEqual('This is interesting…')
  })

  it('should truncate on some punctuation', () => {
    expect(
      prune('I believe that this is true: the truth.', 30)
    ).toEqual('I believe that this is true…')
  })
})
