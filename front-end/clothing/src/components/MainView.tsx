import React from 'react'
import { BottomBar } from "./BottomBar"
import styled from 'styled-components'

interface MainViewProps {

}

const Background = styled.div`
  background-color: #008181;
  min-height: 100%;
  display: flex;
  flex-direction: row;
`

export const MainView: React.FC<MainViewProps> = ({ children }) => {
  return (
    <Background>
      {children}
      <BottomBar />
    </Background>
  );
}