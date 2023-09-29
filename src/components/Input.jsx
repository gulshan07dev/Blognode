import React, {useId} from 'react'

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full flex flex-col gap-1'>
            {label && <label 
            className='pl-1 text-lg text-gray-950 font-[500] font-inter' 
            htmlFor={id}>
                {label}
            </label>
            }
            <input
            type={type}
            className={`px-3 py-2.5 rounded-sm border-gray-300 bg-white backdrop-blur-md text-gray-700 font-nunito-sans text-base font-[500] outline-none focus:bg-gray-50 focus:border-blue-500 duration-200 border w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input