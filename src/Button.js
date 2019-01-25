import React, { Component } from "react";
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

class IconLabelButtons extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  render = () => {
    const { classes, onChange, uploadFiles, clearFiles } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="default"
          className={classes.button}
          component="label"
        >
          <SaveIcon
            className={classNames(classes.leftIcon, classes.iconSmall)}
          />
          Select Files
          <input
            ref={this.inputRef}
            type="file"
            id="multi"
            onChange={e => onChange(e, this.inputRef)}
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
  };
}

IconLabelButtons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(IconLabelButtons);
