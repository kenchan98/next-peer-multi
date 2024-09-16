export default function Users({ usersList }) {
    return (
        <div className="absolute right-0 w-1/3 h-screen">
            <div className="grid grid-cols-5 gap-4 place-items-center content-start p-4 m-4 bg-red-700">
                {usersList.map((user, i) => {
                    return <div className="flex text-red-200 aspect-square w-10 justify-center items-center rounded-lg bg-green-700 " key={i}>{user.id}</div>
                })}
            </div>
        </div>
    );
}