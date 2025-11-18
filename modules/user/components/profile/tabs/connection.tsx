
import { useUserProfile } from "@/modules/user/hooks/use-userprofile"
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Badge } from "@/shared/components/ui/badge"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent } from "@/shared/components/ui/card"
import { TabsContent } from "@/shared/components/ui/tabs"
import {MessageCircle, Video } from "lucide-react"

export const Connection = ()=>{
    const {
    connections,
    getStatusVariant
} = useUserProfile()
    return(
        <>
        <TabsContent value="connections" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {connections.map((connection) => (
            <Card
              key={connection.id}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Avatar className="w-14 h-14">
                        <AvatarImage
                          src={connection.avatar}
                          alt={connection.name}
                        />
                        <AvatarFallback className="bg-blue-100 text-blue-600">
                          {connection.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {connection.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{connection.name}</h3>
                      <p className="text-sm text-gray-600">
                        Traveling to {connection.destination}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(
                          connection.travelDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {connection.status === "active" ? (
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          className="bg-blue-500 hover:bg-blue-600 text-white"
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Chat
                        </Button>
                        <Button
                          size="sm"
                          className="bg-purple-500 hover:bg-purple-600 text-white"
                        >
                          <Video className="w-3 h-3 mr-1" />
                          Call
                        </Button>
                      </div>
                    ) : (
                      <Badge variant={getStatusVariant(connection.status)}>
                        {connection.status}
                      </Badge>
                    )}
                    <p className="text-xs text-gray-500">
                      {connection.mutualConnections} mutual connections
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
        </>
    )
}