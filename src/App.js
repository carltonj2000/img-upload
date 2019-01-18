import React, { Component, Fragment } from "react";
import classNames from "classnames";
import CssBaseLine from "@material-ui/core/CssBaseline";
import SimpleAppBar from "./SimpleAppBar";
import Spinner from "./Spinner";
import Images from "./Images";
import Button from "./Button";
//import { ImagesInfo } from "./tileData";
import { withStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";

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
  state = { uploading: false, images: [], snackOpen: false, files: [] };
  componentDidMount = () => {
    //this.setState({ images: ImagesInfo() }); // eventually load from db
  };
  onCloseSnack = () => {
    this.setState({ snackOpen: false });
  };
  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id)
    });
  };
  onChange = e => {
    const files = Array.from(e.target.files);
    console.log("change", files);
    this.setState({ files });
  };
  uploadFiles = () => {
    const { files } = this.state;
    console.log("change", files);
    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append("avatar", file);
    });
    console.log(formData);
    fetch(`/api/profile`, {
      method: "POST",
      body: formData
    })
      .then(res => res.json())
      .then(images => {
        this.setState({
          uploading: false,
          images
        });
      })
      .catch(e => {
        console.error(e);
        this.setState({ uploading: false, snackOpen: true });
      });
  };
  render() {
    const { classes } = this.props;
    const { images, uploading, snackOpen } = this.state;
    return (
      <Fragment>
        <CssBaseLine />
        <SimpleAppBar />
        <form action="/api/profile" method="post" enctype="multipart/form-data">
          <input type="file" name="avatar" />
          <input type="submit" value="Submit" />
        </form>
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
                  <Button
                    onChange={this.onChange}
                    uploadFiles={this.uploadFiles}
                  />
                </div>
              );
          }
        })()}
        {snackOpen && (
          <div className={classes.container}>
            <SnackbarContent
              className={classes.error}
              aria-describedby="client-snackbar"
              message={
                <span id="client-snackbar" className={classes.message}>
                  <ErrorIcon
                    className={classNames(classes.icon, classes.iconVariant)}
                  />
                  Error! File uploads failed.
                </span>
              }
              action={[
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  className={classes.close}
                  onClick={this.onCloseSnack}
                >
                  <CloseIcon className={classes.icon} />
                </IconButton>
              ]}
            />{" "}
          </div>
        )}
      </Fragment>
    );
  }
}

export default withStyles(styles)(App);
