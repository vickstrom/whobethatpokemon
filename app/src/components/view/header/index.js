import {Link} from 'react-router-dom';
import './header.css';
import React from "react";
import { AiFillHome } from "react-icons/ai";
import { FaPlay } from "react-icons/fa";
import { AiOutlineUnorderedList } from "react-icons/ai";

export default function Header() {
    return (
        <div>
            <Link to="/"><button class="btn"><AiFillHome size={50}/> Home</button></Link>
            <Link to="/play"><button class="btn"><FaPlay size={50}/> Play</button></Link>
            <Link to="/rooms"><button class="btn"><AiOutlineUnorderedList size={50}/> Rooms</button></Link>
        </div>
    )
}