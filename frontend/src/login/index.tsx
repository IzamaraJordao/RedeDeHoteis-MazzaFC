import type { NextPage } from "next";
import { selectAuthState, setAuthState } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { wrapper } from "../store/store";



const Home: NextPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  
      
  // const authState = useSelector(selectAuthState);
  // const dispatch = useDispatch();
  //  const getServerSideProps = wrapper.getServerSideProps(
  //   (store) =>
  //     async ({ params }) => {
  //       // we can set the initial state from here
  //       // we are setting to false but you can run your custom logic here
  //       await store.dispatch(setAuthState(false)); 
  //       console.log("State on server", store.getState());
  //       return {
  //         props: {
  //           authState: false,
  //         },
  //       };
  //     }
  // );
  return (
    <>
    <div className="login-container">
    {/* <h1>Rede<small>Inn</small>Hotel</h1> */}
        <h1>Login</h1>
        <form action="">
            <label htmlFor="Email">Email</label>
            <input type="email" name="email" id="email" placeholder="Digite o email"/>
            <label htmlFor="password">Senha</label>
            <input type="password" name="password" id="password" placeholder="Digite a senha"/>
            <input type="submit" value="Entrar" className="btn btn-primary btn-block"/>
        </form> 
    </div>
 
  </>
  );
};


export default Home;