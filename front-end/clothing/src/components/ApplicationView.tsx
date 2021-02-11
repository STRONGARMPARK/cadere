import React from 'react'
import styled from 'styled-components'

interface ApplicationViewProps {

}

const Container = styled.div`
  position: flex;
  flex: 5;
  height: 100%;
`

export const ApplicationView: React.FC<ApplicationViewProps> = ({ children }) => {
  return (
    <Container>
      <p>this is in app view</p>
      {children}
    </Container>
  );
}