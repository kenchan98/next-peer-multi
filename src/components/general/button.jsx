const Button = ({ value, width = 48, func }) => {
    return (
        <button className={`w-${width} font-[family-name:var(--font-ibm-m)] h-12 self-center border-solid bg-amber-600 rounded text-black`} onClick={() => {
            func()
        }}>{value}</button>
    )
}

export default Button;