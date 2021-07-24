import { useState } from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core"

export const NotLiffLocInfo = (props) => {
    const handleChange = (e) => {
        props.setName(() => e.target.value);
    };

    return (
        <Dialog
            open={props.openDialog}
            fullWidth="xs"
            maxWidth="xs"
            height={200}
        >
            <DialogTitle>地点名の登録</DialogTitle>
            <DialogContent>
                <form>
                    <input
                        type="text"
                        placeholder="名前を入力してください"
                        onChange={handleChange}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained" onClick={() => props.addCurrentPosNotLiff()}>追加する</Button>
                <Button color="primary" variant="contained"　onClick={() => props.setOpenDialog()}>キャンセル</Button>
            </DialogActions>
        </Dialog>
    )
}