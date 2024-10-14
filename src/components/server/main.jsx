import InitSettings from "./initSettings";
import Ready from "./ready";
import GameStage from "./gameStage";
import Register from "./register";
import Top from "./top";

export default function Main({ isConnected, screenIndex,
    serverVariable, setServerVariable, updateServerVariable,
    setScreenIndexToThree,
    DataList, puzzleIndex,
    puzzleIndexRangeEnd, setPuzzleIndexRangeInTheRound,
    clientsList,
    clearTimerToScreenTwo,
    setQrCode, qrCode
}) {
    return (
        <>
            {screenIndex <= 3 && <Top isConnected={isConnected} />}
            {screenIndex === 0 && (
                <InitSettings
                    serverVariable={serverVariable}
                    func1={setServerVariable}
                    func2={updateServerVariable}
                    setQrCode={setQrCode}
                />
            )}
            {screenIndex === 1 && <Register clearTimerToScreenTwo={clearTimerToScreenTwo} clientsList={clientsList} qrCode={qrCode} />}
            {screenIndex === 2 && <Ready func={setScreenIndexToThree} />}
            {screenIndex === 3 && <GameStage data={DataList[puzzleIndex]} puzzleIndexRangeEnd={puzzleIndexRangeEnd} setPuzzleIndexRangeInTheRound={setPuzzleIndexRangeInTheRound} />}
        </>
    );
}