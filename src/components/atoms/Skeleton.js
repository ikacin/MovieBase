import { Skeleton } from '@mantine/core';
import styled from 'styled-components';
const CustomSkeleton = ({heights,widths}) => {
    return (
        <>
          <StyledSkeleton>
              <Skeleton height={heights[0]} mt={6} width={widths[0]} radius="xl" />
              <Skeleton height={heights[1]} mt={6} width={widths[1]} radius="xl" />
              <Skeleton height={heights[2]} mt={6}  width={widths[2]} radius="xl" />
          </StyledSkeleton>
        </>
    );
}

const StyledSkeleton = styled.div`

`


export default CustomSkeleton