import './button.css';

export default function Button({color, children, onClick}) {
    return (
        <button 
            className={`${color} uniform-button`} 
            onClick={e => onClick(e)} 
            >
            {children}
        </button>
    )
}