interface LoadingProps {
    message?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

const Loading = ({ message = "Carregando...", size = 'md', className = '' }: LoadingProps) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12'
    };

    return (
        <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
            <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 ${sizeClasses[size]}`}></div>
            <p className="text-gray-600 text-sm">{message}</p>
        </div>
    );
};

export default Loading;
