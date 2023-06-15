import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../API';
import dayjs from 'dayjs';
import NavHeader from './NavbarComponents';
import { Container,Form,Button,Alert } from 'react-bootstrap';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { useState } from 'react';




function PageForm(props){

    return(
        <>
            <NavHeader user={props.user} logout={props.user}/>
            <Container fluid>
            <TheForm/>

            </Container>
        </>
    );
}

function TheForm(props){
    const navigate=useNavigate();
    const {pageId}=useParams();
    const objToEdit= pageId /// && props.answerList.find(e => e.id === parseInt(answerId));
    //console.log('objToEdit: '+JSON.stringify(objToEdit));
    const [datapubblicazione, setDatapubblicazione] = useState(objToEdit ? objToEdit.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));  //string: dayjs object is created only on submit
    const [titolo, setTitolo] = useState(objToEdit ? objToEdit.titolo : '');
    //const [respondent, setRespondent] = useState(objToEdit ? objToEdit.respondent : '');
    //const [score, setScore] = useState(objToEdit ? objToEdit.score : 0); 
    const [errorMsg,setErrorMsg]=useState('');
    

    function handleSubmit(event) {
        event.preventDefault();
        //console.log('premuto submit');

        // Form validation
        if (datapubblicazione === '')
        {
            setErrorMsg('Data non valida');
        /*else if (isNaN(parseInt(score)))
            setErrorMsg('Score non valido');
        else if (parseInt(score)<0) {
            setErrorMsg('Score negativo non valido');*/
        }
        else {
            const e = {
                titolo: titolo,
                //respondent: respondent,
                //score: parseInt(score),
                datapubblicazione: dayjs(datapubblicazione)
            }
            //console.log(e);

          /*  if (objToEdit) {  // decide if this is an edit or an add
                e.id = objToEdit.id;
                props.editAnswer(e);
            } else {
                props.addAnswer(e);
            }*/
            navigate('/');
        }
    }

        return(
            <>
                {errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>Data Pubblicazione</Form.Label>
                        <Form.Control type="date" name="datapubblicazione" value={datapubblicazione} onChange={ev => setDatapubblicazione(ev.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Titolo</Form.Label>
                        <Form.Control type="text" name="titolo" value={titolo} onChange={ev => setTitolo(ev.target.value)} />
                    </Form.Group>

                    {/*<Form.Group className='mb-3'>
                        <Form.Label>Respondent</Form.Label>
                        <Form.Control type="text" name="respondent" value={respondent} onChange={handleRespondent} />
                    </Form.Group>
                    */}
                    {
                        /*
                    <Form.Group className='mb-3'>
                        <Form.Label>Score</Form.Label>
                        <Form.Control type="number" name="score" value={score} onChange={handleScore} />
                    </Form.Group>*/
                    }
                    <Button type='submit' variant="primary">{objToEdit? 'Save' : 'Add'}</Button> 
                    {/* alternative
                    <Button className='mx-2' variant='danger' onClick={()=>navigate('/')}>Cancel</Button> */}
                    <Link to='/'>
                        <Button className='mx-2' variant='danger'>Cancel</Button>
                    </Link>
                </Form>
            </>
        );


    }






export default PageForm;