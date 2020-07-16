import React from 'react';
import { makeStyles, Paper } from '@material-ui/core';

const ProfilePage = () => {
    document.title = 'Profile';
    const classes = useStyles();
    return (
        <>
            <div className={classes.root} >
                    <Paper className={classes.paper}>
                        <div >

                        </div>
                    </Paper>
            </div>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center'
    },
    paper: {
        marginTop: theme.spacing(12),
        width: '80%'
    }

}));

export default ProfilePage;