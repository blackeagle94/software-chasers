import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';

const Movies = () => {
	const [ movies, setMovies ] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:5000/movies')
			.then((data) => setMovies(data.data.response))
			.catch((err) => console.log(err));
	}, []);
	console.log(movies);
	return (
		<div className="container">
			<div className="d-block">
				<Button
					variant="contained"
					color="primary"
					size="small"
					className="mt-2 float-right me-3"
					startIcon={<SaveIcon />}
				>
					<Link to="/movies/addmovie" className="text-decoration-none text-white">
						Add Movie
					</Link>
				</Button>
			</div>
			<div className="row row-cols-1 row-cols-md-3 g-4 mt-2">
				{movies.length > 0 ? (
					movies.map((movie) => (
						<div className="col">
							<div className="card">
								<img src={movie.imageUrl} className="card-img-top" alt="..." />
								<div className="card-body">
									<h5 className="card-title">{movie.name}</h5>
                                    <p>Director: <span className="text-muted">{movie.director}</span></p>
                                    <p>Writer: <span className="text-muted">{movie.writer}</span></p>
                                    <p>Type: <span className="text-muted">{movie.type}</span></p>
                                    <p>Year: <span className="text-muted">{movie.year}</span></p>
                                    <p>Duration: <span className="text-muted">{movie.duration}</span></p>
                                    <p>Rate: <span className="text-muted">{movie.rate}</span></p>
								</div>
								<div className="card-footer">
									<small className="text-muted">Last updated {movie.updatedAt.slice(0,10)}</small>
									<div className="float-right">
									<EditIcon className="me-1 text-primary"/>
									<DeleteIcon className="text-danger"/>
									</div>
								</div>
							</div>
						</div>
					))
				) : null}
			</div>
		</div>
	);
};

export default Movies;
