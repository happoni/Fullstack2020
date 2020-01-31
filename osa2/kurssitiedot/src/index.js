import React from 'react';
import ReactDOM from 'react-dom';


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

const App = () => {
  const course = [
    {
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
       },    
       {
         name: "Testing against failures",
         exercises: 5,
         id: 4
       }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts:[
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
    return (
        <div>
          <h1>Web development curriculum</h1>
          {course.map(course =>
          <Course course={course} />
          )}          
           
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
