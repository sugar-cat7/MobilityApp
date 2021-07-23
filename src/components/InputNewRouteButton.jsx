import { Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"

const useStyles = makeStyles({
    'button': {
        backgroundColor: "gray",
        width: 72,
        fontsize: 16,
        height: 48,
    }
})

export const InputNewRouteButton = (props) => {
    const classes = useStyles()
    
    return (
        <Button className={classes.button} onClick={() => props.onClick()}>
            {props.label}
        </Button>
    )
}