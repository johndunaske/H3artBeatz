import React from "react";
import { Line } from "react-chartjs-2";

export default class GraphComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hrReadings: [90,90,90,130,130,130 ], // 90,90,90,130,130,130 List containing the heart rate readings to display in the graph (y axis)
      xAxis: [0, 0.5, 1, 1.5, 2, 2.5], //0, 0.5, 1, 1.5, 2, 2.5
      maxReadings: 10, // Maximum # of readings stored in the hrReadings (simulate motion of the graph)
      options: {
        elements: {
          point: {
            radius: 0,
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
            suggestedMin: 40,
            suggestedMax: 200,
          },
        },
      },
    };
  }

  addItem = () => {
    var lastVal = 0;
    var lastX = 0;
    var newY = 0;
    var newX = 0;

    if (this.state.hrReadings.length >= this.state.maxReadings) {
      lastVal = this.state.hrReadings[9];
      lastX = this.state.xAxis[9];
      newY = this.state.hrReadings.slice(1).concat(lastVal + 20);
      newX = this.state.xAxis.slice(1).concat(lastX + 0.5);
    } else {
      lastVal = this.state.hrReadings[this.state.hrReadings.length - 1];
      lastX = this.state.xAxis[this.state.xAxis.length - 1];
      newY = this.state.hrReadings.concat(lastVal + 20);
      newX = this.state.xAxis.concat(lastX + 0.5);
    }

    this.setState({ xAxis: newX, hrReadings: newY });
  };

  render() {
    const data = {
      labels: this.state.xAxis,
      datasets: [
        {
          data: this.state.hrReadings,
          fill: false,
          backgroundColor: "rgb(255, 99, 132)",
          borderColor: "rgba(255, 99, 132, 0.7)",
          borderWidth: 5,
          tension: 0.2,
        },
      ],
    };
    //<button className="addButton" onClick={this.addItem}>Add Point</button>
    return (
      <div className="graphContainer">
        <Line className="lineGraph" options={this.state.options} data={data} />
      </div>
    );
  }
}
