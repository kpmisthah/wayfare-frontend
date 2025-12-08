import AppInitializer from "@/lib/AppInitializer";
import Script from "next/script";
import { getUserFromServer } from "@/lib/getUser";
import "./globals.css";
import CallNotificationManager from "@/modules/user/components/chat/call-notification";
import ActiveCallScreen from "@/modules/user/components/chat/Active-screen";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = await getUserFromServer();
  console.log("get user from server", user);
  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
        {/* <SocketProvider> */}
        <AppInitializer user={user}>{children}</AppInitializer>
        {/* </SocketProvider> */}
        <CallNotificationManager />
        <ActiveCallScreen />
      </body>
    </html>
  );
}
