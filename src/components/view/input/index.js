
import './input.css';

export default function Input({value, onChange, placeholder, readOnly=false, maxLength=100}) {
    return <input maxLength={maxLength} value={value} onChange={(e) => onChange(e)} placeholder={placeholder} readOnly={readOnly} className="input-style"></input>
}