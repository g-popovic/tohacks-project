import React, { useEffect, useState } from 'react';
import axiosApp from '../utils/axiosApp';
import { itemScoreBoard } from '../utils/data';
import moment from 'moment';

export default function HomePage() {
	const [selectedActivity, setSelectedActivity] = useState();
	const [amount, setAmount] = useState('');
	const [history, setHistory] = useState('loading');

	console.log(history);

	async function submitEntry() {
		try {
			await axiosApp.post('/new-entry', { activityId: selectedActivity, amount });
			setHistory('loading');
			await updateEntries();
			setAmount('');
			setSelectedActivity();
		} catch (err) {
			console.error(err);
			alert('Unexpected error');
		}
	}

	useEffect(() => {
		updateEntries();
	}, []);

	async function updateEntries() {
		const { data } = await axiosApp.get('/my-activites');
		setHistory(data);
	}

	return (
		<div className='page-container mx-auto p-5 shadow'>
			<div className='row mb-3'>
				<div className='col-6'>
					<h2 className='mb-4'>Add Entry</h2>
					<div className='input-group'>
						<select
							value={selectedActivity}
							onChange={e => setSelectedActivity(e.target.value)}
							className='form-select'
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
							className='form-control'
						/>
						{selectedActivity !== undefined && itemScoreBoard[selectedActivity].unit ? (
							<label className='input-group-text' for='inputGroupSelect02'>
								{itemScoreBoard[selectedActivity].unit}
							</label>
						) : null}
					</div>

					<div className='input-group mt-3'>
						<label className='input-group-text col-4 d-flex' for='inputGroupSelect02'>
							<span className='d-block' style={{ marginRight: '0.4rem' }}>
								CO2 / Unit:
							</span>
							<strong className='d-block'>
								{itemScoreBoard[selectedActivity] &&
									itemScoreBoard[selectedActivity].co2PerUnit + 'kg'}
							</strong>
						</label>
						<label className='input-group-text col-4 d-flex' for='inputGroupSelect02'>
							<span style={{ marginRight: '0.4rem' }} className='d-block'>
								Total:{' '}
							</span>
							<strong className='d-block'>
								{itemScoreBoard[selectedActivity] &&
									(amount * itemScoreBoard[selectedActivity].co2PerUnit).toFixed(
										2
									) + 'kg'}
							</strong>
						</label>
						<button onClick={submitEntry} className='btn btn-outline-secondary col-4'>
							Add
						</button>
					</div>

					{/* HISTORY */}

					<hr className='hr' />
					<h2 className='mb-4 mt-0'>My Activity</h2>
					{history === 'loading' ? (
						<div className='spinner-border d-block mx-auto mt-5' role='status'>
							<span className='visually-hidden'>Loading...</span>
						</div>
					) : (
						history.map(el => (
							<div className='my-3 rounded border px-3 py-2 d-flex justify-content-between'>
								<span className='d-flex align-items-center'>
									<strong>{el.name}</strong>
									<span className='mx-2 mr-0'>
										x {el.amount}
										{el.unit}
									</span>
								</span>

								<span>{moment(el.createdAt).format('HH:MM - DD. MMM')}</span>
								<strong>CO2: {el.co2}kg</strong>
							</div>
						))
					)}
				</div>
				<div className='col-6'></div>
			</div>
		</div>
	);
}
