import React, { useState } from 'react';
import { FormControl, Input, TextField, Button } from '@material-ui/core';
import axios from 'axios';

const AddMovie = () => {
	const [ poster, setPoster ] = useState(true);
	const [ name, setName ] = useState('');
	const [ director, setDirector ] = useState('');
	const [ writer, setWriter ] = useState('');
	const [ type, setType ] = useState('');
	const [ year, setYear ] = useState('');
	const [ duration, setDuration ] = useState('');
	const [ rate, setRate ] = useState('');
	const [ imageUrl, setImageUrl ] = useState('');
	const [ imageLocal, setImageLocal ] = useState(null);

	const newMovie = e => {
		if(imageLocal) {
			const formData = new FormData()

			formData.append('name', name)
			formData.append('director', director)
			formData.append('writer', writer)
			formData.append('type', type)
			formData.append('year', year)
			formData.append('duration', duration)
			formData.append('rate', rate)
			formData.append('userId', '608174651dd156381c3fe300')
			formData.append('images', imageLocal[0])

			axios.post('http://localhost:5000/movies', formData)
			.then(data => console.log(data.data))
			.catch(err => console.log(err))
		} else {
			axios.post('http://localhost:5000/movies', {
				name, director, writer, type, year, duration, rate, imageUrl,
				userId:'608174651dd156381c3fe300'
			})
			.then(data => console.log(data.data))
			.catch(err => console.log(err))
		}
	}

	return (
		<div className="container d-flex justify-content-center mb-2">
			<FormControl className="d-flex justify-content-center col-6" >
			<h1 className="text-center">Add Movie</h1>
				<TextField className="mt-2" type="text" label="Movie Name" required autoFocus value={name} onChange={e => setName(e.target.value)}/>
				<TextField className="mt-2" type="text" label="Director" required value={director} onChange={e => setDirector(e.target.value)}/>
				<TextField className="mt-2" type="text" label="Writer" required value={writer} onChange={e => setWriter(e.target.value)}/>
				<TextField className="mt-2" type="text" label="Type" required value={type} onChange={e => setType(e.target.value)}/>
				<TextField className="mt-2" type="number" label="Year" required value={year} onChange={e => setYear(e.target.value)}/>
				<TextField className="mt-2" type="text" label="Duration" required value={duration} onChange={e => setDuration(e.target.value)}/>
				<TextField className="mt-2" type="number" label="Rate" required value={rate} onChange={e => setRate(e.target.value)}/>
				<p>
					Upload Poster <label htmlFor="Url">Url </label> {' '}
					<input type="radio" id="Url" name="poster" onClick={() => setPoster(true)} checked={poster}/>{' '}
					<label htmlFor="Local">Local </label>{' '}
					<input type="radio" id="Local" name="poster" onClick={() => setPoster(false)} />
				</p>
				{poster ? (
					<TextField className="mt-2" id="poster" type="text" label="Enter poster url" required value={imageUrl} onChange={e => setImageUrl(e.target.value)}/>
				) : (
					<TextField className="mt-2" id="poster" type="file" label="Upload poster" required autoFocus  onChange={e => setImageLocal(e.target.files)}/>
				)}
				<Button variant="contained" color="primary" className="mt-2" onClick={newMovie}>
					Submit
				</Button>
			</FormControl>
		</div>
	);
};

export default AddMovie;
