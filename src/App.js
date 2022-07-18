import { Card, CardContent, FormControl, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import Infobox from "./components/Infobox";
import LineGraph from "./components/LineGraph";
import Map from "./components/Map";
import Table from "./components/Table";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [flag, setFlag] = useState('')
  const [mapCenter, setMapCenter] = useState({
    lat: 19.80746,
    lng: 78.4796
  })
  const [zoom, setzoom] = useState(2)

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch("https://disease.sh/v3/covid-19/countries");
      const data = await res.json();

      const country = data.map((item) => ({
        country: item.country,
        code: item.countryInfo.iso2,
      }));
      // console.log(country)
      setTableData(data)
      // console.log(tableData)
      setCountries(country);
    };

    // NOTE: we can use another useEffect hook to fetch worldwide info
    const fetchWorldwideData = async () => {
      const res = await fetch("https://disease.sh/v3/covid-19/all")
      const data = await res.json()
      setCountryInfo(data)
    }

    fetchCountries();
    fetchWorldwideData();
  }, []);

  const countryChangeHandler = async (e) => {
    const countryCode = e.target.value;

    const url = countryCode === 'worldwide' 
    ? 'https://disease.sh/v3/covid-19/all'
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    const res = await fetch(url)
    const data = await res.json()
    setCountryInfo(data)
    // console.log(data)
    setFlag(data.countryInfo.flag)
    setCountry(countryCode);
    setMapCenter({lat: data.countryInfo.lat, lng: data.countryInfo.long})
    setzoom(4)
  };
  console.log("map",mapCenter)
  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid 19 Tracker</h1>
            <img src={flag} alt="" />
          <FormControl sx={{ minWidth: 150 }}>
            <Select value={country} onChange={countryChangeHandler}>
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country, i) => (
                <MenuItem key={i} value={country.code}>
                  {country.country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app__stats">
          <Infobox title="Coronavirus Cases" cases={countryInfo.todayCases} totalCases={countryInfo.cases} />
          <Infobox title="Recovered" cases={countryInfo.todayRecovered} totalCases={countryInfo.recovered} />
          <Infobox title="Deaths" cases={countryInfo.todayDeaths} totalCases={countryInfo.deaths} />
        </div>

        <Map countryColor={tableData} center={mapCenter} zoom={zoom} />
      </div>

      <div className="app__right">
        <Card>
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide New Cases (last 30 days)</h3>
            <LineGraph />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default App;
