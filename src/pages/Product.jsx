import React, { useEffect, useState } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Divider,
  ButtonGroup,
  Button,
  Heading,
  Image,
  Stack,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Swal from "sweetalert2"
import Loading from "../components/Loading"
import { visuallyHidden } from "@mui/utils"
const Product = () => {
  const token = localStorage.getItem("token")
  const navigate = useNavigate()
  const [store, setStore] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [oneProduct, setOneProduct] = useState({})
  const { isOpen, onOpen, onClose } = useDisclosure()
  const authen = async () => {
    await axios
      .post("http://localhost:8080/api_login_mysql/", {
        router: "verify",
        token: token,
      })
      .then((res) => {
        if (!res.data) {
          Swal.fire({
            icon: "error",
            title: "Invalid token!",
            timer: 1500,
          }).then(() => {
            localStorage.removeItem("token")
            localStorage.removeItem("login")
            navigate("/signin")
          })
        }
        if (!res.data.err) {
          console.log(res.data)
        } else {
          Swal.fire({
            icon: "error",
            title: "Invalid token!",
            timer: 1500,
          }).then(() => {
            localStorage.removeItem("token")
            localStorage.removeItem("login")
            navigate("/signin")
          })
        }
      })
  }
  const getStore = () => {
    axios.get("https://fakestoreapi.com/products?limit=20").then((res) => {
      console.log(res.data)
      if (!res.data) {
        setIsLoading(true)
      } else {
        setIsLoading(false)
        setStore(res.data)
      }
    })
  }
  const getOne = (id = "") => {
    const baseURL = "https://fakestoreapi.com/products"
    axios.get(`${baseURL}/${id}`).then((res) => {
      if (!res.data) {
        console.log(`No data`)
      }
      setOneProduct(res.data)
      console.log(res.data)
      onOpen()
    })
  }
  useEffect(() => {
    authen()
    getStore()
  }, [])
  console.log(isLoading)
  console.log(oneProduct)
  console.log(oneProduct.image)
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {/* Modal */}
          {Object.keys(oneProduct).length === 0 ? null : (
            <>
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>{oneProduct.title}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <Center>
                      {oneProduct.image ? (
                        <Image
                          src={oneProduct.image}
                          alt={oneProduct.title}
                          style={{ width: 200 }}
                          borderRadius="lg"
                        />
                      ) : (
                        <>
                          <p>Loading..</p>
                        </>
                      )}
                    </Center>
                    <Text className="mt-2">{oneProduct.description}</Text>
                    <Text color="blue.600" fontSize="2xl">
                      {`${oneProduct.price} $`}
                    </Text>
                  </ModalBody>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                  
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>
          )}

          {/* END */}
          
          <div className="container">
            <h1 style={{ fontSize: 35, textAlign: "center" }}>Product</h1>
            <hr />
            <div className="row gy-2">
              {store.map((val) => {
                return (
                  <div className="col col-12 col-lg-3 col-xl-4" key={val.id}>
                    <Card maxW="sm" style={{ height: 580 }}>
                      <CardBody>
                        <Center>
                          <Image
                            src={val.image}
                            width={200}
                            height={200}
                            alt={val.title}
                            borderRadius="lg"
                          />
                        </Center>
                        <Stack mt="6" spacing="3">
                          <Heading size="md">{val.title}</Heading>
                          <Text noOfLines={[1, 2]}>{val.description}</Text>
                          <Text
                            color="blue.600"
                            style={{ cursor: "pointer" }}
                            id={val.id}
                            onClick={(e) => getOne(e.target.id)}
                          >
                            Readmore..
                          </Text>
                          <Text color="blue.600" fontSize="2xl">
                            {`${val.price} $`}
                          </Text>
                        </Stack>
                      </CardBody>
                      <Divider />
                      <CardFooter>
                        <ButtonGroup spacing="2">
                          <Button variant="solid" colorScheme="blue">
                            Buy now
                          </Button>
                          <Button variant="ghost" colorScheme="blue">
                            Add to cart
                          </Button>
                        </ButtonGroup>
                      </CardFooter>
                    </Card>
                    <p></p>
                  </div>
                )
              })}
            </div>
            <p></p>
          </div>
        </>
      )}
    </>
  )
}

export default Product
