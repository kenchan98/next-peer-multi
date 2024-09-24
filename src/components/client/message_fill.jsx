const MessageFill = ({ message }) => {
    return (
        <div className="flex flex-col h-screen gap-4 m-3 content-center justify-center text-center text-3xl">
            {message}
        </div>
    )
}

export default MessageFill;