
import './input.css';

export default function Input({value, onChange, placeholder}) {
    return <input onChange={(e) => onChange(e)} placeholder={placeholder} className="input-style"></input>
}