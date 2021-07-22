import { Container, Draggable } from 'react-smooth-dnd';

export default function DraggableList(props){

  return (
    <div>
      <Container onDrop={props.onDrop}>
        {props.items.map(item => {
          return (<Draggable key={item.id}
            >aaa{item.bodyText}</Draggable>)
      })}
      </Container>
    </div>
  );
}