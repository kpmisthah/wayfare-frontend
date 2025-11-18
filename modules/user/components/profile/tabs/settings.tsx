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
              <Button
                variant="outline"
                className="w-full hover:bg-blue-50 hover:border-blue-300"
              >
                <Shield className="w-4 h-4 mr-2" />
                Two-Factor Authentication
              </Button>
              <div className="space-y-3 pt-4 border-t">
                <h4 className="font-medium text-gray-900">
                  Privacy Settings
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">
                      Show profile to other travelers
                    </span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Allow trip invitations</span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Show online status</span>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Bell className="w-5 h-5 mr-2" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">
                      Trip Reminders
                    </span>
                    <p className="text-xs text-gray-500">
                      Get notified about upcoming trips
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">
                      New Connections
                    </span>
                    <p className="text-xs text-gray-500">
                      When someone wants to connect
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm font-medium">
                      Travel Deals
                    </span>
                    <p className="text-xs text-gray-500">
                      Special offers and discounts
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Actions */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600 flex items-center text-lg">
              <AlertCircle className="w-5 h-5 mr-2" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="flex-1 border-yellow-300 text-yellow-700 hover:bg-yellow-50"
              >
                Export My Data
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
              >
                Deactivate Account
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              These actions are permanent and cannot be undone. Please
              contact support if you need assistance.
            </p>
          </CardContent>
        </Card>
      </TabsContent>        
        </>
    )
}