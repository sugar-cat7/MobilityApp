import { Container, Draggable } from "react-smooth-dnd";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { ListItemText } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from "@material-ui/icons/Delete";
import { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { db, fieldval } from "../lib/firebase";
import deleteWaypointFunc from "../lib/deleteWaypoint";
import styles from "./DraggableList.module.css";
import DragHandleIcon from "@material-ui/icons/DragHandle";
export default function DraggableList(props) {
  const [dialog, setDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const onDialogClose = () => {
    setDialog(false);
    setSelectedItem(null);
  };

  const deleteWaypoint = () => {
    if (!selectedItem) {
      onDialogClose();
      return;
    }
    deleteWaypointFunc(props.roomID, selectedItem.id, props.update);
    onDialogClose();
  };

  return (
    <div>
      <List>
        <Container onDrop={props.onDrop}>
          {props.items.map((item) => {
            const onDeleteClick = () => {
              setDialog(true);
              setSelectedItem(item);
            };

            return (
              <Draggable
                key={item.id}
                className={styles.draggableDailogWrapper}
              >
                <ListItem>
                  <ListItemAvatar>
                    {/* <Avatar> */}
                    <DragHandleIcon />
                    {/* </Avatar> */}
                  </ListItemAvatar>
                  <ListItemText primary={item.tag} />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={onDeleteClick}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              </Draggable>
            );
          })}
        </Container>
      </List>
      {dialog ? (
        <Dialog open={dialog} onClose={onDialogClose}>
          <DialogContent>
            <DialogContentText>
              {selectedItem.tag}を経由地点から削除しますか？
            </DialogContentText>
            <DialogActions>
              <Button onClick={deleteWaypoint}>削除する</Button>
              <Button onClick={onDialogClose}>キャンセル</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      ) : null}
    </div>
  );
}
