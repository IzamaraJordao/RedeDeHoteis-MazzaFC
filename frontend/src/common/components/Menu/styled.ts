import styled from "styled-components";

export const Menu = styled.div`
  // color:333;
  h2{
    color:  #6c63ff;
  };
  p{
  color: #333;
  font-size: 1.2rem;
  }
  text-align: center;
`;

export const MenuButton = styled.div`
  color: #858485;
  margin:10px;
  h3{
    margin-left: 10px;
  }
  text-align: left;
  Button{  
    color: #858485 !important;
     
    text-align: left; !important;
}
  `;

  export const IconSaida = styled.div`
  color: #fff; 
  margin-left: 92%;
  display: flex;
  flex-direction: row;
  span{
    // text-align: center;
    align-items: center;
  }
  div{
    margin:2px;
    svg{
      margin:10px;
    }
  }
  `;

  export const Header = styled.header`
  display: flex;
  flex-direction: row;
  margin-top: -50px;
  margin-left: 30px;
  background-color: #fff;
  color: #333;
  width: 100%;
  height: 100px;
  text-align: center;
  border-radius: 5px;
  `;

  export const HeaderMenu = styled.div`
  background-color: #3f3c57;
  width: calc(100vw - 280px);
  height: 100px;
  display: flex;
  flex-direction: row;
  `;
