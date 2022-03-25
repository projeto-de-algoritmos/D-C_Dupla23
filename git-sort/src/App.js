import React from 'react';
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
import { Logo } from './Logo';

function App() {
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
              <Input name="gituser" type="text" placeholder="Usuário git" />
              <InputRightAddon
                children={<BiSearchAlt size={30} />}
                backgroundColor="whiteAlpha.100"
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
