import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../API';
import dayjs from 'dayjs';
import NavHeader from './NavbarComponents';
import { Container,Form,Button,Alert,Col,Image,Figure, FormSelect,Spinner } from 'react-bootstrap';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

/*
function TitleForm(props)
{
    return(
        <>
            <NavHeader  user={props.user} logout={props.logout}/>
            <Container fluid>
            

            </Container>
        </>
    );
}*/



function PageForm(props){

    return(
        <>
            <NavHeader loading={props.initialLoading} titolo={props.titolo} user={props.user} logout={props.logout}/>
            <Container fluid>
            <TheForm pageList={props.pageList} user={props.user} addPage={props.addPage}/>

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
                disabled={props.priorità === 0}
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
                <Form.Label>Header</Form.Label>
                <Form.Control type="text" name="header" id={props.id} value={props.contenuto? props.contenuto : props.header.contenuto} onChange={ev => { props.handleBlocco({ id: parseInt(ev.target.id), name: ev.target.name, contenuto: ev.target.value, priorità: props.priorità }), props.setHeader(ev.target.value) }} as="textarea" rows={3} />

                {/*errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false*/ }

            </div>
            <div>
                <Button variant="danger" onClick={()=>props.deleteField(props.id-1)} >
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
                disabled={props.priorità === 0} 
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
                <Form.Control type="text" name="paragrafo" id={props.id} value={props.contenuto? props.contenuto : props.paragrafo.contenuto} onChange={ev => { props.handleBlocco({ id: parseInt(ev.target.id), name: ev.target.name, contenuto: ev.target.value, priorità: props.priorità }), props.setParagrafo(ev.target.value) }} as="textarea" rows={3} />
            </div>
            <div>
                <Button variant="danger" onClick={()=>props.deleteField(props.id-1)}>
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
                        disabled={props.priorità === 0} 
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
                            checked={(props.contenuto && props.contenuto==target.value)? true : false}
                            onChange={(ev) =>{props.handleBlocco({id:parseInt(ev.target.dataset.id),name:ev.target.name,contenuto: ev.target.value,priorità:props.priorità}),props.setImmagine(ev.target.value)}}
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
                            checked={(props.contenuto && props.contenuto==target.value)? true : false}
                            onChange={(ev) =>{props.handleBlocco({id:parseInt(ev.target.dataset.id),name:ev.target.name,contenuto: ev.target.value,priorità:props.priorità}),props.setImmagine(ev.target.value)}}
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
                            checked={(props.contenuto && props.contenuto==target.value)? true : false}
                            onChange={(ev) =>{props.handleBlocco({id:parseInt(ev.target.dataset.id),name:ev.target.name,contenuto: ev.target.value,priorità:props.priorità}),props.setImmagine(ev.target.value)}}

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
                            checked={(props.contenuto && props.contenuto==target.value)? true : false}
                            onChange={(ev) =>{props.handleBlocco({id:parseInt(ev.target.dataset.id),name:ev.target.name,contenuto: ev.target.value,priorità:props.priorità}),props.setImmagine(ev.target.value)}}

                        />
                        </div>
                        <div>
                        <Button variant="danger" onClick={()=>props.deleteField(props.id-1)} >
                        <i className='bi bi-trash' /></Button>
                        </div>
                        </div>
                    </Form.Group>
);
}

function TheForm(props){
    const navigate=useNavigate();
    const {pageId}=useParams();
    //console.log(pageId);
    //console.log(props.pageList);
    
    const objToEdit= 1 && props.pageList.find(e => e.id === parseInt(1));
   //console.log(objToEdit);
    console.log('objToEdit: '+JSON.stringify(objToEdit));
    const [datapubblicazione, setDatapubblicazione] = useState(objToEdit ? objToEdit.datapubblicazion?.format('YYYY-MM-DD') : '');  //string: dayjs object is created only on submit
    const [datacreazione,setDatacreazione]=useState(objToEdit ? objToEdit.datacreazione?.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'));
    const [titolo, setTitolo] = useState(objToEdit ? objToEdit.titolo : '');
    const [header, setHeader] = useState('');
    const [paragrafo, setParagrafo] = useState('');
    const [image, setImage] = useState('');
    const [blocchi,setBlocchi]=useState(objToEdit? objToEdit.blocchi :[]);
    const [autore, setAutore] = useState(objToEdit ? objToEdit.autore : props.user.id);
    //const [score, setScore] = useState(objToEdit ? objToEdit.score : 0); 
    const [errorMsg,setErrorMsg]=useState('');
   // const [idTemp,setIdTemp]=useState(1);
    const [formFields,setFormFields]=useState(objToEdit? setFieldstoEdit(objToEdit.blocchi) : [{tipo:"Header",priorità:0 ,key:0},{tipo:"Paragrafo",priorità:1,key:1},{tipo:"Immagini",priorità:2,key:2}]);
    const [fieldKey,setFieldKey]=useState(formFields?.length);
    const [firstInit,setFirstInit]=useState(true);

    /*useEffect(() => {
        if (formFields===[] && objToEdit && firstInit) {
            setFieldstoEdit(objToEdit.blocchi)
            console.log(formFields);
            setFirstInit(false)
        }
      },[formFields,objToEdit]);*/

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
       // if (datapubblicazione === '')
       // {
           // setErrorMsg('Data non valida');
        /*else if (isNaN(parseInt(score)))
            setErrorMsg('Score non valido');
        else if (parseInt(score)<0) {
            setErrorMsg('Score negativo non valido');*/
        //}
        if(titolo==='')
        {
            setErrorMsg("Devi inserire il titolo")
        }
        else if(formFields.length===0)
        {
            setErrorMsg('Devi inserire almeno un Header e un paragrafo o un immagine');

        }
        else if(formFields.length===1)
        {
            if(formFields[0].tipo==="Header")
            {
                setErrorMsg("Devi inserire almeno un Paragrafo o un Immagine")
            }
            else if(formFields[0].tipo==="Paragrafo" || formFields[0].tipo==="Immagine")
            {
                setErrorMsg("Devi inserire almeno un Header")
            }
        }
        //else if(header)
        //controllare se c'è del testo negli header e nei parafrafi e se l'immagine e selezionata
        else if(blocchi.length===0)
        {
            setErrorMsg("Devi riempire il contenuto di ogni campo");
        }
       /* else if (blocchi.length>0)
        {
           // console.log(blocchi);
        for(let el of blocchi)
        {
            console.log(el)
            if(el.contentuto===''){
                setErrorMsg("devi riempire tutti i campi che hai inserito e seleionare l'immagine se presente");
                
            }
        }
        }*/
        else if (header==='' && paragrafo==='' && image==='')
        {
            setErrorMsg('devi rimepire tutti i campi header, paragrafo e immagine')
        }
        else if (header==='' && paragrafo==='')
        {
            setErrorMsg('devi rimepire tutti i campi header e i campi paragrafo')
        }
        else if (header==='' && image==='')
        {
            setErrorMsg('devi rimepire tutti i campi header e i campi immagine')
        }
        else if (paragrafo==='' && image==='')
        {
            setErrorMsg('devi rimepire tutti i campi paragrafo e i campi immagine')
        }
        else if (header==='')
        {
            setErrorMsg("devi riempire tutti i campi header");
        }
        else if (paragrafo==='')
        {
            setErrorMsg("devi rimepire tutti i campi paragrafo");
        }
        else if(image==='')
        {
            setErrorMsg("devi riempire tutti i campi immagine");
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
           // console.log(e);

          /*  if (objToEdit) {  // decide if this is an edit or an add
                e.id = objToEdit.id;
                props.editAnswer(e);
            } else {
                props.addAnswer(e);
            }*/
           navigate('/');
        }
    }

    function displayEl(el)
    {
       // console.log(formFields);
     //   for(let el of formFields){
            if (el.tipo=="Header")
            return(
                <TheHeader contenuto={el.contenuto? el.contenuto: '' } deleteField={deleteField} formFields={formFields}  key={el.key} idmove={el.key} id={el.key+1} header={header} handleBlocco={handleBlocco} setHeader={setHeader} moveUp={HandleMoveUp} moveDown={HandleMoveDown} priorità={el.priorità}/>
                

            );
            else if (el.tipo=="Paragrafo")
            return(
                <Paragrafo contenuto={el.contenuto? el.contenuto: '' } deleteField={deleteField} formFields={formFields} key={el.key} idmove={el.key} id={el.key+1} paragrafo={paragrafo} handleBlocco={handleBlocco} setParagrafo={setParagrafo} moveUp={HandleMoveUp} moveDown={HandleMoveDown} priorità={el.priorità}/> 

            );
            else if (el.tipo=="Immagini")
            return(
                <Immagini contenuto={el.contenuto? el.contenuto: '' } deleteField={deleteField} formFields={formFields} key={el.key} idmove={el.key} id={el.key+1} handleBlocco={handleBlocco}  setImmagine={setImage} moveUp={HandleMoveUp} moveDown={HandleMoveDown} priorità={el.priorità}/>

            );
       // }
    
    }

    function HandleMoveUp(props){
        if (props.priorità > 0) {
            const newformFields = [...formFields];


            let el = newformFields.find(field => field.key == props.idmove);
            //console.log(el);

            if (el) {
                let index = newformFields.indexOf(el)
               
                newformFields[index].priorità = newformFields[index].priorità-1;
                //if(index>0)
                newformFields[index-1].priorità = newformFields[index].priorità+1;
                
                //console.log(blocchi);

            }
            let sortedFields = newformFields.sort((f1, f2) => (f1.priorità > f2.priorità) ? 1 : (f1.priorità < f2.priorità) ? -1 : 0);
            setFormFields(sortedFields);
            console.log(formFields);
          }

    }

    function HandleMoveDown(props){
        if (props.priorità < formFields.length) {
            const newformFields = [...formFields];


            let el = newformFields.find(field => field.key == props.idmove);
            //console.log(el);

            if (el) {
                let index = newformFields.indexOf(el)
               
                newformFields[index].priorità = newformFields[index].priorità+1;
                //if(index<newformFields.length)
                newformFields[index+1].priorità = newformFields[index].priorità-1;
                
                //console.log(blocchi);

            }
            let sortedFields = newformFields.sort((f1, f2) => (f1.priorità > f2.priorità) ? 1 : (f1.priorità < f2.priorità) ? -1 : 0);
            setFormFields(sortedFields);
            console.log(formFields);
          }

    }

   function addField(n){
    let newField={};
    let newFields=[...formFields];
    let lastpriorità=newFields.length
    let key=newFields.length+1

    switch (n){
        case 1:
            newField={tipo:"Header",priorità: lastpriorità ,key:key};
            newFields.push(newField);
            setFormFields(newFields);
            setHeader('')
            break;
        case 2:
            newField={tipo:"Paragrafo",priorità: lastpriorità ,key:key};
            newFields.push(newField);
            setFormFields(newFields);
            setParagrafo('')
            break;
        case 3:
            newField={tipo:"Immagini",priorità: lastpriorità ,key:key};
            newFields.push(newField);
            setFormFields(newFields);
            setImage('')
            break;
    default:
        break;
    }

   }
   
   function deleteField(id)
   {
    //console.log(id)
    let newFields=[...formFields];
   // for(let field of newFields ){
    for( let i = 0; i < newFields.length; i++){
        if(newFields[i].key==id)
        {  
            
            newFields.splice(i, 1);
            for (let j = 0; j < newFields.length; j++) {
                newFields[j].key = j;
                
              }
            if(newFields.length>1)
            {
            if (newFields[newFields.length-1].priorità==newFields.length){
                newFields[newFields.length-1].priorità=newFields[newFields.length-1].priorità-1;
            }
        }
            setFormFields(newFields);
            //console.log(formFields);
            break;
            
        }
    }

  
   }


   function setFieldstoEdit(blocchi){
    const fieldsToEdit=[];
    for(let el of blocchi)
    {
        if(el.idblocco==1)
        {
        let newField={tipo:"Header",priorità: el.priorità ,key:el.Dbid,contenuto:el.contenuto};
        fieldsToEdit.push(newField);
        }
        if(el.idblocco==2)
        {
        let newField={tipo:"Paragrafo",priorità: el.priorità ,key:el.Dbid,contenuto:el.contenuto};
        fieldsToEdit.push(newField);
        }
        if(el.idblocco==3)
        {
        let newField={tipo:"Immagini",priorità: el.priorità ,key:el.Dbid,contenuto:el.contenuto};
        fieldsToEdit.push(newField);
        }
    }
    setFormFields(fieldsToEdit);
   /* let newField={tipo:"Header",priorità: lastpriorità ,key:key};
    newFields.push(newField);*/

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
                    <Form.Group className='mb-3'>    
                    
                        <Button className='mx-2' variant='warning' onClick={() => addField(1)}    //chiamare handleblocco quando si aggiunge il blocco, capire come pssare il temp id
                        >Aggiungi Header</Button>

                        <Button className='mx-2' variant='success' onClick={() => addField(2)}
                         >Aggiungi Paragrafo</Button>

                        <Button className='mx-2' variant='info' onClick={() => addField(3)}
                        >Aggiungi Immagine</Button>

                    </Form.Group>
                    
                    
                    
                    <Button type='submit' variant="primary">{objToEdit? 'Salva Modifiche' : 'Aggiungi Pagina'}</Button> 
                    {/* alternative
                    <Button className='mx-2' variant='danger' onClick={()=>navigate('/')}>Cancel</Button> */}
                    <Link to='/'>
                        <Button className='mx-2' variant='danger'>Annulla</Button>
                    </Link>
                </Form>
            </>
        );


    }






export default PageForm;