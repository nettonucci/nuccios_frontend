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
  HStack,
  Text,
  useColorModeValue,
  PinInput,
  PinInputField
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

function ActiveCompany()
{
  let history = useHistory();
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const [token, setToken] = React.useState("");
  const [loading, setLoading] = React.useState(false);


  React.useEffect(() =>
  {
    if (!localStorage.getItem("company_id_active"))
    {
      history.push("/auth/sign-in/company");
    }
  }, []);


  const handleChangeToken = (event) =>
  {
    setToken(event);
  }

  const handleClickActive = async () =>
  {
    setLoading(true);
    if (!token || token.length < 6)
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
      setLoading(false);
      return;
    }
    try
    {
      const company_id = localStorage.getItem("company_id_active");
      const response = await api.post(`/companies/active-account/${company_id}`, {
        token
      });
      if (response.status === 201)
      {
        setLoading(false);
        toast.success('Conta ativada com sucesso', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        localStorage.removeItem("company_id_active");
        setTimeout(() =>
        {
          history.push("/auth/sign-in/compnay");
        }, 2000);
      }
    } catch (error)
    {
      setLoading(false);
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
            Ativar conta empresa
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Entre com o TOKEN enviado no seu email!
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
            <HStack>
              <PinInput value={token} onChange={handleChangeToken}>
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
            <Button
              fontSize='sm'
              variant='brand'
              fontWeight='500'
              isDisabled={token.length < 6 ? true : false}
              onClick={handleClickActive}
              w='100%'
              h='50'
              mt='20px'
              mb='24px'>
              {loading ? <ReactLoading type={"spin"} color={"#fff"} height={30} width={30} /> : "Ativar"}
            </Button>
            <Flex
              flexDirection='column'
              justifyContent='center'
              alignItems='start'
              maxW='100%'
              mt='0px'>
              <Text color={textColorDetails} fontWeight='400' fontSize='14px'>
                Já possui uma conta?
                <NavLink to='/auth/sign-in/company'>
                  <Text
                    color={textColorBrand}
                    as='span'
                    ms='5px'
                    fontWeight='500'>
                    Entrar
                  </Text>
                </NavLink>
              </Text>
            </Flex>
          </FormControl>
        </Flex>
      </Flex>
    </DefaultAuth>
  );
}

export default ActiveCompany;
