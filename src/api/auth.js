import apiUrl from '../apiConfig'
import axios from 'axios'

// Authorization Axios
export const signUp = credentials => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}

// Review Axios
export const createReview = (review, user) => {
  return axios({
    url: apiUrl + '/create-reviews',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + user.token
    },
    data: {
      review: {
        title: review.title,
        body: review.body,
        rating: review.rating
      }
    }
  })
}

export const viewReview = (user, id) => {
  return axios({
    url: apiUrl + '/reviews/' + id,
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'GET'
  })
}

export const viewReviews = (user, id) => {
  return axios({
    url: apiUrl + '/reviews/' + id,
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'GET'
  }
  )
}

export const updateReview = (user, review, id) => {
  return axios({
    url: apiUrl + '/reviews/' + id,
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'PATCH',
    data: {
      review: {
        title: review.title,
        body: review.body,
        rating: review.rating
      }
    }
  })
}

export const deleteReview = (user, id) => {
  return axios({
    url: apiUrl + '/reviews/' + id,
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'DELETE'
  })
}

// Merch Axios
export const createMerch = (merch, user) => {
  return axios({
    url: apiUrl + '/add-merch',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + user.token
    },
    data: {
      merch: {
        title: merch.title,
        type: merch.type,
        description: merch.description
      }
    }
  })
}

export const viewMerch = (user, id) => {
  return axios({
    url: apiUrl + '/merch/' + id,
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'GET'
  })
}

export const indexMerch = (user, id) => {
  return axios({
    url: apiUrl + '/merch/',
    method: 'GET'
  }
  )
}

export const updateMerch = (user, merch, id) => {
  return axios({
    url: apiUrl + '/merch/' + id,
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'PATCH',
    data: {
      merch: {
        title: merch.title,
        type: merch.type,
        description: merch.description
      }
    }
  })
}

export const deleteMerch = (user, id) => {
  return axios({
    url: apiUrl + '/merch/' + id,
    headers: {
      Authorization: 'Bearer ' + user.token
    },
    method: 'DELETE'
  })
}
