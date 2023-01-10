import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { Card, CardHeader, CardBody, CardFooter,Stack,Button,Heading,Divider,ButtonGroup,Image,Text } from "@chakra-ui/react"
const Myprofile = () => {
  const token = localStorage.getItem("token")
  const [username, setUsername] = useState("")
  const [position, setPosition] = useState("")
  const [fname, setFname] = useState("")
  const [lname, setLname] = useState("")
  const navigate = useNavigate()
  const authen = async () => {
    await axios
      .post("https://bookingmeetingroom.com/api_vite/", {
        router: "verify",
        token: token,
      })
      .then((res) => {
        if (res.data.err !== false) {
          navigate("/signin")
        } else {
          setUsername(res.data.details.data.username)
          setPosition(res.data.details.data.position)
          setFname(res.data.details.data.fname)
          setLname(res.data.details.data.lname)
        }
      })
  }
  useEffect(() => {
    authen()
  }, [])
  return (
    <>
      <div className="container">
        <h1
          style={{ fontSize: 35, textAlign: "center" }}
          className="mt-2"
        >{`Profile`}</h1>
        <hr />
        <div className="container d-flex justify-content-center mt-2">
            <section>
              <Card maxW="sm">
                <CardBody>
                  
                  <Stack mt="6" spacing="3">
                    <Heading size="md">{`${fname} ${lname} ( ${position} )`} </Heading>
                    <Text>
                      This sofa is perfect for modern tropical spaces, baroque
                      inspired spaces, earthy toned spaces and for people who love a
                      chic design with a sprinkle of vintage design.
                    </Text>
                    
                  </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                </CardFooter>
              </Card>
            </section>
        </div>
      </div>
    </>
  )
}

export default Myprofile
