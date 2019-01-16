import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

function CircularIndeterminate(props) {
  const { classes } = props;
  return (
    <Fragment>
      <CircularProgress className={classes.progress} />
    </Fragment>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularIndeterminate);
