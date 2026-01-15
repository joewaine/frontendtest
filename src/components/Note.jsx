const Note = ({ note, toggleImportance, important}) => {
  const label = important ? 'make not important' : 'make important'

  return (
    <li className='note'>
      {note} 
      <button onClick={toggleImportance}>{label}</button>&nbsp;
            <button onClick={toggleImportance}>delete this note</button>
    </li>
  )
}

  export default Note;