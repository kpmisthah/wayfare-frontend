"use client"
import { useWallet } from "@/modules/user/hooks/use-wallet"
import { Button } from "@/shared/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { TabsContent } from "@/shared/components/ui/tabs"
import { ArrowDownLeft, ArrowUpRight, Eye, EyeOff, Shield } from "lucide-react"
import { useState } from "react"

export const Wallet = ()=>{
  const [showBalance, setShowBalance] = useState(true);
  const [activeWalletTab, setActiveWalletTab] = useState('wallet');
  const {wallet} = useWallet()
  const transactions = [
    { id: 1, type: 'debit', amount: 1200, description: 'Bali Trip Booking', date: '2024-08-15', agency: 'Paradise Tours' },
    { id: 2, type: 'credit', amount: 500, description: 'Referral Bonus', date: '2024-08-10', agency: null },
    { id: 3, type: 'debit', amount: 1800, description: 'Swiss Alps Adventure', date: '2024-06-10', agency: 'Alpine Adventures' },
    { id: 4, type: 'credit', amount: 100, description: 'Cashback Reward', date: '2024-06-05', agency: null },
    { id: 5, type: 'debit', amount: 950, description: 'Santorini Getaway', date: '2024-04-20', agency: 'Greek Getaways' }
  ];
  
  const paymentMethods = [
    { id: 1, type: 'visa', last4: '4532', expiry: '12/26', isDefault: true },
    { id: 2, type: 'mastercard', last4: '8901', expiry: '09/25', isDefault: false },
    { id: 3, type: 'paypal', email: 'muthu@gmail.com', isDefault: false }
  ];

  const WalletTabButton = ({ id, label, isActive, onClick }) => (
    <Button
      onClick={() => onClick(id)}
      variant={isActive ? "default" : "ghost"}
      className={`${isActive ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-blue-500'}`}
    >
      {label}
    </Button>
  );    
    return(
        <>
      <TabsContent value="wallet" className="space-y-6">
        <div className="max-w-6xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-sm">Available Balance</h3>
                  <button 
                    onClick={() => setShowBalance(!showBalance)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {showBalance ? wallet.balance : '****'}
                </p>
              </CardContent>
            </Card>
            
            {/* <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-sm">Total Spent</h3>
                  <ArrowUpRight className="w-4 h-4 text-red-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">$4,950</p>
              </CardContent>
            </Card> */}
                      
            {/* <Card className="shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-gray-600 text-sm">Active Trips</h3>
                  <Shield className="w-4 h-4 text-blue-500" />
                </div>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </CardContent>
            </Card> */}
          </div>

          {/* Wallet Navigation Tabs */}
          <div className="flex space-x-2 mb-6 bg-white p-2 rounded-lg shadow-sm">
            <WalletTabButton id="wallet" label="Wallet" isActive={activeWalletTab === 'wallet'} onClick={setActiveWalletTab} />
            <WalletTabButton id="history" label="Transaction History" isActive={activeWalletTab === 'history'} onClick={setActiveWalletTab} />
          </div>

          {/* Wallet Tab Content */}
          {activeWalletTab === 'wallet' && (
            <div className="space-y-6">
              {/* Recent Transactions Preview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Transactions</CardTitle>
                    <Button 
                      variant="ghost" 
                      onClick={() => setActiveWalletTab('history')}
                      className="text-blue-500 hover:underline"
                    >
                      View All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {transactions.slice(0, 3).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {transaction.type === 'credit' ? 
                              <ArrowDownLeft className="w-5 h-5 text-green-600" /> : 
                              <ArrowUpRight className="w-5 h-5 text-red-600" />
                            }
                          </div>
                          <div>
                            <p className="font-medium">{transaction.description}</p>
                            <p className="text-sm text-gray-600">{transaction.date}</p>
                          </div>
                        </div>
                        <span className={`font-bold ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {activeWalletTab === 'history' && (
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          {transaction.type === 'credit' ? 
                            <ArrowDownLeft className="w-6 h-6 text-green-600" /> : 
                            <ArrowUpRight className="w-6 h-6 text-red-600" />
                          }
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          {transaction.agency && (
                            <p className="text-sm text-blue-600">{transaction.agency}</p>
                          )}
                          <p className="text-sm text-gray-600">{transaction.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`text-lg font-bold ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}${transaction.amount}
                        </span>
                        <p className="text-sm text-gray-600">Completed</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </TabsContent>        
        </>
    )
}