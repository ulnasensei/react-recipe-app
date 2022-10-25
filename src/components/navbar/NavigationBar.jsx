import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";

const NavigationBar = () => {
    return (
        <Navbar>
            <Container>
                <NavLink
                    style={({ isActive }) => ({
                        color: isActive && "red",
                    })}
                    to="/"
                >
                    <Navbar.Brand>
                        <img
                            alt=""
                            src={logo}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{" "}
                        Recipe App
                    </Navbar.Brand>
                </NavLink>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
