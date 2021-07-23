import React from 'react';
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    'button': {
        backgroundColor: "gray",
        fontsize: 16,
        height: 48,
        marginBottom: 16,
        width: 256,
    }
})

export const BasicButton = (props) => {
    const classes = useStyles();

    return (
        <Button className={classes.button} onClick={() => props.onClick()}>
            {props.label}
        </Button>
    )
}