import React from "react";

const Conversation = ({ messages, isChecked, onToggle }) => {
    return (
        <div
            className={`h-90 px-2 ${
                !isChecked ? "flex justify-center items-center" : ""
            } custom-scrollbar overflow-auto flex flex-col-reverse`}
        >
            <div className="flex flex-col space-y-2">
                {isChecked
                    ? messages &&
                      messages.map((message, index) => (
                          <div
                              key={message.id}
                              className={`flex py-2 px-1 ${
                                  message.role == "user"
                                      ? "justify-end"
                                      : "justify-start"
                              }`}
                          >
                              {message.parts &&
                                  message.parts.map((part, index) => {
                                      switch (part.type) {
                                          case "text":
                                              return (
                                                  <div
                                                      className={`bg-base-100 rounded-2xl p-2 max-w-[90%] border-2 shadow-sm ${
                                                          message.role == "user"
                                                              ? "rounded-tr-sm border-blue-600"
                                                              : "rounded-tl-sm border-base-content/30"
                                                      } `}
                                                      key={`${message.id}-${index}`}
                                                  >
                                                      <p>{part.text}</p>
                                                  </div>
                                              );
                                          default:
                                              return null;
                                      }
                                  })}
                          </div>
                      ))
                    : ""}
                {!isChecked && (
                    <button className="h-max flex flex-col-reverse gap-8">
                        <label className="flex items-center cursor-pointer m-auto -rotate-90">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={onToggle}
                                className="sr-only peer"
                            />
                            <div className="relative w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        </label>
                        <span className="-rotate-90">Turn On</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default Conversation;
