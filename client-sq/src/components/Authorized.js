import { useEffect } from "react"
import axios from "axios"
import { Container } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

const code = new URLSearchParams(window.location.search).get('code')

export default function Authorized() {

  useEffect(() => {
    axios
      .post(process.env.REACT_APP_API_URL + "/host/login", {
        code,
      })
      .then(res => {
        console.log(res.data)
        window.history.pushState({}, null, "/")
      })
      .catch(() => {
        window.location = "/"
      })
  }, [])

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={process.env.REACT_APP_BASE_URL}>
        Authorized. Back to Dashboard
      </a>
    </Container>
  )
}
