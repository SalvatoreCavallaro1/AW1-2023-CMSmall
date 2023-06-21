import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../API';
import dayjs from 'dayjs';
import NavHeader from './NavbarComponents';
import { Container,Form,Button,Alert,Col,Image,Figure, FormSelect } from 'react-bootstrap';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { useState } from 'react';




function PageForm(props){

    return(
        <>
            <NavHeader user={props.user} logout={props.logout}/>
            <Container fluid>
            <TheForm user={props.user} addPage={props.addPage}/>

            </Container>
        </>
    );
}


function TheHeader(props){
return(
    <Form.Group className='mb-3'>
        <div className="d-flex align-items-center">
            <div>
                <Button variant='primary' className='mx-2'
                //onClick={() => moveFieldUp(fieldIndex)}
                // disabled={fieldIndex === 0} // Disable button if the field is already at the top
                >
                    &#8593;
                </Button>
                <Button
                    variant='primary'
                    className='mx-2'
                //onClick={() => moveFieldDown(fieldIndex)}
                //disabled={fieldIndex === fields.length - 1} // Disable button if the field is already at the bottom
                >
                    &#8595;
                </Button>
            </div>
            <div className="flex-grow-1">
                <Form.Label>Header</Form.Label>
                <Form.Control type="text" name="header" id="1" value={props.header.contenuto} onChange={ev => { props.handleBlocco({ id: parseInt(ev.target.id), name: ev.target.name, contenuto: ev.target.value, priorità: 1 }), props.setHeader(ev.target.value) }} as="textarea" rows={3} />
            </div>
            <div>
                <Button variant="danger" >
                    <i className='bi bi-trash' /></Button>
            </div>
        </div>
    </Form.Group>
);
    


}

function Paragrafo(props){
return(
    <Form.Group className='mb-3'>
        <div className="d-flex align-items-center">
            <div>
                <Button variant='primary' className='mx-2'
                //onClick={() => moveFieldUp(fieldIndex)}
                // disabled={fieldIndex === 0} // Disable button if the field is already at the top
                >
                    &#8593;
                </Button>
                <Button
                    variant='primary'
                    className='mx-2'
                //onClick={() => moveFieldDown(fieldIndex)}
                //disabled={fieldIndex === fields.length - 1} // Disable button if the field is already at the bottom
                >
                    &#8595;
                </Button>
            </div>
            <div className="flex-grow-1">
                <Form.Label>Paragrafo</Form.Label>
                <Form.Control type="text" name="paragrafo" id="2" value={props.paragrafo.contenuto} onChange={ev => { props.handleBlocco({ id: parseInt(ev.target.id), name: ev.target.name, contenuto: ev.target.value, priorità: 2 }), props.setParagrafo(ev.target.value) }} as="textarea" rows={3} />
            </div>
            <div>
                <Button variant="danger" >
                    <i className='bi bi-trash' /></Button>
            </div>
        </div>

    </Form.Group>
    );
}

function Immagini(props){
return(
    <Form.Group className='mb-3'>
                    <div className="d-flex align-items-center">
                    <div>
                    <Button variant='primary' className='mx-2'
                        //onClick={() => moveFieldUp(fieldIndex)}
                        // disabled={fieldIndex === 0} // Disable button if the field is already at the top
                        >
                            &#8593;
                        </Button>
                        <Button
                            variant='primary'
                            className='mx-2'
                        //onClick={() => moveFieldDown(fieldIndex)}
                        //disabled={fieldIndex === fields.length - 1} // Disable button if the field is already at the bottom
                        >
                            &#8595;
                        </Button>
                        </div>
                        <div className="flex-grow-1">
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
                            value="http://localhost:3001/images/baloon.jpg"
                            name="img"
                            
                            type='radio'
                            //idTemporary={(idTemp===0)? idTemp : idTemp+1}
                            id="{`inline-radio-1`}"
                            data-id="4"
                            onChange={(ev) =>props.handleBlocco({id:parseInt(ev.target.dataset.id),name:ev.target.name,contenuto: ev.target.value,priorità:3})}
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
                            //onChange={(ev) =>setImage({idblocco:3,contenuto: ev.target.value,priorità:3})}
                            value="http://localhost:3001/images/torino1.jpeg"
                            //name="group1"
                            name="img"
                            type='radio'
                            id={`inline-radio-2`}
                            data-id="4"
                            onChange={(ev) =>props.handleBlocco({id:parseInt(ev.target.dataset.id),name:ev.target.name,contenuto: ev.target.value,priorità:3})}
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
                            //onChange={(ev) =>setImage({idblocco:3,contenuto: ev.target.value,priorità:3})}
                            value="http://localhost:3001/images/baloon.jpg"
                            //name="group1"
                            name="img"
                            type='radio'
                            id={`inline-radio-3`}
                            data-id="4"
                            onChange={(ev) =>props.handleBlocco({id:parseInt(ev.target.dataset.id),name:ev.target.name,contenuto: ev.target.value,priorità:3})}

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
                            //onChange={(ev) =>setImage({idblocco:3,contenuto: ev.target.value,priorità:3})}
                            value="http://localhost:3001/images/baloon.jpg"
                            //name="group1"
                            type='radio'
                            name="img"
                            id={`inline-radio-4`}
                            data-id="4"
                            onChange={(ev) =>props.handleBlocco({id:parseInt(ev.target.dataset.id),name:ev.target.name,contenuto: ev.target.value,priorità:3})}

                        />
                        </div>
                        <div>
                        <Button variant="danger" >
                        <i className='bi bi-trash' /></Button>
                        </div>
                        </div>
                    </Form.Group>
);
}

function TheForm(props){
    const navigate=useNavigate();
    const {pageId}=useParams();
    const objToEdit= pageId /// && props.answerList.find(e => e.id === parseInt(answerId));
    //console.log('objToEdit: '+JSON.stringify(objToEdit));
    const [datapubblicazione, setDatapubblicazione] = useState(objToEdit ? objToEdit.date.format('YYYY-MM-DD') : '');  //string: dayjs object is created only on submit
    const [datacreazione,setDatacreazione]=useState(objToEdit ? objToEdit.date.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
    const [titolo, setTitolo] = useState(objToEdit ? objToEdit.titolo : '');
    const [header, setHeader] = useState(objToEdit ? objToEdit.header : {});
    const [paragrafo, setParagrafo] = useState(objToEdit ? objToEdit.paragrafo : {});
    const [image, setImage] = useState(objToEdit  ? objToEdit.image : {});
    const [blocchi,setBlocchi]=useState([]);
    const [autore, setAutore] = useState(objToEdit ? objToEdit.autore : props.user.id);
    //const [score, setScore] = useState(objToEdit ? objToEdit.score : 0); 
    const [errorMsg,setErrorMsg]=useState('');
    const [idTemp,setIdTemp]=useState(1);
    const [formFields,setFormFields]=useState([{tipo:"Header",priorità:1},{tipo:"Paragrafo",priorità:2},{tipo:"Immagini",priorità:3}]);

    function handleBlocco(blocco){
        //console.log(blocco);
        //console.log(blocchi);
        let arrayblocchi=[...blocchi]
        //console.log(blocco);
        let newblocco={}
        let idblocco=0;
        switch(blocco.name)
        {
            case "header":
                idblocco=1;
               // setHeader(blocco.contenuto);
                break;
            case "paragrafo":
                idblocco=2;
               // setParagrafo(blocco.contenuto)
                break;
            case "img":
                idblocco=3;
               //setImage(blocco.img);
                break;
            default:
                break;
        }

        
        let el= arrayblocchi.find(block=>block.Tempid==blocco.id);
        //console.log(el);
        
        if(el)
        {
            let index=arrayblocchi.indexOf(el)
            //console.log(index);
           // console.log("si"); ///?????
          // el.contenuto=blocco.contenuto;
            arrayblocchi[index].contenuto=blocco.contenuto;
            //console.log(blocchi);

        }
        else
        {
           //let newblocco={...blocco} ;
            /*Object.assign(
                newblocco,
                {Tempid:blocco.id,idblocco:1,contenuto: blocco.contenuto,priorità:blocco.priorità}
            );*/
            newblocco={Tempid:blocco.id,idblocco:idblocco,contenuto: blocco.contenuto,priorità:blocco.priorità};
            //let arrayblocchi=[...blocchi]
            arrayblocchi.push(newblocco);
            setBlocchi(arrayblocchi);
            //console.log(blocchi);
            setIdTemp(idTemp+1);
            //let newblocco={Tempid:blocco.id,idblocco:idblocco,contenuto: blocco.contenuto,priorità:blocco.priorità};
        }

           // return id.Tempid;
        
        

    }
    

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
                autore: autore,
                datacreazione: datacreazione,
                datapubblicazione: dayjs(datapubblicazione).format('YYYY-MM-DD'),
                blocchi:blocchi
               /* blocchi: [
                    (header) ?
                        {
                            idblocco: header.idblocco,
                            contenuto: header.contenuto,
                            priorità: header.priorità
                        } : null,
                    (paragrafo) ?
                        {
                            idblocco: paragrafo.idblocco,
                            contenuto: paragrafo.contenuto,
                            priorità: paragrafo.priorità
                        } : null,
                    (image) ?
                        {
                            idblocco: image.idblocco,
                            contenuto: image.contenuto,
                            priorità: image.priorità
                        } : null

                ]*/
                //score: parseInt(score),

            }
            props.addPage(e);
            console.log(e);

          /*  if (objToEdit) {  // decide if this is an edit or an add
                e.id = objToEdit.id;
                props.editAnswer(e);
            } else {
                props.addAnswer(e);
            }*/
           // navigate('/');
        }
    }

    function displayEl(el)
    {
        
     //   for(let el of formFields){
            if (el.tipo=="Header")
            return(
                <TheHeader header={header} handleBlocco={handleBlocco} setHeader={setHeader}/>
                

            );
            else if (el.tipo=="Paragrafo")
            return(
                <Paragrafo paragrafo={paragrafo} handleBlocco={handleBlocco} setParagrafo={setParagrafo}/> 

            );
            else if (el.tipo=="Immagini")
            return(
                <Immagini handleBlocco={handleBlocco}/>

            );
       // }
    
    }

   
    //mettere ogni blocco in un singolo componente, mettere un stato che parte da 0 e può solo essere incrementato
    //ad ogni blocco viene aggiunto un  id, questo id sarà usato dentro il vettore/oggetto dei blocchi per poterlo modificare o aggiugnere
    //fare funzioni handleHeader, handleParagrafo,handleImg, dove all'interno si setta il contenuto dentro il vettore dei blocchi
    // usare stati di singoli per poi settare il vettore? settare direttamente il vettore?
    //usare il vettore per settare i blocchi nell'oggetto e dentro la funzione handle submit

        return(
            <>
                {errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
                <Form onSubmit={handleSubmit}>

                    <Form.Group className='mb-3'>                            
                                <Form.Label>Titolo</Form.Label>
                                <Form.Control type="text" name="titolo" value={titolo} onChange={ev => setTitolo(ev.target.value)} />
                    </Form.Group>
                   
                    <Form.Group className='mb-3'>
                        <Form.Label>Data Pubblicazione</Form.Label>
                        <Form.Control type="date" name="datapubblicazione" value={datapubblicazione} onChange={ev => setDatapubblicazione(ev.target.value)} />
                    </Form.Group>

                    
                    {
                   // blocchi.map((e) =>
                  //<BodyAccordion e={e}  key={e.idblocco}  />)
                }
             

                    
                    {
                        //formFields.map(displayEl(e){<Form.Group className='mb-3'>
                        //    {e}
                        //</Form.Group>)
                   // }
                       
                        
                    }
                    

                    

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