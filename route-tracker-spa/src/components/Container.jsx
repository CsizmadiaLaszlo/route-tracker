const Container = (props) => {
    return (
        <div className={"container w-640 text-center p-5"}>
            {props.children}
        </div>
    )
}
export default Container;