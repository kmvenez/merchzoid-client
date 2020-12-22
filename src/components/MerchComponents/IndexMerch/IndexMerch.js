import React, { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import { indexMerch } from '../../../api/auth'

// This is the component used to show every potential merch item that's already been logged.
const IndexMerch = props => {
  const [merchArray, setMerchArray] = useState(null)
  const { user } = props

  useEffect(() => {
    indexMerch(user)
      .then(res => {
        setMerchArray(res.data.merch)
      })
      .catch(console.error)
  }, [])

  // If it's not the merch array, display 'Stand By...', but if it is, return...
  if (!merchArray) {
    return 'Stand By...'
  } else {
    return (
      // Here's what displays on the page.
      <div>
        {merchArray.map(merch => (
          <div className="table" key="table">
            <div key={merch._id}>
              <h2><Link to={`/merch/${merch._id}`}>{merch.title}</Link></h2>
              <p id="disclaimer">Please click the title to see more details or begin purchase.</p>
              <p><li>Its a: {merch.type}</li></p>
              <p><li>Description: {merch.description}</li></p>
              <p><li>Selling for: ${merch.price}</li></p>
              <p><li>Listing ID: {merch._id}</li></p>
              <Card.Img variant='bottom' src={merch.image}></Card.Img>
              <Link to={`/merch/${merch._id}`}>Edit Your Listing</Link>
              <br/>
            </div>
          </div>
        ))}
      </div>

    )
  }
}

export default IndexMerch
