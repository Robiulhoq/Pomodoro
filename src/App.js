import './App.css';
import HomePage from './components/HomePage/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './components/Login/Login';
import Report from './components/ReportPage/Report';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
        <HomePage></HomePage>
        </Route>
        <Route path='/login'>
          <Login></Login>
        </Route>
        <Route path='/report'>
          <Report></Report>
        </Route>
      </Switch>
    </Router>
    
      
    
  );
}

export default App;
