import React, { useEffect } from 'react';

interface BotpressWebChat {
    init: (config: any) => void;
    mergeConfig: (config: any) => void;
    onEvent: (callback: () => void, events: string[]) => void;
    sendPayload: (payload: any) => void;
    sendEvent: (event: any) => void;
}

declare global {
    interface Window {
        botpressWebChat: BotpressWebChat;
    }
}

function ChatBot() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.botpress.cloud/webchat/v1/inject.js';
    script.async = true;
    script.onload = () => {
        window.botpressWebChat.init({
            "composerPlaceholder": "Chat with bot",
            "botConversationDescription": "This chatbot was built surprisingly fast with Botpress",
            "botId": "81991c41-f7c1-40b4-a37f-d2add4d6ebfb",
            "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
            "messagingUrl": "https://messaging.botpress.cloud",
            "clientId": "81991c41-f7c1-40b4-a37f-d2add4d6ebfb",
            "webhookId": "503c99c0-9253-4e8d-a310-5b4ce5d5fe16",
            "lazySocket": true,
            "themeName": "prism",
            "frontendVersion": "v1",
            "showPoweredBy": true,
            "theme": "prism",
            "themeColor": "#2563eb"
        });
                window.botpressWebChat.onEvent(() => {
                window.botpressWebChat.sendEvent({ type: 'show' });
            }, ['LIFECYCLE.LOADED']);
    }
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
        <div id="bp-web-widget-container" />
    </div>
  );
}

export default ChatBot;