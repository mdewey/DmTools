import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import { getClassNames } from 'dynamic-class-list'
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
    }, 1000)
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
      <section className="dm-notes tool-container">
        <header className={getClassNames({ unsaved: this.state.unsaved })}>
          Notes {this.state.unsaved && <em>changes not saved</em>}
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
            {this.state.timestamp && (
              <em>
                saved @{' '}
                {format(new Date(this.state.timestamp), 'MM/DD/YYYY h:mm:ss')}
              </em>
            )}
          </form>
        </main>
      </section>
    )
  }
}

export default Notes
