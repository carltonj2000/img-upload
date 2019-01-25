import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";

import Spinner from "./Spinner";
import Button from "./Button";
import FileList from "./FileList";

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
  },
  paperRoot: {
    padding: theme.spacing.unit
  }
});

class UploadFiles extends Component {
  state = {
    uploading: false,
    images: [],
    snackOpen: false,
    files: [],
    error: null
  };
  clearFiles = e => this.setState({ files: [] });
  onChange = (e, inputRef) => {
    const files = Array.from(e.target.files);
    this.setState(state => ({ files: [...files, ...state.files] }));
    inputRef.current.value = null; // to allow selecting same items again
  };
  uploadFiles = () => {
    this.setState({ uploading: true });
    const { files } = this.state;
    const formData = new FormData();

    const name = files.length === 1 ? "myFile" : "myFiles";
    files.forEach(file => {
      formData.append(name, file);
    });
    const url = files.length === 1 ? "/api/file-upload" : "/api/files-upload";
    fetch(url, {
      method: "POST",
      body: formData,
      header: { encType: "multipart/form-data" }
    })
      .then(res => res.json())
      .then(upload => {
        if (upload.status !== "Ok")
          return this.setState({
            uploading: false,
            snackOpen: true,
            error: upload.msg
          });
        console.log(upload);
        this.setState({
          uploading: false,
          files: [],
          images: upload.fileIds
        });
      })
      .catch(e => {
        console.error(e);
        this.setState({
          uploading: false,
          snackOpen: true,
          error: "File upload failed."
        });
      });
  };
  onCloseSnack = () => {
    this.setState({ snackOpen: false });
  };
  render = () => {
    const { classes } = this.props;
    const { files, uploading, snackOpen, error } = this.state;

    if (uploading)
      return (
        <div className={classes.container}>
          <Spinner /> Uploading Files
        </div>
      );
    else
      return (
        <div className={classes.container}>
          <Paper>
            <Button
              onChange={this.onChange}
              uploadFiles={this.uploadFiles}
              clearFiles={this.clearFiles}
            />
            <FileList files={files} />

            {snackOpen && (
              <div className={classes.container}>
                <SnackbarContent
                  className={classes.error}
                  aria-describedby="client-snackbar"
                  message={
                    <span id="client-snackbar" className={classes.message}>
                      <ErrorIcon
                        className={classNames(
                          classes.icon,
                          classes.iconVariant
                        )}
                      />
                      Error! {error}
                    </span>
                  }
                  action={[
                    <IconButton
                      key="close"
                      aria-label="Close"
                      color="inherit"
                      className={classes.close}
                    >
                      <CloseIcon
                        className={classes.icon}
                        onClick={this.onCloseSnack}
                      />
                    </IconButton>
                  ]}
                />
              </div>
            )}
          </Paper>
        </div>
      );
  };
}
export default withStyles(styles)(UploadFiles);
