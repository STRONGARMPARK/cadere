import React from 'react'
import styled from 'styled-components'

interface BottomBarProps {

}

// #C1C1C1

const Bottombar = styled.div`
  background-color: #C1C1C1;
  border-width: 3px ;
  border-color: #EBEBEB;
  height: 50px ;
  bottom: 0%;
  position: fixed;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
`
const Container = styled.div`
  position: flex;
`

const LeftItem = styled.div`
`
const Time = styled.div`
`

export const BottomBar: React.FC<BottomBarProps> = () => {
  return (
    <Bottombar>
      <Container>
        Add a time and home button to me please :)
      <LeftItem>
        </LeftItem>
        <Time>
        </Time>
      </Container>
    </Bottombar>
  );
}