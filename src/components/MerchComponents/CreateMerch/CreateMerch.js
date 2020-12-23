import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

// Creating the component
const CreateMerch = props => {
  const merchId = props.match.params.merchId
  const [merch, setMerch] = useState({ title: '', type: '', description: '', price: '', merch: merchId })
  const [createdMerchId, setCreatedMerchId] = useState(null)
  const { msgAlert } = props

  const handleChange = event => {
    event.persist()
    setMerch(prevMerch => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedMerch = Object.assign({}, prevMerch, updatedField)
      return editedMerch
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/merch/`,
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + props.user.token
      },
      data: { merch }
    })
      .then(res => setCreatedMerchId(res.data.merch._id))
      .then(() => {
        msgAlert({
          heading: 'Your merch has been successfully uploaded.',
          message: 'Nice Job!',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Merch upload has failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      }).catch(console.error)
  }

  // If the merch successfully was created with an ID, redirect to this url.
  if (createdMerchId) {
    return <Redirect to={`/merch/${createdMerchId}`} />
  }

  // Here's what displays on the page.
  return (
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <h3>Upload Your Merch</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              placeholder="Grab their attention!"
              value={merch.title}
              name="title"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              placeholder="Pants? Shirt? Necklace?"
              value={merch.type}
              name="type"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Why should they buy this?"
              value={merch.description}
              name="description"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price ($)</Form.Label>
            <Form.Control
              placeholder="How much are you looking for? $ USD - don't use special characters."
              value={merch.price}
              name="price"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <OverlayTrigger
              overlay={<Tooltip id="tooltip-disabled">
              Make sure you put the direct link to the image so it stores correctly - try right clicking on an image in a web browser and selecting Copy Image Address.
              </Tooltip>}>
              <span className="d-inline-block">
                <Button
                  disabled style={{ pointerEvents: 'none' }}>
                    ?
                </Button>
              </span>
            </OverlayTrigger>
            <Form.Control
              placeholder="Input the direct image URL here"
              value={merch.image}
              name="image"
              onChange={handleChange}
            />
          </Form.Group>

          <Button
            type="submit"
            Link to={'/merch'}>Submit</Button>
          <br/><br/>

        </Form>
      </div>
    </div>
  )
}

export default CreateMerch
