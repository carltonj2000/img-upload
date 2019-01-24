import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

function IconLabelButtons(props) {
  const { classes, onChange, uploadFiles, clearFiles } = props;
  return (
    <div>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        component="label"
      >
        <SaveIcon className={classNames(classes.leftIcon, classes.iconSmall)} />
        Select Files
        <input
          type="file"
          id="multi"
          onChange={onChange}
          multiple
          style={{ display: "none" }}
        />
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        onClick={uploadFiles}
      >
        Upload Selected Files
        <CloudUploadIcon className={classes.rightIcon} />
      </Button>
      <Button
        variant="contained"
        color="default"
        className={classes.button}
        onClick={clearFiles}
      >
        Clear Selected Files
        <DeleteIcon className={classes.rightIcon} />
      </Button>
    </div>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconLabelButtons);
