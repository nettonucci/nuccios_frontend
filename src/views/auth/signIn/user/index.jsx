/* eslint-disable */

import React from "react";
import { NavLink, useHistory } from "react-router-dom";
// Chakra imports
import
{
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import DefaultAuth from "layouts/auth/Default";
import api from "../../../../api/axios";
import ReactLoading from "react-loading";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// Assets
import illustration from "assets/img/auth/auth.png";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";

function SignIn()
{
  let history = useHistory();
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [show, setShow] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [company, setCompany] = React.useState('');
  const [values, setValues] = React.useState({
    "email": "",
    "password": "",
  });

  React.useEffect(() =>
  {
    if (localStorage.getItem("token-user"))
    {
      history.push("/admin/dashboard");
    }
    setCompany(JSON.parse(localStorage.getItem("company")));
  }, []);

  const handleClick = () => setShow(!show);

  const handleChange = (event) =>
  {
    setValues({
      ...values, [event.target.name]: event.target.value
    });
  }

  const handleClickLogin = async () =>
  {
    setLoading(true);
    if (values.login === "" || values.password === "")
    {
      setLoading(false);
      toast.error("Preencha todos os campos", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    try
    {
      const response = await api.post("/user-session/create-session", {
        email: values.email,
        password: values.password,
      });
      console.log(response);
      setLoading(false);
      toast.success('Logado com sucesso', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem("token-user", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.name));
      history.push("/admin/dashboard");
    } catch (error)
    {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

  }


  return (
    <DefaultAuth illustrationBackground={illustration} image={illustration}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
      <Flex
        maxW={{ base: "100%", md: "max-content" }}
        w='100%'
        mx={{ base: "auto", lg: "0px" }}
        me='auto'
        h='100%'
        alignItems='start'
        justifyContent='center'
        mb={{ base: "30px", md: "60px" }}
        px={{ base: "25px", md: "0px" }}
        mt={{ base: "40px", md: "14vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Login usu??rio
          </Heading>
          <Text
            mb='10px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Bem vindo(a) <Text color={brandStars}>{company}</Text>
          </Text>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Entre com um usu??rio e senha para logar!
          </Text>
        </Box>
        <Flex
          zIndex='2'
          direction='column'
          w={{ base: "100%", md: "420px" }}
          maxW='100%'
          background='transparent'
          borderRadius='15px'
          mx={{ base: "auto", lg: "unset" }}
          me='auto'
          mb={{ base: "20px", md: "auto" }}>
          <FormControl>
            <FormLabel
              display='flex'
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              mb='8px'>
              Email<Text color={brandStars}>*</Text>
            </FormLabel>
            <Input
              isRequired={true}
              variant='auth'
              fontSize='sm'
              ms={{ base: "0px", md: "0px" }}
              type='text'
              placeholder='nome@email.com'
              mb='24px'
              fontWeight='500'
              size='lg'
              value={values.email}
              name='email'
              onChange={handleChange}
            />
            <FormLabel
              ms='4px'
              fontSize='sm'
              fontWeight='500'
              color={textColor}
              display='flex'>
              Senha<Text color={brandStars}>*</Text>
            </FormLabel>
            <InputGroup size='md'>
              <Input
                isRequired={true}
                fontSize='sm'
                placeholder='senha'
                mb='24px'
                size='lg'
                type={show ? "text" : "password"}
                variant='auth'
                value={values.password}
                name="password"
                onChange={handleChange}
                onKeyPress={(event) =>
                {
                  if (event.key === "Enter")
                  {
                    handleClickLogin();
                  }
                }}
              />
              <InputRightElement display='flex' alignItems='center' mt='4px'>
                <Icon
                  color={textColorSecondary}
                  _hover={{ cursor: "pointer" }}
                  as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                  onClick={handleClick}
                />
              </InputRightElement>
            </InputGroup>
            <Flex justifyContent='space-between' align='center' mb='24px'>
              <FormControl display='flex' alignItems='center'>
                <Checkbox
                  id='remember-login'
                  colorScheme='brandScheme'
                  me='10px'
                />
                <FormLabel
                  htmlFor='remember-login'
                  mb='0'
                  fontWeight='normal'
                  color={textColor}
                  fontSize='sm'>
                  Lembrar
                </FormLabel>
              </FormControl>
              <NavLink to='/auth/forgot-password'>
                <Text
                  color={textColorBrand}
                  fontSize='sm'
                  w='124px'
                  fontWeight='500'>
                  Esqueceu a senha?
                </Text>
              </NavLink>
            </Flex>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              onClick={handleClickLogin}
              w='100%'
              h='50'
              mb='24px'>
              {loading ? <ReactLoading type={"spin"} color={"#fff"} height={30} width={30} /> : "Login"}
            </Button>

          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default SignIn;
