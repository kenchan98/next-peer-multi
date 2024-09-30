const MessageFill = ({ message, colour = 'white' }) => {
    return (
        <div className={`flex flex-col h-screen gap-4 m-3 content-center justify-center font-[family-name:var(--font-ibm-bi)] text-center text-3xl text-${colour}`}>
            {message}
        </div>
    )
}

export default MessageFill;