import React from 'react';
import './App.css';
import {AppBar, Container, createStyles, Theme, Toolbar, Typography} from "@material-ui/core";
import Login from "./login/Login";
import {makeStyles} from "@material-ui/core/styles";
import authStore from "../store/auth";
import {Provider} from "mobx-react";
import StartTrack from "./start-track"
import TrackList from "./track-list"
import trackStore from "../store/track";
import WaitForAuth from "./wait-for-auth"
import CurrentTrack from "./current-track"

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            flexGrow: 1,
        },
        actionButton: {}
    }),
);

const stores = {
    authStore,
    trackStore,
}

function App() {
    const classes = useStyles();
    return (
        <Provider {...stores}>
            <Container>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Time tracker
                        </Typography>
                        <WaitForAuth>
                            <Login/>
                        </WaitForAuth>
                    </Toolbar>
                </AppBar>
                <WaitForAuth>
                    <CurrentTrack/>
                    <TrackList/>
                </WaitForAuth>
                <StartTrack/>
            </Container>
        </Provider>
    );
}


export default App;
