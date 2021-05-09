import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { countries } from '../utils/data';

export default function BarChart({ data }) {
	console.log(data);
	const [series, setSeries] = useState([
		{
			name: 'kg of CO2',
			data: data.map(el => Math.min(el.co2.toFixed(2), 0))
		},
		{
			name: 'kg of CO2',
			data: data.map(el => Math.max(el.co2.toFixed(2), 0))
		}
	]);
	const [options, setOptions] = useState({
		legend: {
			show: false
		},
		chart: {
			type: 'bar',
			height: 440,
			stacked: true,
			dropShadow: {
				enabledOnSeries: true,
				color: '#000',
				opacity: 0.0
			}
		},
		colors: ['#008FFB', '#FF4560'],
		plotOptions: {
			bar: {
				horizontal: true,
				barHeight: '80%'
			}
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			width: 1,
			colors: ['#fff']
		},

		grid: {
			xaxis: {
				lines: {
					show: false
				}
			}
		},
		yaxis: {
			min: -Math.max(...data.map(el => Math.abs(el.co2))),
			max: Math.max(...data.map(el => Math.abs(el.co2)))
		},
		tooltip: {
			shared: false,
			x: {
				formatter: function (val) {
					return val;
				}
			},
			y: {
				formatter: function (val) {
					return val + ' kg CO2';
				}
			}
		},
		xaxis: {
			categories: data.map(el => countries.find(ctry => ctry.code === el._id).name),
			title: {
				text: 'CO2 in KG'
			},
			labels: {
				formatter: function (val) {
					return val.toFixed(2) + 'kg CO2';
				}
			}
		}
	});

	return (
		<div>
			<h2>Total carbon emission per country</h2>
			<Chart options={options} series={series} type='bar' height={600} />
		</div>
	);
}
