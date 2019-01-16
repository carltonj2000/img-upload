import React, { Component, Fragment } from "react";
import CssBaseLine from "@material-ui/core/CssBaseline";
import SimpleAppBar from "./SimpleAppBar";
import Spinner from "./Spinner";
import Images from "./Images";

class App extends Component {
  render() {
    return (
      <Fragment>
        <CssBaseLine />
        <SimpleAppBar />
        {/* <Spinner /> */}

        <Images />
      </Fragment>
    );
  }
}

export default App;
