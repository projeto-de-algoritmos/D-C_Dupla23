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
  Button,
  Grid,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { AiFillGithub } from 'react-icons/ai';
import { BiSearchAlt } from 'react-icons/bi';
import { RiGitRepositoryCommitsLine } from 'react-icons/ri';
import { BsPeople } from 'react-icons/bs';
import { mergeSort } from './utils/mergeSort';

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

  console.log(users);

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" minH="100vh" padding="18">
        <CSSReset />
        <Flex justifyContent="flex-end">
          <ColorModeSwitcher justifySelf="flex-end" />
        </Flex>
        <Flex
          justifyContent="center"
          gap="1rem"
          flexDirection={['column', 'row']}
          marginBottom="20"
        >
          <Button
            backgroundColor="cyan.700"
            color="white"
            size="md"
            onClick={() => setUsers(mergeSort(users, 'public_repos'))}
          >
            Ordenar por repositórios
          </Button>
          <Button
            backgroundColor="cyan.700"
            color="white"
            size="md"
            onClick={() => setUsers(mergeSort(users, 'followers'))}
          >
            Ordernar por seguidores
          </Button>
          <Button
            backgroundColor="cyan.700"
            color="white"
            size="md"
            onClick={() => setUsers(mergeSort(users, 'following'))}
          >
            Ordernar por seguindo
          </Button>
        </Flex>
        <form onSubmit={getUserHandler}>
          <FormControl
            maxW="600px"
            isInvalid={isInvalid}
            margin="0 auto"
            marginBottom="30"
          >
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

          <Grid
            width="100%"
            templateColumns={[
              '1fr',
              '1fr 1fr',
              '1fr 1fr 1fr',
              '1fr 1fr 1fr',
              '1fr 1fr 1fr 1fr',
            ]}
            gap="30"
          >
            {users?.length > 0 &&
              users?.map(user => {
                return (
                  <Box
                    backgroundColor="blackAlpha.300"
                    cursor="pointer"
                    onClick={() =>
                      window.open(
                        `http://www.github.com/${user?.login}`,
                        '_blank'
                      )
                    }
                  >
                    <Image
                      src={user?.avatar_url}
                      alt="Dan Abramov"
                      width="100%"
                    />
                    <Text fontSize="2xl">{user?.name}</Text>
                    <Box textAlign="left" padding="4">
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
                );
              })}
          </Grid>
        </form>
      </Box>
    </ChakraProvider>
  );
}

export default App;
