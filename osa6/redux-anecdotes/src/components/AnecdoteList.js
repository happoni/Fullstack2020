import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationRemove } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)

  const notify = (message) => {
    dispatch(notificationChange(message))
    setTimeout(() => {
      dispatch(notificationRemove())
    }, 5000)
  }

  const vote = (id) => {
    console.log('vote', id)
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(voteAnecdote(id))
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