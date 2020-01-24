import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Header = (props) => (
  <div>
    <h2>{props.header}</h2>
  </div>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const App = (props) => {
  const [selected, setSelected] = useState(0)  
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])    
  const [mostVoted, setMostVoted] = useState(0)

  const handleClick = () => {
    const rng = Math.round(Math.random() * 5)        
    setSelected(rng)
  }

  const handleVoteClick = (props) => {        
    const copy = [...votes]
    copy[selected] += 1    
    const i = copy.indexOf(Math.max(...copy))
    setMostVoted(i)
    setVotes(copy)
  }


  return (    
    <div>      
      <Header header="Anecdote of the day:" />
      {props.anecdotes[selected]}      
      <br></br>
      <p>Has {votes[selected]} votes.</p>
      <Button onClick={handleClick} text="Next anecdote" />
      <Button onClick={handleVoteClick} text="Vote" />
      <br></br>
      <Header header="Most voted:" />
      {props.anecdotes[mostVoted]}
      <p>Has {votes[mostVoted]} votes.</p>
    </div>
  )
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
