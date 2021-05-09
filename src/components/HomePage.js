import React, { useState } from 'react';
import axiosApp from '../utils/axiosApp';
import { itemScoreBoard } from '../utils/data';

export default function HomePage() {
	const [selectedActivity, setSelectedActivity] = useState();
	const [amount, setAmount] = useState('');

	async function submitEntry() {
		try {
			await axiosApp.post('/new-entry', { activityId: selectedActivity, units: amount });
			alert('Success');
			setAmount('');
			setSelectedActivity();
		} catch (err) {
			console.error(err);
			alert('Unexpected error');
		}
	}

	return (
		<div className='page-container mx-auto p-5 shadow'>
			<h2>Add entry</h2>
			<div className='row mt-4 mb-3'>
				<div className='col-6'>
					<div class='input-group'>
						<select
							value={selectedActivity}
							onChange={e => setSelectedActivity(e.target.value)}
							class='form-select'
							id='inputGroupSelect02'>
							<option selected>Activity...</option>
							{itemScoreBoard.map((el, index) => (
								<option value={index}>{el.name}</option>
							))}
						</select>
						<input
							value={amount}
							onChange={e => setAmount(e.target.value)}
							min={1}
							placeholder='Amount'
							type='number'
							aria-label='amount'
							class='form-control'
						/>
						{selectedActivity !== undefined && itemScoreBoard[selectedActivity].unit ? (
							<label class='input-group-text' for='inputGroupSelect02'>
								KM
							</label>
						) : null}
					</div>

					<div class='input-group mt-3'>
						<label class='input-group-text col-4' for='inputGroupSelect02'>
							Points / Unit:{' '}
							<strong>
								{itemScoreBoard[selectedActivity] &&
									itemScoreBoard[selectedActivity].points}
							</strong>
						</label>
						<label class='input-group-text col-4' for='inputGroupSelect02'>
							Total:{' '}
							<strong>
								{itemScoreBoard[selectedActivity] &&
									amount * itemScoreBoard[selectedActivity].points}
							</strong>
						</label>
						<button onClick={submitEntry} className='btn btn-outline-secondary col-4'>
							Add
						</button>
					</div>
				</div>
				<div className='col-6'>Other col</div>
			</div>
		</div>
	);
}
