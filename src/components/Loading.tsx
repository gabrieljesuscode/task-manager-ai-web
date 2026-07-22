interface LoadingProps {
    isLoading: boolean; 
}

export function Loading({ isLoading }: LoadingProps) {

    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
            <div className="h-14 w-14 animate-spin rounded-full border-7 border-white border-t-transparent" />
        </div>
    )
}