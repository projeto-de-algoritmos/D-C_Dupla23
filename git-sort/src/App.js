import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  theme,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Flex,
  InputLeftElement,
  InputRightAddon,
  InputGroup,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { AiFillGithub } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';



function App() {

  const getUser = async(user) => {
    const request = "https://api.github.com/users/" + user;
    const data = await fetch(request)
    const finalData = await data.json()
    console.log(finalData)
  }

  function searchUser(e) {
    console.log(user)
    getUser(user)
  }

  const [user, setUser] = useState(null);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" minH="100vh">
        <Flex justifyContent="flex-end">
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
        <Flex
          width="100%"
          maxWidth="600px"
          margin="0 auto"
          height="100vh"
          alignItems="center"
        >
          <FormControl>
            <FormLabel htmlFor="email">Usuário do github</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<AiFillGithub size={30} />}
              />
              <Input name="gituser" type="text" placeholder="Usuário git" 
                     onChange={(e) => setUser(e.target.value)}
              />
              <InputRightAddon
                children={<BiSearchAlt size={30} />}
                backgroundColor="whiteAlpha.100"
                onClick = {searchUser}
              />
            </InputGroup>

            <FormHelperText>Digite um usuário válido do github</FormHelperText>
          </FormControl>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
