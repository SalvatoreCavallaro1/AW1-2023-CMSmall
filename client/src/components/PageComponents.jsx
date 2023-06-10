import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Button, Table, Accordion, Badge } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


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

function PageRow(props) {
    const navigate = useNavigate();
    const { e } = props;
    let blocchi=e.blocchi;
    console.log(blocchi);
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

            <tr>
            <td>{e.datapubblicazione.format("YYYY-MM-DD")}</td>
            <td><Button variant="primary"><i className='bi bi-arrow-up-circle' /></Button>
                <Button variant='secondary' className='mx-2' 
                    ><i className='bi bi-pencil-square' /></Button>
                <Button variant="danger"  >
                    <i className='bi bi-trash' /></Button></td>
            </tr>
            </Accordion.Body>
            
        </Accordion.Item>
    );
}

function MainPages(props) {
  
    const navigate = useNavigate();
  
    const [objToEdit, setObjToEdit] = useState(undefined);  // state to keep the info about the object to edit
  
    const [sortOrder, setSortOrder] = useState('none');  // local state for visualization only, does not need to change the list in App
  
    const sortedPages = [...props.pageList];  // make a shallow copy
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
    return (
      <>
        <Row>
            <Col>
                <p className='fw-bold'>Pagine Pubblicate: {props.pageList.length}</p>
            </Col>
        </Row>
        <Row>
            <Col>
                <Accordion>
                {sortedPages.map((e) =>
                  <PageRow e={e}  key={e.id}  />)
                }
                </Accordion>
            </Col>
        </Row>
        
      </>
    )
  }

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