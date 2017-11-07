import React from 'react'

import SearchInput from '../search-input'

const Header = () => (
  <div>
    <SearchInput hasButton />

    <style jsx>{`
      div {
        margin-right: 240px;
      }
    `}</style>
  </div>
)

export default Header
