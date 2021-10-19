import React from 'react';
import PropTypes from 'prop-types';
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";

LoadingBackdrop.propTypes = {
    loading: PropTypes.bool.isRequired
};

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function LoadingBackdrop({loading}) {
    const classes = useStyles();

    return (
        <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
    );
}

export default LoadingBackdrop;
