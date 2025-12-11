"use client";

import { Header } from "@/shared/components/layout/Header";
import AgencyCard from "./AgencyCard";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Search,
  SlidersHorizontal,
  Building2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Shield,
  Users
} from "lucide-react";
import { useAgencies } from "../../hooks/use-agency";

const Agencies = () => {
  const {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    agencies,
    page,
    totalPages,
    nextPage,
    prevPage,
  } = useAgencies();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by thousands of travelers</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text">
              Partner with the Best
              <br />
              <span className="text-primary">Travel Agencies</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Connect with verified travel experts who craft unforgettable journeys.
              Your dream destination is just one click away.
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-green-500" />
                </div>
                <span>Verified Agencies</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-blue-500" />
                </div>
                <span>{agencies.length}+ Partners</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-purple-500" />
                </div>
                <span>Expert Guidance</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50 py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search and Sort */}
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search agencies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-72 bg-muted/50 border-border/50 focus:bg-background transition-colors"
                />
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-44 bg-muted/50 border-border/50">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="az">Name: A → Z</SelectItem>
                  <SelectItem value="za">Name: Z → A</SelectItem>
                  <SelectItem value="packages">Most Packages</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Results count */}
            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">{agencies.length}</span> agencies available
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Agencies Grid */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {agencies.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {agencies.map((agency, index) => (
                  <div
                    key={agency.id}
                    className="animate-in fade-in-0 slide-in-from-bottom-4"
                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
                  >
                    <AgencyCard
                      id={agency.id}
                      name={agency.user.name}
                      description={agency.description}
                      image={agency.user.image}
                      location={agency.address}
                    />
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-12">
                  <Button
                    onClick={prevPage}
                    variant="outline"
                    size="lg"
                    disabled={page === 1}
                    className="gap-2"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${pageNum === page
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                          }`}
                        onClick={() => {
                          // Navigate to specific page if needed
                        }}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <Button
                    onClick={nextPage}
                    variant="outline"
                    size="lg"
                    disabled={page === totalPages}
                    className="gap-2"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted/50 flex items-center justify-center">
                <Building2 className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Agencies Found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any agencies matching your search. Try adjusting your filters or search terms.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setSearchTerm("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Agencies;


