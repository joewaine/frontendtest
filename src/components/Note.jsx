const Note = ({ note, toggleImportance, important, deleteNote}) => {
  const label = important ? 'make not important' : 'make important'

  return (
    <li className='note'>
      {note} 
      <button onClick={toggleImportance}>{label}</button>&nbsp;
            <button onClick={deleteNote}>delete this note</button>
    </li>
  )
}




  export default Note;