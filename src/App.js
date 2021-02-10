import {BrowserRouter as Router, Route} from 'react-router-dom'
import {AnimatedSwitch, spring} from 'react-router-transition'
import {Button, CircularProgress, Container} from "@material-ui/core"
import {useEffect, useState} from "react"
import api from "./services/api"
import HomePage from './Pages/Home'
import UserPage from './Pages/User'
import AlbumPage from './Pages/Album'

const mapStyles = (styles) => {
	return {
		opacity: styles.opacity,
		transform: `scale(${styles.scale})`,
	};
}

const bounce = (val) => {
	return spring(val, {
		stiffness: 330,
		damping: 22,
	});
}

const bounceTransition = {
	atEnter: {
		opacity: 0,
		scale: 1.2,
	},
	atLeave: {
		opacity: bounce(0),
		scale: bounce(0.8),
	},
	atActive: {
		opacity: bounce(1),
		scale: bounce(1),
	},
};

const App = () => {
  const [listUsers, setListUsers] = useState()
  const [listAlbums, setListAlbums] = useState()
  const [listPhotos, setListPhotos] = useState()
  const [isFetchingUsers, setIsFetchingUsers] = useState(true)
  const [isFetchingAlbums, setIsFetchingAlbums] = useState(true)
  const [isFetchingPhotos, setIsFetchingPhotos] = useState(true)
  const [hasError, setHasError] = useState(false)

  const fetchUsers = () => {
    setIsFetchingAlbums(true)
    setHasError(false)
    api
      .getUsers()
      .then((res) => setListUsers(res.data))
      .catch(() => setHasError(true))
      .finally(() => setIsFetchingUsers(false))
  }

  const fetchAlbums = () => {
    setIsFetchingAlbums(true)
    setHasError(false)
    api
      .getAlbums()
      .then((res) => setListAlbums(res.data))
      .catch(() => setHasError(true))
      .finally(() => setIsFetchingAlbums(false))
  }

  const fetchPhotos = () => {
    setIsFetchingPhotos(true)
    setHasError(false)
    api
      .getPhotos()
      .then((res) => setListPhotos(res.data))
      .catch(() => setHasError(true))
      .finally(() => setIsFetchingPhotos(false))
  }

  useEffect(() => {
    fetchUsers()
    fetchAlbums()
    fetchPhotos()
  }, [])

  if([isFetchingUsers, isFetchingAlbums, isFetchingPhotos].includes(true)) return(
    <Container>
      <CircularProgress />
    </Container>
  )

  if(hasError) return(
    <Container>
      <Button
        variant='contained'
        color='secondary'
        onClick={() => {
          fetchUsers()
          fetchAlbums()
          fetchPhotos()
        }}
      >
        Recarregar
      </Button>
    </Container>
  )

  return(
    <Container style={{paddingTop: 20}}>
      <Router>
        <AnimatedSwitch atEnter={bounceTransition.atEnter}
            atLeave={bounceTransition.atLeave}
            atActive={bounceTransition.atActive}
            mapStyles={mapStyles}
            className="route-wrapper"
        >
          <Route exact path='/' component={() => <HomePage users={listUsers} />} />
          <Route path='/user/:id' component={(props) => (
            <UserPage users={listUsers} albums={listAlbums} photos={listPhotos} {...props} />
          )} />
          <Route path='/album/:id' component={(props) => (
            <AlbumPage users={listUsers} albums={listAlbums} photos={listPhotos} {...props} />
          )} />
        </AnimatedSwitch>
      </Router>
    </Container>
  )
}

export default App