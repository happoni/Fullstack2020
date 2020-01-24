import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <div>
    <h2>{props.header}</h2>
  </div>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = (props) => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => (    
    setGood(good + 1))
  
  const handleNeutralClick = () => (
    setNeutral(neutral + 1))
       
  const handleBadClick = () => (
    setBad(bad + 1))

  return (
    <div>       
      <Header header="Give feedback" />     
      <Button onClick={handleGoodClick} text='good' />  
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <Header header="Statistics" />
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
