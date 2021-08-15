import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Loading from '../../services/helpers/Loader';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar } from '../AppBar/AppBar';
const HomePage = lazy(() =>
  import(
    '../../views/HomePage/HomePage.js' /* webpackChunkName: "home-view" */
  ),
);
const MoviesPage = lazy(() =>
  import(
    '../../views/MoviesPage/MoviesPage.js' /* webpackChunkName: "movies-view" */
  ),
);

const MovieDetailsPage = lazy(() =>
  import(
    '../../views/MovieDetailsPage/MovieDetailsPage.js' /* webpackChunkName: "movie-detail-view" */
  ),
);

function App() {
  return (
    <div>
      <AppBar />

      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Route path="/movies">
            <MoviesPage />
          </Route>
        </Switch>
      </Suspense>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </div>
  );
}

export default App;
