import { Grid } from "@material-ui/core"
import React, { useEffect, useState } from "react"
import LineCharts from "./Charts/LineCharts"
import HighMaps from "./Charts/HighMaps"
import { getMapDataByCountryId } from "../apis/index"

function Summary({ report, selectedCountryId }) {
  const [mapData, setMapData] = useState({})

  useEffect(() => {
    if (selectedCountryId) {
      getMapDataByCountryId(selectedCountryId)
        .then(res => setMapData(res))
        .catch(err => console.warn(err))
    }
  }, [selectedCountryId])

  return (
    <div style={{ marginTop: 10 }}>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineCharts data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HighMaps mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  )
}

export default Summary
