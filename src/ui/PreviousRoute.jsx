import React from 'react'
import { HStack, IconButton, Text } from '@chakra-ui/react'
import { ArrowLeft } from 'lucide-react'

function PreviousRoute({ title }) {
  return (    
    <HStack spacing={4}>
      <IconButton
        icon={<ArrowLeft size={20} />}
        variant="ghost"
        size="sm"
        aria-label={title}
      />
      <Text fontSize="sm" color="gray.600">
        {title}
      </Text>
    </HStack>
  )
}

export default PreviousRoute