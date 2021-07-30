// import './App.css';
import { Switch, Route } from 'react-router-dom';
import fetchApi from '../../services/fetchApi/fetchApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppBar } from '../AppBar/AppBar';
import { HomePage } from '../../views/HomePage/HomePage';

// fetchApi.fetchApiInfoCredits(385).then(console.log).catch(e=>{
//  const er = e.toJSON();
//   // if () {

//   // }
//   toast.error(er)
//   console.log(er)})

function App() {
  return (
    <div>
      <AppBar />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
      </Switch>

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
