import React,{useState} from "react"
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
  InputRightElement 
} from "@chakra-ui/react"
import axios from 'axios'
import Swal from "sweetalert2"
const Register = () => {
  const [show, setShow] = React.useState(false)
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [fname,setFname] = useState("")
  const [lname,setLname] = useState("")
  const [position,setPosition] = useState("")
  const fInit = (fname.charAt(0)).toUpperCase();
  const LInit = (lname.charAt(0)).toUpperCase();
  const handleClick = () => setShow(!show)

  const handleReset = () => {
    setUsername("")
    setPassword("")
    setFname("")
    setLname("")
    setPosition("")
    setShow(false)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post("http://localhost:8080/api_login_mysql/",{
        router:"register",
        username:username,
        password:password,
        fname:fname,
        lname:lname,
        position:position,
        initials:fInit+LInit
    }).then((res) => {
        if(!res.data.err){
            Swal.fire({
                icon:'success',
                title:'Register success!',
                timer:1500
            }).then(() => {
                handleReset()
            })
          
            
            
        }else if(res.data.err && res.data.msg == 'duplicate username'){
            Swal.fire({
                icon:'error',
                title:'Duplicate username!',
                timer:1500
            })
        
        }else if(res.data.err && res.data.msg == 'empty data'){
            Swal.fire({
                icon:'error',
                title:'Please input your information!',
                timer:1500
            })
        }else{
        console.log(res.data);
    }
    })

  }
  return (
    <>
      <div className="container mt-2">
        <h1 className="text-center mb-2" style={{ fontSize: 35 }}>
          Register
        </h1>
        <hr />
        <div className="d-flex justify-content-center">
          <div className="row">
            <div className="col col-12">
              <Card maxW="sm" style={{ width: 600 }} className="mt-3">
                <form onSubmit={handleSubmit}>
                <CardBody >
                  <div className="mb-2">
                    <Text mb="8px">Username :</Text>
                    <Input placeholder="Username.." size="md" value={username} onChange={e => setUsername(e.target.value)} />
                  </div>
                  <div className="mb-2">
                  <Text mb="8px">Password :</Text>
                    <InputGroup size="md">
                      <Input
                        pr="4.5rem"
                        type={show ? "text" : "password"}
                        placeholder="Enter password"
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                          {show ? "Hide" : "Show"}
                        </Button>
                      </InputRightElement>
                    </InputGroup>
                  </div>
                  <div className="mb-2">
                    <Text mb="8px">Firstname :</Text>
                    <Input placeholder="Firstname.." size="md" 
                     value={fname} 
                     onChange={e => setFname(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <Text mb="8px">Surname :</Text>
                    <Input placeholder="Surname.." size="md" 
                     value={lname} 
                     onChange={e => setLname(e.target.value)}
                    />
                  </div>
                  <div className="mb-2">
                    <Text mb="8px">Position :</Text>
                    <Input placeholder="Position.." size="md" 
                     value={position} 
                     onChange={e => setPosition(e.target.value)}
                    />
                  </div>
                </CardBody>
                <Divider />
                <CardFooter>
                  <ButtonGroup spacing="2">
                    <Button variant="solid" colorScheme="blue" type="submit">
                      Register
                    </Button>
                    <Button variant="ghost" colorScheme="blue" onClick={handleReset}>
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

export default Register
