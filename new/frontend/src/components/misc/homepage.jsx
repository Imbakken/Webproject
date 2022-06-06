import BigLogo from "../../assets/illustrations/logo.png";

//footer component with ntnu logo and group number
export default function Footer () {
    return (
        <div class="main-content">
        <h1>Find a second examiner for your course</h1>

        <div class="link-container">
            <a href="/login">Please login to continue</a>
        </div>

        <div class="logo">
            <img src={BigLogo} alt="Logo"></img>
        </div>

    </div>
    )
}