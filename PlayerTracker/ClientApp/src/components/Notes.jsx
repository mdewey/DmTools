import React, { useState } from 'react'

export default function Notes() {
  const [notes, setNotes] = useState('')
  return (
    <section className="dm-notes">
      <header>Notes</header>
      <main>
        <form>
          <textarea
            value={notes}
            name="notes area"
            id="dmNotes"
            cols="30"
            rows="10"
            onChange={e => setNotes(e.target.value)}
          />
        </form>
      </main>
    </section>
  )
}
