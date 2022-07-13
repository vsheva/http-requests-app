import React, { useState, useEffect, useCallback } from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        'https://react-http-53159-default-rtdb.firebaseio.com/movies.json',
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      console.log(data);


     /* const transformedMovies = [];

      for (const key in data) {
        transformedMovies.push({
          id: key,
          title: data[key].title,
          releaseDate: data[key].releaseDate,
          openingText: data[key].openingText,
        });
      }
*/
      const transformedMovies = Object.entries(data).map(([key, value]) => {
          return {
              id: key,
              title: value.title,
              releaseDate: value.releaseDate,
              openingText: value.openingText,
          }
      })





      /*  const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });*/
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHandler(movie) {
    const response = await fetch(
      'https://react-http-53159-default-rtdb.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await response.json();
  }

  /* let content = <p>Found no movies.</p>;

     if (movies.length > 0) {
         content = <MoviesList movies={movies} />;
     }

     if (error) {
         content = <p>{error}</p>;
     }

     if (isLoading) {
         content = <p>Loading...</p>;
     }*/

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && !error && <p>No films found</p>}
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;

/*
import React, {useState, useEffect, useCallback} from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {

    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        fetchMoviesHandler();
    },[])


    const fetchMoviesHandler = useCallback(async () => {

        try{
            setIsLoading(true) //!*
            const response = await fetch("https://swapi.dev/api/films")
            console.log("response", response)

            if (!response.ok){           //получается выполнится, когда false, что неверно           //так значит !response.ok === response.ok!=true
                throw new Error("Something went wrong!")
            }

            const data = await response.json();


            const transformedMovies = data.results.map(movieData => {
                return {
                    id: movieData.episode_id,
                    title: movieData.title,
                    openingText: movieData.opening_crawl,
                    releaseDate: movieData.release_date
                    //setMovies(data.results)
                }
            });
            setMovies(transformedMovies)  //!*

        } catch(error){
            setError(error.message)
        }
        setIsLoading(false)
    })

    //upgrade
  /!*  let content = <p>No films found.</p>

    if (movies.length > 0 ) {
        content = <MoviesList movies={movies}/>
    }
    if (error) {
        content = <p>{error}</p>
    }
    if (isLoading) {
        content = <p>Loading...</p>
    }*!/


    return (
        <React.Fragment>
            <section>
                <button onClick={fetchMoviesHandler}>Fetch Movies</button>
            </section>
            <section>
                {!isLoading && movies.length > 0 && <MoviesList movies={movies}/>}
                {!isLoading && movies.length === 0 && !error && <p>No films found</p>}
                {!isLoading && error && <p>{error}</p>}
                {isLoading && <p>Loading...</p>}
            </section>
        </React.Fragment>
    );
}

export default App;
*/

/*
const fetchMoviesHandler =()=>{
     return fetch("https://swapi.dev/api/films")
         .then(response=>response.json())
         .then(data=>{
             const transformedMovies= data.results.map(movieData=>{
                 return  {
                     id: movieData.episode_id,
                     title: movieData.title,
                     openingText: movieData.opening_crawl,
                     releaseDate: movieData.release_date
                     //setMovies(data.results)
                 }
             });
             setMovies(transformedMovies)
         })
 }
*/

/* const fetchMoviesHandler =()=>{
   return fetch("https://swapi.dev/api/films")
       .then(response=>response.json())
       .then(data=>
           setMovies(data.results.map(movieData=>{
             return  {
               id: movieData.episode_id,
               title: movieData.title,
               openingText: movieData.opening_crawl,
               releaseDate: movieData.release_date
                 //setMovies(data.results)
             }
           })))
 }*/
