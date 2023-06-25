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
   
    function handleSubmit(event) {
        event.preventDefault();
       
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
           

           navigate('/');
        }
    }



    return(
        <>
            <NavHeader   appStatus1={props.appStatus} setAppStatus1={props.setAppStatus} loading={props.initialLoading} titolo={props.titolo} user={props.user} logout={props.logout}/>
            <Container fluid>
            {errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
                <Form onSubmit={handleSubmit}>

                    <Form.Group className='mb-3'>                            
                                <Form.Label>Titolo</Form.Label>
                                <Form.Control type="text" name="titolo" value={titolo} onChange={ev => setTitolo(ev.target.value)} />
                    </Form.Group>
                   
                   
                    <Button type='submit' variant="primary">{objToEdit? 'Salva Modifiche' : 'Aggiungi Titolo'}</Button> 
                    
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
            <NavHeader appStatus1={props.appStatus} setAppStatus1={props.setAppStatus} loading={props.initialLoading} titolo={props.titolo} user={props.user} logout={props.logout}/>
            <Container fluid>
            <TheForm autori={props.autori? props.autori : ''} handleError={props.handleError} pageList={props.pageList} user={props.user} addPage={props.addPage} editPage={props.editPage}/>

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
                <Button variant="danger" onClick={()=>props.deleteField(props.id, props.Dbid)} >
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
                    disabled={props.priorità === props.formFields.length-1}
                >
                    &#8595;
                </Button>
            </div>
            <div className="flex-grow-1">
                <Form.Label>Paragrafo</Form.Label>
                <Form.Control type="text" name="paragrafo" id={props.id} value={props.contenuto? props.contenuto : ''} onChange={ev => { props.handleBlocco({ id: parseInt(ev.target.id) || 0, name: ev.target.name, contenuto: ev.target.value, priorità: props.priorità })}} as="textarea" rows={3} />
            </div>
            <div>
                <Button variant="danger" onClick={()=> props.deleteField(props.id, props.Dbid)}>
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
                                    src="http://localhost:3001/images/alpi.jpg"
                                    rounded
                                />
                                <Figure.Caption>
                                    Le Alpi.
                                </Figure.Caption>
                            </Figure>}
                            //onChange={(ev) =>setImage({idblocco:3,contenuto: ev.target.value,priorità:3})}
                            value="http://localhost:3001/images/alpi.jpg"
                            //name="group1"
                            name="img"
                            type='radio'
                            id={props.id}
                            data-id={props.id}
                            checked={(props.contenuto && props.contenuto=="http://localhost:3001/images/alpi.jpg")? true : false}
                            onChange={(ev) =>{props.handleBlocco({id:parseInt(ev.target.dataset.id) || 0,name:ev.target.name,contenuto: ev.target.value,priorità:props.priorità})}}

                        />
                        <Form.Check
                            label={<Figure>
                                <Figure.Image
                                    width={171}
                                    height={180}
                                    alt="171x180"
                                    src="http://localhost:3001/images/piazzasancarlo.jpg"
                                    rounded
                                />
                                <Figure.Caption>
                                    Il gran Baloon.
                                </Figure.Caption>
                            </Figure>}
                            //onChange={(ev) =>setImage({idblocco:3,contenuto: ev.target.value,priorità:3})}
                            value="http://localhost:3001/images/piazzasancarlo.jpg"
                            //name="group1"
                            type='radio'
                            name="img"
                            id={props.id}
                            data-id={props.id}
                            checked={(props.contenuto && props.contenuto=="http://localhost:3001/images/piazzasancarlo.jpg")? true : false}
                            onChange={(ev) =>{props.handleBlocco({id:parseInt(ev.target.dataset.id) || 0,name:ev.target.name,contenuto: ev.target.value,priorità:props.priorità})}}

                        />
                        </div>
                        <div>
                        <Button variant="danger" onClick={()=>props.deleteField(props.id, props.Dbid)} >
                        <i className='bi bi-trash' /></Button>
                        </div>
                        </div>
                    </Form.Group>
);
}

function TheForm(props){
    const navigate=useNavigate();
    const {PageId}=useParams();
    
    const objToEdit= PageId && props.pageList.find(e => e.id === parseInt(PageId));
  
    const [datapubblicazione, setDatapubblicazione] = useState(objToEdit ? objToEdit.datapubblicazione?.format('YYYY-MM-DD'): -1); 
    const [datacreazione,setDatacreazione]=useState(objToEdit ? objToEdit.datacreazione: dayjs().format('YYYY-MM-DD'));
    const [titolo, setTitolo] = useState(objToEdit ? objToEdit.titolo : '');
   
    const [blocchi,setBlocchi]=useState(objToEdit? objToEdit.blocchi :[]);
    const [autore, setAutore] = useState(objToEdit ? objToEdit.idautore : props.user.id);
   
    const [errorMsg,setErrorMsg]=useState('');
  
    
    const [blocksToDelete,setBlockToDelete]=useState([]);
    const [modAut,setModAut]=useState();
   

    useEffect(() => {
    {
    if(objToEdit)
    setFieldstoEdit(blocchi);
  
    }
    },[]);

    

    function handleBlocco(blocco){
        
        let arrayblocchi=[...blocchi]
        
        let newblocco={}
        let idblocco=0;
        switch(blocco.name)
        {
            case "header":
                idblocco=1;
               
                break;
            case "paragrafo":
                idblocco=2;
              
                break;
            case "img":
                idblocco=3;
             
                break;
            default:
                break;
        }

        
        let el= arrayblocchi.find(block=>block.key==blocco.id);
        
        //console.log(el);
        
        if(el)
        {
            let index=arrayblocchi.indexOf(el)
           
            arrayblocchi[index].contenuto=blocco.contenuto;
            setBlocchi(arrayblocchi);
            

        }
        else
        {
           
            newblocco={Tempid:blocco.id,idblocco:idblocco,contenuto: blocco.contenuto,priorità:blocco.priorità};
           
            arrayblocchi.push(newblocco);
            setBlocchi(arrayblocchi);
            
        }

          
        
        

    }
    

    function handleSubmit(event) {
        event.preventDefault();
       
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
            else if(blocchi[0].tipo==="Paragrafo" || blocchi[0].tipo==="Immagini" || blocchi[0].tipo==="Immagini")
            {
                setErrorMsg("Devi inserire almeno un Header")
            }
        }
      
        
        else {
            let campi=1;
            for(let  el of blocchi )
            {
                if(el.contenuto!="")
                {
                    campi=1;
                }
                else{
                    campi=0;
                    setErrorMsg("Devi riempire tuti i campi")
                    break;
                }

                
            }

            if(campi==1)
            {
            const e = {
                titolo: titolo,
                autore: modAut? modAut : autore,
                datacreazione: objToEdit? datacreazione: datacreazione,
                datapubblicazione: datapubblicazione=== -1 ? undefined : dayjs(datapubblicazione),
                blocchi:blocchi


            }


            if (objToEdit) {  
                e.id = objToEdit.id;
                props.editPage(e);
                for(let el of blocksToDelete )
                {
                API.deleteBlock(el)
                .then(() => {})
                .catch((err) => props.handleError(err));
                }
                console.log(e);
            } else {
                props.addPage(e);
                console.log(e);
            }

            
           navigate('/');
        }
        }


    }

    function displayEl(el)
    {
      
            
            if (el.tipo=="Header" || el.tipo=="header" )
            {
               

            return(
                <TheHeader Dbid={el.Dbid? el.Dbid : -1 } contenuto={el.contenuto? el.contenuto: '' } deleteField={deleteField} formFields={blocchi}  key={el.key} idmove={el.key} id={el.key}  handleBlocco={handleBlocco} moveUp={HandleMoveUp} moveDown={HandleMoveDown} priorità={el.priorità}/>
                

            );
            }
            else if (el.tipo=="Paragrafo" || el.tipo=="paragrafo")
            return(
                <Paragrafo  Dbid={el.Dbid? el.Dbid : -1 }  contenuto={el.contenuto? el.contenuto: '' } deleteField={deleteField} formFields={blocchi} key={el.key} idmove={el.key} id={el.key}  handleBlocco={handleBlocco} moveUp={HandleMoveUp} moveDown={HandleMoveDown} priorità={el.priorità}/> 

            );
            else if (el.tipo=="immagine" || el.tipo=="Immagini")
            return(
                <Immagini  Dbid={el.Dbid? el.Dbid : -1 }  contenuto={el.contenuto? el.contenuto: '' } deleteField={deleteField} formFields={blocchi} key={el.key} idmove={el.key} id={el.key} handleBlocco={handleBlocco}  moveUp={HandleMoveUp} moveDown={HandleMoveDown} priorità={el.priorità}/>

            );
            
            
       // }
    
    }

    function AutoriOptions(e)
    {
      
        return(
            objToEdit.idautore!=e.id?
            <option value={e.id} key={e.key}>{e.autore}</option>
            :
            false
        
        );

    }
    function HandleMoveUp(props){
        if (props.priorità > 0) {
         
           const newformFields = [...blocchi];

            let el = newformFields.find(field => field.key == props.idmove);
           
            if (el) {
                let index = newformFields.indexOf(el)
               
                newformFields[index].priorità= newformFields[index].priorità-1;
                //if(index>0)
                newformFields[index-1].priorità = newformFields[index].priorità+1;
                
               

            }
            let sortedFields = newformFields.sort((f1, f2) => (f1.priorità> f2.priorità) ? 1 : (f1.priorità < f2.priorità) ? -1 : 0);
           
            setBlocchi(sortedFields);
           
          }

    }

    function HandleMoveDown(props){
      
          if (props.priorità < blocchi.length) {
          
           const newformFields = [...blocchi];

            let el = newformFields.find(field => field.key == props.idmove);
           

            if (el) {
                let index = newformFields.indexOf(el)
               
                newformFields[index].priorità = newformFields[index].priorità+1;
                //if(index<newformFields.length)
                newformFields[index+1].priorità = newformFields[index].priorità-1;
                
              

            }
            let sortedFields = newformFields.sort((f1, f2) => (f1.priorità > f2.priorità) ? 1 : (f1.priorità < f2.priorità) ? -1 : 0);
           
            setBlocchi(sortedFields);
           
          }

    }

   function addField(n){
    let newField={};
   
    let newFields=[...blocchi];
   
    let keySorted = newFields!=[]?  newFields.sort((f1, f2) => (f1.key > f2.key) ? 1 : (f1.key < f2.key) ? -1 : 0) :[];
    let newKey= (newFields.length>0)? keySorted[keySorted.length-1].key+1 : 1;
    
    
    let lastpriorità=newFields.length
   

    switch (n){
        case 1:
            newField={tipo:"Header",priorità: lastpriorità ,key:newKey,contenuto:'',idblocco:1};
            newFields.push(newField);
            setBlocchi(newFields);
            break;
        case 2:
            newField={tipo:"Paragrafo",priorità: lastpriorità ,key:newKey,contenuto:'',idblocco:2};
            newFields.push(newField);
            setBlocchi(newFields);
            break;
        case 3:
            newField={tipo:"Immagini",priorità: lastpriorità ,key:newKey,contenuto:'',idblocco:3};
            newFields.push(newField);
            setBlocchi(newFields);
            break;
    default:
        break;
    }

   }
   
   function deleteField(id,Dbid)
   {
    let newFields=[...blocchi];
    if(id==newFields.length || id==newFields.length-1)
    {
        newFields.length=newFields.length-1
        setBlocchi(newFields);
        for (let j = 0; j < newFields.length; j++) {
            newFields[j].key = j;
            newFields[j].priorità = j;
            
          }
    }
    else
    {
    for( let i = 0; i < newFields.length; i++){
        if(newFields[i].key==id)
        {  
            
            newFields.splice(i, 1);
            for (let j = 0; j < newFields.length; j++) {
                newFields[j].key = j;
                newFields[j].priorità = j;
                
                
              }
          
            setBlocchi(newFields);
           
            break;
        }
                
        }
    }
    

    if(Dbid!='')
    {
       
       let newBlocks=[...blocksToDelete];
       newBlocks.push(Dbid);
       setBlockToDelete(newBlocks);
    }
  
   }

   function setFieldstoEdit(blocchi){
    const fieldsToEdit=[];
    let i=0;
    for(let el of blocchi)
    {
        if(el.idblocco==1)
        {
        let newField={Dbid:el.key, tipo:"Header",priorità: el.priorita ,key:i,contenuto:el.contenuto, idblocco:el.idblocco};
        fieldsToEdit.push(newField);
        }
        if(el.idblocco==2)
        {
        let newField={Dbid:el.key,tipo:"Paragrafo",priorità: el.priorita ,key:i,contenuto:el.contenuto,idblocco:el.idblocco};
        fieldsToEdit.push(newField);
        }
        if(el.idblocco==3)
        {
        let newField={Dbid:el.key,tipo:"Immagini",priorità: el.priorita ,key:i,contenuto:el.contenuto,idblocco:el.idblocco};
        fieldsToEdit.push(newField);
        }
        i++;
    }
    setBlocchi(fieldsToEdit);
}

        return(
            <>
                {errorMsg? <Alert variant='danger' onClose={()=>setErrorMsg('')} dismissible>{errorMsg}</Alert> : false }
                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'> 
                       
                    {
                        
                    props.user.admin == 1  && objToEdit? 
                    <>
                    <Form.Label>Modifica Autore</Form.Label> 
                    
                    <Form.Select aria-label="Default select example" onChange={ev => setModAut(ev.target.value)} >
                        <option value={objToEdit.idautore}>{objToEdit.nomeautore}</option>
                        {props.autori.map((e)=>AutoriOptions(e))}
                    </Form.Select > 
                    </>
                    : false
                    }
                    
                    </Form.Group>

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
                    
                    <Link to='/'>
                        <Button className='mx-2' variant='danger'>Annulla</Button>
                    </Link>
                </Form>
            </>
        );


    }






export {PageForm, TitleForm};