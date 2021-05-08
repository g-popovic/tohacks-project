import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LoginPage from './components/Login';
import Navbar from './components/Navbar';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/login' component={LoginPage} />

				<div>
					<Navbar />
					<Route path='/' exact component={() => <h1>Home page</h1>} />
					<Route path='/profile' exact component={() => <h1>Profile page</h1>} />
				</div>
			</Switch>
		</Router>
	);
}

export default App;
