import { Skeleton } from '@mantine/core';
import styled from 'styled-components';
const CustomSkeleton = ({heights,widths,radius}) => {
    return (
        <>
          <StyledSkeleton>
              <Skeleton height={heights[0]} mt={6} width={widths[0]} radius={radius ?? "xl"} />
              <Skeleton height={heights[1]} mt={6} width={widths[1]} radius={radius ?? "xl"} />
              <Skeleton height={heights[2]} mt={6}  width={widths[2]} radius={radius ?? "xl"} />
          </StyledSkeleton>
        </>
    );
}

const StyledSkeleton = styled.div`

`


export default CustomSkeleton