import React from 'react';
import { Link } from 'react-router-dom';
import axiosApp from '../utils/axiosApp';

export default function Navbar(props) {
	async function logout() {
		await axiosApp.post('/logout');
		window.location.reload();
	}

	return (
		<nav className='navbar navbar-expand-lg navbar-dark bg-dark px-5 d-flex justify-content-between'>
			<a className='navbar-brand' href='/'>
				Title
			</a>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarNav'
				aria-controls='navbarNav'
				aria-expanded='false'
				aria-label='Toggle navigation'>
				<span className='navbar-toggler-icon'></span>
			</button>
			<div className='collapse navbar-collapse navbar-content' id='navbarNav'>
				<ul className='navbar-nav'>
					<li className='nav-item'>
						<Link className='nav-link' to='/'>
							Home
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/stats'>
							Stats
						</Link>
					</li>
					<li className='nav-item'>
						<a className='nav-link' onClick={logout}>
							Logout
						</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}
