import {Container, Flex, Text} from "@mantine/core";
import classes from "./ActionHeader.module.css";

const ActionHeader = ({content,count}) => {
    return(

        <div className={classes.lightBlue} >
            <Container
                size={"xl"}
                p={0}
                pr={"lg"}
                display={ "flex"}
                style={{justifyContent:"space-between",alignItems:"center"}}
                h={"70px"}

            >
                <Flex>
                    <Text
                    color="white"
                    fz={"30px"}
                    fw={"700"}
                    >
                        {content}
                    </Text>
                </Flex>
                <Flex>
                    <Text
                        color="dimmed"
                        fz={"24px"}
                        fw={"600"}
                    >
                        {count}

                    </Text>
                </Flex>
            </Container>

        </div>

    )


}


export default ActionHeader