// src/App.jsx
import { useState, useEffect } from "react";
import axios from 'axios'

export default function App() {

  const [countries, setCountries] = useState(null);
  const [visibleCountries, setVisibleCountries] = useState(null)
  const [countrySearch, setCountrySearch] = useState(null)
  const [countriesLoaded, setCountriesLoaded] = useState(false)

  const handleCountrySearch = (event) => {

     if(countries){
setCountrySearch(event.target.value)
setVisibleCountries(countries.filter(country => country.name.common.toLowerCase().indexOf(event.target.value.toLowerCase()) > -1))
     }else{
      setCountrySearch([])
     }
    // console.log(event.target.value)
    //  setCountrySearch(event.target.value);
  }


  const makeOnlyVisible = (c) => {
// console.log(c);
console.log(visibleCountries);
setVisibleCountries([c]);

  }

  const loadCountries = () => {

      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          console.log('countries loaded')
          console.log(response.data)
          setCountries(response.data)
        })
    
  }

  if(!countriesLoaded){
loadCountries()
setCountriesLoaded(true)
}
  return (
    <div>
            <div>
      country search: <input onChange={handleCountrySearch}/>
      </div>
      <div>

   { countrySearch != '' && visibleCountries && visibleCountries.length>10 ? 'more than ten countries, refine your search' : null }
   { visibleCountries && visibleCountries.length !== 1 && visibleCountries.length < 11 ? visibleCountries.map((c) => (
      <div key={Math.floor(10000000 + Math.random() * 90000000)}>
         {c.name.common} <button onClick={ () => makeOnlyVisible(c)}>show</button>
      </div>
    )) : null
  }
   { visibleCountries && visibleCountries.length == 1 ? visibleCountries.map((c) => (
      <div key={Math.floor(10000000 + Math.random() * 90000000)}>
        <h2>{c.name.common}</h2><br/>
        area:{c.area}<br/>
        capital: {c.capital}<br/>
 
        flag: {c.flag}<br/>
        <img src={c.flags.png} /><br/>
               languages:<br/>
    <ul>
      {Object.entries(c.languages).map(([key, value]) => (
        <li key={key}>
          {/* <strong>{key}:</strong>{" "} */}
          {typeof value === "object" ? JSON.stringify(value) : String(value)}
        </li>
      ))}
    </ul>

      </div>
    )) : null
  }

      </div>
    </div>
  );
}
