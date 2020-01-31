import React from 'react'

const course = {
  name: "Half Stack application development",
  id: 1,
  parts: [
    {
      name: "Fundamentals of React",
      exercises: 10,
      id: 1
    },    
    {
      name: "Using props to pass data",
      exercises: 7,
      id: 2
    },
    {
      name: "State of a component",
      exercises: 14,
      id: 3
   }
  ]
}

const Header = (props) => {
  return (
      <div>
          <h1>{props.course.name}</h1>
      </div>
  )
}

const Part = (props) => {
  console.log(props)
  return (
      <div>
          <p>
              {props.name} {props.exercises}
          </p>
      </div>
  )
}

const Content = (props) => {    
  return (
      <div>
          <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
          <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
          <Part name={props.parts[2].name} exercises={props.parts[2].exercises} />
      </div>
  )
}

const Total = (props) => {
  return (
      <div>
          <p>
              Number of exercises {props.parts[0].exercises
              + props.parts[1].exercises + props.parts[2].exercises}
          </p>
      </div>
  )
}

