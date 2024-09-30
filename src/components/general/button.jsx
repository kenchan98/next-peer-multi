import useSound from "use-sound";

const Button = ({ value, width = 48, func }) => {
    const [sound_test] = useSound('/assets/sound/sound_click.mp3');

    return (
        <button className={`w-${width} font-[family-name:var(--font-ibm-m)] h-12 self-center border-solid bg-game-orange rounded text-black`} onClick={() => {
            func();
            sound_test();
        }}>{value}</button>
    )
}

export default Button;