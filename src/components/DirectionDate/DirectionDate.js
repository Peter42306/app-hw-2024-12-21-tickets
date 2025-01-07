import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

class DirectionDate extends Component {  

  handleDirectionChange = (event) => {    
    this.props.onDirectionChange(event.target.value);    
  };

  handleDateChange = (event) => {    
    this.props.onDateChange(event.target.value);    
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSearthTickets();
  };

  render(){
    const { listDirectionsAndPrices, selectedDirection, selectedDate } = this.props;    
    

    return(
      
        <Container className='w-100 mt-3'>
          <p>Component DerectionDate</p>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col xs={3} lg={1} className='mt-1'>
              <Form.Label>Direction</Form.Label>
            </Col>
            <Col xs={9} lg={4} className='mt-1'>
              <Form.Select value={selectedDirection} onChange={this.handleDirectionChange}>
                <option value="">Select direction</option>
                {listDirectionsAndPrices.map((ticket) =>(
                  <option key={ticket.direction} value={ticket.direction}>{ticket.direction}</option>
                ))}
              </Form.Select>
            </Col>
            <Col xs={3} lg={1} className='mt-1'>
              <Form.Label>Date</Form.Label>
            </Col>
            <Col xs={9} lg={4} className='mt-1'>
              <Form.Control 
                type='date'
                value={selectedDate}
                onChange={this.handleDateChange}
              ></Form.Control>
            </Col>
            <Col xs={12} lg={2} className='mt-1'>
              <Button type='submit' className='w-100'>Seach</Button>
            </Col>
          </Row>
        </Form>
        <hr></hr>
        </Container>
        
      
        
      
    )
  }
}


DirectionDate.propTypes = {
  selectedDirection: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  listDirectionsAndPrices: PropTypes.array.isRequired,
  onDirectionChange: PropTypes.func.isRequired,
  onDateChange: PropTypes.func.isRequired,
  onSearchTickets: PropTypes.func.isRequired,
};

DirectionDate.defaultProps = {};

export default DirectionDate;
