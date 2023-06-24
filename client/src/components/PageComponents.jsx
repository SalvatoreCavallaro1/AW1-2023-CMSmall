import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Button, Table, Accordion, Badge,OverlayTrigger,Tooltip} from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//
function PageDescription(props) {
    return (
        <Row>
            <Col xs={9}>
                <p className='fs-4'>Title: {props.pages[0].titolo}</p>
            </Col>
            <Col xs={3}>
                <p className='fs-5'>by: <span className="badge text-bg-secondary text-end">{props.pages[0].nomeautore}</span></p>
            </Col>
        </Row>
    );
}

function BodyAccordion(props)
{
   
    if (props.e.tipo==="header")
    {
        
        return(  
            <h2>{props.e.contenuto}</h2>
        )
    }
    else if (props.e.tipo==="paragrafo")
    {
        return(
            <p>{props.e.contenuto}</p>
        )
    }
    else if (props.e.tipo=="immagine")
    {
      return(
        <img src={props.e.contenuto}/>
      )
    }

}

function PageRow(props) {
    const navigate = useNavigate();
    const { e } = props;
    const blocchi=[...e.blocchi];
    blocchi.sort((a,b) => a.priorita - b.priorita);
    //console.log(blocchi);
    
    return (
        <Accordion.Item eventKey={e.id}>
            <Accordion.Header>
                <Row>
                    <Col xs={9}>
                        <h5 className='fs-4'>{e.titolo}</h5>
                    </Col>
                    <Col xs={3}>
                    <Badge bg="primary">Creato da:  {e.nomeautore}</Badge>
                    </Col>
                </Row>
                
                </Accordion.Header>
            <Accordion.Body>
                <Col xs={3}>
                <h6 className='fs-6'>Data Pubblicazione: {e.datapubblicazione.format("YYYY-MM-DD")}</h6>
                </Col>
            
                <OverlayTrigger  placement="bottom" overlay={(props.user?.id  && props.user?.name===e.nomeautore)?  
                <Tooltip id="tooltip-enabled"> Edita la pagina</Tooltip>
                : (props.user?.id  && props.user?.name!==e.nomeautore)?
                <Tooltip id="tooltip-disabled"> La pagina non è di tua proprietà non puoi editarla</Tooltip>
                :
                <Tooltip id="tooltip-disabled"> Effettua il login per editare la pagina</Tooltip>
                }>
                  <span className="d-inline-block">
                <Button variant='warning' disabled={ (props.user?.id && props.user?.name===e.nomeautore) || props.user?.admin===1? false : true} className='mx-2' 
                    onClick={()=>{navigate(`/edit/${e.id}`)}}><i className='bi bi-pencil-square' /></Button>
                    </span>
                </OverlayTrigger>

                <OverlayTrigger  placement="bottom" overlay={(props.user?.id  && props.user?.name===e.nomeautore)?
                <Tooltip id="tooltip-enabled"> Elimina la pagina</Tooltip>
                : (props.user?.id  && props.user?.name!==e.nomeautore)?
                <Tooltip id="tooltip-disabled"> La pagina non è di tua proprietà non puoi eliminarla</Tooltip>
                :
                <Tooltip id="tooltip-disabled"> Efettua il login per eliminare la pagina</Tooltip>
                }>
                <span className="d-inline-block">
                <Button variant="danger" disabled={(props.user?.id && props.user?.name===e.nomeautore) || props.user?.admin===1 ? false : true} >
                    <i className='bi bi-trash' /></Button>
                </span>
                </OverlayTrigger>
           
            <Col>
                {blocchi.map((e) =>
                  <BodyAccordion e={e}  key={e.key}  />)
                }
            </Col>
            </Accordion.Body>
            
        </Accordion.Item>
    );
}

function MainPages(props) {
  
    //const user=props.user;
    const navigate = useNavigate();
  
    const [objToEdit, setObjToEdit] = useState(undefined);  // state to keep the info about the object to edit
  
    const [sortOrder, setSortOrder] = useState('none');  // local state for visualization only, does not need to change the list in App
  
    const sortedPages = [...props.pageList];  // make a shallow copy
    sortedPages.sort((a,b)=>(a.datapubblicazione!=undefined && b.datapubblicazione!=undefined)? a.datapubblicazione.isAfter(b.datapubblicazione) ? 1 : -1 : -1)
    // sort order is recomputed at each re-render: do NOT make a state with the sorted list!
  //  if (sortOrder === 'asc')
     //   sortedPagess.sort((a,b) => a.score - b.score);
   // else if (sortOrder === 'desc')
    //    sortedPagess.sort((a,b) => b.score - a.score);
    
   // const sortByScore = () => {
    //  setSortOrder( (oldSortOrder) => oldSortOrder === 'asc' ? 'desc' : 'asc' );
   // }

   /*<th>Score
                    <i className={'mx-1 '+(sortOrder ==='asc' ? 'bi bi-sort-numeric-up' : 'bi bi-sort-numeric-down')} onClick={sortByScore} style={{color: 'black'}}/>
                  </th> */
  /*   <PageRow e={e} userId={props.user && props.user.id} key={e.id} increaseScore={() => props.increaseScore(e.id)}
                    editAnswer={() => { setObjToEdit(e); setShowForm(true); }}
                    deleteAnswer={() => props.deleteAnswer(e.id)} />) */

                    // {props.pageList.length}
    return (
      <>
        <Row>
            <Col>
                <p className='fs-4 text-center fw-bold'>Pagine Pubbliche</p>
            </Col>
        </Row>
        <Row>
            <Col>
                <Accordion>
                {sortedPages.map((e) =>
                  <PageRow e={e}  key={e.id} user={props.user} editPage={() =>setObjToEdit(e)}   />)
                }
                </Accordion>
            </Col>
        </Row>
        
         <OverlayTrigger  placement="bottom" overlay={props.user?.id?  
          <Tooltip id="tooltip-enabled"> Aggiungi una nuova pagina</Tooltip>
          :
          <Tooltip id="tooltip-disabled"> Effettua il login per creare una pagina</Tooltip>
          }
          > 
          <span className="d-inline-block">
          <Button className="btn btn-dark btn-lg fixed-right-bottom" onClick={()=>navigate('/add')} disabled={props.user?.id? false : true} > &#43; </Button>
          </span>
        </OverlayTrigger>
        
        
      </>
    )
  }
//<Link className="btn btn-primary btn-lg fixed-right-bottom" to="/add" state={{nextpage: location.pathname}}> &#43; </Link>
//<Button variant='success' onClick={()=>navigate('/add')} disabled={props.user?.id? false : true}>Add answer</Button>

export { PageDescription, PageRow,MainPages };


/*

//Main
<Row>
          <Col>
            <p className='fw-bold'>Pagine Pubblicate: {props.pageList.length}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table hover>
              {}
              <thead>
                <tr>
                  <th>Data Pubblicazione</th>
                  <th>Titolo</th>
                  <th>Autore</th>
                  
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {sortedPages.map((e) =>
                  <PageRow e={e}  key={e.id}  />)
                }
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Col>          
            
          </Col>
        </Row>


//Row
<tr>
            <td>{e.datapubblicazione.format("YYYY-MM-DD")}</td>
            <td>{e.titolo}</td>
            <td>{e.nomeautore}</td>
            <td><Button variant="primary"><i className='bi bi-arrow-up-circle' /></Button>
                <Button variant='secondary' className='mx-2' 
                    ><i className='bi bi-pencil-square' /></Button>
                <Button variant="danger"  >
                    <i className='bi bi-trash' /></Button></td>
        </tr>

        */


        /*<h4 className="text-start">{e.titolo}</h4> 
                
                <h6 className="text-end">Autore: {e.nomeautore}</h6>*/ 



/*
{blocchi.map((e) =>{
                    switch(e.tipo){
                        case 'header':
                            <h1>{e.contenuto}</h1>
                            console.log(e.contenuto);
                            break;
                        case 'paragrafo':
                            <p>{e.contenuto}</p>
                            console.log(e.contenuto);
                            break;
                        default:
                            break;
                    }
                })
                }
*/