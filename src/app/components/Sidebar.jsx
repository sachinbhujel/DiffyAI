import { useState } from "react";

function Sidebar({ isVisible, setIsVisible }) {
    const [sidebarWidth, setSidebarWidth] = useState(false);
    return (
        <div
            className={`flex flex-col ${
                isVisible ? "fixed h-full" : ""
            } border ${sidebarWidth ? "w-max" : "w-[250px]"}`}
        >
            <div className="flex gap-5">
                <button
                    onClick={() => setSidebarWidth(!sidebarWidth)}
                    className="px-5 py-3 bg-black text-white hidden sm:block"
                >
                    =
                </button>
                <button
                    className="px-5 py-3 bg-black text-red-400 block sm:hidden"
                    onClick={() => setIsVisible(false)}
                >
                    -
                </button>
            </div>
            <button>fsg tfesrf g</button>
        </div>
    );
}

export default Sidebar;
