import styled, { keyframes } from 'styled-components';
import { Image } from '@chakra-ui/react';

// Smooth rotation
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Subtle scale animation
const breathe = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.02);
  }
`;

// Fade in
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const SpinnerContainer = styled.div`
  position: relative;
  width: 140px;
  height: 140px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Simple, clean spinner ring
const SpinnerRing = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid transparent;
  border-top-color: #0B1D3A;
  border-right-color: #0B1D3A;
  animation: ${spin} 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
`;

// Second ring for depth
const SpinnerRingSecondary = styled.div`
  position: absolute;
  width: 90%;
  height: 90%;
  border-radius: 50%;
  border: 3px solid transparent;
  border-bottom-color: rgba(11, 29, 58, 0.3);
  border-left-color: rgba(11, 29, 58, 0.3);
  animation: ${spin} 1.5s cubic-bezier(0.4, 0, 0.2, 1) infinite reverse;
`;

// Clean icon container
const IconContainer = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  animation: ${breathe} 3s ease-in-out infinite;
`;

// Minimal overlay
const CenteredOverlay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(249, 250, 251, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  z-index: 9999;
  animation: ${fadeIn} 0.2s ease-out;
`;

// Clean content container
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  animation: ${fadeIn} 0.3s ease-out 0.1s backwards;
`;

// Professional loading text
const LoadingText = styled.div`
  font-family: 'Manrope', 'Open Sans', -apple-system, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #0B1D3A;
  letter-spacing: -0.01em;
`;

function SpinnerOverlay() {
  return (
    <CenteredOverlay>
      <ContentContainer>
        <SpinnerContainer>
          <SpinnerRingSecondary />
          <SpinnerRing />
          <IconContainer>
            <Image
              w="60px"
              h="60px"
              src="https://res.cloudinary.com/doqvfemo3/image/upload/v1762763348/MbLaw/f660e10be643c8e8162463cdd851cdf7f8da16d8_lfusar.png"
              alt="MB Law Logo"
              objectFit="contain"
            />
          </IconContainer>
        </SpinnerContainer>
        
        <LoadingText>Loading...</LoadingText>
      </ContentContainer>
    </CenteredOverlay>
  );
}

export default SpinnerOverlay;