const MockupWindow = (props) => {
    return (
        <div className={"flex mt-3 flex-wrap shadow-xl border-base-300 border rounded-box"}>
            <div className={"flex bg-base-300 w-full h-12 items-center justify-center"}>
                <div>
                    {props.titleContainer}
                </div>
            </div>
            <div className={"flex bg-base-200 w-full w-10 min-h-12 items-center justify-center "}>
                <div className={"m-3"}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}
export default MockupWindow;