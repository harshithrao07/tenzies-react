import React from "react"
import Die from "./components/Die"
import { nanoid } from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

  const [dice, setDice] = React.useState(newDiceCreation())
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const selectedVal = dice[0].value
    const allVal = dice.every(die => die.value===selectedVal)
    if(allHeld && allVal)
    {
      setTenzies(true)
      console.log("You won!")
    }
  }, [dice])

  function generateDie() {
    return{
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function newDiceCreation() {
    const newArr = []
    for(let i=0; i<10; i++)
    {
      newArr.push(generateDie())
    }
    return newArr
  }

  const diceElements = dice.map(die => <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} /> )

  function rollDice() {
    if(!tenzies) {
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generateDie()
      }))
    }
    else {
      setTenzies(false)
      setDice(newDiceCreation())
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
        {...die, isHeld: !die.isHeld} 
        : die
    }))
  }


  return(
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click<br />each die to freeze it at its current value<br />between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button className="roll-btn" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
  )
}