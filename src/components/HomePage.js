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
			<div className='row mb-3 justify-content-around'>
				<div className='col-5'>
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
							<div className='history-item my-3 rounded border px-3 py-2 d-flex justify-content-between'>
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
				<div className='col-5 mb-4'>
					<h2 className='mb-4 text-center'>Your Impact</h2>
					<h4 className='text-center text-muted fw-normal'>Recorded CO2</h4>
					{history === 'loading' ? (
						<div class='spinner-border d-flex mx-auto mt-5' role='status'>
							<span class='visually-hidden'>Loading...</span>
						</div>
					) : (
						<Overview history={history} />
					)}
					<h4 className='text-center mt-4 text-muted fw-normal'>Country Average</h4>
				</div>
			</div>
		</div>
	);
}

function Overview({ history }) {
	const total = history.reduce((total, el) => (total += el.co2), 0).toFixed(2);

	return (
		<>
			<div className='overview-container'>
				<div className='text-center'>
					<p className='mb-0 text-muted'>Produced</p>
					<h5 className='red'>
						{history.reduce((total, el) => (total += Math.max(0, el.co2)), 0)}kg
					</h5>
				</div>
				<div className='text-center'>
					<p className='mb-0 text-muted'>Total</p>
					<h2 className={total > 0 ? 'red' : 'blue'}>{total}kg</h2>
				</div>
				<div className='text-center'>
					<p className='mb-0 text-muted'>Reduced</p>
					<h5 className='blue'>
						{history.reduce((total, el) => (total += Math.min(0, el.co2)), 0)}kg
					</h5>
				</div>
			</div>
		</>
	);
}
