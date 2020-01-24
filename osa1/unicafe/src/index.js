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

const Statistics = (props) => {
  const feedbacks = [props.good, props.neutral, props.bad]
  const total = feedbacks[0] + feedbacks[1] + feedbacks[2]
  const average = total / 3
  const positives = feedbacks[0] / total * 100

  return (
  <div>
    <p>Good: {feedbacks[0]}</p>
    <p>Neutral: {feedbacks[1]}</p>
    <p>Bad: {feedbacks[2] }</p>
    <p>All: {total}</p>
    <p>Average: {average}</p>
    <p>Positive: {positives} %</p>
  </div>
  )
}

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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));
