import styled from "styled-components";

export const External = styled.div`
  display: flex;
  justify-content: center;
  margin-top: -80px;
  `;

export const CardHome = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const CardHomeInterno = styled.div`
  display: flex;
  flex-direction: row;
  margin: 13px;
  
  p{
    
    @media (max-width: 1435px) {
      font-size: 12px;
    };
    @media (max-width: 1230px) {
      font-size: 15px;
      margin: 5px;
    };
    @media (max-width: 1030px) {
      font-size: 12px;
      

    };

  }

  div{
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  `;
