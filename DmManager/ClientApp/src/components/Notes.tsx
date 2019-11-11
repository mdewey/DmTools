import React, { useEffect } from 'react';

type Notes = {
  gameId: number;
};

const Notes = ({ gameId }: Notes) => {
  useEffect(() => {
    console.log('updating notes for the game id ' + gameId);
  }, [gameId]);

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
          <ul>
            <li>
              <main>some note goes here</main>
              <time>happen sometime go</time>
              <button>X</button>
            </li>
            <li>
              <main>some note goes here</main>
              <time>happen sometime go</time>
              <button>X</button>
            </li>
            <li>
              <main>some note goes here</main>
              <time>happen sometime go</time>
              <button>X</button>
            </li>
            <li>
              <main>some note goes here</main>
              <time>happen sometime go</time>
              <button>X</button>
            </li>
            <li>
              <main>some note goes here</main>
              <time>happen sometime go</time>
              <button>X</button>
            </li>
          </ul>
        </main>
      </section>
    </>
  );
};

export default Notes;
