import React from 'react'
import styled from 'styled-components'
import { DesktopIcons } from './DesktopIcons';
import { DesktopIconModel } from './ComponentModels';

interface SideBarProps {

}

const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
`

const Icons: DesktopIconModel[] =
  [
    { name: "Home", path: "/" },
    { name: "Help", path: "/help" },
    { name: "Inventory", path: "/inventory" },
  ]

export const SideBar: React.FC<SideBarProps> = ({ children }) => {
  return (
    <Container>
      {children}
      <DesktopIcons icons={Icons} />
    </Container>
  );
}