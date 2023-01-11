import React from "react"
import { Container } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=db55ce79bd574c94aca99e831e39d6c9&response_type=code&redirect_uri="+process.env.REACT_APP_BASE_URL+"/auth&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Admin() {

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login to Spotify
      </a>
    </Container>
  )
}
