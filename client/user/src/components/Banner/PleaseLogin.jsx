import React from 'react';
import { makeStyles } from '@material-ui/core';


const PleaseLogin = () => {
    const classes = useStyle();

    return (
        <>
        <div className={classes.holder}>
              <h1>Please log in.</h1>
        </div>
        </>
    );
};

const useStyle = makeStyles((theme) => ({
    holder: {
        width: '100%',
        height: theme.spacing(10),
        color: 'White',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
}));

export default PleaseLogin;
