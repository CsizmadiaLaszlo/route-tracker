const Container = (props) => {
    return (
        <div className={"container mx-auto p-5"}>
            {props.children}
        </div>
    )
}
export default Container;