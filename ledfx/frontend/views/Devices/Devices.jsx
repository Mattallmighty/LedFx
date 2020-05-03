import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";

import DevicesTable from "frontend/components/DevicesTable/DevicesTable.jsx";
import DeviceConfigDialog from "frontend/components/DeviceConfigDialog/DeviceConfigDialog.jsx";

const styles = (theme) => ({
  cardResponsive: {
    width: "100%",
    overflowX: "auto",
  },
  button: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  dialogButton: {
    float: "right",
  },
});

class DevicesView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addDialogOpened: false,
      editDialogModel: undefined,
    };
  }

  openAddDeviceDialog = () => {
    this.setState({ addDialogOpened: true });
  };

  closeAddDeviceDialog = () => {
    this.setState({ addDialogOpened: false });
  };

  render() {
    const { classes, schemas } = this.props;
    return (
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12}>
            <Card variant="outlined">
              <CardHeader
                title="Devices"
                subheader="View and manage all your devices connected to LedFx"
              />
              <CardContent>
                <DevicesTable
                  editDevice={(device) => {
                    this.setState({ editDialogModel: device });
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Button
          variant="contained"
          color="primary"
          aria-label="Add"
          className={classes.button}
          onClick={this.openAddDeviceDialog}
        >
          Add Device
        </Button>
        <DeviceConfigDialog
          open={this.state.addDialogOpened}
          onClose={this.closeAddDeviceDialog}
        />
        <DeviceConfigDialog
          open={!!this.state.editDialogModel}
          initialModel={this.state.editDialogModel}
          onClose={() => {
            this.setState({ editDialogModel: undefined });
          }}
        />
      </div>
    );
  }
}

export default withStyles(styles)(DevicesView);
