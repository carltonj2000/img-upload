import React, { Component, Fragment } from "react";
import CssBaseLine from "@material-ui/core/CssBaseline";
import SimpleAppBar from "./SimpleAppBar";
import Images from "./Images";
import { withStyles } from "@material-ui/core/styles";

import UploadFiles from "./UploadFiles";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  }
});

class App extends Component {
  state = { images: [] };

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    });
  };

  render() {
    const { images } = this.state;
    return (
      <Fragment>
        <CssBaseLine />
        <SimpleAppBar />
        <UploadFiles />
        {(() => {
          if (images.length > 0)
            return <Images tileData={images} removeImage={this.removeImage} />;
          else return null;
        })()}
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
