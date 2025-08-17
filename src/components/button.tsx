import type { ButtonHTMLAttributes } from "react"

type ButtonVariant = 'default' | 'success' | 'danger'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const getButtonStyles = (variant: ButtonVariant) => {
  const baseStyles = "p-2 rounded-md border transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
  
  switch (variant) {
    case 'success':
      return `${baseStyles} bg-green-600 hover:bg-green-700 text-white border-green-600`
    case 'danger':
      return `${baseStyles} bg-red-600 hover:bg-red-700 text-white border-red-600`
    case 'default':
    default:
      return `${baseStyles} bg-gray-800 hover:bg-gray-700 text-white border-gray-300`
  }
}

const Button = ({ children, variant = 'default', className, ...props }: ButtonProps) => {
    const buttonStyles = getButtonStyles(variant)
    const finalClassName = className ? `${buttonStyles} ${className}` : buttonStyles
    
    return (
        <button {...props} className={finalClassName}>
            {children}
        </button>
    )
}

export default Button