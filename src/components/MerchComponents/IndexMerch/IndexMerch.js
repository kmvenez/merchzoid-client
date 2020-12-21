import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { indexMerch } from '../../../api/auth'

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

  if (!merchArray) {
    return 'Stand By...'
  } else {
    return (
      <div>
        {merchArray.map(merch => (
          <div key={merch._id}>
            <h2><Link to={`/merch/${merch._id}`}>{merch.title}</Link></h2>
            <p>Please click the title to see more details or begin purchase.</p>
            <p>{merch.type}</p>
            <p>{merch.description}</p>
            <p>${merch.price}</p>
            <p>Listing ID: {merch._id}</p>
            <Link to={`/merch/${merch._id}`}>Edit Merch</Link>
            <br/>
          </div>
        ))}
      </div>

    )
  }
}

export default IndexMerch
