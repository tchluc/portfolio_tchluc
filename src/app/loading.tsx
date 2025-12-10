/**
 * Loading Component
 * Displayed while page content is loading
 */
export default function Loading() {
    return (
        <div className="fixed inset-0 z-50 bg-light-bg dark:bg-dark-bg flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                {/* Animated logo/spinner */}
                <div className="relative w-20 h-20">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                </div>
                
                {/* Loading text */}
                <div className="text-center">
                    <h2 className="text-2xl font-display font-bold text-primary mb-2">
                        Chargement
                    </h2>
                    <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
