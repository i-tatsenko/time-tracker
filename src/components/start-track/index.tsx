import React, {useState} from "react";
import {Button, createStyles, Fab, Grid, Modal, TextField, Theme} from "@material-ui/core";
import TimerIcon from "@material-ui/icons/Timer";
import {makeStyles} from "@material-ui/core/styles";
import {TrackStore} from "../../store/track";
import {inject, observer} from "mobx-react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        actionButton: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        actionButtonIcon: {
            marginRight: theme.spacing(1)
        },
        modal: {
            position: 'absolute',
            width: 400,
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
        }
    }),
);

interface StartTrackProps {
    trackStore?: TrackStore
}

let Root = function ({trackStore}: StartTrackProps) {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = useState(false)
    const [newTrackName, setNewTrackName] = useState('')
    const [newTrackDesc, setNewTrackDesc]: [string | undefined, React.Dispatch<React.SetStateAction<string | undefined>>] = useState()

    function ActionButton() {
        return (
            <Fab variant="extended" className={classes.actionButton} onClick={() => setModalOpen(true)}>
                <TimerIcon className={classes.actionButtonIcon}/>
                Start
            </Fab>
        )
    }

    function startNewTrack() {
        trackStore?.startTrack("default", newTrackName, newTrackDesc);
        setModalOpen(false);
    }

    return (
        <div>
            <Modal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <div className={classes.modal}>
                    <h2 id="modal-title">Start new track</h2>
                    <form id="modal-description">
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField label="Name" onChange={e => setNewTrackName(e.target.value)} required/>
                            </Grid>
                            <Grid item xs={9}><TextField label="Description" onChange={e => setNewTrackDesc(e.target.value)} required/></Grid>
                            <Grid item xs={2}><Button disabled={!newTrackName} variant="contained" color="primary" onClick={() => startNewTrack()}>Ok</Button></Grid>
                        </Grid>
                    </form>
                </div>
            </Modal>
            <ActionButton/>
        </div>
    )
};
export default inject('trackStore')(observer(Root))

