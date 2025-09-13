import React from "react";

const Conversation = ({ messages, isChecked }) => {
    return (
        <div className="h-90">
            {isChecked
                ? messages &&
                  messages.map((message, index) => (
                      <div
                          key={message.id}
                          className={`flex ${
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
        </div>
    );
};

export default Conversation;
