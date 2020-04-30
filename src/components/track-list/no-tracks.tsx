import React from "react"
import Grid from "@material-ui/core/Grid"
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => createStyles({
    image: {
        transform: "scale(0.8)",
        fill: "#BFBFBF",
        marginBottom: theme.spacing(-5)
    },
    textContainer: {
        display: "flex",
        justifyContent: "center"
    },
    text: {
        color: "#BFBFBF"
    }
}))

const NoTracks = () => {
    const styles = useStyles();
    return (
        <Grid container justify="center" alignContent="center" direction="column" spacing={1}>
            <Grid item xs={5}>
                <svg version="1.1" id="Capa_1" className={styles.image}
                     x="0px" y="0px"
                     width="360" height="360" viewBox="0 0 360 360">
                    <g>
                        <g>
                            <path d="M126.343,64.98H227.75c2.414,0,4.371-1.957,4.371-4.372c0-2.415-1.957-4.371-4.371-4.371H126.343
    c-2.415,0-4.372,1.957-4.372,4.371C121.972,63.023,123.928,64.98,126.343,64.98z"/>
                            <path d="M355.398,217.191c-2.414,0-4.371,1.957-4.371,4.371v93.855c0,8.599-6.996,15.595-15.596,15.595H24.34
    c-8.6,0-15.597-6.996-15.597-15.595V80.574c0-8.599,6.177-15.594,13.771-15.594h18.142c2.415,0,4.371-1.957,4.371-4.372
    c0-2.415-1.957-4.371-4.371-4.371H22.515C10.1,56.237,0,67.155,0,80.574v234.844c0,13.42,10.92,24.338,24.34,24.338h311.093
    c13.42,0,24.338-10.918,24.338-24.338v-93.855C359.77,219.148,357.814,217.191,355.398,217.191z"/>
                            <path d="M311.238,64.98h16.834c3.186,0,6.217,1.282,8.533,3.609c2.494,2.509,3.855,5.877,3.836,9.481l-0.258,47.71
    c-0.037,7.244-5.965,13.139-13.209,13.139H44.874c-2.415,0-4.371,1.957-4.371,4.372c0,2.415,1.957,4.371,4.371,4.371h282.103
    c12.039,0,21.887-9.795,21.951-21.833l0.256-47.709c0.033-5.951-2.234-11.523-6.379-15.694c-3.971-3.988-9.201-6.188-14.732-6.188
    h-16.834c-2.414,0-4.371,1.957-4.371,4.371C306.867,63.023,308.826,64.98,311.238,64.98z"/>
                            <path d="M79.036,84.713h6.191c10.273,0,18.631-8.356,18.631-18.629V38.645c0-10.273-8.358-18.629-18.631-18.629h-6.191
    c-10.273,0-18.631,8.356-18.631,18.629v27.437C60.404,76.356,68.763,84.713,79.036,84.713z M69.147,38.645
    c0-5.452,4.436-9.887,9.888-9.887h6.191c5.452,0,9.888,4.435,9.888,9.887v27.437c0,5.452-4.436,9.887-9.888,9.887h-6.191
    c-5.452,0-9.888-4.435-9.888-9.887V38.645z"/>
                            <path d="M268.141,84.713h6.189c10.273,0,18.631-8.356,18.631-18.629V38.645c0-10.273-8.357-18.629-18.631-18.629h-6.189
    c-10.273,0-18.631,8.356-18.631,18.629v27.437C249.51,76.356,257.867,84.713,268.141,84.713z M258.252,38.645
    c0-5.452,4.436-9.887,9.889-9.887h6.189c5.451,0,9.889,4.435,9.889,9.887v27.437c0,5.452-4.438,9.887-9.889,9.887h-6.189
    c-5.453,0-9.889-4.435-9.889-9.887V38.645z"/>
                        </g>
                    </g>

                </svg>
            </Grid>
            <Grid item className={styles.textContainer}>
                <Typography className={styles.text} variant="h5">Start a new track</Typography>
            </Grid>
        </Grid>
    )
}

export default NoTracks