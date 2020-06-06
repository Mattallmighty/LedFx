import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Grid from "@material-ui/core/Grid";
import PixelColorGraph from "frontend/components/PixelColorGraph/PixelColorGraph.jsx";
import DeviceMiniControl from 'frontend/components/DeviceMiniControl/DeviceMiniControl.jsx';
import AddSceneCard from "frontend/components/AddSceneCard/AddSceneCard";
import MiniScenesCard from "frontend/components/MiniScenesCard/MiniScenesCard";


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  card: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
  },
});

class DashboardView extends React.Component {

  render() {
    const { classes, devicesById } = this.props;

    if (Object.keys(devicesById) == 0)
    {
      return (
        <div>
          <Card variant="outlined">
              <CardContent>
                <p>Looks like you have no devices! Go to 'Device Management' to add them</p>
              </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div>

        <Grid container direction="row" spacing={2}>
          {
            Object.keys(devicesById).map(id => {                      
              return (
                <Grid item lg={6}>
                  <Card className={classes.card} variant="outlined">
                    <CardContent>
                      <Grid container direction="row" spacing={1}>
                        <Grid item xs={12}>
                          <DeviceMiniControl key={id} device={devicesById[id]}/>
                        </Grid>
                        <Grid item xs={12}>
                          <PixelColorGraph device={devicesById[id]}/>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })
          }
        </Grid>

        <Grid container direction="row" spacing={4} alignItems="stretch">
          <Grid item xs={6}>
            <MiniScenesCard />
          </Grid>
          <Grid item xs={6}>
            <AddSceneCard />
          </Grid>
        </Grid>
      </div>
    );
  }
}

DashboardView.propTypes = {
  devicesById: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { devicesById } = state

  return {
    devicesById
  }
}

export default  connect(mapStateToProps)(withStyles(styles)(DashboardView));
