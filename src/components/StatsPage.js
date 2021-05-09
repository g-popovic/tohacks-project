import React, { useEffect, useState } from 'react';
import axiosApp from '../utils/axiosApp';
import Chart from './Chart';

export default function StatsPage() {
	const [data, setData] = useState('loading');

	useEffect(() => {
		(async function () {
			const { data } = await axiosApp.get('/statistic');
			setData(data);
		})();
	}, []);

	return (
		<div className='page-container mx-auto p-5 shadow'>
			<div>
				{data === 'loading' ? (
					<div className='total-center'>
						<div class='spinner-border' role='status'>
							<span class='visually-hidden'>Loading...</span>
						</div>
					</div>
				) : (
					<Chart data={data} />
				)}
			</div>
		</div>
	);
}
