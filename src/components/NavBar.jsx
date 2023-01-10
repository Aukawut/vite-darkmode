import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import NavDropdown from "react-bootstrap/NavDropdown"
import { Link } from "react-router-dom"
import { MoonIcon, SunIcon, ChevronDownIcon } from "@chakra-ui/icons"
import { useColorMode } from "@chakra-ui/react"
import { Tooltip } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useDisclosure } from "@chakra-ui/react"
import axios from "axios"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputGroup,
  Input,
  InputRightElement,
  Text,
} from "@chakra-ui/react"
import Swal from "sweetalert2"
function NavBar() {
  const name =
    localStorage.getItem("fname") + " " + localStorage.getItem("lname")
  const { isOpen, onOpen, onClose } = useDisclosure()
  const userLogin = localStorage.getItem("login")
  const [isLogin, setIsLogin] = useState(false)
  const { colorMode, toggleColorMode } = useColorMode()
  const navigate = useNavigate()
  const [show, setShow] = useState(false)
  const [show2, setShow2] = useState(false)
  const [show3, setShow3] = useState(false)
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [conNewPassword, setConNewPassword] = useState("")
  const handleClick = () => setShow(!show)
  const handleClick2 = () => setShow2(!show2)
  const handleClick3 = () => setShow3(!show3)
  const logout = () => {
    Swal.fire({
      icon: "success",
      title: "Logout successfully!",
      timer: 1500,
    }).then(() => {
      localStorage.removeItem("token")
      localStorage.removeItem("fname")
      localStorage.removeItem("lname")
      localStorage.removeItem("username")
      localStorage.removeItem("position")
      localStorage.removeItem("login")
      navigate("/signin")
    })
  }
  useEffect(() => {
    userLogin ? setIsLogin(true) : setIsLogin(false)
  }, [userLogin])
  const changePassword = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem("token")
    const username = localStorage.getItem("username")
    axios
      .post("http://localhost:8080/api_login_mysql/", {
        router: "changepassword",
        username: username,
        oldpassword: oldPassword,
        newpassword: newPassword,
        connewpassword: conNewPassword,
        token: token,
      })
      .then((res) => {
        if (!res.data.err) {
          console.log(res.data)
          Swal.fire({
            icon: "success",
            title: "Password changed!",
            timer: 1000,
            showCancelButton: false,
            showConfirmButton: false
          }).then(() => {
            navigate("/signin")
            localStorage.removeItem("token")
            localStorage.removeItem("fname")
            localStorage.removeItem("lname")
            localStorage.removeItem("username")
            localStorage.removeItem("position")
            localStorage.removeItem("login")
            onClose()
            resetForm()
          })
          
        }else if(res.data.err && res.data.msg == 'Old password does not match'){
          Swal.fire({
            icon: "error",
            title: "Old password does not match!",
          })
        }
        else if(res.data.err && res.data.msg == 'Passwords do not match'){
          Swal.fire({
            icon: "error",
            title: "The new password and verification code do not match.!",
          })
        }else if(res.data.err && res.data.msg == 'Your new password is the same as your old password.'){
          Swal.fire({
            icon: "error",
            title: "Your new password is the same as your old password.!",
          })
        }
        console.log(res.data)
      })
  }
  const resetForm = () => {
    setConNewPassword("")
    setNewPassword("")
    setOldPassword("")
  }
  return (
    <>
      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose()
          resetForm()
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={changePassword}>
            <ModalHeader>
              <i className="fa-sharp fa-solid fa-key"></i> Change password
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="form-group mb-2">
                <Text className="mb-1">Old password :</Text>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show ? "text" : "password"}
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </div>
              <div className="form-group mb-2">
                <Text className="mb-1">New password :</Text>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show2 ? "text" : "password"}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick2}>
                      {show2 ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </div>
              <div className="form-group mb-2">
                <Text className="mb-1">Confirm New password :</Text>
                <InputGroup size="md">
                  <Input
                    pr="4.5rem"
                    type={show3 ? "text" : "password"}
                    placeholder="Enter confirm new password"
                    value={conNewPassword}
                    onChange={(e) => setConNewPassword(e.target.value)}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick3}>
                      {show3 ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" className="me-2" type="submit">
                Submit
              </Button>
              <Button
                mr={3}
                onClick={() => {
                  onClose()
                  resetForm()
                }}
              >
                Close
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <i className="fa-solid fa-mountain-sun me-2"></i> My Application
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/attractions">
                Attractions
              </Nav.Link>
              <Nav.Link as={Link} to="/user">
                Random User
              </Nav.Link>
              {isLogin ? null : (
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              )}

              {/* 
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item>Action</NavDropdown.Item>
              <NavDropdown.Item>Another action</NavDropdown.Item>
              <NavDropdown.Item>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>Separated link</NavDropdown.Item>
            </NavDropdown> */}
            </Nav>
            <Nav>
              <Nav.Link></Nav.Link>
              <Nav.Link eventKey={2}>
                {colorMode === "light" ? (
                  <>
                    <Tooltip
                      hasArrow
                      label="DarkMode"
                      bg="gray.300"
                      color="black"
                    >
                      <MoonIcon
                        onClick={(e) => {
                          e.preventDefault()
                          toggleColorMode()
                        }}
                        style={{ marginRight: "1rem" }}
                      ></MoonIcon>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip
                      hasArrow
                      label="LightMode"
                      bg="gray.300"
                      color="black"
                    >
                      <SunIcon
                        onClick={(e) => {
                          e.preventDefault()
                          toggleColorMode()
                        }}
                        style={{ marginRight: "1rem" }}
                      ></SunIcon>
                    </Tooltip>
                  </>
                )}
              </Nav.Link>
              {isLogin ? (
                <Menu>
                  <MenuButton colorScheme="pink">
                    <Avatar name={name} style={{ width: 35, height: 35 }} />
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="Profile">
                      <MenuItem
                        onClick={() => {
                          navigate("/myprofile")
                        }}
                      >
                        My Account
                      </MenuItem>
                      <MenuItem
                        onClick={() => {
                          onOpen()
                        }}
                      >
                        Change password
                      </MenuItem>
                    </MenuGroup>
                    <MenuDivider />

                    <MenuItem
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You want to log out!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, i went!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            logout()
                          }
                        })
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Tooltip hasArrow label="Login" bg="gray.300" color="black">
                    <Avatar
                      style={{ width: 35, height: 35, cursor: "pointer" }}
                      onClick={() => {
                        navigate("/signin")
                      }}
                    />
                  </Tooltip>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
