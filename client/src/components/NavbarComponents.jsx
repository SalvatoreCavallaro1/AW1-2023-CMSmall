import { Navbar, Container, Button,OverlayTrigger,Tooltip } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import API from "../API";
//import { useState } from 'react';


function NavHeader(props) {
    const navigate = useNavigate();
    //console.log(props.titolo[0].titolo);
    //console.log(API.getTitolo());
   // 

   //const name = props.user && props.user.name;
const name=props.user && props.user.name;
const titolo=props.loading? "Loading.." : props.titolo?.titolo;
const admin=(props.user && props.user.admin)==1? " (admin)" : "";
//console.log(props.titolo.titolo);
//props.loading? props.spinner : props.titolo?.titolo
return (
    <Navbar bg="dark" variant="dark">
        <Container fluid>
            <Navbar.Brand>
                <img
                alt=""
                src="/cmslogo.svg"
                width="30"
                height="30"
                className="d-inline-block align-top"
                />{' '}
                 {
                 (props.user?.id && props.user?.admin===1)?
                 <>
                 {titolo}
                 <OverlayTrigger  placement="bottom" overlay={  
                <Tooltip id="tooltip-enabled"> Edita il nome del sito</Tooltip>
                }>
                 <span className="d-inline-block">
                <Button variant='primary'  className='mx-2' 
                    onClick={()=>{navigate(`/titolo/${props.titolo.id}`)}}><i className='bi bi-pencil-square' /></Button>
                    </span>
                    </OverlayTrigger>
                </>
                :
                <>
                {titolo}
                </>
                }
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                { name? <>
                <Navbar.Text className='fs-5'>
                    {"Signed in as: "+name + admin}
                    
                </Navbar.Text>
                <Button className='mx-2' variant='danger' onClick={props.logout}>Logout</Button>
                </> : 
                <Button className='mx-2' variant='primary' onClick={()=> navigate('/login')}>Login</Button> }
            </Navbar.Collapse>
        </Container>
    </Navbar>
);
}

export default NavHeader;