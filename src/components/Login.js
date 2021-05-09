import React, { useState } from 'react';
import axiosApp from '../utils/axiosApp';
import { countries } from '../utils/data';

export default function Login() {
	const [isRegister, setIsRegister] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [country, setCountry] = useState('');

	async function login() {
		try {
			await axiosApp.post('/login', { email, password });
			window.location.reload();
		} catch (err) {
			alert(err.response ? err.response.data : 'Unexpected error');
		}
	}

	async function register() {
		try {
			await axiosApp.post('/register', { email, password, country });
			window.location.reload();
		} catch (err) {
			alert(err.response ? err.response.data : 'Unexpected error');
		}
	}

	return (
		<div className='login-container'>
			<div className='login-panel rounded p-4 pb-3 shadow'>
				<h1 className='text-center mb-3'>{isRegister ? 'Register' : 'Login'}</h1>
				<input
					value={email}
					onChange={e => setEmail(e.target.value)}
					className='form-control my-3'
					placeholder='Email'
				/>
				{isRegister && (
					<select
						value={country}
						placeholder='Country'
						className='form-select my-3'
						onChange={e => setCountry(e.target.value)}>
						{countries.map(el => (
							<option value={el.code}>{el.name}</option>
						))}
					</select>
				)}
				<input
					value={password}
					type='password'
					onChange={e => setPassword(e.target.value)}
					className='form-control my-3'
					placeholder='Password'
				/>
				<button
					onClick={isRegister ? register : login}
					className='btn btn-dark w-100 mt-3 mb-2'>
					{isRegister ? 'Register' : 'Login'}
				</button>
				<p
					className='text-muted cursor-pointer text-center'
					onClick={() => setIsRegister(prev => !prev)}>
					<u>{isRegister ? 'Log in' : 'Register'}</u>
				</p>
			</div>
		</div>
	);
}
