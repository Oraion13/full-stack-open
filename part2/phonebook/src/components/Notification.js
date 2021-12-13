
const Notification = ({message, errorClass}) => {
    if(message === null) return null

    return(
        <div className={errorClass ? "message" : "error"}>
            <p>{message}</p>
        </div>
    )
}

export default Notification;