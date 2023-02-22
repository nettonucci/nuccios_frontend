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
  Switch,
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
import { Steps, Panel, Placeholder, ButtonGroup } from 'rsuite';
import './styles.css';

function SignUpCompany()
{
  let history = useHistory();
  // Chakra color mode
  const textColor = useColorModeValue("navy.700", "white");
  const textColorSecondary = "gray.400";
  const textColorDetails = useColorModeValue("navy.700", "secondaryGray.600");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const brandStars = useColorModeValue("brand.500", "brand.400");
  const [has_cnpj, setHasCnpj] = React.useState(true);
  const [showPass, setShowPass] = React.useState(false);
  const [showRePass, setShowRePass] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [rePass, setRePass] = React.useState('');
  const [values, setValues] = React.useState({
    "company_name": "",
    "cnpj": "",
    "branch": "",
    "owner_name": "",
    "cpf": "",
    "email": "",
    "phone": "",
    "cellphone": "",
    "login": "",
    "password": "",
  });
  const [step, setStep] = React.useState(0);
  const onChange = nextStep =>
  {
    setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);

  const cnpjMask = (value) =>
  {
    return value
      .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
      .replace(/(\d{2})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 2 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por /
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1') // captura os dois últimos 2 números, com um - antes dos dois números
  }

  const cpfMask = (value) =>
  {
    return value
      .replace(/\D+/g, '') // não deixa ser digitado nenhuma letra
      .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de número o primeiro com 3 digitos e o segundo de com 3 digitos, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de número
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1-$2') // captura 2 grupos de número o primeiro e o segundo com 3 digitos, separados por -
      .replace(/(-\d{2})\d+?$/, '$1') // captura os dois últimos 2 números, com um - antes dos dois números
  }

  const handleClickShowPass = () => setShowPass(!showPass);
  const handleClickShowRePass = () => setShowRePass(!showRePass);

  const handleChange = (event) =>
  {
    setValues({
      ...values, [event.target.name]: event.target.value
    });
  }

  const verifyPassword = () =>
  {
    if (values.password !== rePass)
    {
      toast.error('As senhas não coincidem', {
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
      return
    }
  }

  const handleClickRegister = async () =>
  {
    setLoading(true);
    verifyPassword();
    if (values.company_name === "" || values.branch === "" || values.owner_name === "" || values.email === "" || values.cellphone === "" || values.login === "" || values.password === "")
    {
      setLoading(false);
      toast.error("Preencha todos os campos (*)", {
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
      const value = { ...values, "has_cnpj": has_cnpj }
      const response = await api.post("/companies", value);
      setLoading(false);
      if (response.status === 201)
      {
        toast.success('Cadastrado com sucesso', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        localStorage.setItem("company_id_active", response.data.id);
        setTimeout(() =>
        {
          history.push("/auth/sign-in/company");
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
        mt={{ base: "40px", md: "0vh" }}
        flexDirection='column'>
        <Box me='auto'>
          <Heading color={textColor} fontSize='36px' mb='10px'>
            Cadastro empresa
          </Heading>
          <Text
            mb='36px'
            ms='4px'
            color={textColorSecondary}
            fontWeight='400'
            fontSize='md'>
            Entre com seus dados para cadastrar!
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
            <Steps current={step}>
              <Steps.Item title="Empresa" />
              <Steps.Item title="Dono" />
              <Steps.Item title="Contato" />
              <Steps.Item title="Acesso" />
            </Steps>
            <Panel>
              {step === 0 &&
                <>
                  <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Nome da empresa<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='Nome da empresa'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    value={values.company_name}
                    name='company_name'
                    onChange={handleChange}
                  />
                  <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Possui CNPJ<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Switch
                    id='has_cnpj'
                    mb='24px'
                    isChecked={has_cnpj}
                    onChange={
                      (e) =>
                      {
                        setHasCnpj(e.target.checked)
                      }
                    }
                  />
                  {has_cnpj && (
                    <>
                      <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='sm'
                        fontWeight='500'
                        color={textColor}
                        mb='8px'>
                        CNPJ<Text color={brandStars}>*</Text>
                      </FormLabel><Input
                        isRequired={has_cnpj}
                        variant='auth'
                        fontSize='sm'
                        ms={{ base: "0px", md: "0px" }}
                        type='text'
                        placeholder='00.000.000/0000-00'
                        mb='24px'
                        fontWeight='500'
                        size='lg'
                        isDisabled={!has_cnpj}
                        value={cnpjMask(values.cnpj)}
                        name='cnpj'
                        onChange={handleChange} />
                    </>
                  )}

                  <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Ramo<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='Assistencia de eletronicos'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    value={values.branch}
                    name='branch'
                    onChange={handleChange}
                  />
                </>
              }

              {step === 1 &&
                <>
                  <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Nome do proprietário<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='Nome do proprietário'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    value={values.owner_name}
                    name='owner_name'
                    onChange={handleChange}
                  />
                  <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    CPF<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='000.000.000-00'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    value={cpfMask(values.cpf)}
                    name='cpf'
                    onChange={handleChange}
                  />
                </>
              }

              {step === 2 &&
                <>
                  <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Email da empresa<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='Email da empresa'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    value={values.email}
                    name='email'
                    onChange={handleChange}
                  />
                  <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Telefone
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='(xx) xxxx-xxxx'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    value={values.phone}
                    name='phone'
                    onChange={handleChange}
                  />
                  <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Celular<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='(xx) xxxxx-xxxx'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    value={values.cellphone}
                    name='cellphone'
                    onChange={handleChange}
                  />
                </>
              }

              {step === 3 &&
                <>
                  <FormLabel
                    display='flex'
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    mb='8px'>
                    Usuário<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <Input
                    isRequired={true}
                    variant='auth'
                    fontSize='sm'
                    ms={{ base: "0px", md: "0px" }}
                    type='text'
                    placeholder='usuario'
                    mb='24px'
                    fontWeight='500'
                    size='lg'
                    value={values.login}
                    name='login'
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
                      placeholder='Senha'
                      mb='24px'
                      size='lg'
                      type={showPass ? "text" : "password"}
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
                        as={showPass ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                        onClick={handleClickShowPass}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <FormLabel
                    ms='4px'
                    fontSize='sm'
                    fontWeight='500'
                    color={textColor}
                    display='flex'>
                    Repita a senha<Text color={brandStars}>*</Text>
                  </FormLabel>
                  <InputGroup size='md'>
                    <Input
                      isRequired={true}
                      fontSize='sm'
                      placeholder='Repita a senha'
                      mb='24px'
                      size='lg'
                      type={showRePass ? "text" : "password"}
                      variant='auth'
                      value={rePass}
                      name="rePass"
                      onChange={(e) => setRePass(e.target.value)}
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
                        as={showRePass ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                        onClick={handleClickShowRePass}
                      />
                    </InputRightElement>
                  </InputGroup>
                  <Button
                    fontSize='sm'
                    variant='brand'
                    fontWeight='500'
                    onClick={handleClickRegister}
                    isDisabled={loading}
                    w='100%'
                    h='50'
                    mb='24px'>
                    {loading ? <ReactLoading type={"spin"} color={"#fff"} height={30} width={30} /> : "Cadastrar"}
                  </Button>
                </>
              }
              <ButtonGroup>
                <Button onClick={onPrevious} disabled={step === 0}>
                  Anterior
                </Button>
                <Button onClick={onNext} disabled={step === 3}>
                  Próximo
                </Button>
              </ButtonGroup>
            </Panel>
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

export default SignUpCompany;
