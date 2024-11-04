import {Flex, Progress, Text} from '@mantine/core';

const CustomProgress = ({ values = [], colors = [],label }) => {

    const sections = Array.isArray(values)
        ? values.map((value, index) => ({
            value: value ,
            color: colors[index] ,
        }))
        : [{ value: 50, color: "#e05666" }];

    return (
        <Flex
            align={'center'}
            gap={"sm"}
        >
            <Progress
                sections={sections}
                style={{flex: 1}}
            />
            <Text
                fz={"xs"}
            >{label}
            </Text>
        </Flex>
    )
};

export default CustomProgress;
