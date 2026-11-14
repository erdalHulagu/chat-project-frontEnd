
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { BASE_API_URL } from "../base-api-url";
import { encryptedLocalStorage } from "../../helper/auth-token/encrypt-storage";

let stompClient = null;
let messageHandler = null;

export const connectWebSocket = (onMessageReceived) => {
    messageHandler = onMessageReceived;

    const token = encryptedLocalStorage.getItem("token");

    if (!token) {
        console.error("WebSocket bağlantısı için token bulunamadı.");
        return null;
    }

    if (stompClient?.active) {
        return stompClient;
    }

    const client = new Client({
        webSocketFactory: () => new SockJS(`${BASE_API_URL}/ws`),

        connectHeaders: {
            Authorization: `Bearer ${token}`,
        },

        reconnectDelay: 5000,

        onConnect: () => {
            console.log("WebSocket bağlantısı kuruldu.");

            client.subscribe(
                "/user/queue/messages",
                (message) => {
                    try {
                        const receivedMessage = JSON.parse(message.body);

                        console.log(
                            "WebSocket mesajı alındı:",
                            receivedMessage
                        );

                        if (typeof messageHandler === "function") {
                            messageHandler(receivedMessage);
                        }
                    } catch (error) {
                        console.error(
                            "WebSocket mesajı okunamadı:",
                            error
                        );
                    }
                }
            );

            console.log("Mesaj kanalı dinlenmeye başlandı.");
        },

        onStompError: (frame) => {
            console.error(
                "STOMP hatası:",
                frame.headers["message"],
                frame.body
            );
        },

        onWebSocketError: (error) => {
            console.error("WebSocket bağlantı hatası:", error);
        },

        onWebSocketClose: (event) => {
            console.log("WebSocket bağlantısı kapandı:", event);
        },
    });

    stompClient = client;
    client.activate();

    return client;
};

export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
        messageHandler = null;

        console.log("WebSocket bağlantısı kapatıldı.");
    }
};
