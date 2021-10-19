import './App.scss';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Home from "./Components/Home";
import {MuiThemeProvider} from "@material-ui/core";
import muiTheme from "./theme/muiTheme";

function App() {
  return (
      <MuiThemeProvider theme={muiTheme}>
          <Router>
              <Route exact path={"/"} component={Home}/>
              <Route exact path={"/:slug"} component={Home}/>
          </Router>
      </MuiThemeProvider>
  );
}

export default App;
