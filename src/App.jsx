
import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const App = () => {

  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState('a new note...') 
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  

  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {
      // console.log(initialNotes)
    setNotes(initialNotes)
  })


  }, [])
  
   if (!notes) { 
    return null 
  }

  // console.log(notes)
  // console.log('render', notes.length, 'notes')
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);

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

    // setNotes(notes.concat(noteObject))
    // setNewNote('')

  }

    const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
      })
      .catch((error) => {
          console.log('you got here catch')
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          console.log('you got here timeout')
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter((n) => n.id !== id))
      })
  }
  
  const deleteNote = (id) => {


    noteService.deleteItem(id).then(response => {
      const filteredNotes = notes.filter(note => note.id !== id);


      setNotes(filteredNotes)

      


      });


  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={()=>setShowAll(!showAll)}>
          show {showAll ? 'important': 'all'}
        </button>
      </div>

      <ul>
        {notesToShow.map(note =>
          // <Note key={note.id} note={note.content} id={note.id} toggleImportance={toggleImportanceOf} />
          <Note
            key={note.id}
            note={note.content} 
            important={note.important}
            toggleImportance={() => toggleImportanceOf(note.id)}
            delete={() => deleteNote(note.id)}
          />
        )}
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
