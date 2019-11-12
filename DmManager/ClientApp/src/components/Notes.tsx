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
  const [newNote, setNewNote] = useState<string>();
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    console.log('updating notes for the game id ' + gameId);
    getAllNotes(gameId);
  }, [gameId]);

  const getAllNotes = async (_gameId: number) => {
    const resp = await axios.get(`/api/game/${_gameId}/notes`);
    console.log(resp.data);
    setNotes(resp.data);
  };

  const addNote = async (
    e: React.FormEvent<HTMLFormElement>,
    _gameId: number
  ) => {
    e.preventDefault();
    const resp = await axios.post(`/api/game/${_gameId}/notes`, {
      body: newNote,
    } as Note);
    setNotes(prev => {
      return [resp.data, ...prev];
    });
    setNewNote('');
  };

  const deleteNote = async (note: Note) => {
    const old = [...notes];
    setNotes(prev => {
      return [...prev.filter(f => f.id != note.id)];
    });
    console.log('detoxing', note);
    const resp = await axios.delete(`/api/game/${gameId}/notes/${note.id}`);
    if (resp.status !== 200) {
      setNotes(old);
    }
  };

  const searchNotes = async () => {
    if (filter && filter.trim()) {
      const resp = await axios.get(
        `/api/game/${gameId}/notes/search?term=${filter}`
      );
      console.log(resp.data);
      setNotes(resp.data);
    } else {
      // do a get to get all
      getAllNotes(gameId);
    }
  };

  return (
    <>
      <section>
        <header>
          <form onSubmit={e => addNote(e, gameId)}>
            <input
              type="text"
              placeholder="add notes"
              value={newNote}
              onChange={e => setNewNote(e.target.value)}
            />
            <button>ADD +</button>
          </form>
        </header>
        <header>
          <form
            onSubmit={e => {
              e.preventDefault();
              searchNotes();
            }}
          >
            <input
              type="search"
              placeholder="search notes"
              value={filter}
              onChange={e => setFilter(e.target.value.toLowerCase())}
            />
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
            <em>
              the moose should have told you out front, nothing to see here
            </em>
          )}
        </main>
      </section>
    </>
  );
};

export default Notes;
