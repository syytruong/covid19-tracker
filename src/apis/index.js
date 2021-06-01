import axios from "axios"

const COVID19_API = "https://api.covid19api.com"

export const getCountries = () => axios.get(COVID19_API + "/countries")

export const getReportByCountry = country =>
  axios.get(COVID19_API + `/dayone/country/${country}`)

export const getMapDataByCountryId = selectedCountryId =>
  import(
    `@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
  )
