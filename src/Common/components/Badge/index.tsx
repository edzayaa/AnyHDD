import './index.css'
const Badge = ({text}: {text: string}) => {
    return (
        <div className="badge">
            <h6>{text}</h6>
        </div>
    )
}

export default Badge;
