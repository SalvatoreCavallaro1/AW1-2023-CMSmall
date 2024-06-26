import { useState } from "react";
import { Button, Col, Container, Form, Row,Alert } from "react-bootstrap";
import { useNavigate} from "react-router-dom";
import API from "../API";


function LoginForm(props) {
  const [username, setUsername] = useState('salvo@test.com');
  const [password, setPassword] = useState('pwd');
  const [errorMessage, setErrorMessage] = useState('') ;


    const navigate = useNavigate();

    const doLogIn = (credentials) => {
      API.logIn(credentials)
        .then( user => {
          setErrorMessage('');
          props.loginSuccessful(user);
        })
        .catch(err => {
         
          setErrorMessage('Username o password errati');
        })
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
        const credentials = { username, password };
  
        
        let valid = true;
        if(username === '' || password === '')
            valid = false;
        
        if(valid)
        {
          doLogIn(credentials);
        } else {
          
          if(username==='')
          setErrorMessage('Errori nel form di input, username assente')
          if(password==='')
          setErrorMessage('Errori nel form di input, password assente')
        }
    };

    return (
        <Container>
          <Row>
              <Col xs={3}></Col>
              <Col xs={6}>
                  <h2>Login</h2>
                  <Form onSubmit={handleSubmit}>
                      {errorMessage ? <Alert variant='danger' dismissible onClick={()=>setErrorMessage('')}>{errorMessage}</Alert> : ''}
                      <Form.Group controlId='username'>
                          <Form.Label>Email</Form.Label>
                          <Form.Control type='email' value={username} onChange={ev => setUsername(ev.target.value)} />
                      </Form.Group>
                      <Form.Group controlId='password'>
                          <Form.Label>Password</Form.Label>
                          <Form.Control type='password' value={password} onChange={ev => setPassword(ev.target.value)} />
                      </Form.Group>
                      <Button className='my-2' type='submit'>Login</Button>
                      <Button className='my-2 mx-2' variant='danger' onClick={()=>navigate('/')}>Cancel</Button>
                  </Form>
              </Col>
              <Col xs={3}></Col>
          </Row>
      </Container>
    );



}



export { LoginForm };
