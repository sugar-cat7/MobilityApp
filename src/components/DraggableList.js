import { Container, Draggable } from 'react-smooth-dnd';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { ListItemText } from '@material-ui/core';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';


export default function DraggableList(props){


  return (
    <div>
      <List>
      <Container onDrop={props.onDrop}>
        {props.items.map(item => {

          const onDeleteClick = () => {
            alert(item.location_name + "を削除しますか？");
            // デリートボタンクリック時処理を追加する
            // モーダルで確認する感じをイメージしている
          }

          return (
          <Draggable key={item.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <RoomOutlinedIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.location_name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete" onClick={onDeleteClick}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Draggable>)
        })}
      </Container>
      </List>
    </div>
  );
}