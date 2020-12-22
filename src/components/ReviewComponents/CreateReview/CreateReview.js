// import React, { useState } from 'react'
// import { Redirect, Link } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../../apiConfig'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'
//
// const ReviewCreate = props => {
//   const merchId = props.match.params.merchId
//   const [review, setReview] = useState({ title: '', body: '', rating: '', merch: merchId })
//   const [createdReviewId, setCreatedReviewId] = useState(null)
//   const { msgAlert } = props
//   const handleChange = event => {
//     event.persist()
//     setReview(prevReview => {
//       const updatedField = { [event.target.name]: event.target.value }
//       const editedReview = Object.assign({}, prevReview, updatedField)
//       return editedReview
//     })
//   }
//   const handleSubmit = (event) => {
//     event.preventDefault()
//     axios({
//       url: `${apiUrl}/reviews`,
//       method: 'POST',
//       headers: {
//         'Authorization': 'Bearer ' + props.user.token
//       },
//       data: { review }
//     })
//       .then(res => setCreatedReviewId(res.data.review._id))
//       .then(() => {
//         msgAlert({
//           heading: 'Your review has been logged.',
//           message: 'Nice Job!',
//           variant: 'success'
//         })
//       })
//       .catch(err => {
//         msgAlert({
//           heading: 'Review Failed to Upload :(',
//           message: 'Error code: ' + err.message,
//           variant: 'danger'
//         })
//       }).catch(console.error)
//   }
//
//   if (createdReviewId) {
//     return <Redirect to={`/reviews/${createdReviewId}`} />
//   }
//
//   return (
//     <div className="row">
//       <div className="col-sm-10 col-md-8 mx-auto mt-5">
//         <h3>Create Review</h3>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group controlId="title">
//             <Form.Label>Title</Form.Label>
//             <Form.Control
//               placeholder="Great experience and product!"
//               value={review.title}
//               name="title"
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="body">
//             <Form.Label>Body</Form.Label>
//             <Form.Control
//               placeholder="How was the seller to work with?"
//               value={review.body}
//               name="body"
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group controlId="rating">
//             <Form.Label>Rating</Form.Label>
//             <Form.Control
//               placeholder="On a scale of 1-10?"
//               value={review.rating}
//               name="rating"
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Button type="submit">Submit</Button>
//           <Link to={'/'}>
//             <button>Cancel</button>
//           </Link>
//         </Form>
//       </div>
//     </div>
//   )
// }
//
// export default ReviewCreate
