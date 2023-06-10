import 'bootstrap-icons/font/bootstrap-icons.css';
import { Row, Col, Button, Table } from 'react-bootstrap';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


function PageDescription(props) {
    return (
        <Row>
            <Col xs={9}>
                <p className='fs-4'>Title: {props.page[0].titolo}</p>
            </Col>
            <Col xs={3}>
                <p className='fs-5'>by: <span className="badge text-bg-secondary text-end">{props.page[0].nomeautore}</span></p>
            </Col>
        </Row>
    );
}

function PageRow(props) {
    const navigate = useNavigate();
    const { e } = props;
    return (
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
    );
}



export { PageDescription, PageRow };