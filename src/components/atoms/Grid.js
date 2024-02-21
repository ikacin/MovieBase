import { Grid } from '@mantine/core';
import styled from 'styled-components';
const CustomGrid = ({first,second,third,firstValue,secondValue,thirdValue})  =>{
    return (
        <GridX >
            <Grid.Col span={firstValue}>{first}</Grid.Col>
            <Grid.Col span={secondValue}>{second}</Grid.Col>
            <Grid.Col span={thirdValue}>{third}</Grid.Col>
        </GridX>
    );
}


const GridX = styled(Grid)`
  width: 100%;
`

export default CustomGrid