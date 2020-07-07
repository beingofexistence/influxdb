// Libraries
import {FC, useEffect} from 'react'
import {connect, ConnectedProps} from 'react-redux'
import {withRouter, RouteComponentProps} from 'react-router-dom'

// APIs
import {postSignout} from 'src/client'

// Constants
import {CLOUD, CLOUD_URL, CLOUD_LOGOUT_PATH} from 'src/shared/constants'

// Components
import {reset} from 'src/shared/actions/flags'

type ReduxProps = ConnectedProps<typeof connector>
type Props = ReduxProps & RouteComponentProps

const Logout: FC<Props> = ({history, resetFeatureFlags}) => {
  const handleSignOut = async () => {
    if (CLOUD) {
      window.location.href = `${CLOUD_URL}${CLOUD_LOGOUT_PATH}`
      return
    } else {
      const resp = await postSignout({})

      if (resp.status !== 204) {
        throw new Error(resp.data.message)
      }

      history.push(`/signin`)
    }
  }

  useEffect(() => {
    resetFeatureFlags()
    handleSignOut()
  }, [])
  return null
}

const mdtp = {
  resetFeatureFlags: reset,
}

const connector = connect(null, mdtp)

export default connector(withRouter(Logout))
