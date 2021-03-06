import React from 'react'
import { compose } from 'react-apollo'
import Link from 'next/link'

import withData from '../lib/withData'
import redirect from '../lib/redirect'
import checkLoggedIn from '../lib/checkLoggedIn'

import RegisterBox from '../components/RegisterBox'

class CreateAccount extends React.Component {
  static async getInitialProps (context, apolloClient) {
    const { loggedInUser } = await checkLoggedIn(context, apolloClient)

    if (loggedInUser.user) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/')
    }

    return {}
  }

  render () {
    return (
      <div>
        {/* RegisterBox handles all register logic. */}
        <RegisterBox client={this.props.client} />
        <hr />
        Already have an account? <Link prefetch href='/signin'><a>Sign in</a></Link>
      </div>
    )
  }
};

export default compose( // TODO: Maybe remove the usage of compose?
  // withData gives us server-side graphql queries before rendering
  withData
)(CreateAccount)
