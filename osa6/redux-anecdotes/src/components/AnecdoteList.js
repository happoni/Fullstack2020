import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => {
    console.log(filter)
      return anecdotes.filter(a => a.content.includes(filter))
  })

  const notify = (message) => {
    dispatch(notificationChange(message))
    setTimeout(() => {
      dispatch(notificationRemove())
    }, 5000)
  }

  const vote = (id) => {
    console.log('vote', id)
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(voteAnecdote(id, anecdote.content, anecdote.votes))
    notify(`Voted succesfully '${anecdote.content}'`)
  }

  return (
    <div>
      {anecdotes.sort((a, b) => {
        return b.votes - a.votes
      }).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>)
      }
    </div>
  )
}

export default AnecdoteList