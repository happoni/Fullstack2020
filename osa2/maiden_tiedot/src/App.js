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

const Country = ({ country, handleClick }) => {
  return (
    <div>
      <li>{country.name}</li>
      <Button onClick={handleClick} id={country.name} />
    </div>
  )
}

const Button = ({ onClick, id }) => {
  return (    
    <button onClick={onClick} id={id}>
      Show
    </button>
  )
}

const DetailedCountry = ({ country }) => {    
  const api_key = process.env.REACT_APP_API_KEY;  
  const params = {
    access_key: api_key,
    query: country.name
  }  
  
  axios
      .get('http://api.weatherstack.com/current', {params})
      .then(response => {    
        const weather = response.data
        console.log(weather.current.temperature)    
    })  

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
            <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt='flag' height="64" width="64" /> 
      <div>
        <h4>
          Weather in {country.name}          
        </h4>
        <p>           
          Temperature:
        </p>
      </div>
    </div>
  )
}


const Countries = ({ countriesToShow, handleClick }) => {
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
        <Country key={country.name} country={country} 
          handleClick={handleClick} />)
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

  const handleClick = (event) => {    
    setSearchCondition(event.target.id)
  }
  
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
          {<Countries countriesToShow={countriesToShow} 
            handleClick={handleClick} />}
        </ul>
      </div>
    </div>
  )
}

export default App;
