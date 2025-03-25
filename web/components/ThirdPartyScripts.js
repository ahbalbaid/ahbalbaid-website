"use client";

import { useEffect } from "react";

export default function ThirdPartyScripts() {
  useEffect(() => {
    // UserWay widget
    const uwScript = document.createElement("script");
    uwScript.src = "https://cdn.userway.org/widget.js";
    uwScript.setAttribute("data-position", 5);
    uwScript.setAttribute("data-color", "#4b5563");
    uwScript.setAttribute("data-account", "uUQRJ6IN91");
    (document.head || document.body).appendChild(uwScript);

    // Chatbase global config
    window.embeddedChatbotConfig = {
      chatbotId: "XDDlhLHXHcrLR1ps0I9zi",
      domain: "www.chatbase.co",
    };

    // Chatbase script
    const chatScript = document.createElement("script");
    chatScript.src = "https://www.chatbase.co/embed.min.js";
    chatScript.defer = true;
    chatScript.setAttribute("data-chatbotid", "XDDlhLHXHcrLR1ps0I9zi");
    chatScript.setAttribute("data-domain", "www.chatbase.co");
    document.head.appendChild(chatScript);
  }, []);

  return null; // Nothing to render visually
}
