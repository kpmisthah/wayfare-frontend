import AppInitializer from "@/lib/AppInitializer";
import { getUserFromServer } from "@/lib/getUser";
import "./globals.css";
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
        <script
          crossOrigin="anonymous"
          src="//unpkg.com/react-scan/dist/auto.global.js"
        />
      </head>
      <body>
        {/* <SocketProvider> */}
        <AppInitializer user={user}>{children}</AppInitializer>
        {/* </SocketProvider> */}
      </body>
    </html>
  );
}
