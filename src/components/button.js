const Button = ({ value, func }) => {
    return (
        <button className="w-48 h-12 self-center border-solid border-2 border-sky-500" onClick={() => {
            func()
        }}>{value}</button>
    )
}

export default Button