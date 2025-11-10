import { Icon, useTheme, VStack } from '@chakra-ui/react';
import { Users } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

// Simple 360 degree rotation animation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  position: relative;
  width: 180px;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SpinnerRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: conic-gradient(from 0deg, #1d4ed8,rgb(76, 98, 160),rgb(7, 44, 146));
  mask: radial-gradient(circle, transparent 80px, black 82px, transparent 85px);
  -webkit-mask: radial-gradient(circle, transparent 80px, black 82px, transparent 85px);
  animation: ${spin} 1.5s linear infinite;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const SpinnerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const PlaceholderIcon = styled.div`
  width: 30px;
  height: 30px;
  background: #ccc;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  font-size: 14px;
  font-weight: bold;
`;

const CenteredOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
`;

function SpinnerOverlay() {
    const theme = useTheme();

 return (
    <CenteredOverlay>
      <SpinnerContainer>
        <SpinnerRing />
        <ImageContainer>
            <VStack
                w="70px"
                h="65px"
                justify="center"
                align="center"
                bg={theme.gradients.primary}
                color="white"
                rounded="12px"
            >
                <Icon as={Users} fontSize="30px"/>
            </VStack>
          
        </ImageContainer>
      </SpinnerContainer>
    </CenteredOverlay>
  );
}

export default SpinnerOverlay;