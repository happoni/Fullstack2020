import React from 'react'

const Filter = ({handleSearchChange}, {searchCondition}) => {
  return (
    <form onSubmit={handleSearchChange}>
      Filter:
      <input
        value={searchCondition}
        onChange={handleSearchChange}
      />          
    </form>   
  )
}

export default Filter