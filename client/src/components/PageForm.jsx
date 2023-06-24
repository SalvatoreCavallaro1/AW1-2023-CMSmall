import 'bootstrap/dist/css/bootstrap.min.css';
import API from '../API';
import dayjs from 'dayjs';
import NavHeader from './NavbarComponents';
import { Container,Form,Button,Alert,Col,Image,Figure, FormSelect,Spinner } from 'react-bootstrap';
import { useNavigate, useParams,Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


function TitleForm(props)
{
    const {IdTitolo}=useParams();
    const objToEdit= (props.titolo.id=== parseInt(IdTitolo))? props.titolo :'';
    const [errorMsg,setErrorMsg]=useState('');
    const [titolo,setTitolo]=useState(objToEdit? objToEdit.titolo : '');
    const navigate=useNavigate();
    
   /* console.log("titolo:",titolo);
    console.log("IdTitolo:",IdTitolo);
    console.log("objToedit", objToEdit);*/
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
        
        
        else {
            const e = {
                id: IdTitolo,
                titolo: titolo,
                
            }
            props.editTitle(e);
           // console.log(e);

           navigate('/');
        }
    }



    return(
        <>
            <NavHeader  loading={props.initialLoading} titolo={props.titolo} user={props.user} logout={props.logout}/>
            <Container fluid>
            {errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
                <Form onSubmit={handleSubmit}>

                    <Form.Group className='mb-3'>                            
                                <Form.Label>Titolo</Form.Label>
                                <Form.Control type="text" name="titolo" value={titolo} onChange={ev => setTitolo(ev.target.value)} />
                    </Form.Group>
                   
                   
                    <Button type='submit' variant="primary">{objToEdit? 'Salva Modifiche' : 'Aggiungi Titolo'}</Button> 
                    {/* alternative
                    <Button className='mx-2' variant='danger' onClick={()=>navigate('/')}>Cancel</Button> */}
                    <Link to='/'>
                        <Button className='mx-2' variant='danger'>Annulla</Button>
                    </Link>
                </Form>

            

            </Container>
        </>
    );
}



function PageForm(props){

    return(
        <>
            <NavHeader loading={props.initialLoading} titolo={props.titolo} user={props.user} logout={props.logout}/>
            <Container fluid>
            <TheForm pageList={props.pageList} user={props.user} addPage={props.addPage} editPage={props.editPage}/>

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
                <Form.Control type="text" name="header" id={props.id} value={props.contenuto? props.contenuto : ''} onChange={ev => { props.handleBlocco({ id: parseInt(ev.target.id) || 0, name: ev.target.name, contenuto: ev.target.value, priorità: props.priorità })}} as="textarea" rows={3} />

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
                <Form.Control type="text" name="paragrafo" id={props.id} value={props.contenuto? props.contenuto : ''} onChange={ev => { props.handleBlocco({ id: parseInt(ev.target.id) || 0, name: ev.target.name, contenuto: ev.target.value, priorità: props.priorità })}} as="textarea" rows={3} />
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
                            checked={(props.contenuto && props.contenuto=="http://localhost:3001/images/baloon.jpg")? true : false}
                            onChange={(ev) =>{props.handleBlocco({id:parseInt(ev.target.dataset.id) || 0,name:ev.target.name,contenuto: ev.target.value,priorità:props.priorità})}}
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
                            checked={(props.contenuto && props.contenuto=="http://localhost:3001/images/torino1.jpeg")? true : false}
                            onChange={(ev) =>{props.handleBlocco({id:parseInt(ev.target.dataset.id) || 0,name:ev.target.name,contenuto: ev.target.value,priorità:props.priorità})}}
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
                            checked={(props.contenuto && props.contenuto=="http://localhost:3001/images/baloon.jpg")? true : false}
                            onChange={(ev) =>{props.handleBlocco({id:parseInt(ev.target.dataset.id) || 0,name:ev.target.name,contenuto: ev.target.value,priorità:props.priorità})}}

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
                            checked={(props.contenuto && props.contenuto=="http://localhost:3001/images/baloon.jpg")? true : false}
                            onChange={(ev) =>{props.handleBlocco({id:parseInt(ev.target.dataset.id) || 0,name:ev.target.name,contenuto: ev.target.value,priorità:props.priorità})}}

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
    const {PageId}=useParams();
    //console.log("PageId:",PageId);
    //console.log(props.pageList);
    
    const objToEdit= PageId && props.pageList.find(e => e.id === parseInt(PageId));
   //console.log(objToEdit);
    //console.log('objToEdit: '+JSON.stringify(objToEdit));
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
    const [formFields,setFormFields]=useState(objToEdit? [] : []);
    const [fieldKey,setFieldKey]=useState(formFields?.length);
    const [firstInit,setFirstInit]=useState(true);
    const [nDisplay,setnDisplay]=useState(0)
    const [valorProps,setValOrProps]=useState(true);
//{tipo:"Header",priorità:0 ,key:0,contenuto:''},{tipo:"Paragrafo",priorità:1,key:1},{tipo:"Immagini",priorità:2,key:2,contenuto:''}

    useEffect(() => {
    {
    if(objToEdit)
    setFieldstoEdit(blocchi);
    //setFirstInit(false);
    }
    },[]);

    /*useEffect(() => {
        if (formFields===[] && objToEdit && firstInit) {
            setFieldstoEdit(blocchi)
    }
            console.log(formFields);
            setFirstInit(false)
      },[formFields,objToEdit,blocchi]);*/
      /*useEffect(() => {
        
            if(objToEdit)
            {
            setFormFields(formFields=>{
               return[blocchi,...formFields]
            })   
            }
            console.log(formFields);
        
      },[]);*/

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

        console.log(blocco)
        let el= arrayblocchi.find(block=>block.key==blocco.id);
        
        console.log(el);
        
        if(el)
        {
            let index=arrayblocchi.indexOf(el)
            //console.log(index);
           // console.log("si"); ///?????
          // el.contenuto=blocco.contenuto;
            arrayblocchi[index].contenuto=blocco.contenuto;
            setBlocchi(arrayblocchi);
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
        else if(blocchi.length===0)
        {
            setErrorMsg('Devi inserire almeno un Header e un paragrafo o un immagine');

        }
        else if(blocchi.length===1)
        {
            if(blocchi[0].tipo==="Header")
            {
                setErrorMsg("Devi inserire almeno un Paragrafo o un Immagine")
            }
            else if(blocchi[0].tipo==="Paragrafo" || blocchi[0].tipo==="Immagine")
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



        ///VALIDAZIONE CAMPI VUOTI 
        /*
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
        }*/
        
        
        
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
          /* if(nDisplay<formFields.length)
            {
               
                setnDisplay(nDisplay+1);
                console.log(nDisplay);
               if(nDisplay==formFields.length)
                {
                    setValOrProps(false);
                }


            }*/
            
            if (el.tipo=="Header" || el.tipo=="header" )
            {
               

            return(
                <TheHeader   contenuto={el.contenuto? el.contenuto: '' } deleteField={deleteField} formFields={blocchi}  key={el.key} idmove={el.key} id={el.key}  handleBlocco={handleBlocco} moveUp={HandleMoveUp} moveDown={HandleMoveDown} priorità={el.priorità}/>
                

            );
            }
            else if (el.tipo=="Paragrafo" || el.tipo=="paragrafo")
            return(
                <Paragrafo  contenuto={el.contenuto? el.contenuto: '' } deleteField={deleteField} formFields={blocchi} key={el.key} idmove={el.key} id={el.key}  handleBlocco={handleBlocco} moveUp={HandleMoveUp} moveDown={HandleMoveDown} priorità={el.priorità}/> 

            );
            else if (el.tipo=="immagine" || el.tipo=="Immagini")
            return(
                <Immagini  contenuto={el.contenuto? el.contenuto: '' } deleteField={deleteField} formFields={blocchi} key={el.key} idmove={el.key} id={el.key} handleBlocco={handleBlocco}  moveUp={HandleMoveUp} moveDown={HandleMoveDown} priorità={el.priorità}/>

            );
            
            
       // }
    
    }

    function HandleMoveUp(props){
        if (props.priorità > 0) {
           // const newformFields = [...formFields];
           const newformFields = [...blocchi];

            let el = newformFields.find(field => field.key == props.idmove);
            console.log(el);

            if (el) {
                let index = newformFields.indexOf(el)
               
                newformFields[index].priorità= newformFields[index].priorità-1;
                //if(index>0)
                newformFields[index-1].priorità = newformFields[index].priorità+1;
                
                //console.log(blocchi);

            }
            let sortedFields = newformFields.sort((f1, f2) => (f1.priorità> f2.priorità) ? 1 : (f1.priorità < f2.priorità) ? -1 : 0);
            //setFormFields(sortedFields);
            setBlocchi(sortedFields);
            console.log(blocchi);
          }

    }

    function HandleMoveDown(props){
       // if (props.priorità < formFields.length) {
          if (props.priorità < blocchi.length) {
           // const newformFields = [...formFields];
           const newformFields = [...blocchi];

            let el = newformFields.find(field => field.key == props.idmove);
            console.log(el);

            if (el) {
                let index = newformFields.indexOf(el)
               
                newformFields[index].priorità = newformFields[index].priorità+1;
                //if(index<newformFields.length)
                newformFields[index+1].priorità = newformFields[index].priorità-1;
                
                //console.log(blocchi);

            }
            let sortedFields = newformFields.sort((f1, f2) => (f1.priorità > f2.priorità) ? 1 : (f1.priorità < f2.priorità) ? -1 : 0);
            //setFormFields(sortedFields);
            setBlocchi(sortedFields);
            console.log(blocchi);
          }

    }

   function addField(n){
    let newField={};
    //let newFields=[...formFields];
    let newFields=[...blocchi];
    //let keySorted=[...blocchi];
    let keySorted = newFields!=[]?  newFields.sort((f1, f2) => (f1.key > f2.key) ? 1 : (f1.key < f2.key) ? -1 : 0) :[];
    let newKey= (newFields.length>0)? keySorted[keySorted.length-1].key+1 : 1;
    
    /*if(blocchi && objToEdit)
    {
        //let newKeySort=1
        let keySorted = newFields.sort((f1, f2) => (f1.key > f2.key) ? 1 : (f1.key < f2.key) ? -1 : 0);
        let newKeySort=keySorted[keySorted.length-1].key+1;
    }*/
    
    let lastpriorità=newFields.length
    //let key=newFields.length+1

    switch (n){
        case 1:
            newField={tipo:"Header",priorità: lastpriorità ,key:newKey,contenuto:'',idblocco:1};
            newFields.push(newField);
            setBlocchi(newFields);
            //setHeader('')
            break;
        case 2:
            newField={tipo:"Paragrafo",priorità: lastpriorità ,key:newKey,contenuto:'',idblocco:2};
            newFields.push(newField);
            //setFormFields(newFields);
            setBlocchi(newFields);
            //setParagrafo('')
            break;
        case 3:
            newField={tipo:"Immagini",priorità: lastpriorità ,key:newKey,contenuto:'',idblocco:3};
            newFields.push(newField);
            setBlocchi(newFields);
            //setImage('')
            break;
    default:
        break;
    }

   }
   
   function deleteField(id)
   {
    //console.log(id)
    //let newFields=[...formFields];
    let newFields=[...blocchi];
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
            setBlocchi(newFields);
            //console.log(formFields);
            break;
            
        }
    }

  
   }


   function setFieldstoEdit(blocchi){
    const fieldsToEdit=[];
    let i=0;
    for(let el of blocchi)
    {
        //console.log(el);
        if(el.idblocco==1)
        {
        let newField={tipo:"Header",priorità: el.priorita ,key:i,contenuto:el.contenuto};
        fieldsToEdit.push(newField);
        }
        if(el.idblocco==2)
        {
        let newField={tipo:"Paragrafo",priorità: el.priorita ,key:i,contenuto:el.contenuto};
        fieldsToEdit.push(newField);
        }
        if(el.idblocco==3)
        {
        let newField={tipo:"Immagini",priorità: el.priorita ,key:i,contenuto:el.contenuto};
        fieldsToEdit.push(newField);
        }
        i++;
    }
    /*setFormFields(formFields=>{
        return[fieldsToEdit,...formFields]
     
 })*/
    //setFormFields(fieldsToEdit);
    setBlocchi(fieldsToEdit);
    //setFormFields(fieldsToEdit);
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
                   
                   blocchi.map((e)=>displayEl(e))
                   
                    
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






export {PageForm, TitleForm};