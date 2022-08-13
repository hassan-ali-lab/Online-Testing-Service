import React from "react";
import ReactDOM from "react-dom";
import Test from "./test";
import './styles.css';

import About from './about';
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <React.Fragment>
      <div className="app">
        <BrowserRouter>
          <nav className="navbar navbar-expand navbar-light bg-light">

            <div className="navbar">
              <div className="navbar-nav">
                <Link className="nav-item nav-link" to="/">Test</Link>
                <Link className="nav-item nav-link" to="/about">About</Link>
              </div>
            </div>
          </nav>

          <div className={"content"}>
            <Routes>

              <Route exact path="/" element={<Test />}> </Route>
              <Route exact path="/about" element={<About />}> </Route>
            </Routes>
          </div>

        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);