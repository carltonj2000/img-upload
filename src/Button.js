import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  }
});

function IconLabelButtons(props) {
  const { classes, onChange, uploadFiles } = props;
  return (
    <Button variant="contained" color="default" className={classes.button}>
      <input type="file" id="multi" onChange={onChange} multiple />
      <input type="file" id="single" onChange={onChange} />
      <CloudUploadIcon className={classes.rightIcon} onClick={uploadFiles} />
    </Button>
  );
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconLabelButtons);
