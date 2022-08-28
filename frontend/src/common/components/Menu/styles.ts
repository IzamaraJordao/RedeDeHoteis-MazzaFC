import styled from 'styled-components'

export const Menu = styled.div`
  color: 333;
  h2 {
    color: var(--secondary);
  }
  p {
    color: #333;
    font-size: 1.5rem;
  }
  text-align: center;
`

export const MenuButton = styled.div`
  color: #858485;
  margin: 10px;
  h3 {
    margin-left: 10px;
  }
  text-align: left;
  Button {
    color: #858485 !important;

    text-align: left !important;
  }
`

export const styles = {
  box: {
    width: 250,
    height: 700,
    backgroundColor: '#f5f5f5',
    borderRadius: '5px',
    border: '1px solid #3f3c57',
  },
}
