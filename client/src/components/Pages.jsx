import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from 'react-router-dom';
import NavHeader from './NavbarComponents';
import { Container,Alert,Spinner } from 'react-bootstrap';
import { PageDescription,MainPages } from './PageComponents';

function Loading(props) {
    return (
      <Spinner className='m-2' animation="border" role="status" />
    )
  }

  //<PageDescription pages={props.pages} />
function Pages(props){
    return(
        <>
            <NavHeader loading={props.initialLoading} titolo={props.titolo} user={props.user} logout={props.logout}/>
            <Container fluid>
            {props.errorMsg? <Alert variant='danger' dismissible className='my-2' onClose={props.resetErrorMsg}>
            {props.errorMsg}</Alert> : null}
            {props.initialLoading ? <Loading /> : 
            <>
            
            <MainPages pageList={props.pages} user={props.user} editPage={props.editPage}/>
            </>
            }
            </Container>
        </>
    );
}

export default Pages;