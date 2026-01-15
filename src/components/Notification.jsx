const Notification = ({ message, notificationType }) => {
  if (message === '') {
    return null
  }

  return (
    <div className={notificationType ? 'success' : 'error' }>
      {message}
    </div>
  )
}

export default Notification