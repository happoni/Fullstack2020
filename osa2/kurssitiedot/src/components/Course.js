import React from 'react'

const Course = ({course}) => {

  const Header = () => {
    return (
        <div>            
            <h2>{course.name}</h2>
        </div>
    )
  }

  const Content = () => {      

    return (
      <div>
        {course.parts.map(part =>
          <Part key={part.id} id={part.id} name={part.name} exercises={part.exercises} />          
          )}                            
      </div>)
  }

  const Part = (props) => {
    return (
      <div>
        <p key={props.id}>
          {props.name} {props.exercises}
        </p>
      </div>)
  }

  const Total = () => {
    
    const exercisesTotal = course.parts.map(part =>
      part.exercises).reduce(
      ( accumulator, currentValue ) => accumulator + currentValue)    
    
    return (
        <div>
          <b>
            Total number of exercises {exercisesTotal}
          </b>
        </div>
    )
  }

  return (
    <div>      
    <Header />
    <Content />
    <Total />
    </div>
  )
}

export default Course