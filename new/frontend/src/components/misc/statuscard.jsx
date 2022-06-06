import { Link } from "react-router-dom";

function StatusCard(props) {
    const { statusCode, statusText } = props;

    switch (statusCode.toString()) {
        case "403":
            break;

        case "404":
            break;
    }

    return (
        <div className="status-card">
            <h1>{statusCode.toString()}{statusText}</h1>
            <p>Return to the <Link to="/">Home Page</Link></p>
        </div>
    )
}

export default StatusCard;