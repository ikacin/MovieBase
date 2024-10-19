import React, {useState} from "react";
import {ActionIcon, Container, Flex, Input} from "@mantine/core";
import Divider from "../atoms/Divider";
import { IconSearch } from '@tabler/icons-react';
import SearchInput from "./SearchInput";


const SearchBar = ({value,setValue,onKeyDown,variant}) => {

    return (
        <Container
            size="77rem"
        >
          <Flex
           py={"8px"}
          align={'center'}
          >
            <Flex>

                <SearchInput
                    placeholder={"Film, dizi, kişi ara..."}
                    value={value}
                    setValue={setValue}
                    onKeyDown={onKeyDown}
                    variant={variant}
                />

            </Flex>
              <Flex>
                  <Divider/>
              </Flex>
          </Flex>
        </Container>
    )
}

export default SearchBar