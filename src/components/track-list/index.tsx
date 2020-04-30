import React from 'react'
import {AuthStore} from "../../store/auth";
import {inject, observer} from "mobx-react";
import {Period, Track, TrackStore} from "../../store/track";
import {Collapse, createStyles, Divider, List, ListItem, ListItemText} from "@material-ui/core";
import {makeStyles, Theme} from "@material-ui/core/styles";
import moment from "moment";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import {Skeleton} from "@material-ui/lab";
import CallToLogin from './call-to-login';
import NoTracks from "./no-tracks";
import {prependZero} from "../../util/Time";

interface Props {
    authStore?: AuthStore,
    trackStore?: TrackStore,
    classes?: any
}

interface State {
    openedTracks: Set<string>
}

const useStyles = makeStyles((theme: Theme) => createStyles({
    nested: {
        paddingLeft: theme.spacing(4),
    },
    skeleton: {
        height: theme.spacing(7)
    }
}));

const Skelet: React.FC = () => {
    const classes = useStyles();
    return (
        <div>
            <Skeleton animation="wave" className={classes.skeleton}/>
            <Skeleton animation="wave" className={classes.skeleton}/>
        </div>
    )
}

interface PeriodListProps {
    opened: boolean,
    periods: Array<Period>
}

function PeriodList({opened, periods}: PeriodListProps) {
    const classes = useStyles();
    return (
        <Collapse in={opened} timeout="auto">
        <List component="div" disablePadding>
            {periods.map(period => {
                return (
                    <ListItem className={classes.nested} key={period.start}>
                        <ListItemText primary={formatPeriodDate(period)} />
                    </ListItem>
                )
            })}
        </List>
    </Collapse>
    );
}

@inject("trackStore", "authStore")
@observer
class TrackList extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            openedTracks: new Set()
        };
    }

    render() {
        const {authStore, trackStore} = this.props;
        if (authStore?.updating) {
            return <Skelet/>;
        }
        if (!(authStore?.isAuthenticated)) {
            return (
                <CallToLogin/>
            )
        }
        if (!trackStore?.ready) {
            return <Skelet/>;
        }

        const periodsByTrackName = trackStore?.tracks || new Map<string, Track>();
        const tracks = Array.from(periodsByTrackName.keys()).sort((l, r) => periodsByTrackName.get(r)!.updated - periodsByTrackName.get(l)!.updated);
        if (tracks.length === 0) {
            return <NoTracks/>
        }
        const detailsClickHandler = ((trackName: string) => {
            const newOpened = new Set(this.state.openedTracks)
            if (newOpened.has(trackName)) {
                newOpened.delete(trackName);
            } else {
                newOpened.add(trackName);
            }

            this.setState({
                openedTracks: newOpened
            })
        })

        return (
            <List>
                {tracks.map(trackName => {
                    let trackDetailsOpened = this.state.openedTracks.has(trackName);
                    const expandButton = trackDetailsOpened ? <ExpandLess/> : <ExpandMore/>;
                    return ([
                        <ListItem button key={trackName} onClick={() => detailsClickHandler(trackName)}>
                            <ListItemText>{trackName} Total time spent: {formatSpentTime(periodsByTrackName.get(trackName)!)}</ListItemText>
                            {expandButton}
                        </ListItem>,
                        <PeriodList opened={trackDetailsOpened} periods={periodsByTrackName.get(trackName)!.periods} key={`${trackName}-periodList`}/>,
                        <Divider key={trackName + "-divider"}/>
                    ])
                })}
            </List>
        )
    }
}


function formatPeriodDate(period: Period): string {
    const start = moment(period.start);
    const end = moment(period.end);
    let result;
    if (moment().week() === start.week()) {
        result = start.format("dddd")
    } else {
        result = start.format("DD MMM")
    }
    if (moment().year() !== start.year()) {
        result += ` ${start.format("YY")} `
    }

    return result + " " + start.format("HH:mm") + " - " + end.format("HH:mm");
}

function formatSpentTime(track: Track): string {
    const spentMs = track.periods.reduce((prev: number, curr: Period) => prev + Period.totalTime(curr), 0);
    const duration = moment.duration(spentMs);
    if (duration.minutes() < 1) {
        return duration.seconds() + " seconds"
    }
    let result = duration.hours() + "h " + prependZero(duration.minutes()) + "m";
    if (duration.days() > 0) {
        result = duration.days() + " days " + result;
    }
    return result;
}

export default TrackList