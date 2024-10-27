import { Container, Flex} from "@mantine/core";
import Divider from "../atoms/Divider";
import SearchInput from "./SearchInput";


const SearchBar = ({value,setValue,onKeyDown,variant}) => {

    return (
        <Container
            p={0}
            size={"xl"}
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