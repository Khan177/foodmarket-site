import './App.css';
import Main from "./components/main/main";
import MainLanding from "./components-landing/main/main";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/admin" component={ Main } />
        <Route path="/" component={ MainLanding } />
      </Switch>
    </div>
  );
}

export default App;
