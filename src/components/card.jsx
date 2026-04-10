export default function Card(props) {
    return (
        <div
            className="w-[220px] h-[300px] m-4 p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            style={{
                background: props.color || "#F1F0E9",
            }}
        >
            {props.children}
        </div>
    );
}