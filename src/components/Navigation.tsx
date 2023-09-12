import React from 'react'
import { Link } from 'react-router-dom'
import { Text, Box } from '@chakra-ui/react'
import { useTheme } from '@chakra-ui/react'

const Navigation: React.FC = () => {
  const theme = useTheme()
  return (
    <nav>
      <Box bg="purple.600" p={2} color="white">
        <Text fontSize="2xl" fontWeight="bold">
          <Link to="/products" style={{ color: theme.colors.yellow[600], textDecoration: 'none' }}>
            Dashboard
          </Link>
        </Text>
      </Box>
    </nav>
  )
}

export default Navigation
