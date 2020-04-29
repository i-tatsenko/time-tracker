import React from 'react'
import {TrackStore} from "../../store/track";
import {inject, observer} from "mobx-react";
import {makeStyles} from "@material-ui/core/styles";
import {Button, ButtonGroup, createStyles, Grid, Paper, Theme, Typography} from "@material-ui/core";
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import StopIcon from '@material-ui/icons/Stop';

interface Props {
    trackStore?: TrackStore
}


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: theme.spacing(7),
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
        mainContent: {
            alignItems: "center",
            height: "100%"
        },
        mainText: {
            display: "flex",
            justifyContent: "center",
        },
        icon: {
            marginRight: theme.spacing(1)
        }
    }),
);


const Root = ({trackStore}: Props) => {
    const classes = useStyles();
    let track = trackStore?.currentTrack;
    const view = !!track
        ? <Grid container className={classes.mainContent}>
            <Grid item xs={9} className={classes.mainText}>
                <Typography variant="h5">
                    Working on <b>{track.name}</b> for {track.elapsed}
                </Typography>
            </Grid>
            <Grid item xs>
                <ButtonGroup variant="text" color="primary">
                    <Button><PauseCircleOutlineIcon className={classes.icon}/> Pause</Button>
                    <Button onClick={() => trackStore!.stopCurrent()}><StopIcon className={classes.icon}/> Stop</Button>
                </ButtonGroup>
            </Grid>
        </Grid>
        : <div className={`${classes.mainContent} ${classes.mainText}`}>
            <Typography variant="h6">No task in progress.</Typography>
        </div>;
    return (
        <Paper className={classes.root}>
            {view}
        </Paper>
    )
}

export default inject("trackStore")(observer(Root))