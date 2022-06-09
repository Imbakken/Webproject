import { Link } from "react-router-dom";

function StatusCard(props) {
    const { statusCode, statusText } = props;

    let color;

    switch (statusCode.toString()) {
        case "403":
            color = 'orange'
            break;

        case "404":
            color = 'red'
            break;
        default:
            color = ''
    }

    return (
        <div className="status-card">
            <h1><span className={`big-number ${color}`}>{statusCode.toString()}</span> {statusText}</h1>
            <p>Return to the <Link to="/">Home Page</Link></p>
        </div>
    )
}

export default StatusCard;