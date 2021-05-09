import React, { useState } from 'react';
import Chart from 'react-apexcharts';
import { countries } from '../utils/data';

export default function HistoryChart({ data }) {
	const [series, setSeries] = useState([
		{
			name: 'south',
			data: data.map(el => ({ x: el.date, y: el.co2 }))
		}
	]);
	const [options, setOptions] = useState({
		chart: {
			type: 'area',
			zoom: { enabled: false },
			toolbar: false,
			height: 350
		},
		dataLabels: {
			enabled: false
		},
		stroke: {
			curve: 'straight'
		},

		xaxis: {
			type: 'datetime',
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			}
		},
		yaxis: {
			tickAmount: 4,
			floating: false,

			labels: {
				style: {
					colors: '#8e8da4'
				},
				offsetY: -7,
				offsetX: 0
			},
			axisBorder: {
				show: false
			},
			axisTicks: {
				show: false
			}
		},
		fill: {
			opacity: 0.5
		},
		tooltip: {
			x: {
				format: 'yyyy'
			},
			fixed: {
				enabled: false,
				position: 'topRight'
			}
		},
		grid: {
			yaxis: {
				lines: {
					offsetX: -30
				}
			},
			padding: {
				left: 20
			}
		}
	});

	return (
		<div id='chart'>
			<Chart options={options} series={series} type='area' height={350} />
		</div>
	);
}
