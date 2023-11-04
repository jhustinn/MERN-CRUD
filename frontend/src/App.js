import { useState, useEffect } from "react";
import axios  from "axios";

function App() {
  // State
  const [notes, setNotes] = useState(null);
  const [createForm, setCreateForm] = useState({
    title: "",
    body: ""
  });
  const[updateForm, setUpdateForm] = useState({
    _id: null,
    title: "",
    body: ""
  });

  // Use effetc
  useEffect(() => {
    fetchNote();
  }, [])

  // Function
  const fetchNote = async () => {
    // Fetch the notes
    const res = await axios.get('http://localhost:3000/notes');

    // Set to state
    // console.log(res.data.notes);
    setNotes(res.data.notes);
  }

  const updateCreateForm = (e) => {
    const {name, value} = e.target;

    setCreateForm({
      ...createForm,
      [name]: value
    })
    console.log({name, value});
  }

  const createNote = async (e) => {
    e.preventDefault()

    // Create the note
    const res = await axios.post('http://localhost:3000/notes',createForm);
    
    // Update state
    setNotes([...notes, res.data.note])
    console.log(res);

    // Clear form state
    setCreateForm({title: "", body: ""})
  }

  const deleteNote = async (_id) => {

    // Delete the note
    const res = await axios.delete(`http://localhost:3000/notes/${_id}`);
    console.log(res);

    // Update state
    const newNotes = [...notes].filter(note => {
      return note._id !== _id;
    });
    setNotes(newNotes);

  }

  const handleUpdateFieldChange = (e) => {
    const {value, name} = e.target;

    setUpdateForm({
      ...updateForm,
      [name]: value,
    })
  }

  const toggleUpdate = (note) => {

    // Set state on update form
    setUpdateForm({title: note.title, body: note.body, _id: note._id})
  }

  const updateNote = async (e) => {
    e.preventDefault();
    const {title, body} = updateForm;

    // Send update request
    const res = await axios.put(`http://localhost:3000/notes/${updateForm._id}`, {
    title, body
    });

    // Update state
    const newNotes = [...notes];
    const noteIndex = notes.findIndex((note) => {
      return note._id === updateForm._id;
    });
    newNotes[noteIndex] = res.data.note;

    setNotes(newNotes);

    // Clear update form state
    setUpdateForm({
      _id: null,
      title: "",
      body: ""
    })
  }
  
  return (
    <div className="App">
      <div>
        <h2>Notes:</h2>
        {notes && notes.map(note => {
          return <div key={note._id}><h3>{note.title}</h3>
          <button onClick={() => deleteNote(note._id)}>Delete Note</button>
          <button onClick={() => toggleUpdate(note)}>Update Note</button>
          </div>
        })}
      </div>

        {updateForm._id && (
        <div>
          <h2>Update Note</h2>
          <form onSubmit={updateNote}>
            <input onChange={handleUpdateFieldChange} type="text" name="title" value={updateForm.title}/>
            <textarea onChange={handleUpdateFieldChange} type="text" name="body" value={updateForm.body}/>
            <button type="submit">Update Note</button>
          </form>
        </div>
        )}
        
        {!updateForm._id && (
        <div>
          <h2>Create Note</h2>
          <form onSubmit={createNote}>
            <input onChange={updateCreateForm} type="text" name="title" value={createForm.title}/>
            <textarea onChange={updateCreateForm} type="text" name="body" value={createForm.body}/>
            <button type="submit">Create Note</button>
          </form>
        </div>
        )}
    </div>
  );
}

export default App;
