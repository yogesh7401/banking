import { useEffect, useState } from "react"
import { twMerge  } from "tailwind-merge"

interface Props {
    text : string,
    className? : string,
    disabled? : boolean,
    onButtonClick? : (e: React.FormEvent) => void;
}

export default function ButtonComponent ({...props} : Props) {
    const [ className, setClassName ] = useState("cursor-pointer px-5 py-3 mt-auto bg-purple-700 text-white rounded-xl text-sm font-medium hover:bg-purple-800 transition duration-200 shadow-md")
    useEffect(() => {
        props.className ? setClassName(twMerge(className, props.className)) : null
    }, [props.className])
    return <button disabled={props.disabled} onClick={props.onButtonClick ? props.onButtonClick : undefined} className={className}>
        { props.text }
    </button>
}