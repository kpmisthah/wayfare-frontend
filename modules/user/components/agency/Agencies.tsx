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
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Agency } from "../../types/agency.type";
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
  console.log(agencies,'agencieeeessssss in agenciesss.tsx')
  // const filteredAgencies = agencies.filter((agency: Agency) =>
  //   agency.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  return (
    <div className="min-h-screen bg-background">
      
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-background to-muted py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Trusted Travel <span className="text-primary">Agencies</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connect with verified travel agencies and discover amazing
            destinations with expert guidance
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search agencies, locations, or specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="az">A → Z</SelectItem>
                  <SelectItem value="za">Z → A</SelectItem>
                  <SelectItem value="packages">Most Packages</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{agencies.length} agencies found</span>
            </div>
          </div>
        </div>
      </section>

      {/* Agencies Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {agencies.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agencies.map((agency) => (
                  <AgencyCard
                    key={agency.id}
                    id={agency.id}
                    name={agency.user.name}
                    description={agency.description}
                    image={agency.user.image}
                  />
                ))}
              </div>

              <div className="flex justify-center items-center gap-4 mt-8">
                <Button
                  onClick={prevPage}
                  variant="outline"
                  disabled={page === 1}
                >
                  Previous
                </Button>

                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>

                <Button
                  onClick={nextPage}
                  variant="outline"
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            </>
          ) : (
            <div className="text-center text-gray-500 py-10">
              No agencies found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Agencies;
//...............................

