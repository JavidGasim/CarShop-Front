// SignalRContext.js
import React, { createContext, useEffect, useState } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const username = Cookies.get("username");
    const token = Cookies.get(username);

    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:7268/carHub", {
        accessTokenFactory: () => token,
      })
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          console.log("SignalR bağlantısı uğurla quruldu.");

          // 🟡 Avtomobil sahibinə xüsusi toast (NotifyOwner)
          connection.on("NotifyOwner", (data) => {
            console.log(data.message);
            toast.info(data.message, {
              position: "top-right",
              autoClose: 5000,
            });
          });

          // 🔄 Feedback siyahısı yenilənməsi üçün (amma toast yoxdur!)
          connection.on("ReceiveFeedback", (data) => {
            // buraya sadəcə feedback siyahısını yeniləmək üçün logic əlavə et
            console.log("Yeni feedback gəldi:", data);

            // məsələn: refreshFeedbacks(data);
          });
        })
        .catch((err) => console.log("SignalR bağlantı xətası:", err));
    }
  }, [connection]);

  return (
    <SignalRContext.Provider value={{ connection }}>
      {children}
    </SignalRContext.Provider>
  );
};
