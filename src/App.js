import logo from './logo.svg';
import './App.css';
import DirectionDate from './components/DirectionDate/DirectionDate';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SeatsSelection from './components/SeatsSelection/SeatsSelection';
import { Component } from 'react';

class App extends Component{
  constructor(props){
    
    super(props);
    
    this.state = {
      selectedDirection: '',
      selectedDate: '',
      ticketPrice: null,
      confirmedDirection: '',
      confirmedDate: '',
      confirmedPrice: null,
      seats:{}, // Хранение информации о занятых местах по направлениям и датам
    };

    this.listDirectionsAndPrices = [
      { direction: "Odessa-Constanta", price: 55 },
      { direction: "Constanta-Odessa", price: 59 },
      { direction: "Odessa-Malaga", price: 217 },
      { direction: "Malaga-Odessa", price: 258 },
      { direction: "Odessa-Barselona", price: 286 },
      { direction: "Barselona-Odessa", price: 335 },
      { direction: "Odessa-Venice", price: 248 },
      { direction: "Venice-Odessa", price: 284 },
      { direction: "Odessa-Istanbul", price: 95 },
      { direction: "Istanbul-Odessa", price: 108 },
    ];    
    
  }

  handleSeatSelect = (direction, date, updatedSeats) => {
    const { seats } = this.state;
  
    // Копируем текущее состояние мест
    const updatedDirectionSeats = { ...seats[direction] };
    updatedDirectionSeats[date] = updatedSeats;
  
    // Обновляем состояние
    this.setState({
      seats: {
        ...seats,
        [direction]: updatedDirectionSeats,
      },
    });
  };

  componentDidMount() {
    // Инициализация структуры seats
    const seats = {};
    this.listDirectionsAndPrices.forEach((ticket) => {
      seats[ticket.direction] = {};
    });

    this.setState({ seats });
  };

  initializedSeats = () => {
    const seats = {};

    this.listDirectionsAndPrices.forEach((ticket) => {
      // Для каждого направления создаем объект с датами и местами
      seats[ticket.direction] = {};
    })
  }

  handleDirectionChange = (direction) => {
    const selectedTicket = this.listDirectionsAndPrices.find((ticket) => ticket.direction === direction);
    const ticketPrice = selectedTicket ? selectedTicket.price : null;
    
    this.setState({
      selectedDirection: direction, ticketPrice,
    });
  };

  handleDateChange = (date) => {
    this.setState({
      selectedDate: date,
    })
  };

  handleSearchTickets = () => {
    const { selectedDirection, selectedDate, ticketPrice, seats } = this.state;
    
    if (!selectedDirection || !selectedDate) {
      alert("Please select a direction and date");
      return;
    }

    // Проверяем наличие данных для выбранного направления и даты
    if (!seats[selectedDirection][selectedDate]){
      // Если данных нет, инициализируем пустые места, создаём массив мест на выбранное направление и дату, все значения false
      seats[selectedDirection][selectedDate] = Array(12).fill(false); 
    }

    this.setState({
      confirmedDirection: selectedDirection,
      confirmedDate: selectedDate,
      confirmedPrice: ticketPrice,
      seats, // Обновляем состояние с новыми местами
    });
  };

  render(){
    const { selectedDirection, selectedDate, ticketPrice, confirmedDirection, confirmedDate, confirmedPrice } = this.state; // Получаем данные из состояния
    const { listDirectionsAndPrices } = this; // Получаем массив направлений и цен

    return(
      <>
        <DirectionDate 
          selectedDirection={selectedDirection}
          selectedDate={selectedDate}
          listDirectionsAndPrices={listDirectionsAndPrices}
          onDirectionChange={this.handleDirectionChange}
          onDateChange={this.handleDateChange}
          onSearthTickets={this.handleSearchTickets}
        ></DirectionDate>

        <SeatsSelection
          selectedDirection={confirmedDirection}
          selectedDate={confirmedDate}
          ticketPrice={confirmedPrice}
          seats={this.state.seats[confirmedDirection]?.[confirmedDate] || []}
          onSeatSelect={this.handleSeatSelect}
        ></SeatsSelection>
      </>

    );
  }

};

export default App;
