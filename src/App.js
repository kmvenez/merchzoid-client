import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'
// Authentication
import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
// Reviews
import CreateReview from './components/ReviewComponents/CreateReview/CreateReview'
import UpdateReview from './components/ReviewComponents/UpdateReview/UpdateReview'
import DeleteReview from './components/ReviewComponents/DeleteReview/DeleteReview'
import ViewReview from './components/ReviewComponents/ViewReview/ViewReview'
import ViewReviews from './components/ReviewComponents/ViewReviews/ViewReviews'
// Merch
import CreateMerch from './components/MerchComponents/CreateMerch/CreateMerch'
import UpdateMerch from './components/MerchComponents/UpdateMerch/UpdateMerch'
import DeleteMerch from './components/MerchComponents/DeleteMerch/DeleteMerch'
import IndexMerch from './components/MerchComponents/IndexMerch/IndexMerch'
import ViewMerch from './components/MerchComponents/ViewMerch/ViewMerch'
import StripeButton from './components/CheckOut/CheckOut'

class App extends Component {
  constructor () {
    super()
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })
  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          <AuthenticatedRoute user={user} path='/create-review/:merchId' render={({ match }) => (
            <CreateReview
              match={match}
              user={user}
              msgAlert={this.msgAlert}
            />
          )} />
          <AuthenticatedRoute user={user} exact path='/view-a-review/:reviewId' render={({ match }) => (
            <ViewReview
              user={user}
              msgAlert={this.msgAlert}
              match={match}
            />
          )}/>
          <AuthenticatedRoute user={user} path='/delete-review/:reviewId' render={({ match }) => (
            <DeleteReview
              msgAlert={this.msgAlert}
              user={user}
              match={match}
            />
          )} />
          <AuthenticatedRoute user={user} path='/update-review/:reviewId' render={({ match, history }) => (
            <UpdateReview
              match={match}
              history={history}
              user={user}
              msgAlert={this.msgAlert}
            />
          )}/>
          <Route user={user} exact path='/reviews/:reviewsId/reviews' render={({ match }) => (
            <ViewReviews
              user={user}
              msgAlert={this.msgAlert}
              match={match}
            />
          )}/>

          <AuthenticatedRoute user={user} path='/add-merch' render={({ match }) => (
            <CreateMerch
              match={match}
              user={user}
              msgAlert={this.msgAlert}
            />
          )}/>
          <AuthenticatedRoute user={user} path='/merch-update/:merchId' render={({ match, history }) => (
            <UpdateMerch
              match={match}
              history={history}
              user={user}
              msgAlert={this.msgAlert}
            />
          )}/>
          <Route user={user} exact path='/merch' render={({ match }) => (
            <IndexMerch
              match={match}
              user={user}
              msgAlert={this.msgAlert}
            />
          )}/>
          <AuthenticatedRoute user={user} path='/merch/:merchId' render={({ match, history }) => (
            <ViewMerch
              user={user}
              msgAlert={this.msgAlert}
              match={match}
              history={history}
            />
          )}/>
          <AuthenticatedRoute user={user} path='/delete-merch/:merchId' render={({ match }) => (
            <DeleteMerch
              msgAlert={this.msgAlert}
              user={user}
              match={match}
            />
          )} />
          <AuthenticatedRoute user={user} path='/checkout' render={({ match, history }) => (
            <StripeButton
              user={user}
              msgAlert={this.msgAlert}
              match={match}
              history={history}
            />
          )}/>

        </main>
      </Fragment>
    )
  }
}

export default App
