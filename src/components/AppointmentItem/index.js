import './index.css'

const AppointmentItem = props => {
  const {appointmentList, onToggleStar} = props
  const {id, title, date, isFavorite} = appointmentList

  const isAddedFavorite = isFavorite
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    onToggleStar(id)
  }

  return (
    <li className="list-item">
      <div className="title-and-star">
        <p className="title">{title}</p>
        <button
          type="button"
          testId="star"
          className="star-btn"
          onClick={onClickStar}
        >
          <img src={isAddedFavorite} alt="star" />
        </button>
      </div>
      <div>
        <p className="date">Date: {date}</p>
      </div>
    </li>
  )
}

export default AppointmentItem
