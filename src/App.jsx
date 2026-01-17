
import { useState, useEffect } from 'react'
import Note from './components/Note'
import noteService from './services/notes'
import Notification from './components/Notification'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note...') 
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

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


  

  // console.log(notes)
  // console.log('render', notes.length, 'notes')
  const notesToShow = showAll ? notes : notes.filter(note => note.important === true);
console.log('notesToShow',notesToShow)

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
    // const note = notes.find((n) => n.id === id)
    // const changedNote = { ...note, important: !note.important }

    // noteService
    //   .update(id, changedNote)
    //   .then((returnedNote) => {
    //     setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)))
    //   })
    //   .catch((error) => {
    //       console.log('you got here catch')
    //     setErrorMessage(
    //       `Note '${note.content}' was already removed from server`
    //     )
    //     setTimeout(() => {
    //       console.log('you got here timeout')
    //       setErrorMessage(null)
    //     }, 5000)
    //     setNotes(notes.filter((n) => n.id !== id))
    //   })
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
            key={note._id}
            note={note.content} 
            important={note.important}
            toggleImportance={() => toggleImportanceOf(note._id)}
            deleteNote={() => deleteNote(note._id)}
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
