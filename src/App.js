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

  componentDidMount = () => {
    fetch("/api/images")
      .then(res => res.json())
      .then(result => {
        if ((result && result.error) || result.status !== "Ok")
          return console.log("Server error!", result.error);
        const images = result.files.map(t => ({ img: t }));
        this.setState({ images });
      })
      .catch(e =>
        console.log("Initial fetch from /api/images errored out!", e)
      );
  };
  addImages = images => {
    if (!images || images.length === 0) return;
    this.setState(state => ({ images: [...images, ...state.images] }));
  };
  removeImage = id => {
    fetch(`/api/images/remove?file=${id}`)
      .then(res => res.json())
      .then(result => {
        if ((result && result.error) || result.status !== "Ok")
          return console.log(result.error);
        this.setState({
          images: this.state.images.filter(image => image.img !== id)
        });
      })
      .catch(e => console.log("Deleting image failed.", e));
  };

  render() {
    const { images } = this.state;
    return (
      <Fragment>
        <CssBaseLine />
        <SimpleAppBar />
        <UploadFiles addImages={this.addImages} />
        {images.length > 0 ? (
          <Images tileData={images} removeImage={this.removeImage} />
        ) : null}
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
