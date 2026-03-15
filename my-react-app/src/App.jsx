import { useState } from 'react'
import './App.css'

import { tiles } from './tiles.js'

const words = tiles.categories.flatMap(category => category.words)

console.log(words)

function App() {
  const [selected, setSelected] = useState([])

  function handleClick(word) {
    console.log('clicked ', word)
    if (selected.includes(word)) {
      setSelected(selected.filter(w => w !== word))
    } else if (selected.length < 4) {
      setSelected([...selected, word])
    }
  }

  function checkGuess() {
    return tiles.categories.find(category => {
      const sortedWords = [...category.words.sort()]
      const sortedSelected = [...selected.sort()]
      return sortedWords.join() === sortedSelected.join()
    }
    )
  }

  function handleSubmit() {
    const match = checkGuess()
    if (match) {
      console.log("correct")
    } else {
      console.log("wrong")
    }

  }

  return (
    <>
      <div className="board">
        {words.map(word => (
          <div className={`tile ${selected.includes(word) ? 'selected' : ''}`} key={word} onClick={() => handleClick(word)}>
            {word}
          </div>
        ))}
      </div>
      <button className="submit" onClick={() => handleSubmit()}>
        Submit
      </button>
    </>
  )
}

export default App
