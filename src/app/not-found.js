import Link from "next/link";

export default function NotFound() {
    return (
        <div className="w-full border-2 border-primary rounded p-2 sm:pt-10 pt-12 flex flex-col gap-4 overflow-auto">
            <section className="">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                    <div className="mx-auto max-w-screen-sm text-center">
                        <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary">
                            404
                        </h1>
                        <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl">
                            Something is missing.
                        </p>
                        <p className="mb-4 text-lg font-light text-base-content/70">
                            Sorry, we can not find that page. You will find lots
                            to explore on the home page.{" "}
                        </p>
                        <div className="flex gap-2 justify-center">
                            <Link
                                href="/"
                                className="bg-primary/50 inline-flex font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
                            >
                                Back to Homepage
                            </Link>
                            <Link
                                href="/chat"
                                className="bg-primary inline-flex text-background font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4"
                            >
                                Create a New Chat
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
