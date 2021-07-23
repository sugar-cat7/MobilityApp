import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core"
import { makeStyles } from "@material-ui/styles"
import { maxWidth } from "@material-ui/system"

export const NotLiffLocInfo = () => {
    const [locationName, setLocationName] = useState()

    return (
        <Dialog
            open={true}
            fullWidth="xs"
            maxWidth="xs"
            height={200}
        >
            <DialogTitle>地点名の登録</DialogTitle>
            <DialogContent>
                <p>名前入力するところ</p>
                <p>名前入力するところ</p>
                <p>名前入力するところ</p>
            </DialogContent>
            <DialogActions>
                <button>決定</button>
            </DialogActions>
        </Dialog>
    )
}