import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentList: []}

  onToggleStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, isFavorite: !each.isFavorite}
        }
        return each
      }),
    }))
  }

  onClickStared = () => {
    const {appointmentList} = this.state
    const filteredAppointmentList = appointmentList.filter(
      each => each.isFavorite === true,
    )
    this.setState({appointmentList: filteredAppointmentList})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const formatedDate = format(new Date(date), 'dd MMMM yyyy, EEEE')
    const newAppointments = {
      id: uuidv4(),
      title,
      date: formatedDate,
      isFavorite: false,
    }

    if (title !== '' && date !== '') {
      this.setState(prevState => ({
        appointmentList: [...prevState.appointmentList, newAppointments],
        title: '',
        date: '',
      }))
    }
  }

  onChangeInput = event => {
    this.setState({title: event.target.value})
  }

  onChangeInputDate = event => {
    this.setState({date: event.target.value})
  }

  onReRenderListItems = () => {
    const {appointmentList} = this.state
    return appointmentList.map(each => (
      <AppointmentItem
        appointmentList={each}
        key={each.id}
        onToggleStar={this.onToggleStar}
      />
    ))
  }

  render() {
    const {title, date} = this.state
    return (
      <div className="bg">
        <div className="app-appointment">
          <div className="input-section">
            <div>
              <h1 className="heading">Add Appointment</h1>
              <form className="form" onSubmit={this.onAddAppointment}>
                <label htmlFor="title" className="title">
                  TITLE
                </label>
                <br />
                <input
                  type="text"
                  id="title"
                  className="input"
                  onChange={this.onChangeInput}
                  placeholder="Title"
                  value={title}
                />
                <br />
                <label className="date" htmlFor="date">
                  DATE
                </label>
                <br />
                <input
                  type="date"
                  id="date"
                  className="input"
                  onChange={this.onChangeInputDate}
                  value={date}
                />
                <br />
                <button type="submit" className="add-btn">
                  Add
                </button>
              </form>
            </div>
            <img
              className="img"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr />
          <div className="appointment-section">
            <div className="heading-stared">
              <h1 className="heading2">Appointments</h1>
              <button
                type="button"
                className="stared"
                onClick={this.onClickStared}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list">{this.onReRenderListItems()}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
