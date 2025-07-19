export default function LoaderComponent() {
    return <div className="fixed inset-0 bg-purple-800 flex items-center justify-center z-50" id="loading-spinner">
        <div className="animate-spin rounded-full w-20 h-20 sm:h-32 sm:w-32 border-y-4 border-white"></div>
    </div>
}