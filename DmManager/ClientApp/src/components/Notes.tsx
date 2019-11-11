import React, { useEffect, useState } from 'react';
import axios from 'axios';

type NotesProperties = {
  gameId: number;
};

type Note = {
  body: string;
  id: number;
  when: Date;
};

const Notes = ({ gameId }: NotesProperties) => {
  const [notes, setNotes] = useState<Array<Note>>([]);

  useEffect(() => {
    console.log('updating notes for the game id ' + gameId);
    getAllNotes(gameId);
  }, [gameId]);

  const getAllNotes = async (_gameId: number) => {
    const resp = await axios.get(`/api/game/${_gameId}/notes`);
    console.log(resp.data);
    setNotes(resp.data);
  };

  const deleteNote = async (note: Note) => {
    console.log('detoxing', note);
  };

  return (
    <>
      <section>
        <header>
          <form>
            <input type="text" placeholder="add notes" />
            <button>ADD +</button>
          </form>
        </header>
        <header>
          <form>
            <input type="search" placeholder="search notes" />
            <button>search</button>
          </form>
        </header>
        <main>
          {notes.length ? (
            <ul>
              {notes.map(note => {
                return (
                  <li>
                    <main>{note.body}</main>
                    <time>{note.when}</time>
                    <button onClick={() => deleteNote(note)}>X</button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <em>no notes yet....</em>
          )}
        </main>
      </section>
    </>
  );
};

export default Notes;
