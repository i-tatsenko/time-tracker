import React, {useRef, useState} from "react";
import {Avatar, Button, createStyles, Popover, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {inject, observer} from "mobx-react";
import {AuthStore} from "../../store/auth";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            width: theme.spacing(6),
            height: theme.spacing(6),
            display: 'inline-block'
        },
        loggedIn: {
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer'
        },
        userName: {
            paddingRight: '1rem'
        },
        logout: {
            padding: theme.spacing(2),
            cursor: 'pointer'
        }
    }),
);

interface LoginProps {
    authStore?: AuthStore
}

const Login: React.FC<LoginProps> = ({authStore}: LoginProps) => {
    const anchorEl = useRef(null);
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const user = authStore?.user
    const id = open ? 'logout-popover' : undefined;

    let elem = !user
        ? <Button color="inherit" onClick={() => authStore!!.login()}>Login</Button>
        : <div>
            <div className={classes.loggedIn} aria-describedby={id} onClick={() => setOpen(!open)} ref={anchorEl}>
                <Typography variant='h6' className={classes.userName}>{user?.name}</Typography>
                <Avatar src={user?.avatar} className={classes.avatar}/>
            </div>
            <Popover id={id}
                     open={open}
                     anchorEl={open ? anchorEl.current : null}
                     onClose={() => setOpen(false)}
                     anchorOrigin={{
                         vertical: 'bottom',
                         horizontal: 'center',
                     }}
                     transformOrigin={{
                         vertical: 'top',
                         horizontal: 'center',
                     }}>
                <Typography variant='h6' className={classes.logout} onClick={() => {
                    authStore!.logout();
                    setOpen(false);
                }}>Logout</Typography>
            </Popover>
        </div>;
    return (
        <div>{elem}</div>
    )
}

export default inject('authStore')(observer(Login))