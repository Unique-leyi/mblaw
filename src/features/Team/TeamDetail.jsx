import React from 'react'
import { Stack, VStack, Text, Heading, SimpleGrid, Image, HStack, Icon, UnorderedList, ListItem } from '@chakra-ui/react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ContainerLayout from '../../ui/layouts/ContainerLayout'
import MiniHeading from '../../ui/MiniHeading'
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6'
import { teamData } from '../../data/TeamData'

function TeamDetail() {

  const { slug } = useParams();
  const navigate = useNavigate();

  const normalizedSlug = decodeURIComponent(slug || '').toLowerCase().trim();

  const filteredTeamDetail = teamData.find(detail => {
    if (!detail?.name) return false;
    const normalizedTitle = detail.name.toLowerCase().trim();
    return normalizedTitle === normalizedSlug;
  });


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
              miniTitle="Our Team"
              title="Meet our Team"
              titleColor="brand.100"
              isCenter={true}
          />


          <SimpleGrid
            w="full"
            columns={[1, 1, 2]}
            gap="40px"
          >

            <VStack
              w="full"
              justify="start"
              align="start"
              data-aos="slide-right"
              data-aos-duration="1000"
            >
                <Image
                  w="full"
                  h="full"
                  src={filteredTeamDetail?.image}
                  alt={`${filteredTeamDetail?.name}-image`}
                  objectFit="cover"
                  rounded="10px"
                />

            </VStack>


            <VStack
              w="full"
              justify="start"
              align="start"
              gap="40px"
            >
                <VStack
                  w="full"
                  justify="start"
                  align="start"
                  gap="10px"
                >

                    <Heading
                        fontSize={["32px", "36px", "40px"]}
                        fontWeight={700}
                        lineHeight="100%"
                        color="brand.100"
                        letterSpacing="0%"
                    >
                      {filteredTeamDetail?.name}
                    </Heading>


                    <Text
                        fontSize={["16px", "16px", "20px"]}
                        fontWeight={300}
                        fontFamily="openSans"
                        lineHeight="24px"
                        color="brand.100"
                        letterSpacing="0%"
                    >
                        {filteredTeamDetail?.role}
                    </Text>

                    <Text
                        fontSize={["16px", "16px", "18px"]}
                        fontWeight={300}
                        lineHeight="28px"
                        color="brand.200"
                        letterSpacing="0%"
                    >
                        {filteredTeamDetail?.briefDescription}
                    </Text>
                    
                </VStack>


                <VStack
                  w="full"
                  justify="start"
                  align="start"
                  gap="10px"
                >

                    <Heading
                        fontSize={["32px", "36px", "40px"]}
                        fontWeight={700}
                        lineHeight="100%"
                        color="brand.100"
                        letterSpacing="0%"
                    >
                      Bio
                    </Heading>

                    <Text
                        fontSize={["16px", "16px", "18px"]}
                        fontWeight={300}
                        lineHeight="28px"
                        color="brand.200"
                        letterSpacing="0%"
                    >
                        {filteredTeamDetail?.bio}
                    </Text>
                    
                </VStack>


            </VStack>

          </SimpleGrid>


          <VStack
            w="full"
            justify="start"
            align="start"
            gap="30px"
          >
            <Heading
                fontSize={["32px", "36px", "40px"]}
                fontWeight={700}
                lineHeight="100%"
                color="brand.100"
                letterSpacing="0%"
            >
                Credentials & Achievements
            </Heading>

            <UnorderedList spacing="10px">
                {filteredTeamDetail?.achivements?.map((item, i) => (
                    <ListItem 
                        key={i}
                        fontSize={["16px", "16px", "18px"]}
                        fontWeight={300}
                        lineHeight="28px"
                        color="brand.200"
                        letterSpacing="0%"
                    >
                        {item}
                    </ListItem>
                ))}
            </UnorderedList>

          </VStack>




        </VStack>
      </ContainerLayout>
    </Stack>
  )
}

export default TeamDetail

