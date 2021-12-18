import './pieTimer.css';
import {useState, useRef, useEffect} from 'react';

export default function PieTimerView({ending, currentTime, totalTime}) {

    const [size, setSize] = useState(1);
    const svg = useRef(null);

    const draw = () => {
        let alpha= currentTime === 0 ? 359.99 : 360 - Math.round((currentTime / totalTime) * 360);
        const r = (alpha * Math.PI / 180);
        const x = Math.sin( r ) * (size / 2) 
        const y = Math.cos( r ) * - (size / 2) 
        const mid = (alpha > 180 ) ? 1 : 0
        return `M 0 0 v -${size / 2} A ${size / 2} ${size / 2} 1  ${mid} 1 ${x} ${y} z`;
    }

    useEffect(() => {
        setSize(svg.current.clientWidth);
    }, []);

    return (
        <svg ref={svg} viewBox={`0 0 ${size} ${size}`}>
            <path id="timer-border" d={draw()} transform={`translate(${size / 2}, ${size / 2})`}/>
            <path id="timer" d={draw()} transform={`translate(${size / 2}, ${size/ 2}) scale(.84)`}/>
        </svg>
    )
}