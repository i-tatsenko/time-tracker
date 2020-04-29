import {action, computed, observable, runInAction} from "mobx";
import {login, logout, onUserUpdate} from "../lib/firebase";

export class AuthStore {
    @observable user?: User
    @observable updating: boolean = true

    constructor() {
        onUserUpdate(user => {
            runInAction(() => {
                if (!user) {
                    this.user = undefined
                } else {
                    this.user = new User(user.uid, user.displayName!, user.photoURL!);
                }
                this.updating = false;
            });
        });
    }

    @computed
    public get isAuthenticated(): boolean {
        return !!this.user
    }

    @action
    public login() {
        this.updating = true
        login()
    }

    @action
    public logout() {
        this.updating = true
        logout();//.then(() => runInAction(() => this.user = undefined))
    }
}

export class User {
    constructor(readonly id: string, readonly name: string, readonly avatar: string) {
    }
}

const authStore = new AuthStore()
export default authStore