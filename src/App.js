import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/Login';
import Navbar from './components/Navbar';
import { useState } from 'react';

function App() {
	const [isAuthed, setIsAuthed] = useState('loading');

	return isAuthed === 'loading' ? (
		<div class='spinner-border' role='status'>
			<span class='visually-hidden'>Loading...</span>
		</div>
	) : !isAuthed ? (
		<LoginPage />
	) : (
		<div>
			<Navbar />
			<Router>
				<Switch>
					<Route path='/' exact component={() => <h1>Home page</h1>} />
					<Route path='/profile' exact component={() => <h1>Profile page</h1>} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
