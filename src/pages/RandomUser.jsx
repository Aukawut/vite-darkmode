import axios from "axios"
import React, { useEffect, useState } from "react"
import Loading from "../components/Loading"
import { Input, Text, Button } from "@chakra-ui/react"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Center,
} from "@chakra-ui/react"
const RandomUser = () => {
  const [user, setUser] = useState([])
  const [amount, setAmount] = useState(null)
  const [inputAmount, setInputAmount] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const baseURL = "https://randomuser.me/api/"
  const fullURL = baseURL + "?results=" + amount
  const getUser = async () => {
    await axios.get(`${fullURL}`).then((res) => {
      if (!res.data) {
        setIsLoading(true)
      } else {
        setIsLoading(false)
        setUser(res.data.results)
        console.log(res.data.results)
      }
      // setUser(res.data)
    })
  }
  useEffect(() => {
    {
      amount != null ? getUser() : null
    }
  }, [fullURL])
  console.log(fullURL)
  const reset = () => {
    setUser([])
    setIsLoading(true)
    setAmount(null)
    setInputAmount("")
  }
 const limiter = (input) => {
input > 100?setInputAmount(100):input<1?setInputAmount(""):null
 }
  return (
    <>
      {isLoading ? (
        <div className="container mt-4">
          <p>
            <div className="form-group">
              <Text className="mb-2">Input number to random user :</Text>
              <Input
                placeholder="Input number.."
                size="md"
                onChange={(e) => {
                  setInputAmount(e.target.value)
                  limiter(e.target.value);
                }}
                type="number"
                value={inputAmount}
              />
            </div>
            <Button
              colorScheme="blue"
              className="mt-2"
              value={inputAmount}
              onClick={(e) => setAmount(e.target.value)}
            >
              Search
            </Button>
            <Loading />
          </p>
        </div>
      ) : (
        <div className="container">
          <h1
            style={{ fontSize: 35, textAlign: "center", marginBottom: "1rem" }}
          >
          Random Users
          </h1>
          <hr />
          {user.length > 0 ? (
            <div>
              <div className="cotainer">
                <Button className="m-2" onClick={reset}>  Change amount</Button>
                <div className="row gy-2">
                  {user.map((val) => {
                    return (
                      <div className="col col-12 col-sm-4 col-xl-4">
                        <Card>
                          <CardHeader><p style={{fontSize:25,fontWeight:'bold'}}>{`${val.name.first} ${val.name.last}`}</p></CardHeader>
                          <CardBody>
                            <Text>
                              <p>{`Phone : ${val.phone}`}</p>
                              <p>{`Email : ${val.email}`}</p>
                            </Text>
                            <Center>
                              <Image
                                src={val.picture.large}
                                alt={val.name.first}
                                borderRadius="lg"
                              />
                            </Center>
                          </CardBody>
                        </Card>
                        <p></p>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <Loading />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default RandomUser
