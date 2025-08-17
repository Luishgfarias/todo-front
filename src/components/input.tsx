import type { InputHTMLAttributes } from "react"
import { useState } from "react"
import { FaEye, FaEyeSlash } from "react-icons/fa";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    showPasswordToggle?: boolean
    error?: string
}

const Input = ({ showPasswordToggle, type, error, ...props }: InputProps) => {
    const [showPassword, setShowPassword] = useState(false)

    const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type

    return (
        <div className="w-full">
            <div className="relative">
                <input
                    {...props}
                    type={inputType}
                    className="w-full p-2 rounded-md border border-gray-300 bg-gray-100 pr-10"
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                        {showPassword ? (
                            <FaEyeSlash className="w-5 h-5" />
                        ) : (
                            <FaEye className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    )
}

export default Input