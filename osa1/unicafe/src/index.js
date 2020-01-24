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

const StatisticLine = ({ text, value, endtext }) => (  
  <div>
    <p>{text} {value} {endtext}</p>
  </div>
)

const Statistics = (props) => {
  const feedbacks = [props.good, props.neutral, props.bad]
  const total = feedbacks[0] + feedbacks[1] + feedbacks[2]
  const average = (feedbacks[0] + (feedbacks[2] * -1)) / total
  const positives = feedbacks[0] / total * 100

  if (total === 0) {
    return (
      <div>
        <p>No feedback given.</p>
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text="Good: " value={feedbacks[0]} endtext="" />
      <StatisticLine text="Neutral: " value={feedbacks[1]} endtext="" />
      <StatisticLine text="Bad: " value={feedbacks[2]} endtext="" />
      <StatisticLine text="Average: " value={average} endtext="" />
      <StatisticLine text="Good: " value={positives} endtext=" %" /> 
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
