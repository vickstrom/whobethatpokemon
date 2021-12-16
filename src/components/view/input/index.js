
import './input.css';

export default function Input({value, onChange, placeholder, readOnly=false}) {
    return <input value={value} onChange={(e) => onChange(e)} placeholder={placeholder} readOnly={readOnly} className="input-style"></input>
}