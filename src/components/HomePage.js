import React, { useEffect, useState } from 'react';
import axiosApp from '../utils/axiosApp';
import { itemScoreBoard } from '../utils/data';
import moment from 'moment';

export default function HomePage() {
	const [selectedActivity, setSelectedActivity] = useState();
	const [amount, setAmount] = useState('');
	const [history, setHistory] = useState('loading');

	async function submitEntry() {
		try {
			await axiosApp.post('/new-entry', { activityId: selectedActivity, units: amount });
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
					<h2 className='mb-4'>Add entry</h2>
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
								KM
							</label>
						) : null}
					</div>

					<div className='input-group mt-3'>
						<label className='input-group-text col-4' for='inputGroupSelect02'>
							Points / Unit:{' '}
							<strong>
								{itemScoreBoard[selectedActivity] &&
									itemScoreBoard[selectedActivity].points}
							</strong>
						</label>
						<label className='input-group-text col-4' for='inputGroupSelect02'>
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
				<div className='col-6'>
					<h2 className='mb-4'>My History</h2>
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
										x {el.units}
										{el.unit}
									</span>
								</span>

								<span>{moment(el.createdAt).format('HH:MM - DD. MMM')}</span>
								<strong>{el.totalPoints}</strong>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}
