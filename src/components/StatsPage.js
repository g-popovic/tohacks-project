import React, { useState } from 'react';
import Chart from './Chart';

export default function StatsPage() {
	return (
		<div className='page-container mx-auto p-5 shadow'>
			<div>
				<Chart />
			</div>
		</div>
	);
}
