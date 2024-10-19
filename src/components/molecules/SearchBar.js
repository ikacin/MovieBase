import React from 'react';
import {ActionIcon, Container, Flex} from "@mantine/core";
import Divider from "../atoms/Divider";
import { IconSearch } from '@tabler/icons-react';

const SearchBar = () => {
    return (
        <Container
            size="77rem"
        >
          <Flex
           py={"8px"}
          align={'center'}
          >
            <Flex>
                <ActionIcon variant="transparent" >
                    <IconSearch style={{ width: '70%', height: '70%' }} stroke={1.5} />
                </ActionIcon>
            </Flex>
              <Flex>
                  <Divider/>
              </Flex>
          </Flex>
        </Container>
    )
}

export default SearchBar