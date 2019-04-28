import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { getClassNames } from 'dynamic-class-list'cd 
import './style.css'

let timeout
class Notes extends Component {
  state = {
    currentNote: '',
    unsaved: false
  }

  setNoteFromApi = note => {
    this.setState({
      currentNote: note.content,
      timestamp: note.dateUpdated,
      noteId: note.id,
      unsaved: false
    })
  }

  buildNoteForApi = () => {
    return {
      id: this.state.noteId,
      content: this.state.currentNote
    }
  }

  setNotes = currentNote => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      axios
        .put(`/api/note/${this.state.noteId}`, this.buildNoteForApi())
        .then(resp => {
          this.setNoteFromApi(resp.data)
        })
    }, 2000)
    this.setState({ currentNote, unsaved: true })
  }

  componentDidMount() {
    axios.get('/api/note/latest').then(resp => {
      this.setNoteFromApi(resp.data)
    })
  }

  render() {
    const saved = this.state.unsaved
    console.log('a')
    return (
      <section className="dm-notes">
        <header className={getClassNames({ unsaved: this.state.unsaved })}>
          Notes
        </header>
        <main>
          <form>
            <textarea
              value={this.state.currentNote}
              name="notes area"
              id="dmNotes"
              cols="30"
              rows="10"
              onChange={e => this.setNotes(e.target.value)}
            />
          </form>
          {this.state.timestamp && (
            <em>
              saved @{' '}
              {format(new Date(this.state.timestamp), 'MM/DD/YYYY h:mm:ss')}
            </em>
          )}
        </main>
      </section>
    )
  }
}

export default Notes
