import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import Header from './components/dashboard/Header';
import HomePage from './components/dashboard/HomePage'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/users/Login'
import SignUp from './components/users/Register'
import AddMovie from './components/movies/AddMovie'
import Movies from './components/movies/Movies'
import Posts from './components/Posts/Posts'

function App() {
	const [ file, setFile ] = useState();

	const UploadImage = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('images', file[0]);
		axios
			.post('http://localhost:5000/', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
			.then((data) => console.log(data))
			.catch((err) => console.log(err));
	};

	return (
		<Router>
				<Header />
				<Route exact path="/" render={() => <HomePage />}/>
				<Route exact path="/login" render={() => <Login />}/>
				<Route exact path="/signup" render={() => <SignUp />}/>
				<Route exact path="/movies" render={() => <Movies />}/>
				<Route exact path="/posts" render={() => <Posts />}/>
				<Route exact path="/movies/addmovie" render={() => <AddMovie />}/>
		</Router>
	);
}

export default App;
