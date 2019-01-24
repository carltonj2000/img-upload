import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paperRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  paper: {
    ...theme.mixins.gutters()
  }
});

function FileList(props) {
  const { classes, files } = props;
  if (!files || files.length === 0) return null;
  else
    return (
      <Paper className={classes.paperRoot}>
        <Typography variant="h5" component="h3">
          Selected Files
        </Typography>

        <Grid container className={classes.root}>
          {files.map((file, idx) => (
            <Grid item key={idx}>
              <Paper className={classes.paper} elevation={1}>
                <Typography component="p">{file.name}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Paper>
    );
}

FileList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FileList);
