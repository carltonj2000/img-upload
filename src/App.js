import React, { Component, Fragment } from "react";
import CssBaseLine from "@material-ui/core/CssBaseline";
import SimpleAppBar from "./SimpleAppBar";
import Spinner from "./Spinner";
import Images from "./Images";
import Button from "./Button";
import { ImagesInfo } from "./tileData";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

class App extends Component {
  state = { uploading: false, images: [] };
  componentDidMount = () => {
    const images = ImagesInfo(); // eventually load from db
    this.setState({ images });
  };
  removeImage = image => console.log("del", image);
  onChange = image => console.log("change", image);
  render() {
    const { classes } = this.props;
    const { images, uploading } = this.state;
    return (
      <Fragment>
        <CssBaseLine />
        <SimpleAppBar />
        {(() => {
          switch (true) {
            case uploading:
              return (
                <div className={classes.container}>
                  <Spinner />
                </div>
              );
            case images.length > 0:
              return (
                <Images tileData={images} removeImage={this.removeImage} />
              );
            default:
              return (
                <div className={classes.container}>
                  <Button />
                </div>
              );
          }
        })()}
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
