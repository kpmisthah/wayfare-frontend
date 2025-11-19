import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { TabsContent } from "@/shared/components/ui/tabs"
import { AlertCircle, Bell, Shield } from "lucide-react"

export const Settings = ()=>{
    return(
        <>
      <TabsContent value="settings" className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
               
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full hover:bg-blue-50 hover:border-blue-300"
              >
                
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </TabsContent>        
        </>
    )
}