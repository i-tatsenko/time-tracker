import React from 'react'
import {AuthStore} from "../../store/auth";
import {inject, observer} from "mobx-react";
import {TrackStore} from "../../store/track";
import {Divider, List, ListItem, ListItemText} from "@material-ui/core";

interface Props {
    authStore?: AuthStore,
    trackStore?: TrackStore,
}

const Root = function ({authStore, trackStore}: Props) {
    if (!trackStore?.ready) {
        return (
            <div>Authenticate to view the list of your tracks</div>
        )
    }
    const tracks = trackStore?.tracks || new Map();

    return (
        <List>
            {Array.from(tracks.keys()).map(trackName => {
                return ([
                    <ListItem key={trackName}>
                        <ListItemText>{trackName}</ListItemText>
                    </ListItem>,
                    <Divider key={trackName + "-divider"}/>
                ])
            })}
        </List>
    )
};
export default inject('authStore', 'trackStore')(observer(Root))