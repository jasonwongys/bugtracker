import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './chart.css';

class Chart extends Component {

    
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         chartData: this.props.chartData
    //     }
        
    // }
    

    // componentDidMount() {
    //     axios.get("http://localhost:4000/projects")
    //     .then(response => {
    //         this.setState({
    //         data: response.data});
    //         console.log("Projects here" + JSON.stringify(response.data));
    //         })
    //     .catch(err => {
    //         console.log("Error",err);
    //     })
    // }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right'

    }
    render() {
        console.log("Props", this.props);
        // console.log("Prop labels", this.state.chartData.labels)

        return (
            <div className="container-wrapper">
            
            <div className="chartArea">
                <Bar
                    data={this.props.chartData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Number of Bugs in Projects',
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                    }}
                    />
            </div>

            <div className="chartArea">
                <Pie
                    data={this.props.chartData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Number of Bugs in Projects',
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                    }}
                    />
            </div>
                {/* <Line
                    data={this.props.chartData}
                    options={{
                        title: {
                            display: this.props.displayTitle,
                            text: 'Number of Bugs in Projects',
                            fontSize: 25
                        },
                        legend: {
                            display: this.props.displayLegend,
                            position: this.props.legendPosition
                        }
                    }}
                    /> */}
            </div>
        )
    }
}

export default Chart;