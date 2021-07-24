import { useState } from "react"
import { Dialog, Button } from "@material-ui/core"
import styles from './NotLiffLocInfo.module.css';

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
            <div className={styles.dialogContainer}>
                <div>地点の表示名を入力してください</div>
                <form className={styles.form}>
                    <input
                        type="text"
                        placeholder="表示名"
                        onChange={handleChange}
                        className={styles.input}
                    />
                </form>
                <div className={styles.popupButtonContainer}>
                    <div className={styles.popupButton}><Button color="primary" variant="contained" onClick={() => props.addCurrentPosNotLiff()}>追加する</Button></div>
                    <div className={styles.popupButton}><Button color="primary" variant="contained"　onClick={() => props.setOpenDialog()}>キャンセル</Button></div>
                </div>
            </div>
        </Dialog>
    )
}