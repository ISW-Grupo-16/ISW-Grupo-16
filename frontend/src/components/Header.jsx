import Navbar from 'react-bootstrap/Navbar';
import React from 'react'
import { useSelector } from 'react-redux'

export default function Header() {
    const nombre = useSelector((store => store.username));

    return (
       <Navbar bg="dark" variant="dark" className="d-flex justify-content-between align-items-center">
            <Navbar.Brand href="#home">
            <div>Proyecto CMF</div>
        
            </Navbar.Brand>
            <div className="text-white"> HOLA {nombre}</div>
        </Navbar>
    )
}
