import React from "react"

function TenDayChart({ title, data, label }) {
  console.log(data, "TENDAY CHART DATA FOR", title)

  var maxValue = Math.max.apply(null, data)
  var minValue = Math.min.apply(null, data)
  var height = 300
  var valueMargin = 0.1
  var maxDiff = maxValue - minValue

  var barHeights = []
  var tickHeights = []
  var numberTicks = 5

  for (let i = 0; i < numberTicks; i++) {
    var tickValue = minValue - maxDiff * valueMargin
    var tickHeight = (i * maxDiff * (1 + 2 * valueMargin)) / (numberTicks - 1)
    console.log(tickHeight)

    tickHeights.push(tickHeight)
  }

  return (
    <div className="hover-chart" style={{ height: `400px` }}>
      <h2>{title} (Last Ten Days)</h2>
      <div className="container">
        <div className="x-axis"></div>
        <div className="y-axis">
          {tickHeights.map(tick => (
            <div>{Math.round(tick)}</div>
          ))}
        </div>
        <div className="data">
          {data.map(bar => (
            <Bar
              height={
                (height * (1 - 2 * valueMargin) * (bar - minValue)) / maxDiff +
                height * valueMargin
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Bar({ height }) {
  return (
    <div className="bar" style={{ height: `${height}px`, width: "10%" }}></div>
  )
}

export default TenDayChart
