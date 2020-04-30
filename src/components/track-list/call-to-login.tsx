import React from "react";
import Grid from "@material-ui/core/Grid";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
    timer: {
        fill: "#BFBFBF"
    },
    timerContainer: {
        display: "flex",
        justifyContent: "center",
        marginTop: theme.spacing(10)
    },
    loginTextContainer: {
        color: "#BFBFBF",
        marginTop: theme.spacing(2),
        display: "flex",
        justifyContent: "center"
    },
    loginText: {
        paddingLeft: theme.spacing(3)
    }
}))

const CallToLogin = () => {
    const styles = useStyles();
    return (
        <Grid container>
            <Grid item xs={12} className={styles.timerContainer}>
                <svg className={styles.timer} xmlns="http://www.w3.org/2000/svg" width="240" height="240"
                     viewBox="0 0 24 24">
                    <path
                        d="M15.91 13.34l2.636-4.026-.454-.406-3.673 3.099c-.675-.138-1.402.068-1.894.618-.736.823-.665 2.088.159 2.824.824.736 2.088.665 2.824-.159.492-.55.615-1.295.402-1.95zm-3.91-10.646v-2.694h4v2.694c-1.439-.243-2.592-.238-4 0zm8.851 2.064l1.407-1.407 1.414 1.414-1.321 1.321c-.462-.484-.964-.927-1.5-1.328zm-18.851 4.242h8v2h-8v-2zm-2 4h8v2h-8v-2zm3 4h7v2h-7v-2zm21-3c0 5.523-4.477 10-10 10-2.79 0-5.3-1.155-7.111-3h3.28c1.138.631 2.439 1 3.831 1 4.411 0 8-3.589 8-8s-3.589-8-8-8c-1.392 0-2.693.369-3.831 1h-3.28c1.811-1.845 4.321-3 7.111-3 5.523 0 10 4.477 10 10z"/>
                </svg>
            </Grid>
            <Grid className={styles.loginTextContainer} item xs>
                <Typography className={styles.loginText} variant="h5">Login to start</Typography>
            </Grid>
        </Grid>
    )
}

export default CallToLogin;