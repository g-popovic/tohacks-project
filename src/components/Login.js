import React, { useState } from 'react';
import { countries } from '../utils/data';

export default function Login() {
	const [isRegister, setIsRegister] = useState(false);

	return (
		<div className='login-container'>
			<div className='login-panel rounded p-4 pb-3 shadow'>
				<h1 className='text-center mb-3'>{isRegister ? 'Register' : 'Login'}</h1>
				<input className='form-control my-3' placeholder='Email' />
				<input className='form-control my-3' placeholder='Password' />
				{isRegister && (
					<select
						placeholder='Country'
						className='form-select my-3'
						onChange={(e, val) => console.log({ e: e.target.value, val })}>
						{countries.map(el => (
							<option value={el.code}>{el.name}</option>
						))}
					</select>
				)}
				<button className='btn btn-dark w-100 my-3'>
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
