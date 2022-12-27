import { useEffect } from "react"
import axios from "axios"
import { Container } from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

const code = new URLSearchParams(window.location.search).get('code')

export default function Authorized() {

  useEffect(() => {
    axios
    .post("http://localhost:3001/adminLogin", {
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
      <a className="btn btn-success btn-lg" href={'http://localhost:3000/'}>
        Authorized. Back to Dashboard 
      </a>
    </Container>
  )
}