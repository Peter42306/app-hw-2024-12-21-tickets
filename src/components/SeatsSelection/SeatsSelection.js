import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';

class SeatsSelection extends Component {
  constructor(props) {
    
    super(props);
    
    this.state = {      
      
    };
  }  
  
  handleSeatSelection = (index) => {
    const { selectedDirection, selectedDate, seats } = this.props;
  
    if (selectedDirection && selectedDate) {
      const updatedSeats = [...seats];
      updatedSeats[index] = !updatedSeats[index]; // Переключаем статус места (занято/свободно)
  
      // Вызываем функцию из `App` для обновления состояния
      this.props.onSeatSelect(selectedDirection, selectedDate, updatedSeats);
    }
  };



  render(){
    const { selectedDirection, selectedDate, ticketPrice, seats } = this.props;

    return(
      <Container className='w-100 mt-3'>
        <p>SeatsSelection Component</p>        
        <Form>
          <Row>
            <Col>
              <Form.Label>Direction</Form.Label>
            </Col>
            <Col>
              <Form.Select>
                <option>{selectedDirection}</option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Label>Date</Form.Label>
            </Col>
            <Col>
            <Form.Control
              type='date'
              value={selectedDate}                            
            ></Form.Control>
            </Col>
            <Col>            
              <Button disabled>Seach tickets</Button>
            </Col>
          </Row>
        </Form>
        {/* <p>Selected direction: {selectedDirection}, selected date: {selectedDate}, price: {ticketPrice} euro</p> */}
        <Container className="w-100 mt-3">
      <p>SeatsSelection Component</p>
      <div className="mt-5">
      {seats.length > 0 ? (
  <div className="d-flex flex-wrap justify-content-center">
    {seats.map((isOccupied, index) => (
      <Button
        key={index}
        className="custom-button mx-1 my-1"
        variant={isOccupied ? "danger" : "success"}
        disabled={isOccupied} // Заблокировать, если место занято
        onClick={() => this.handleSeatSelection(index)} // Обработчик выбора
      >
        {index + 1}
      </Button>
    ))}
  </div>
) : (
  <p>No seats available for the selected direction and date.</p>
)}
      </div>
    </Container>
        <div className='mt-5'>
        <div className='d-flex justify-content-center'>
        <Button className='custom-button mx-1 my-1'>2</Button>
        <Button className='custom-button mx-1 my-1'>4</Button>
        <Button className='custom-button mx-1 my-1'>6</Button>
        <Button className='custom-button mx-1 my-1'>8</Button>
        <Button className='custom-button mx-1 my-1'>10</Button>
        <Button className='custom-button mx-1 my-1'>12</Button>        
        </div>
        <div className='d-flex justify-content-center'>
        <Button className='custom-button mx-1 my-1'>1</Button>
        <Button className='custom-button mx-1 my-1'>3</Button>
        <Button className='custom-button mx-1 my-1'>5</Button>
        <Button className='custom-button mx-1 my-1'>7</Button>
        <Button className='custom-button mx-1 my-1'>9</Button>
        <Button className='custom-button mx-1 my-1'>11</Button>        
        </div>
        </div>

      </Container>      
    )
  };
}


SeatsSelection.propTypes = {
  selectedDirection: PropTypes.string.isRequired,
  selectedDate: PropTypes.string.isRequired,
  ticketPrice: PropTypes.number.isRequired,
  seats: PropTypes.arrayOf(PropTypes.bool).isRequired,
};

SeatsSelection.defaultProps = {};

export default SeatsSelection;
