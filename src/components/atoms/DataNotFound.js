import React from 'react'
import styled from 'styled-components'

const DataNotFound = ({ children,height,backgroundSize,fontSize,paddingTop}) => {
    return (
        <ContainerWrap
            height={height}
        >
            <DataImg
                backgroundSize={backgroundSize}
            />
            <DataText
                paddingTop={paddingTop}
                fontSize={fontSize}
            >{children ?? "Veri Bulunamadı"}</DataText>
        </ContainerWrap>
    )
}
export default DataNotFound

const ContainerWrap = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: ${(props) => props.height ? `${props.height}` : "calc(100vh - 327px)"};
`

const DataText = styled.div`
  font-size:${(props) => props.fontSize ? props.fontSize : "18px"};
  padding-top:${(props) => props.paddingTop ? props.paddingTop : "10px"};
  color: #c4cdd3;
`

const DataImg = styled.div`
  background: url("/images/nodata.svg") no-repeat center center;
  width: 80px;
  height: 80px;
  background-size: ${(props) => props.backgroundSize ? props.backgroundSize : "80px"};
`
