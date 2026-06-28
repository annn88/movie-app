import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [search, setSearch] = useState("Batman");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_KEY = "9add01f3"; // Replace with your OMDb API key

  const searchMovies = async () => {
    if (!search.trim()) return;

    setLoading(true);

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`
      );

      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log(error);
      setMovies([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="container">
      <h1>🎬 Movie Search App</h1>
      <p>Search your favourite movies using the OMDb API</p>

      <div className="search-box">
        <input
          type="text"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovies();
            }
          }}
        />

        <button onClick={searchMovies}>Search</button>
      </div>

      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="movie-list">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div className="movie-card" key={movie.imdbID}>
                <img
                  src={
                    movie.Poster !== "N/A"
                      ? movie.Poster
                      : "https://via.placeholder.com/300x450?text=No+Image"
                  }
                  alt={movie.Title}
                />

                <h3>{movie.Title}</h3>

                <p>{movie.Year}</p>

                <p>{movie.Type}</p>
              </div>
            ))
          ) : (
            <p className="no-movies">No movies found.</p>
          )}
        </div>
      )}

      <footer>
        <p>Made with ❤️ using React & OMDb API</p>
      </footer>
    </div>
  );
}

export default App;