import { useState, useEffect } from 'react'
import './App.css'

import { tiles } from './tiles.js'


function App() {


  const [selected, setSelected] = useState([])

  const [solved, setSolved] = useState([])
  const [mistakes, setMistakes] = useState(4)

  const words = tiles.categories.flatMap(category => category.words).filter(word => !solved.flatMap(s => s.words).includes(word))

  const gameOver = mistakes <= 0

  const [shuffled, setShuffled] = useState(
    () => [...words].sort(() => Math.random() - 0.5)
  )
  useEffect(() => {
    if (solved.length === 4) {
      alert('You won!')
    }
  }, [solved])

  useEffect(() => {
    setShuffled([...words].sort(() => Math.random() - 0.5))
  }, [solved])

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
      setSolved(prev => [...prev, match])
      setSelected([])
    } else {
      console.log("wrong")
      setMistakes(prev => prev - 1)
      console.log(mistakes)
      setSelected([])
      if (mistakes - 1 < 1) {
        alert("Sorry, you lose!")
      }
    }
  }
  function shuffle() {
    setShuffled([...shuffled].sort(() => Math.random() - 0.5))
  }

  function deselect() {
    setSelected([])
  }

  return (
    <>
      <p className="text">Creat four groups of four!</p>
      {solved.map(category => (
        <div key={category.name} style={{ background: category.color }}>
          <p>{category.name}</p>
          <p>{category.words.join(', ')}</p>
        </div>
      ))}
      <div className="board">
        {shuffled.map(word => (
          <div className={`tile ${selected.includes(word) ? 'selected' : ''}`} key={word} onClick={() => handleClick(word)}>
            {word}
          </div>
        ))}
      </div>

      <p className="text">
        Mistakes remaining: {mistakes}
      </p>
      <div className='button-holder'>
        {gameOver && <p>Game over!</p>}
        <button onClick={shuffle}>Shuffle</button>

        <button onClick={deselect}>
          Deselect All
        </button>
        <button onClick={() => handleSubmit()} disabled={gameOver || selected.length !== 4}>
          Submit
        </button>
      </div>

    </>
  )
}

export default App
