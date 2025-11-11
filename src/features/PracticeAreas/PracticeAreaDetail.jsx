import React from 'react'
import { Stack, VStack, Text, Heading, SimpleGrid, Image, HStack, Icon } from '@chakra-ui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ContainerLayout from '../../ui/layouts/ContainerLayout'
import MiniHeading from '../../ui/MiniHeading'
import { practiceAreaData } from '../../data/PracticeAreaData'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'

function PracticeAreaDetail() {

  const { slug } = useParams();
  const navigate = useNavigate();

  const normalizedSlug = decodeURIComponent(slug || '').toLowerCase().trim();

  const filteredPracticeAreaDetail = practiceAreaData.find(detail => {
    if (!detail?.title) return false;
    const normalizedTitle = detail.title.toLowerCase().trim();
    return normalizedTitle === normalizedSlug;
  });

  console.log(filteredPracticeAreaDetail)

  return (
    <Stack
      w="full"
      justify="start"
      align="start"
      pt={["6rem", "6rem", "8rem"]}
      pb={["2rem", "2rem", "4rem"]}
    >
      <ContainerLayout>
        <VStack
          w="full"
          justify="start"
          align="start"
          py="40px"
          gap={["40px", "40px", "80px"]}
        >
          <HStack
            w="fit-content"
            justify="start"
            align="center"
            gap="10px"
            p="10px"
            bgColor="white"
            color="brand.100"
            cursor="pointer"
            onClick={() => navigate(-1)}
          >
            <Icon as={FaArrowLeftLong} fontSize="20px"/>

            <Text
              fontSize="18px"
              fontWeight={600}
              lineHeight="100%"
              letterSpacing="0%"
              textTransform="uppercase"
            >
              Go Back
            </Text>

          </HStack>


          <MiniHeading
              miniTitle="Practice Areas"
              title={filteredPracticeAreaDetail.title}
              titleColor="brand.100"
              content={filteredPracticeAreaDetail?.description}
              btnText="Request Legal Advice"
              isReverse={false}
              url="/book-consultation"
          />


          {/* Paragraphs */}

          <VStack
            w="full"
            justify="start"
            align="start"
            gap="20px"
          >
            {filteredPracticeAreaDetail?.paragraphs?.map((item, i) => (
              <VStack
                key={i}
                w="full"
                justify="start"
                align="start"
                gap="20px"
              >
                <Image
                    w="full"
                    h="full"
                    src={item?.image}
                    alt={`${filteredPracticeAreaDetail?.title?.toLowerCase}-image`}
                    objectFit="cover"
                />

                <Text
                  fontSize={[16, 16, 20]}
                  fontWeight={400}
                  color="brand.200"
                  lineHeight="28px"
                >
                  {item.content}
                </Text>

              </VStack>
            ))}

          </VStack>

        </VStack>
      </ContainerLayout>
    </Stack>
  )
}

export default PracticeAreaDetail

