import { Slide, ToastContainer } from 'react-toastify'
import {
  ChakraProvider,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import { ChainId, useEthers } from '@usedapp/core'

import AccountModal from 'components/AccountModal'
import CompositionTable from 'components/CompositionTable'
import ConnectButton from 'components/ConnectButton'
import Layout from 'components/Layout'
import TokenPurchase from 'components/TokenPurchase'
import VoteList from 'components/VoteList'
import VoteTable from 'components/VoteTable'

import 'react-toastify/dist/ReactToastify.css'
import 'App.css'

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { account, chainId } = useEthers()

  const showApp = () => {
    return account && chainId === ChainId.Polygon
  }

  return (
    <ChakraProvider>
      <Layout>
        <Warning />
        <Heading m='20px 0'>coop.tax</Heading>
        <ConnectButton handleOpenModal={onOpen} />
        <AccountModal isOpen={isOpen} onClose={onClose} />
        {showApp() && <AppContent />}
        <ToastContainer transition={Slide} position='bottom-left' />
      </Layout>
    </ChakraProvider>
  )
}

export default App

const Warning = () => {
  return (
    <Flex
      bg='#f4e42e'
      color='black'
      w='90vw'
      textAlign='center'
      p='30px'
      borderRadius='10px'
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      mt='20px'
    >
      <Image
        boxSize='50px'
        src='https://emojipedia-us.s3.amazonaws.com/source/skype/289/monkey_1f412.png'
        ml='20px'
      />
      <Text fontSize='xl' color='black'>
        <Text color='red' fontWeight='bold'>
          this is an experiment
        </Text>{' '}
        assume any money used here is as good as rugged
      </Text>
      <Image
        boxSize='50px'
        src='https://emojipedia-us.s3.amazonaws.com/source/skype/289/monkey_1f412.png'
        mr='20px'
      />
    </Flex>
  )
}

const AppContent = () => {
  return (
    <Flex direction='row' justifyContent='space-evenly' w='100vw' mt='30px'>
      {/* TODO: stack on smaller screens */}
      <TokenPurchase />
      <Flex direction='column'>
        <CompositionTable />
        <VoteTable />
      </Flex>
      <VoteList />
    </Flex>
  )
}
