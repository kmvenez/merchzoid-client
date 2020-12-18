import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { indexMerch } from '../../../api/auth'

const IndexMerch = props => {
  const [merchArray, setMerchArray] = useState(null)
  const { user, match } = props

  useEffect(() => {
    indexMerch(user, match.params.merchId)
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
            <h2>{merch.title}</h2>
            <h2>{merch.type}</h2>
            <h2>{merch.description}</h2>
            <Link to={`/reviews/${merch._id}`}>Edit Merch</Link>
          </div>
        ))}
      </div>

    )
  }
}

export default IndexMerch
