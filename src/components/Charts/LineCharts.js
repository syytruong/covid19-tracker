import HighchartsReact from "highcharts-react-official"
import Highchart from "highcharts"
import React, { useEffect, useState } from "react"
import moment from "moment"
import { ButtonGroup, Button } from "@material-ui/core"

const generateOptions = data => {
  const categories = data.map(item => moment(item.Date).format("DD/MM/YY"))
  return {
    chart: {
      height: 500,
    },
    title: {
      text: "Total infections",
    },
    xAxis: {
      categories: categories,
      crosshair: true,
    },
    color: ["#F3585B"],
    yAxis: {
      min: 0,
      title: {
        text: null,
      },
      labels: {
        align: "right",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.v} cases</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: [
      {
        name: "Total Infection",
        data: data.map(item => item.Confirmed),
      },
    ],
  }
}

const LineCharts = ({ data }) => {
  const [options, setOptions] = useState({})
  const [reportType, setReportType] = useState("all")

  useEffect(() => {
    let customData = []
    switch (reportType) {
      case "all":
        customData = data
        break
      case "month":
        customData = data.slice(data.length - 30)
        break
      case "week":
        customData = data.slice(data.length - 7)
        break
      default:
        customData = data
        break
    }

    setOptions(generateOptions(customData))
  }, [data, reportType])

  return (
    <div>
      <ButtonGroup
        size="small"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button
          color={reportType === "all" ? "secondary" : ""}
          onClick={() => setReportType("all")}
        >
          All
        </Button>
        <Button
          color={reportType === "month" ? "secondary" : ""}
          onClick={() => setReportType("month")}
        >
          30 Days
        </Button>
        <Button
          color={reportType === "week" ? "secondary" : ""}
          onClick={() => setReportType("week")}
        >
          7 Days
        </Button>
      </ButtonGroup>
      <HighchartsReact highcharts={Highchart} options={options} />
    </div>
  )
}

export default React.memo(LineCharts)
