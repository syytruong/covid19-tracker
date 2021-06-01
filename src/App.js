import React, { useEffect, useState } from "react"
import { getCountries, getReportByCountry } from "./apis"
import CountrySelector from "./components/CountrySelector"
import Highlight from "./components/Highlight"
import Summary from "./components/Summary"
import { sortBy } from "lodash"
import { Container, Typography } from "@material-ui/core"
import moment from "moment"
import "@fontsource/roboto"

function App() {
  const [countries, setCountries] = useState([])
  const [selectedCountryId, setSelectedCountryId] = useState("")
  const [report, setReport] = useState([])

  useEffect(() => {
    getCountries().then(res => {
      const sortedCountries = sortBy(res.data, "Country")
      setCountries(sortedCountries)

      setSelectedCountryId("fi")
    })
  }, [])

  const handleOnChange = e => {
    setSelectedCountryId(e.target.value)
  }

  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries?.find(
        country => country.ISO2.toLowerCase() === selectedCountryId
      )

      getReportByCountry(Slug).then(res => {
        res.data.pop()
        setReport(res.data)
      })
    }
  }, [countries, selectedCountryId])

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h2" component="h2">
        COVID-19 Statistic
      </Typography>
      <Typography>{moment().format("LLLL")}</Typography>
      <CountrySelector
        countries={countries}
        handleOnChange={handleOnChange}
        value={selectedCountryId}
      />
      <Highlight report={report} />
      <Summary selectedCountryId={selectedCountryId} report={report} />
    </Container>
  )
}

export default App
