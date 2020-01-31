import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({handleSearchChange, searchCondition}) => {
  return (
    <form onSubmit={handleSearchChange}>
      Search countries: 
      <input
        value={searchCondition}
        onChange={handleSearchChange}
      />
    </form>
  )
}

const Country = ({ country }) => {
  return (
    <li>{country.name}</li>
  )
}


const DetailedCountry = ({ country }) => {
  return (
    <div>
      <h2>{country.name}</h2>
        <p>
          Capital: {country.capital}
        </p>
        <p>
          Population: {country.population}
        </p>
      <h3>Languages</h3>
        <ul>
          {country.languages.map(language =>
            <li>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt='flag' height="64" width="64" /> 
    </div>
  )
}

const Countries = ({ countriesToShow }) => {
  if (countriesToShow.length > 10) {
    return (
      <div>
        <p>
          Too many countries found!
        </p>
      </div>
    )
  } else if (countriesToShow.length === 1) {
    return (
      countriesToShow.map(country => 
      <DetailedCountry key={country.name} country={country} />)
    )
  } else {
    return (    
      countriesToShow.map(country =>
        <Country key={country.name} country={country} />)
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCondition, setSearchCondition] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchCondition(event.target.value)
  }
  
  const countriesToShow = countries.filter(country =>
    (country.name.includes(searchCondition)))
  
  
  return (
    <div>
      <div>
        {<Filter searchCondition={searchCondition}
          handleSearchChange={handleSearchChange}
        />}
      </div>
      <div>
        <ul>
          {<Countries countriesToShow={countriesToShow} />}
        </ul>
      </div>
    </div>
  )
}

export default App;
