import Logo from "../../assets/ntnu-logo-white.png";

//footer component with ntnu logo and group number
export default function Footer () {
    return (
        <footer>
            <p>This project was created as part of the course IDG 2671 Webproject at NTNU.</p>
            <p>Created by Group 1 ©</p>
            <a href="https://www.ntnu.no/"><img src={Logo} alt="NTNU logo" /></a>
        </footer>
    )
}