import {action, autorun, observable, runInAction} from "mobx";
import {db, flatten} from "../lib/firebase";
import authStore from "./auth";
import * as firebase from "firebase/app";
import moment from "moment";

export class Period {
    constructor(readonly start: number, readonly end: number | null, public desc: string | null) {
    }

}

export class CurrentTrack {

    constructor(readonly project: string, readonly name: string, readonly desc: string | null, readonly start: number, readonly elapsed: string) {
    }

}

export class Track {
    constructor(public periods: Period[]) {
    }

    inProgress(): boolean {
        return this.periods.length !== 0 && this.periods[0].end == null;
    }
}

export class TrackStore {
    @observable ready: boolean = false;
    @observable currentTrack: CurrentTrack | null = null;
    @observable tracks: Map<string, Track>
    private docRef: firebase.firestore.DocumentReference | null = null;

    constructor() {
        this.tracks = new Map();
        autorun(() => {
            const uid = authStore.user?.id;
            this.ready = false;
            if (!!uid) {
                this.docRef = db().collection('tracks').doc(uid);
                this.docRef.onSnapshot({includeMetadataChanges: true}, doc => {
                    if (!doc.metadata.hasPendingWrites) {
                        this.processTracks(doc)
                    }
                });
            } else {
                this.tracks = new Map();
            }
            this.updateElapsed();
        })
    }


    private updateElapsed() {
        setTimeout(() => {
            runInAction(() => {
                if (!!this.currentTrack) {
                    const {project, name, desc, start} = this.currentTrack;
                    this.currentTrack = new CurrentTrack(project, name, desc, start, this.determineElapsed(start));
                }
            })
            this.updateElapsed();
        }, 1000)
    }

    determineElapsed(start: number): string {
        let duration = moment.duration(moment().diff(moment(start)));
        let result: string;
        if (duration.asMinutes() < 1) {
            return duration.seconds() + " seconds"
        } else {
            result = TrackStore.prependZero(duration.seconds());
        }
        result = `${TrackStore.prependZero(duration.minutes())}:${result}`
        if (duration.hours() !== 0) {
            result = `${TrackStore.prependZero(duration.hours())}:${result}`;
        }
        if (duration.days() !== 0) {
            result = `${duration.days()} days ${result}`
        }
        return result;
    }

    private static prependZero(i: number): string {
        return i < 10 ? "0" + i : i.toString();
    }

    @action
    processTracks(doc: firebase.firestore.DocumentSnapshot) {
        if (doc.exists) {
            let data: firebase.firestore.DocumentData = doc.data()!;
            for (let [key, value] of Object.entries(data?.projects?.default || {})) {
                this.tracks.set(key, value as Track);
            }
            this.currentTrack = data.currentTrack;
            this.updateElapsed();
        } else {
            this.trackRef().set({})
        }
        this.ready = true
    }
    @action
    public startTrack(project: string, name: string, desc: string | undefined) {
        if (!!this.currentTrack) {
            throw new Error(`Track is already started for ${this.currentTrack.name}`)
        }
        const currentTrack = new CurrentTrack(project, name, desc || null, new Date().getTime(), this.determineElapsed(new Date().getTime()));

        this.trackRef().update("currentTrack",
            Object.assign({}, currentTrack)
        )
    }

    public stopCurrent() {
        if (!this.currentTrack) {
            throw new Error("Nothing to stop");
        }
        const {project, name, desc, start} = this.currentTrack;
        const period = new Period(start, new Date().getTime(), desc);
        this.trackRef().update({
            currentTrack: null,
            [`projects.${project}.${name}.periods`]: firebase.firestore.FieldValue.arrayUnion(flatten(period))
        })
    }

    trackRef(): firebase.firestore.DocumentReference {
        return this.docRef!;
    }
}

const trackStore = new TrackStore();
export default trackStore;