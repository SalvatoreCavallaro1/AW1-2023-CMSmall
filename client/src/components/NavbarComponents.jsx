import { Navbar, Container, Button } from "react-bootstrap";


function NavHeader(props) {
    //const navigate = useNavigate();

   // const name = props.user && props.user.name;
const name=null
return (
    <Navbar bg='dark' variant='dark'>
        <Container fluid>
            <Navbar.Brand className='fs-2'>MyCMS</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                { name? <>
                <Navbar.Text className='fs-5'>
                    {"Signed in as: "+name}
                </Navbar.Text>
                <Button className='mx-2' variant='danger' >Logout</Button>
                </> : 
                <Button className='mx-2' variant='warning' >Login</Button> }
            </Navbar.Collapse>
        </Container>
    </Navbar>
);
}

export default NavHeader;