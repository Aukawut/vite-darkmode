import React, { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  Stack,
  Heading,
  ButtonGroup,
  Button,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import Loading from "../components/Loading"
import axios from "axios"
import { useNavigate } from "react-router-dom"
const Attractions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()
  const [user, setUser] = useState([])
  const [attractions, setAttraction] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [state, setState] = useState(false)

  const baseURL = `https://www.melivecode.com/api/attractions/`
  const getUser = async () => {
    await axios.get(`${baseURL}`).then((res) => {
      console.log(res.data)
      if (!res.data) {
        setIsLoading(true)
      } else {
        setIsLoading(false)
        setUser(res.data)
      }
    })
  }
  attractions.attraction

  const getAttraction = async (id) => {
    console.log(id)
    await axios.get(`${baseURL}${id}`).then((res) => {
      if (res.data.status == "ok") {
        setAttraction(res.data.attraction)
        onOpen()
        state ? setState(false) : setState(true)
      } else {
        console.log(`cannot get`)
      }
    })
  }
  useEffect(() => {
    getUser()
  }, [])
  return (
    <>
      {/* //Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose()
          setAttraction([])
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{attractions.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={attractions.coverimage} alt={attractions.name} />
            <Text>{attractions.detail}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                onClose()
                setAttraction([])
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* endModal */}

      {!isLoading ? (
        <>
          <div className="container">
            <h1
              style={{
                fontSize: 30,
                textAlign: "center",
                marginBottom: "2rem",
                marginTop: "1rem",
              }}
            >
              ATTRACTIONS
            </h1>
            <hr />

            <div className="container mt-2">
              <div className="row gy-3">
                {user.map((val) => {
                  return (
                    <div className="col col-12 col-xl-4 col-lg-6" key={val.id}>
                      <Card maxW="sm">
                        <CardBody>
                          <Image
                            src={val.coverimage}
                            alt="Green double couch with wooden legs"
                            borderRadius="lg"
                          />
                          <Stack mt="6" spacing="3">
                            <Heading size="md">{`${val.name}`}</Heading>
                            <Text noOfLines={[1, 2, 3]}>{val.detail}</Text>
                            <Text
                              color="blue.600"
                              fontSize="sm"
                              style={{ cursor: "pointer" }}
                              id={val.id}
                              onClick={(e) => {
                                getAttraction(e.target.id)
                              }}
                            >
                              Read more..
                            </Text>
                          </Stack>
                        </CardBody>
                      </Card>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Loading />
        </>
      )}
    </>
  )
}

export default Attractions
