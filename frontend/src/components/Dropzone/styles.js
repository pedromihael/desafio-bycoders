import styled from 'styled-components';

export const FormBox = styled.main`
  border: 0.2rem solid ${props => props.disabled ? "grey" : "black"};
  border-style: dotted;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10vh 10vw;
  border-radius: 24px;

  p {
    color: ${props => props.disabled ? "grey" : "black"};
  }
`