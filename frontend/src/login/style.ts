import styled from 'styled-components'

export const BodyLogin = styled.div`
  background-image: url('https://img.freepik.com/fotos-gratis/piscina_74190-2109.jpg?w=2000');
  background-size: cover;
  box-sizing: border-box;
  height: 96vh;
  overflow: hidden;
`
export const Div = styled.div`
    height: 100vh;
      background-size: cover;

    box-sizing: border-box;
    color: #333;
`


export const Input = styled.input`
  // border-bottom: 2px solid var(--text);
  width: 350px;
  height: 40px;
  padding: 5px;
  font-size: 1rem;
  margin-bottom: 20px;
  border-radius: 5px;
  focus {
    border-bottom: 2px solid #4d42fa;
    background-size: cover;
    border: none;
  }
`
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  width: 450px;
  height: 600px;
  margin-left: auto;
  margin-right: auto;
  // padding: 80px 30px;
  margin-top: 50px;
  border-radius: 5px;
  
  h2 {
    
    font-size: 3rem;
    color: #4d42fa;
    // margin-bottom: auto;
    // margin-top: -50%;
    
  }
  p {
    color: red;
    font-size: 1.5rem;
    
  }
 
  button {
    background-color: #4d42fa;
    color: #fff;
    width: 200px;
    height: 60px;
    padding: 6px;
    border-radius: 5px;
  }
  label{
    margin-right: 300px;
  }
`;
