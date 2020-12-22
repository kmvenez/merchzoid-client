import React, { useState, useEffect } from 'react'
import { Redirect, Link } from 'react-router-dom'
import { updateMerch, viewMerch } from '../../../api/auth'

// This is the component used to update the merch resource.
const UpdateMerch = (props) => {
  const [merch, setMerch] = useState({ title: '', type: '', description: '', image: '' })
  const [updated, setUpdated] = useState(false)
  const { msgAlert } = props

  useEffect(() => {
    viewMerch(props.user, props.match.params.merchId)
      .then(res => setMerch(res.data.merch))
      .catch(console.error)
  }, [])

  const handleChange = event => {
    event.persist()
    setMerch(prevMerch => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedMerch = Object.assign({}, prevMerch, updatedField)
      return editedMerch
    })
  }

  const handleSubmit = event => {
    event.preventDefault()
    updateMerch(props.user, merch, props.match.params.merchId)
      .then(() => setUpdated(true))
      .then(() => {
        msgAlert({
          heading: 'Updated successfully.',
          message: 'Nice Job!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Update Review Failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
      .catch(console.error)
  }

  if (updated) {
    return <Redirect to={`/merch/${props.match.params.merchId}`} />
  }

  // This is what displays on the page if it loaded correctly.
  return (
    <form onSubmit={handleSubmit}>
      <label>Title</label>
      <input
        placeholder="Whadda they sellin'?"
        value={merch.title}
        name="title"
        onChange={handleChange}
      />
      <label>Type</label>
      <input
        placeholder="Chawklit!"
        value={merch.type}
        name="type"
        onChange={handleChange}
      />
      <label>Description</label>
      <input
        placeholder="'What?' CHAWKLIT!"
        value={merch.description}
        name="description"
        onChange={handleChange}
      />
      <label>Price</label>
      <input
        placeholder="'WHAT?' CHAWKLIT!"
        value={merch.price}
        name="price"
        onChange={handleChange}
      />

      <button type="submit">Submit</button>

      <Link to={'update-merch/'}>
        <button>Cancel</button>
      </Link>
    </form>
  )
}

export default UpdateMerch
