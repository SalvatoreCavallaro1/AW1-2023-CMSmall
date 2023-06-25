import { Navbar, Container, Button,OverlayTrigger,Tooltip } from "react-bootstrap";
import { useNavigate,Link } from "react-router-dom";
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


                
                { 
                  props.appStatus?
                 <OverlayTrigger  placement="bottom" overlay={  
                <Tooltip id="tooltip-enabled"> {props.user?.id? "Passa al" : "Effettua l'accesso per accedere al backoffice"}</Tooltip>
                }>
                 <span className="d-inline-block">
                <Button variant='primary'  className='mx-2' 
                    disabled={ props.user? false : true}
                    onClick={()=>{props.appStatus=="back"? props.setAppStatus("front") : props.setAppStatus("back")}}> {props.appStatus=="back"? "FrontOffice" : "BackOffice"}</Button>
                    </span>
                    </OverlayTrigger>
                    :
                    false
                }
                
                {(props.appStatus1 && props.appStatus1=="back")?
                 <>
                <Link to='/'>
                <Button onClick={()=>{props.appStatus1=="back"? props.setAppStatus1("front") : props.setAppStatus1("back")}} className='mx-2' variant='primary'>Passa al FrontOffice</Button>
                </Link>
                
                <Link to='/'>
                <Button className='mx-2' variant='primary'>Torna Indietro</Button>
                </Link>
                </>
                : (props.appStatus1 && props.appStatus1=="front")?
                <Link to='/'>
                <Button className='mx-2' variant='primary'>Torna Indietro</Button>
                </Link>
               :false}

               
            
                
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