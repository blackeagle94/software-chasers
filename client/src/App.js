import React, { useState, useEffect } from 'react';
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
import isAuth from './Auth/isAuth'
import NotAuth from './Auth/Not_Auth'

function App() {
	const [ file, setFile ] = useState();
	const [isLoggedin, setIsLoggedin] = useState(false)
	const [jwt, setJwt] = useState(false);


	useEffect(() => {
        const info = JSON.parse(sessionStorage.getItem('info'))
        if(info) {
            setIsLoggedin(true)
        } else {
			sessionStorage.removeItem('token')
            setIsLoggedin(false)
        }
    })


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
				<Header setIsLoggedin={setIsLoggedin} isLoggedin={isLoggedin}/>
				<Route exact path="/" render={() => <HomePage />}/>
				<Route exact path="/login" render={() => <Login setIsLoggedin={setIsLoggedin}/>}/>
				<Route exact path="/signup" render={() => <SignUp />}/>
				<Route exact path="/movies" render={() => {
					const token = isAuth();
					token
						.then((res) => {
							setJwt(res);
						})
						.catch((err) => err);
					if (jwt) {
						return <Movies />;
					} else {
						return <NotAuth />;
					}
				}}/>
				<Route exact path="/posts" render={() => {
					const token = isAuth();

					token
						.then((res) => {
							setJwt(res);
						})
						.catch((err) => err);
				
					if (jwt) {
						return <Posts />;
					} else {
						return <NotAuth />;
					}
				}}/>
				<Route exact path="/movies/addmovie" render={() => {
					const token = isAuth();

					token
						.then((res) => {
							setJwt(res);
						})
						.catch((err) => err);
				
					if (jwt) {
						return <AddMovie />;
					} else {
						return <NotAuth />;
					}
				}}/>
		</Router>
	);
}

export default App;
