import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Spinner from 'react-bootstrap/Spinner'
import CheckOut from '../../CheckOut/CheckOut'
// import ReviewCreate from '../../ReviewComponents/CreateReview/CreateReview'

// This is the component to view one single, specific merch resource and delete it if requested.
import { viewMerch, deleteMerch } from '../../../api/auth'
const ViewMerch = (props) => {
  // const [loading, setLoading] = useState(true)
  const [merch, setMerch] = useState(null)
  const { user, msgAlert, match, history } = props

  useEffect(() => {
    viewMerch(user, match.params.merchId)
      .then(res => {
        setMerch(res.data.merch)
      })
      .then(() => {
        msgAlert({
          heading: 'Here ya go!',
          message: 'As requested.',
          variant: 'success'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Request failed :(',
          message: 'Error code: ' + err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleDelete = () => {
    deleteMerch(user, match.params.merchId)
      .then(() => {
        msgAlert({
          heading: 'Poof! It is gone.',
          message: 'Head back to view more.',
          variant: 'success'
        })
      })
      .then(() => history.push('/merch'))
      .catch(err => {
        msgAlert({
          heading: 'Uhoh, deletion failed.',
          message: 'Something went wrong: ' + err.message,
          variant: 'danger'
        })
      })
  }

  // This is what displays on the page if it ran successfully.
  return (
    <div>
      {merch ? (
        <div>
          <Card style={{ width: '18rem' }} className="text-center">
            <Card.Title>{merch.title}</Card.Title>
            <Card.Text>{merch.type}</Card.Text>
            <Card.Text>Description: {merch.description}</Card.Text>
            <Card.Text>${merch.price}</Card.Text>
            <Card.Img variant='bottom' src={merch.image}></Card.Img>
            {user._id === merch.owner ? <Link to={`/merch-update/${merch._id}`}>Update Your Listing</Link> : ''}
            <button onClick={handleDelete}>Remove Merch</button>
            {user._id === merch.owner ? <CheckOut></CheckOut> : ''}
          </Card>
        </div>
      ) : <Spinner animation="border" className='dangerous' role="status">
        <span className="danger"> <br></br>Loading...</span>
      </Spinner>}
    </div>
  )
}

export default withRouter(ViewMerch)
