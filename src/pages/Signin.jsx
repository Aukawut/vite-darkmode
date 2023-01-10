import React, { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Divider,
  ButtonGroup,
  Button,
  Image,
  Text,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Signin = () => {
  const toast = useToast()
  const [show, setShow] = React.useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const handleClick = () => setShow(!show)
  const navigate = useNavigate()

  const handleReset = () => {
    setUsername("")
    setPassword("")
    setShow(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:8080/api_login_mysql/", {
        router: "login",
        username: username,
        password: password,
      })
      .then((res) => {
        if (!res.data.err) {
          toast({
            title: "Login success!",
            description: "Welcome to mysite",
            status: "success",
            position: "top",
            duration: 1500,
            isClosable: true,
          })
          setTimeout(() => {
            console.log(res.data)
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("fname", res.data.data.fname)
            localStorage.setItem("lname", res.data.data.lname)
            localStorage.setItem("username", res.data.data.username)
            localStorage.setItem("position", res.data.data.position)
            localStorage.setItem("login", true)
            handleReset()
            navigate("/attractions")
          }, 1500)
        } else if (
          res.data.err &&
          res.data.msg == "Username or Password Invalid"
        ) {
       
          toast({
            title: "Error!",
            description: "Username or Password Invalid!",
            status: "error",
            position: "top",
            duration: 1500,
            isClosable: true,
          })
        } else if (res.data.err && res.data.msg == "empty data") {
            toast({
                title: "Error!",
                description: "Please input your username and password!",
                status: "error",
                position: "top",
                duration: 1500,
                isClosable: true,
              })
      
        } else {
          console.log(res.data)
        }
      })
  }
  const authen = async () => {
    const token = localStorage.getItem("token")
    await axios
      .post("http://localhost:8080/api_login_mysql/", {
        router: "verify",
        token: token,
      })
      .then((res) => {
        if (!res.data.err) {
          navigate("/attractions")
        }
        console.log(res.data)
      })
  }
  useEffect(() => {
    authen()
  }, [])
  return (
    <>
      <div className="container mt-2">
        <h1 className="text-center mb-2" style={{ fontSize: 35 }}>
          Login
        </h1>
        <hr />
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col col-12">
              <Card maxW="sm" style={{ width: 600 }} className="mt-5">
                <form onSubmit={handleSubmit}>
                  <CardBody>
                    <div className="mb-2">
                      <Text mb="8px">Username :</Text>
                      <Input
                        placeholder="Username.."
                        size="md"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="mb-2">
                      <Text mb="8px">Password :</Text>
                      <InputGroup size="md">
                        <Input
                          pr="4.5rem"
                          type={show ? "text" : "password"}
                          placeholder="Enter password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <InputRightElement width="4.5rem">
                          <Button h="1.75rem" size="sm" onClick={handleClick}>
                            {show ? "Hide" : "Show"}
                          </Button>
                        </InputRightElement>
                      </InputGroup>
                    </div>
                  </CardBody>
                  <Divider />
                  <CardFooter>
                    <ButtonGroup spacing="2">
                      <Button variant="solid" colorScheme="blue" type="submit">
                        Login
                      </Button>
                      <Button
                        variant="ghost"
                        colorScheme="blue"
                        onClick={handleReset}
                      >
                        Reset from
                      </Button>
                    </ButtonGroup>
                  </CardFooter>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Signin
