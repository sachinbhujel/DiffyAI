import Link from "next/link";
import ModelSelection from "./components/ModelSelection";

export default function Home() {
    return (
        <div className="reltive border-2 border-primary rounded-md h-[calc(100vh-16px)] w-full flex flex-col items-center overflow-auto p-2 custom-scrollbar">
            <div className="py-8 sm:py-4 flex mx-auto">
                <p className="text-center text-lg">
                    Start by adding your API keys on the{" "}
                    <Link className="underline text-primary" href="/configure">
                        Configure
                    </Link>{" "}
                    page, and then select your default AI models.
                </p>
            </div>
            <ModelSelection />
        </div>
    );
}
