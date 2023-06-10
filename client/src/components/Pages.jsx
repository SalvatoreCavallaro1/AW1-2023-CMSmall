import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';
import NavHeader from './NavbarComponents';
import { Container,Alert,Spinner } from 'react-bootstrap';
import { PageDescription } from './PageComponents';

function Loading(props) {
    return (
      <Spinner className='m-2' animation="border" role="status" />
    )
  }

function Pages(props){
    return(
        <>
            <NavHeader/>
            <Container fluid>
            {props.errorMsg? <Alert variant='danger' dismissible className='my-2' onClose={props.resetErrorMsg}>
            {props.errorMsg}</Alert> : null}
            {props.initialLoading ? <Loading /> : 
            <>
            <PageDescription page={props.pages} />
            </>
            }
            </Container>
        </>
    );
}

export default Pages;