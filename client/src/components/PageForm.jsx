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
                onClick={() => props.moveUp(props)}
                disabled={props.priorità === 0} // Disable button if the field is already at the top
                >
                    &#8593;
                </Button>
                <Button
                    variant='primary'
                    className='mx-2'
                onClick={() => props.moveDown(props)}
                disabled={props.priorità === props.formFields.length - 1} // Disable button if the field is already at the bottom
                >
                    &#8595;
                </Button>
            </div>
            <div className="flex-grow-1">
                <Form.Label>Header</Form.Label>
                <Form.Control type="text" name="header" id={props.id} value={props.header.contenuto} onChange={ev => { props.handleBlocco({ id: parseInt(ev.target.id), name: ev.target.name, contenuto: ev.target.value, priorità: props.priorità }), props.setHeader(ev.target.value) }} as="textarea" rows={3} />
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
                onClick={() => props.moveUp(props)}
                disabled={props.priorità === 0} // Disable button if the field is already at the top
                >
                    &#8593;
                </Button>
                <Button
                    variant='primary'
                    className='mx-2'
                    onClick={() => props.moveDown(props)}
                    disabled={props.priorità === props.formFields.length - 1}
                >
                    &#8595;
                </Button>
            </div>
            <div className="flex-grow-1">
                <Form.Label>Paragrafo</Form.Label>
                <Form.Control type="text" name="paragrafo" id={props.id} value={props.paragrafo.contenuto} onChange={ev => { props.handleBlocco({ id: parseInt(ev.target.id), name: ev.target.name, contenuto: ev.target.value, priorità: props.priorità }), props.setParagrafo(ev.target.value) }} as="textarea" rows={3} />
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
                        onClick={() => props.moveUp(props)}
                        disabled={props.priorità === 0} // Disable button if the field is already at the top
                        >
                            &#8593;
                        </Button>
                        <Button
                            variant='primary'
                            className='mx-2'
                            onClick={() => props.moveDown(props)}
                            disabled={props.priorità === props.formFields.length - 1}
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
                            data-id={props.id}
                            onChange={(ev) =>props.handleBlocco({id:parseInt(ev.target.dataset.id),name:ev.target.name,contenuto: ev.target.value,priorità:props.priorità})}
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
                            data-id={props.id}
                            onChange={(ev) =>props.handleBlocco({id:parseInt(ev.target.dataset.id),name:ev.target.name,contenuto: ev.target.value,priorità:props.priorità})}
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
                            data-id={props.id}
                            onChange={(ev) =>props.handleBlocco({id:parseInt(ev.target.dataset.id),name:ev.target.name,contenuto: ev.target.value,priorità:props.priorità})}

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
                            data-id={props.id}
                            onChange={(ev) =>props.handleBlocco({id:parseInt(ev.target.dataset.id),name:ev.target.name,contenuto: ev.target.value,priorità: props.priorità})}

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
   // const [idTemp,setIdTemp]=useState(1);
    const [formFields,setFormFields]=useState([{tipo:"Header",priorità:0 ,key:1},{tipo:"Paragrafo",priorità:1,key:2},{tipo:"Immagini",priorità:2,key:3}]);

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
            //setIdTemp(idTemp+1);
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
                <TheHeader formFields={formFields}  key={el.key} id={el.key} header={header} handleBlocco={handleBlocco} setHeader={setHeader} moveUp={HandleMoveUp} moveDown={HandleMoveDown} priorità={el.priorità}/>
                

            );
            else if (el.tipo=="Paragrafo")
            return(
                <Paragrafo formFields={formFields} key={el.key} id={el.key} paragrafo={paragrafo} handleBlocco={handleBlocco} setParagrafo={setParagrafo} moveUp={HandleMoveUp} moveDown={HandleMoveDown} priorità={el.priorità}/> 

            );
            else if (el.tipo=="Immagini")
            return(
                <Immagini formFields={formFields} key={el.key} id={el.key} handleBlocco={handleBlocco} moveUp={HandleMoveUp} moveDown={HandleMoveDown} priorità={el.priorità}/>

            );
       // }
    
    }

    function HandleMoveUp(props){
        if (props.priorità > 0) {
            const newformFields = [...formFields];


            let el = newformFields.find(field => field.key == props.id);
            //console.log(el);

            if (el) {
                let index = newformFields.indexOf(el)
               
                newformFields[index].priorità = newformFields[index].priorità-1;
                newformFields[index-1].priorità = newformFields[index].priorità+1;
                
                //console.log(blocchi);

            }
            let sortedFields = newformFields.sort((f1, f2) => (f1.priorità > f2.priorità) ? 1 : (f1.priorità < f2.priorità) ? -1 : 0);
            setFormFields(sortedFields);
            console.log(formFields);
          }

    }

    function HandleMoveDown(props){
        if (props.priorità < formFields.length - 1) {
            const newformFields = [...formFields];


            let el = newformFields.find(field => field.key == props.id);
            //console.log(el);

            if (el) {
                let index = newformFields.indexOf(el)
               
                newformFields[index].priorità = newformFields[index].priorità+1;
                newformFields[index+1].priorità = newformFields[index].priorità-1;
                
                //console.log(blocchi);

            }
            let sortedFields = newformFields.sort((f1, f2) => (f1.priorità > f2.priorità) ? 1 : (f1.priorità < f2.priorità) ? -1 : 0);
            setFormFields(sortedFields);
            console.log(formFields);
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
                        <Form.Label>Data Pubblicazione</Form.Label>
                        <Form.Control type="date" name="datapubblicazione" value={datapubblicazione} onChange={ev => setDatapubblicazione(ev.target.value)} />
                    </Form.Group>

                    

                   { 
                   
                   formFields.map((e)=>displayEl(e))

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