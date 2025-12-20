"use client";
import { useWallet } from "@/modules/user/hooks/use-wallet";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { TabsContent } from "@/shared/components/ui/tabs";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  EyeOff,
  Wallet as WalletIcon,
  Calendar,
  Clock,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/shared/components/ui/badge";
import { Input } from "@/shared/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";

interface WalletTabButtonProps {
  id: string;
  label: string;
  isActive: boolean;
  onClick: (id: string) => void;
}

const WalletTabButton = ({ id, label, isActive, onClick }: WalletTabButtonProps) => (
  <Button
    onClick={() => onClick(id)}
    variant={isActive ? "default" : "ghost"}
    size="sm"
    className={`${isActive
      ? "bg-primary text-primary-foreground shadow-sm"
      : "text-muted-foreground hover:text-foreground"
      }`}
  >
    {label}
  </Button>
);

export const Wallet = ({ activeTab }: { activeTab: string }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [activeWalletTab, setActiveWalletTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const {
    wallet,
    transactionData,
    isLoading,
    page,
    totalPages,
    total,
    nextPage,
    prevPage,
    goToPage,
  } = useWallet(activeTab);


  const filteredTransactions = transactionData.filter((t) => {
    const matchesTab =
      activeWalletTab === "all" ||
      (activeWalletTab === "credit" && t.transactionType === "CREDIT") ||
      (activeWalletTab === "debit" && t.transactionType === "DEBIT");

    const dateStr = t.date ? new Date(t.date).toLocaleDateString() : "";

    const matchesSearch =
      t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.amount.toString().includes(searchTerm) ||
      dateStr.includes(searchTerm);

    return matchesTab && matchesSearch;
  });

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(date);
    } catch (e) {
      return "Invalid Date";
    }
  };

  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(date);
    } catch (e) {
      return "";
    }
  };

  // Get category display info
  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'USER_PAYMENT':
        return { label: 'Booking Payment', color: 'bg-blue-100 text-blue-700' };
      case 'ADMIN_CREDIT':
        return { label: 'Admin Credit', color: 'bg-purple-100 text-purple-700' };
      case 'AGENCY_CREDIT':
        return { label: 'Agency Credit', color: 'bg-indigo-100 text-indigo-700' };
      case 'REFUND':
        return { label: 'Refund', color: 'bg-green-100 text-green-700' };
      case 'WITHDRAWAL':
        return { label: 'Withdrawal', color: 'bg-orange-100 text-orange-700' };
      default:
        return { label: 'Transaction', color: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <TabsContent value="wallet" className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Helper layout for Balance Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Balance Card */}
          <Card className="col-span-1 md:col-span-2 shadow-sm border-primary/20 bg-gradient-to-br from-card to-primary/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-full opacity-60 pointer-events-none" />
            <CardHeader className="pb-2">
              <CardDescription className="flex items-center gap-2 text-primary/80 font-medium">
                <WalletIcon className="h-4 w-4" />
                Wallet Balance
              </CardDescription>
              <div className="flex items-center justify-between pt-2">
                <div className="space-y-1">
                  <h2 className="text-4xl font-bold tracking-tight">
                    {showBalance ? (
                      <span className="flex items-baseline gap-1">
                        <span className="text-2xl font-normal text-muted-foreground">₹</span>
                        {wallet.balance?.toLocaleString('en-IN') || 0}
                      </span>
                    ) : (
                      "••••••"
                    )}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Available for bookings & refunds
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowBalance(!showBalance)}
                  className="rounded-full hover:bg-background/80"
                >
                  {showBalance ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mt-4">
                <Button className="w-full sm:w-auto gap-2">
                  <ArrowDownLeft className="h-4 w-4" />
                  Topup Wallet
                </Button>
                {/* <Button variant="outline" className="w-full sm:w-auto gap-2">
                    Withdraw
                 </Button> */}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats or Promo placeholder */}
          <Card className="col-span-1 shadow-sm bg-muted/30 flex flex-col justify-center items-center text-center p-6 border-dashed">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">Total Transactions</h3>
            <p className="text-3xl font-bold text-foreground/80">{transactionData.length}</p>
            <p className="text-xs text-muted-foreground mt-2">Lifetime activity</p>
          </Card>
        </div>

        {/* Transaction History Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold tracking-tight">Transaction History</h3>
              <p className="text-sm text-muted-foreground">Detailed view of your credits and debits</p>
            </div>

          </div>

          <Card className="shadow-sm overflow-hidden">
            <div className="p-4 border-b flex flex-col md:flex-row gap-4 justify-between items-center bg-muted/10">
              {/* Tabs */}
              <div className="flex bg-muted p-1 rounded-lg w-full md:w-auto">
                <WalletTabButton
                  id="all"
                  label="All"
                  isActive={activeWalletTab === "all"}
                  onClick={setActiveWalletTab}
                />
                <WalletTabButton
                  id="credit"
                  label="Credits"
                  isActive={activeWalletTab === "credit"}
                  onClick={setActiveWalletTab}
                />
                <WalletTabButton
                  id="debit"
                  label="Debits"
                  isActive={activeWalletTab === "debit"}
                  onClick={setActiveWalletTab}
                />
              </div>

              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  className="pl-9 h-10 bg-background"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <CardContent className="p-0">
              {/* Desktop Table View - Hidden on Mobile */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/30 hover:bg-muted/30">
                      <TableHead className="w-[150px]">Date & Time</TableHead>
                      <TableHead>Transaction</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Related To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.length > 0 ? (
                      filteredTransactions.map((transaction) => {
                        const categoryInfo = getCategoryInfo(transaction.category);
                        return (
                          <TableRow key={transaction.id} className="group hover:bg-muted/20">
                            {/* Date & Time */}
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="font-medium text-foreground text-sm">{formatDate(transaction.date)}</span>
                                <span className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatTime(transaction.date)}
                                </span>
                              </div>
                            </TableCell>

                            {/* Transaction Type with Icon */}
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${transaction.transactionType === "CREDIT" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                  {transaction.transactionType === "CREDIT" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                                </div>
                                <div>
                                  <p className="font-medium text-sm">
                                    {transaction.transactionType === "CREDIT" ? "Credit" : "Debit"}
                                  </p>
                                  <p className="text-xs text-muted-foreground font-mono">
                                    #{transaction.id.slice(0, 8)}
                                  </p>
                                </div>
                              </div>
                            </TableCell>

                            {/* Category Badge */}
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`text-xs ${categoryInfo.color}`}
                              >
                                {categoryInfo.label}
                              </Badge>
                            </TableCell>

                            {/* Related Booking/Agency */}
                            <TableCell>
                              <div className="space-y-1 max-w-[180px]">
                                {transaction.booking ? (
                                  <div className="text-sm">
                                    <p className="font-medium text-foreground truncate" title={transaction.booking.package?.destination || transaction.booking.package?.itineraryName}>
                                      {transaction.booking.package?.destination || transaction.booking.package?.itineraryName || 'Trip'}
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                      Booking: {transaction.booking.bookingCode}
                                    </p>
                                  </div>
                                ) : transaction.agency?.user?.name ? (
                                  <div className="text-sm">
                                    <p className="font-medium text-foreground truncate">
                                      {transaction.agency.user.name}
                                    </p>
                                    <p className="text-xs text-muted-foreground">Agency</p>
                                  </div>
                                ) : (
                                  <span className="text-xs text-muted-foreground">—</span>
                                )}
                              </div>
                            </TableCell>

                            {/* Status */}
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={`capitalize text-xs ${transaction.paymentStatus.toLowerCase() === 'succeeded' ||
                                  transaction.paymentStatus.toLowerCase() === 'confirmed' ||
                                  transaction.paymentStatus.toLowerCase() === 'success' ||
                                  transaction.paymentStatus.toLowerCase() === 'paid'
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : transaction.paymentStatus.toLowerCase() === 'pending'
                                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                    : "bg-red-50 text-red-700 border-red-200"
                                  }`}
                              >
                                {transaction.paymentStatus}
                              </Badge>
                            </TableCell>

                            {/* Amount */}
                            <TableCell className="text-right">
                              <span className={`font-bold text-base ${transaction.transactionType === "CREDIT" ? "text-green-600" : "text-red-500"}`}>
                                {transaction.transactionType === "CREDIT" ? "+" : "-"}₹{typeof transaction.amount === 'number' ? transaction.amount.toLocaleString('en-IN') : transaction.amount}
                              </span>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="h-48 text-center">
                          <div className="flex flex-col items-center justify-center text-muted-foreground">
                            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                              <Search className="h-8 w-8 opacity-50" />
                            </div>
                            <p className="font-medium">No transactions found</p>
                            <p className="text-sm">Try adjusting your filters or search</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View - Shown only on Mobile */}
              <div className="md:hidden">
                {filteredTransactions.length > 0 ? (
                  <div className="divide-y">
                    {filteredTransactions.map((transaction) => {
                      const categoryInfo = getCategoryInfo(transaction.category);
                      return (
                        <div key={transaction.id} className="p-4 hover:bg-muted/20 transition-colors">
                          {/* Top Row: Type Icon + Amount */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-full ${transaction.transactionType === "CREDIT" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                {transaction.transactionType === "CREDIT" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                              </div>
                              <div>
                                <p className="font-medium text-sm">
                                  {transaction.transactionType === "CREDIT" ? "Credit" : "Debit"}
                                </p>
                                <p className="text-xs text-muted-foreground font-mono">
                                  #{transaction.id.slice(0, 8)}
                                </p>
                              </div>
                            </div>
                            <span className={`font-bold text-lg ${transaction.transactionType === "CREDIT" ? "text-green-600" : "text-red-500"}`}>
                              {transaction.transactionType === "CREDIT" ? "+" : "-"}₹{typeof transaction.amount === 'number' ? transaction.amount.toLocaleString('en-IN') : transaction.amount}
                            </span>
                          </div>

                          {/* Middle Row: Date, Category, Status */}
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {formatDate(transaction.date)}
                            </span>
                            <span className="text-xs text-muted-foreground">•</span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTime(transaction.date)}
                            </span>
                          </div>

                          {/* Bottom Row: Category + Status Badges */}
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${categoryInfo.color}`}
                            >
                              {categoryInfo.label}
                            </Badge>
                            <Badge
                              variant="outline"
                              className={`capitalize text-xs ${transaction.paymentStatus.toLowerCase() === 'succeeded' ||
                                transaction.paymentStatus.toLowerCase() === 'confirmed' ||
                                transaction.paymentStatus.toLowerCase() === 'success' ||
                                transaction.paymentStatus.toLowerCase() === 'paid'
                                ? "bg-green-50 text-green-700 border-green-200"
                                : transaction.paymentStatus.toLowerCase() === 'pending'
                                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                                }`}
                            >
                              {transaction.paymentStatus}
                            </Badge>
                          </div>

                          {/* Related To (if exists) */}
                          {(transaction.booking || transaction.agency?.user?.name) && (
                            <div className="mt-2 pt-2 border-t border-dashed">
                              {transaction.booking ? (
                                <div className="text-sm">
                                  <p className="font-medium text-foreground truncate">
                                    {transaction.booking.package?.destination || transaction.booking.package?.itineraryName || 'Trip'}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    Booking: {transaction.booking.bookingCode}
                                  </p>
                                </div>
                              ) : transaction.agency?.user?.name && (
                                <div className="text-sm">
                                  <p className="font-medium text-foreground truncate">
                                    {transaction.agency.user.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">Agency</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Search className="h-8 w-8 opacity-50" />
                      </div>
                      <p className="font-medium">No transactions found</p>
                      <p className="text-sm">Try adjusting your filters or search</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
              <p className="text-sm text-muted-foreground text-center sm:text-left">
                Page {page} of {totalPages} ({total} total)
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevPage}
                  disabled={page === 1 || isLoading}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Previous</span>
                </Button>

                {/* Page numbers - hidden on mobile */}
                <div className="hidden sm:flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    return (
                      <Button
                        key={pageNum}
                        variant={page === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => goToPage(pageNum)}
                        disabled={isLoading}
                        className="w-9"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                </div>

                {/* Page indicator for mobile */}
                <span className="sm:hidden text-sm font-medium px-3">
                  {page} / {totalPages}
                </span>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextPage}
                  disabled={page === totalPages || isLoading}
                >
                  <span className="hidden sm:inline mr-1">Next</span>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
};

