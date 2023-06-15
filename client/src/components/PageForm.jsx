import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../API';
import dayjs from 'dayjs';
import NavHeader from './NavbarComponents';
import { Container,Form,Button,Alert,Col,Image,Figure } from 'react-bootstrap';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { useState } from 'react';




function PageForm(props){

    return(
        <>
            <NavHeader user={props.user} logout={props.logout}/>
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
    const [datapubblicazione, setDatapubblicazione] = useState(objToEdit ? objToEdit.date.format('YYYY-MM-DD') : null);  //string: dayjs object is created only on submit
    const [titolo, setTitolo] = useState(objToEdit ? objToEdit.titolo : '');
    const [header, setHeader] = useState(objToEdit ? objToEdit.header : '');
    const [paragrafo, setParagrafo] = useState(objToEdit ? objToEdit.paragrafo : '');
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
                        <Form.Label>Titolo</Form.Label>
                        <Form.Control type="text" name="titolo" value={titolo} onChange={ev => setTitolo(ev.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Header</Form.Label>
                        <Form.Control type="text" name="header" value={header} onChange={ev => setHeader(ev.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Paragrafo</Form.Label>
                        <Form.Control type="text" name="paragrafo" value={paragrafo} onChange={ev => setParagrafo(ev.target.value)} as="textarea" rows={3}/>
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Data Pubblicazione</Form.Label>
                        <Form.Control type="date" name="datapubblicazione" value={datapubblicazione} onChange={ev => setDatapubblicazione(ev.target.value)} />
                    </Form.Group>

                    <Form.Group className='mb-3'>
                        <Form.Label>Seleziona un immagine fra quella disponibili</Form.Label>
                        <Form.Check
                            label={<Figure>
                                <Figure.Image
                                    width={171}
                                    height={180}
                                    alt="171x180"
                                    src="http://localhost:3001/images/baloon.jpg"
                                    rounded
                                />
                                <Figure.Caption>
                                    Il gran Baloon.
                                </Figure.Caption>
                            </Figure>}
                            name="group1"
                            type='checkbox'
                            id={`inline-'checkbox'-1`}
                        />
                        <Form.Check 
                            label={<Figure>
                                <Figure.Image
                                    width={171}
                                    height={180}
                                    alt="171x180"
                                    src="http://localhost:3001/images/torino1.jpeg"
                                    rounded
                                />
                                <Figure.Caption>
                                    Il monte dei capuccini.
                                </Figure.Caption>
                            </Figure>}
                            name="group1"
                            type='checkbox'
                            id={`inline-'checkbox'-2`}
                        />
                        <Form.Check
                            label={<Figure>
                                <Figure.Image
                                    width={171}
                                    height={180}
                                    alt="171x180"
                                    src="http://localhost:3001/images/baloon.jpg"
                                    rounded
                                />
                                <Figure.Caption>
                                    Il gran Baloon.
                                </Figure.Caption>
                            </Figure>}
                            name="group1"
                            type='checkbox'
                            id={`inline-'checkbox'-3`}
                        />
                        <Form.Check
                            label={<Figure>
                                <Figure.Image
                                    width={171}
                                    height={180}
                                    alt="171x180"
                                    src="http://localhost:3001/images/baloon.jpg"
                                    rounded
                                />
                                <Figure.Caption>
                                    Il gran Baloon.
                                </Figure.Caption>
                            </Figure>}
                            name="group1"
                            type='checkbox'
                            id={`inline-'checkbox'-4`}
                        />
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