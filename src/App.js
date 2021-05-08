import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/Login';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';
import axiosApp from './utils/axiosApp';

function App() {
	const [isAuthed, setIsAuthed] = useState('loading');

	useEffect(() => {
		(async function () {
			const { data } = await axiosApp.get('/status');
			console.log(data);
			setIsAuthed(data.isAuthed);
		})();
	}, []);

	return isAuthed === 'loading' ? (
		<div className='total-center'>
			<div class='spinner-border' role='status'>
				<span class='visually-hidden'>Loading...</span>
			</div>
		</div>
	) : !isAuthed ? (
		<LoginPage />
	) : (
		<div>
			<Router>
				<Navbar />
				<Switch>
					<Route path='/' exact component={() => <h1>Home page</h1>} />
					<Route path='/profile' exact component={() => <h1>Profile page</h1>} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
