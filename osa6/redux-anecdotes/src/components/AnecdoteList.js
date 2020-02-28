import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({anecdotes, filter}) => {
    console.log(filter)
      return anecdotes.filter(a => a.content.includes(filter))
  })

  const vote = (id) => {
    console.log('vote', id)
    const anecdote = anecdotes.find(a => a.id === id)
    dispatch(voteAnecdote(id, anecdote.content, anecdote.votes))
    dispatch(setNotification(`Voted succesfully '${anecdote.content}'`, 5))
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