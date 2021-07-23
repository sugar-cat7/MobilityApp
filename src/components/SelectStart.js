export default function SelectStart(props){
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  return (
    <div>
      出発地点に現在地を設定
      <input type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        color="primary"
      />
    </div>
  )
}