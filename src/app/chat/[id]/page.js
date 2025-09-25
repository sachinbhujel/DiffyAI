/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import TextareaAutosize from "react-textarea-autosize";
import React, { useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import ModelPanel from "@/app/components/ModelPanel";
import { set, get } from "idb-keyval";
import { usePathname } from "next/navigation";
import { useParams } from "next/navigation";


function ModelContainer() {
    const pathname = usePathname();
    const params = useParams();
    console.log(params);

    const [allModelChats, setAllModelChats] = useState({
        llamaChats: [],
        openaiGptOss120bChats: [],
    })

    const [prompt, setPrompt] = useState("");
    const [activeModel, setActiveModel] = useState({
        openai: false,
        claude: false,
        gemini: false,
        llama: false,
        deepseek: false,
        openaiGptOss120b: false,
    });

    useEffect(() => {
        if (pathname === `/chat/${params.id}`) {
            get(params.id).then((chats) => {
                llamaChat.setMessages(chats.llamaChats);
                openaiGptOss120bChat.setMessages(chats.openaiGptOss120bChats);
            })
            console.log("it works")
        }
    }, [pathname])

    useEffect(() => {
        setActiveModel({
            llama: localStorage.getItem("llama") === "true" || false,
            openai: localStorage.getItem("openai") === "true" || false,

            deepseek: localStorage.getItem("deepseek") === "true" || false,
            openaiGptOss120b:
                localStorage.getItem("openaiGptOss120b") === "true" || false,

            claude: localStorage.getItem("claude") === "true" || false,
            gemini: localStorage.getItem("gemini") === "true" || false,
        });
    }, []);

    const claudeChat = useChat({
        transport: new DefaultChatTransport({
            api: "/api/claude",
            headers: () => ({
                "X-OPENROUTER-API-KEY": localStorage.getItem("openrouterkey"),
            }),
        }),
    });

    const deepseekChat = useChat({
        transport: new DefaultChatTransport({
            api: "/api/deepseek",
            headers: () => ({
                "X-GROQ-API-KEY": localStorage.getItem("groqkey"),
            }),
        }),
    });

    const geminiChat = useChat({
        transport: new DefaultChatTransport({
            api: "/api/gemini",
            headers: () => ({
                "X-GEMINI-API-KEY": localStorage.getItem("geminikey"),
            }),
        }),
    });


    const llamaChat = useChat({
        transport: new DefaultChatTransport({
            api: "/api/llama",
            headers: () => ({
                "X-GROQ-API-KEY": localStorage.getItem("groqkey"),
            }),
        }),
    });


    const openaiChat = useChat({
        transport: new DefaultChatTransport({
            api: "/api/openai",
            headers: () => ({
                "X-OPENAI-API-KEY": localStorage.getItem("openaikey"),
            }),
        }),
    });

    const openaiGptOss120bChat = useChat({
        transport: new DefaultChatTransport({
            api: "/api/openai-gpt-oss-120b",
            headers: () => ({
                "X-GROQ-API-KEY": localStorage.getItem("groqkey"),
            }),
        }),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (disabledButton) return;
        if (prompt.trim()) {
            if (activeModel.openai) openaiChat.sendMessage({ text: prompt });
            if (activeModel.claude) claudeChat.sendMessage({ text: prompt });
            if (activeModel.gemini) geminiChat.sendMessage({ text: prompt });
            if (activeModel.llama) {
                llamaChat.sendMessage({ text: prompt });
            }
            if (activeModel.deepseek)
                deepseekChat.sendMessage({ text: prompt });
            if (activeModel.openaiGptOss120b) {
                openaiGptOss120bChat.sendMessage({ text: prompt });
            }
        } else {
            alert("Write something!!");
        }
        setPrompt("");
    };



    useEffect(() => {
        if (llamaChat.messages.length > 0) {
            set(`${params.id}`, {
                ...allModelChats,
                llamaChats: llamaChat.messages,
                openaiGptOss120bChats: openaiGptOss120bChat.messages,
            });
        }
    }, [allModelChats, llamaChat.messages, openaiGptOss120bChat.messages]);




    const [disabledButton, setDisabledButton] = useState(false);
    useEffect(() => {
        if (
            llamaChat.status.includes("streaming") ||
            deepseekChat.status.includes("streaming") ||
            claudeChat.status.includes("streaming") ||
            geminiChat.status.includes("streaming") ||
            openaiGptOss120bChat.status.includes("streaming") ||
            openaiChat.status.includes("streaming")
        ) {
            setDisabledButton(true);
        } else {
            setDisabledButton(false);
        }
    }, [
        llamaChat.status,
        deepseekChat.status,
        claudeChat.status,
        geminiChat.status,
        openaiGptOss120bChat.status,
        openaiChat.status,
    ]);

    const modelIcons = {
        openai: (
            <svg
                role="img"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>OpenAI</title>
                <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
            </svg>
        ),
        claude: (
            <svg
                role="img"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Claude</title>
                <path
                    fill="#D97757"
                    d="m4.7144 15.9555 4.7174-2.6471.079-.2307-.079-.1275h-.2307l-.7893-.0486-2.6956-.0729-2.3375-.0971-2.2646-.1214-.5707-.1215-.5343-.7042.0546-.3522.4797-.3218.686.0608 1.5179.1032 2.2767.1578 1.6514.0972 2.4468.255h.3886l.0546-.1579-.1336-.0971-.1032-.0972L6.973 9.8356l-2.55-1.6879-1.3356-.9714-.7225-.4918-.3643-.4614-.1578-1.0078.6557-.7225.8803.0607.2246.0607.8925.686 1.9064 1.4754 2.4893 1.8336.3643.3035.1457-.1032.0182-.0728-.164-.2733-1.3539-2.4467-1.445-2.4893-.6435-1.032-.17-.6194c-.0607-.255-.1032-.4674-.1032-.7285L6.287.1335 6.6997 0l.9957.1336.419.3642.6192 1.4147 1.0018 2.2282 1.5543 3.0296.4553.8985.2429.8318.091.255h.1579v-.1457l.1275-1.706.2368-2.0947.2307-2.6957.0789-.7589.3764-.9107.7468-.4918.5828.2793.4797.686-.0668.4433-.2853 1.8517-.5586 2.9021-.3643 1.9429h.2125l.2429-.2429.9835-1.3053 1.6514-2.0643.7286-.8196.85-.9046.5464-.4311h1.0321l.759 1.1293-.34 1.1657-1.0625 1.3478-.8804 1.1414-1.2628 1.7-.7893 1.36.0729.1093.1882-.0183 2.8535-.607 1.5421-.2794 1.8396-.3157.8318.3886.091.3946-.3278.8075-1.967.4857-2.3072.4614-3.4364.8136-.0425.0304.0486.0607 1.5482.1457.6618.0364h1.621l3.0175.2247.7892.522.4736.6376-.079.4857-1.2142.6193-1.6393-.3886-3.825-.9107-1.3113-.3279h-.1822v.1093l1.0929 1.0686 2.0035 1.8092 2.5075 2.3314.1275.5768-.3218.4554-.34-.0486-2.2039-1.6575-.85-.7468-1.9246-1.621h-.1275v.17l.4432.6496 2.3436 3.5214.1214 1.0807-.17.3521-.6071.2125-.6679-.1214-1.3721-1.9246L14.38 17.959l-1.1414-1.9428-.1397.079-.674 7.2552-.3156.3703-.7286.2793-.6071-.4614-.3218-.7468.3218-1.4753.3886-1.9246.3157-1.53.2853-1.9004.17-.6314-.0121-.0425-.1397.0182-1.4328 1.9672-2.1796 2.9446-1.7243 1.8456-.4128.164-.7164-.3704.0667-.6618.4008-.5889 2.386-3.0357 1.4389-1.882.929-1.0868-.0062-.1579h-.0546l-6.3385 4.1164-1.1293.1457-.4857-.4554.0608-.7467.2307-.2429 1.9064-1.3114Z"
                />
            </svg>
        ),
        gemini: (
            <svg
                role="img"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Google Gemini</title>
                <path d="M11.04 19.32Q12 21.51 12 24q0-2.49.93-4.68.96-2.19 2.58-3.81t3.81-2.55Q21.51 12 24 12q-2.49 0-4.68-.93a12.3 12.3 0 0 1-3.81-2.58 12.3 12.3 0 0 1-2.58-3.81Q12 2.49 12 0q0 2.49-.96 4.68-.93 2.19-2.55 3.81a12.3 12.3 0 0 1-3.81 2.58Q2.49 12 0 12q2.49 0 4.68.96 2.19.93 3.81 2.55t2.55 3.81" />
            </svg>
        ),
        llama: (
            <svg
                role="img"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <title>Meta</title>
                <path
                    fill="#0081fb"
                    d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"
                />
            </svg>
        ),
        deepseek: (
            <svg
                role="img"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#536dfe"
                    d="M47.496,10.074c-0.508-0.249-0.727,0.226-1.025,0.467c-0.102,0.078-0.188,0.179-0.274,0.272	c-0.743,0.794-1.611,1.315-2.746,1.253c-1.658-0.093-3.074,0.428-4.326,1.696c-0.266-1.564-1.15-2.498-2.495-3.097	c-0.704-0.311-1.416-0.623-1.909-1.3c-0.344-0.482-0.438-1.019-0.61-1.548c-0.11-0.319-0.219-0.646-0.587-0.7	c-0.399-0.062-0.555,0.272-0.712,0.553c-0.626,1.144-0.868,2.405-0.845,3.681c0.055,2.871,1.267,5.159,3.676,6.785	c0.274,0.187,0.344,0.373,0.258,0.646c-0.164,0.56-0.36,1.105-0.532,1.665c-0.11,0.358-0.274,0.436-0.657,0.28	c-1.322-0.552-2.464-1.369-3.473-2.358c-1.713-1.657-3.262-3.486-5.194-4.918c-0.454-0.335-0.907-0.646-1.377-0.942	c-1.971-1.914,0.258-3.486,0.774-3.673c0.54-0.195,0.188-0.864-1.557-0.856c-1.744,0.008-3.34,0.591-5.374,1.369	c-0.297,0.117-0.61,0.202-0.931,0.272c-1.846-0.35-3.763-0.428-5.765-0.202c-3.77,0.42-6.782,2.202-8.996,5.245	c-2.66,3.657-3.285,7.812-2.519,12.147c0.806,4.568,3.137,8.349,6.719,11.306c3.716,3.066,7.994,4.568,12.876,4.28	c2.965-0.171,6.266-0.568,9.989-3.719c0.939,0.467,1.924,0.654,3.559,0.794c1.259,0.117,2.472-0.062,3.411-0.257	c1.471-0.311,1.369-1.673,0.837-1.922C34,36,33.471,35.441,33.471,35.441c2.19-2.591,5.491-5.284,6.782-14.007	c0.102-0.692,0.016-1.128,0-1.689c-0.008-0.342,0.07-0.475,0.462-0.514c1.079-0.125,2.128-0.42,3.09-0.949	c2.793-1.525,3.919-4.031,4.185-7.034C48.028,10.79,47.981,10.315,47.496,10.074z M23.161,37.107	c-4.177-3.284-6.203-4.365-7.04-4.319c-0.782,0.047-0.641,0.942-0.469,1.525c0.18,0.576,0.415,0.973,0.743,1.478	c0.227,0.335,0.383,0.833-0.227,1.206c-1.345,0.833-3.684-0.28-3.794-0.335c-2.722-1.603-4.998-3.72-6.602-6.614	c-1.549-2.786-2.448-5.774-2.597-8.964c-0.039-0.77,0.188-1.043,0.954-1.183c1.009-0.187,2.049-0.226,3.059-0.078	c4.263,0.623,7.893,2.529,10.936,5.548c1.737,1.72,3.051,3.774,4.404,5.782c1.439,2.132,2.988,4.163,4.959,5.828	c0.696,0.584,1.252,1.027,1.783,1.354C27.667,38.515,24.991,38.554,23.161,37.107L23.161,37.107z M25.164,24.228	c0-0.342,0.274-0.615,0.618-0.615c0.078,0,0.149,0.015,0.211,0.039c0.086,0.031,0.164,0.078,0.227,0.148	c0.11,0.109,0.172,0.265,0.172,0.428c0,0.342-0.274,0.615-0.618,0.615S25.164,24.571,25.164,24.228L25.164,24.228z M31.382,27.419	c-0.399,0.163-0.798,0.303-1.181,0.319c-0.595,0.031-1.244-0.21-1.596-0.506c-0.548-0.459-0.939-0.716-1.103-1.517	c-0.07-0.342-0.031-0.872,0.031-1.175c0.141-0.654-0.016-1.074-0.477-1.455c-0.376-0.311-0.853-0.397-1.377-0.397	c-0.196,0-0.375-0.086-0.508-0.156c-0.219-0.109-0.399-0.381-0.227-0.716c0.055-0.109,0.321-0.373,0.383-0.42	c0.712-0.405,1.533-0.272,2.292,0.031c0.704,0.288,1.236,0.817,2.003,1.564c0.782,0.903,0.923,1.152,1.369,1.829	c0.352,0.529,0.673,1.074,0.892,1.696C32.016,26.905,31.844,27.224,31.382,27.419L31.382,27.419z"
                ></path>
            </svg>
        ),
    };

    const [modelExpand, setModelExpand] = useState({
        openai: false,
        claude: false,
        gemini: false,
        llama: false,
        deepseek: false,
        openaiGptOss120b: false,
    });

    const [models, setModels] = useState({
        openai: false,
        claude: false,
        gemini: false,
        llama: false,
        deepseek: false,
        openaiGptOss120b: false,
    });

    useEffect(() => {
        setModels({
            llama: localStorage.getItem("llama") === "true" || false,
            openai: localStorage.getItem("openai") === "true" || false,

            deepseek: localStorage.getItem("deepseek") === "true" || false,
            openaiGptOss120b:
                localStorage.getItem("openaiGptOss120b") === "true" || false,

            claude: localStorage.getItem("claude") === "true" || false,
            gemini: localStorage.getItem("gemini") === "true" || false,
        });
    }, []);

    return (
        <div className="relative pt-10 rounded-md gap-4 p-2 flex flex-col border-2 border-primary h-full w-full">
            <div className="flex gap-3 overflow-auto all-model-scrollbar w-full">
                {models.llama && (
                    <ModelPanel
                        messages={llamaChat.messages}
                        model="llama"
                        modelIcons={modelIcons.llama}
                        isActive={activeModel.llama}
                        isModelActive={modelExpand.llama}
                        onToggleExpandModel={() => {
                            setModelExpand((prev) => ({
                                ...prev,
                                llama: !prev.llama,
                            }));
                            setActiveModel((prev) => ({
                                ...prev,
                                deepseek: false,
                                openaiGptOss120b: false,
                                openai: false,
                                claude: false,
                                gemini: false,
                            }));
                        }}
                        onToggle={() => {
                            setActiveModel((prev) => ({
                                ...prev,
                                llama: !prev.llama,
                            }));
                        }}
                    />
                )}

                {models.openaiGptOss120b && (
                    <ModelPanel
                        messages={openaiGptOss120bChat.messages}
                        model="GPT OSS"
                        modelIcons={modelIcons.openai}
                        isActive={activeModel.openaiGptOss120b}
                        isModelActive={modelExpand.openaiGptOss120b}
                        onToggleExpandModel={() => {
                            setModelExpand((prev) => ({
                                ...prev,
                                openaiGptOss120b: !prev.openaiGptOss120b,
                            }));
                            setActiveModel((prev) => ({
                                ...prev,
                                llama: false,
                                deepseek: false,
                                openai: false,
                                claude: false,
                                gemini: false,
                            }));
                        }}
                        onToggle={() => {
                            setActiveModel((prev) => ({
                                ...prev,
                                openaiGptOss120b: !prev.openaiGptOss120b,
                            }));
                        }}
                    />
                )}

                {models.deepseek && (
                    <ModelPanel
                        messages={deepseekChat.messages}
                        model="deepseek"
                        isActive={activeModel.deepseek}
                        modelIcons={modelIcons.deepseek}
                        isModelActive={modelExpand.deepseek}
                        onToggleExpandModel={() => {
                            setModelExpand((prev) => ({
                                ...prev,
                                deepseek: !prev.deepseek,
                            }));
                            setActiveModel((prev) => ({
                                ...prev,
                                llama: false,
                                openaiGptOss120b: false,
                                openai: false,
                                claude: false,
                                gemini: false,
                            }));
                        }}
                        onToggle={() => {
                            setActiveModel((prev) => ({
                                ...prev,
                                deepseek: !prev.deepseek,
                            }));
                        }}
                    />
                )}

                {models.openai && (
                    <ModelPanel
                        messages={openaiChat.messages}
                        model="Openai"
                        modelIcons={modelIcons.openai}
                        isActive={activeModel.openai}
                        isModelActive={modelExpand.openai}
                        onToggleExpandModel={() => {
                            setModelExpand((prev) => ({
                                ...prev,
                                openai: !prev.openai,
                            }));
                            setActiveModel((prev) => ({
                                ...prev,
                                llama: false,
                                deepseek: false,
                                openaiGptOss120b: false,
                                claude: false,
                                gemini: false,
                            }));
                        }}
                        onToggle={() => {
                            setActiveModel((prev) => ({
                                ...prev,
                                openai: !prev.openai,
                            }));
                        }}
                    />
                )}

                {models.claude && (
                    <ModelPanel
                        messages={claudeChat.messages}
                        model="Claude"
                        modelIcons={modelIcons.claude}
                        isActive={activeModel.claude}
                        isModelActive={modelExpand.claude}
                        onToggleExpandModel={() => {
                            setModelExpand((prev) => ({
                                ...prev,
                                claude: !prev.claude,
                            }));
                            setActiveModel((prev) => ({
                                ...prev,
                                llama: false,
                                deepseek: false,
                                openaiGptOss120b: false,
                                openai: false,
                                gemini: false,
                            }));
                        }}
                        onToggle={() => {
                            setActiveModel((prev) => ({
                                ...prev,
                                claude: !prev.claude,
                            }));
                        }}
                    />
                )}

                {models.gemini && (
                    <ModelPanel
                        messages={geminiChat.messages}
                        model="Gemini"
                        modelIcons={modelIcons.gemini}
                        isActive={activeModel.gemini}
                        isModelActive={modelExpand.gemini}
                        onToggleExpandModel={() => {
                            setModelExpand((prev) => ({
                                ...prev,
                                gemini: !prev.gemini,
                            }));
                            setActiveModel((prev) => ({
                                ...prev,
                                llama: false,
                                deepseek: false,
                                openaiGptOss120b: false,
                                openai: false,
                                claude: false,
                            }));
                        }}
                        onToggle={() => {
                            setActiveModel((prev) => ({
                                ...prev,
                                gemini: !prev.gemini,
                            }));
                        }}
                    />
                )}
            </div>
            <form onSubmit={handleSubmit} className="flex justify-center">
                <div className="absolute bg-background bottom-3 border border-primary left-1/2 transform -translate-x-1/2 shadow-lg w-[90%] rounded-xl flex flex-col items-end p-2 gap-2 justify-center">
                    <TextareaAutosize
                        rows={1}
                        minRows={1}
                        maxRows={3}
                        className="w-full p-2 focus:outline-none resize-none text-base"
                        placeholder="Ask me anything..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                    />
                    <button
                        type="submit"
                        className={`border w-20 p-1.5 flex justify-center items-center rounded-lg text-gray-300 ${!prompt
                            ? "bg-[#7585a2] cursor-not-allowed"
                            : "bg-primary text-white cursor-pointer"
                            }`}
                        disabled={disabledButton}
                    >
                        {!prompt ? "Disabled" : "Enter"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ModelContainer;
