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
  InputGroup,
  CSSReset,
  IconButton,
  Image,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { AiFillGithub } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { RiGitRepositoryCommitsLine } from 'react-icons/ri';
import { BsPeople } from 'react-icons/bs';

function App() {
  const [users, setUsers] = useState([]);
  const [isInvalid, setIsInvalid] = useState(false);

  const getUserHandler = async e => {
    e.preventDefault();
    const user = e.target?.elements?.gitUser.value;
    const request = `https://api.github.com/users/${user}`;
    const data = await fetch(request);
    const userData = await data.json();
    if (userData?.name) {
      setIsInvalid(false);
      setUsers([...users, userData]);
    } else setIsInvalid(true);
  };

  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Box textAlign="center" fontSize="xl" minH="100vh">
        <Flex justifyContent="flex-end">
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
        <form onSubmit={getUserHandler}>
          <Flex
            // justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100%"
            margin="0 auto"
            flexDirection="column"
            gap="2rem"
            padding="20"
          >
            <FormControl maxW="600px" isInvalid={isInvalid}>
              <FormLabel htmlFor="email">Usuário do github</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<AiFillGithub size={30} />}
                />
                <Input
                  name="gitUser"
                  type="text"
                  placeholder="Usuário git"
                  isInvalid={isInvalid}
                />

                <IconButton
                  type="submit"
                  variant="outline"
                  aria-label="Call Sage"
                  fontSize="20px"
                  borderLeft="none"
                  icon={<BiSearchAlt size={30} />}
                  backgroundColor="whiteAlpha.100"
                />
              </InputGroup>
              {!isInvalid ? (
                <FormHelperText>
                  Digite um usuário válido do github
                </FormHelperText>
              ) : (
                <FormErrorMessage>Usuário inválido</FormErrorMessage>
              )}
            </FormControl>

            <Flex width="100%" gap="1.5rem" flexWrap="wrap">
              {users?.length > 0 &&
                users?.map(user => {
                  return (
                    <Box backgroundColor="blackAlpha.300" width="280px">
                      <Image
                        src={user?.avatar_url}
                        alt="Dan Abramov"
                        width="100%"
                      />
                      <Box padding="3">
                        <Text fontSize="2xl">{user?.name}</Text>
                        <Box textAlign="left">
                          <Flex gap="0.3rem">
                            <RiGitRepositoryCommitsLine />
                            <Text fontSize="medium">
                              Repositórios públicos: {user?.public_repos}
                            </Text>
                          </Flex>
                          <Flex gap="0.3rem">
                            <BsPeople />
                            <Text fontSize="medium">
                              Seguidores: {user?.followers} pessoas
                            </Text>
                          </Flex>
                          <Flex gap="0.3rem">
                            <BsPeople />
                            <Text fontSize="medium">
                              Seguindo: {user?.following} pessoas
                            </Text>
                          </Flex>
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
            </Flex>
          </Flex>
        </form>
      </Box>
    </ChakraProvider>
  );
}

export default App;
