import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Button, Table, Accordion, Badge,OverlayTrigger,Tooltip} from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

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
    let now = dayjs()
    let status=0;
    if (isNaN(e.datapubblicazione.$D)){
     // console.log("No Date");

    }
    else  if(e.datapubblicazione>now)
     
      {
       
        status=1;
      }
    else if(e.datapubblicazione<now)
    {
   
      status=2;
    }

   
    
    
    return (
      (props.appStatus=="front" && status==2) || props.appStatus=="back"? 
        <Accordion.Item eventKey={e.id}>
            <Accordion.Header>
                <Row>
                    <Col md="auto">
                        <h5 className='fs-4'>{e.titolo}</h5>
                    </Col>
                    <Col md="auto">
                    <Badge bg="primary">Creato da:  {e.nomeautore}</Badge>
                    </Col>
                    {props.appStatus=="back"?
                    <Col md="auto">
                    {
                    status===1?
                    <Badge bg="info">Programmata</Badge>
                    : status==2?
                    <Badge bg="success">Pubblicata</Badge>
                    : 
                    <Badge bg="warning">Draft</Badge>

                    }
                    </Col>
                     : false}
                </Row>
                
                </Accordion.Header>
            <Accordion.Body>
                <Col xs={3}>
                <h6 className='fs-6'>Data Pubblicazione: {isNaN(e.datapubblicazione.$D)? "Data di pubblicazione non ancora scelta" :e.datapubblicazione.format("YYYY-MM-DD")}</h6>
                </Col>
                <Col xs={3}>
                <h6 className='fs-6'>Data Creazione: {e.datacreazione.format("YYYY-MM-DD")}</h6>
                </Col>
            
                {props.appStatus=="back"?
                <OverlayTrigger  placement="bottom" overlay={ 
                <Tooltip id="tooltip-enabled"> Edita la pagina</Tooltip>
               
                }>
                  <span className="d-inline-block">
                <Button variant='warning' disabled={ (props.user?.id && props.user?.name===e.nomeautore) || props.user?.admin===1? false : true} className='mx-2' 
                    onClick={()=>{navigate(`/edit/${e.id}`)}}><i className='bi bi-pencil-square' /></Button>
                    </span>
                </OverlayTrigger>
                :false
                }

                {props.appStatus=="back"?
                <OverlayTrigger  placement="bottom" overlay={
                <Tooltip id="tooltip-enabled"> Elimina la pagina</Tooltip>
                }>
                <span className="d-inline-block">
                <Button variant="danger"  disabled={ (props.user?.id && props.user?.name===e.nomeautore) || props.user?.admin===1? false : true} onClick={()=>props.deletePage(e.id)} >
                    <i className='bi bi-trash' /></Button>
                </span>
                </OverlayTrigger>
                :false
                }
           
            <Col>
                {blocchi.map((e) =>
                  <BodyAccordion e={e}  key={e.key}  />)
                }
            </Col>
            </Accordion.Body>
            
        </Accordion.Item>
        :false
    );
}

function MainPages(props) {
  
   
    const navigate = useNavigate();
  
    const [objToEdit, setObjToEdit] = useState(undefined);  // stato per salvare informazioni sull'oggetto da editare
  
    
  
    const sortedPages = [...props.pageList];  // copia shallow
    sortedPages.sort((a,b)=>(a.datapubblicazione!=null && b.datapubblicazione!=null)? a.datapubblicazione.isAfter(b.datapubblicazione) ? 1 : -1 : -1)
   
    return (
      <>
        <Row>
            <Col>
                <p className='fs-4 text-center fw-bold'>{ props.appStatus=="front"? "Front Office: Pagine Pubblicate" : "Back Office: Tutte le pagine" }</p>
            </Col>
        </Row>
        <Row>
            <Col>
                <Accordion>
                {sortedPages.map((e) =>
                  <PageRow appStatus={props.appStatus} setAppStatus={props.setAppStatus} e={e}  key={e.id} user={props.user} editPage={() =>setObjToEdit(e)}  deletePage={props.deletePage}  />)
                }
                </Accordion>
            </Col>
        </Row>
        
        {props.appStatus=="back"?
         <OverlayTrigger  placement="bottom" overlay={ 
          <Tooltip id="tooltip-enabled"> Aggiungi una nuova pagina</Tooltip>
        
          }
          > 
          <span className="d-inline-block">
          <Button className="btn btn-dark btn-lg fixed-right-bottom" onClick={()=>navigate('/add')}  > &#43; </Button>
          </span>
        </OverlayTrigger>
        :false
        }
        
        
      </>
    )
  }


export { PageDescription, PageRow,MainPages };

