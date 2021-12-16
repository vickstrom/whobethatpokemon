import './button.css';

export default function Button({color, children, onClick, disabled}) {
    return (
        <button 
            className={`${disabled ? 'grey' : color} uniform-button`} 
            disabled={disabled}
            onClick={e => onClick(e)} 
            >
            {children}
        </button>
    )
}