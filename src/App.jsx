
import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
// import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...') 
  const [showAll, setShowAll] = useState(true)
  // const [errorMessage, setErrorMessage] = useState(null)


    useEffect(() => {
      noteService.getAll().then(data => {
        console.log('getAll type:', typeof data)
        console.log('getAll isArray?', Array.isArray(data))
        console.log('getAll value:', data)
        if (data && typeof data === 'object') {
          console.log('getAll keys:', Object.keys(data))
        }

        setNotes(data)

      })
    }, [])


    const addNote = (event) => {
        event.preventDefault();
        const noteObject = {
        content: newNote,
        important: Math.random() < 0.5
      }

      noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))

        setNewNote('')
      })
      
    }
  
const toggleImportanceOf = (id) => {
  const note = notes.find(n => n._id === id)
  const changedNote = { ...note, important: !note.important }

  noteService.update(id, changedNote).then(returnedNote => {
    setNotes(notes.map(n => (n._id === id ? returnedNote : n)))

  })
}

            
  const deleteNote = (id) => {

    noteService.deleteItem(id).then(response => {
    const filteredNotes = notes.filter(note => note._id !== id);
    setNotes(filteredNotes)

      });


  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

const notesToShow = showAll
  ? notes
  : notes.filter(note => note.important)


  return (
    <div>
      <h1>Notes</h1> 
      <div>

    </div>
  
<ul>
  {notesToShow.map(note => (
        <Note
          key={note._id}
          note={note.content}
          important={note.important}
          toggleImportance={() => toggleImportanceOf(note._id)}
          deleteNote={() => deleteNote(note._id)}
        />
      ))
        }
</ul>


 
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  )
  

}

export default App;
