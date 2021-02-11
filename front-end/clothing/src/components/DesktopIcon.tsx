import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { DesktopIconModel } from './ComponentModels';

interface DesktopIconProps {
  icon: DesktopIconModel
}

const Container = styled.div`
`

export const DesktopIcon: React.FC<DesktopIconProps> = ({ icon }) => {
  return (
    <Container>
      <Link to={icon.path}>{icon.name}</Link>
    </Container>
  );
}