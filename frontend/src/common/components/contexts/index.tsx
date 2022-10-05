import React, { useContext}from "react";
import {Container} from "./styled";
import Switch from 'react-switch';
import { ThemeContext } from "styled-components";
import { shade } from "polished";


interface Props {
    toggleTheme(): void;
}
const Header:React.FC<Props> = ({toggleTheme}) => {
    const {colors, title} = useContext(ThemeContext);
    return (
        <Container>
            Rede Inn Hotel
            <Switch
                onChange={toggleTheme}
                checked={title === "dark"}
                checkedIcon={false}
                uncheckedIcon={false}
                height={10}
                width={40}
                handleDiameter={20}
                offColor={shade(0.15,colors.primary)}
                onColor={colors.primary}
            />

        </Container>
    );
}

export default Header;