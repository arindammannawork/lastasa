export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 sticky  border-0 text-gray-400 py-6 px-6  border-t border-white/60 ">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    &copy; {currentYear} LASTASA. All rights reserved.
                </p>
                <p className="text-xs mt-2">
                    Managed by Team ASA
                </p>
            </div>
        </footer>
    );
}