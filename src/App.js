import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/Login';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import { useEffect, useState } from 'react';
import axiosApp from './utils/axiosApp';
import StatsPage from './components/StatsPage';

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
					<Route path='/' exact component={HomePage} />
					<Route path='/stats' exact component={StatsPage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
