import { Search, Eye, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { agencyActions } from "../../hooks/agency-management/use-agency-action";
import { useState } from "react";
import { AgencyDetailModal } from "./Agency-details-modal";
import debounce from "lodash.debounce";
import { useMemo } from "react";
import BlockAgencyModal from "./Blcok-agency-modal";
const AgencyManagement = () => {
  const {
    filteredAgencies,
    filteredRequests,
    agencyTab,
    setAgencyTab,
    searchTerm,
    setSearchTerm,
    loading,
    selectedAgency,
    setSelectedAgency,
    editAgencyOpen,
    setEditAgencyOpen,
    handleBlockAgency,
    handleApprovalAgency,
    blockModalOpen,
    setBlockModalOpen,
    agencyToBlock,
    setAgencyToBlock,
    currentPage,
    setCurrentPage,
    totalPages,
  } = agencyActions();
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value);
      }, 500),
    [setSearchTerm]
  );

  const [expandedRows, setExpandedRows] = useState(new Set<string>());
  const [showDetailModal, setShowDetailModal] = useState(false);
  const toggleRowExpansion = (agencyId: string) => {
    const newExpanded = new Set(expandedRows);
    newExpanded.has(agencyId)
      ? newExpanded.delete(agencyId)
      : newExpanded.add(agencyId);
    setExpandedRows(newExpanded);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <Card>
        <CardHeader>
          <CardTitle>Agency Management</CardTitle>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Tabs */}
            <div className="flex space-x-2">
              <Button
                variant={agencyTab === "agencies" ? "default" : "outline"}
                onClick={() => setAgencyTab("agencies")}
              >
                Agencies
              </Button>
              <Button
                variant={agencyTab === "requests" ? "default" : "outline"}
                onClick={() => setAgencyTab("requests")}
              >
                Requests
              </Button>
            </div>

            {/* Search */}
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                defaultValue={searchTerm}
                onChange={(e) => debouncedSearch(e.target.value)}
                placeholder={`Search ${agencyTab}`}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {/* Requests List */}
          {agencyTab === "requests" ? (
            <div className="space-y-4">
              {filteredRequests.map((agency) => {
                const isRejected =
                  agency.reason &&
                  agency.reason.trim() !== "" &&
                  agency.reason.trim().toLowerCase() !== "null";
                const isPending = !isRejected;

                return (
                  <div
                    key={agency.user.id}
                    className="border border-gray-200 rounded-lg"
                  >
                    <div className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-4 flex-1">
                        <button
                          onClick={() => toggleRowExpansion(agency.id)}
                          className="p-1 hover:bg-gray-100 rounded"
                          disabled={!isPending} // Optional: disable expansion if rejected
                        >
                          {expandedRows.has(agency.id) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                        </button>

                        <div className="grid grid-cols-1 md:grid-cols-4 flex-1 gap-4">
                          <div>
                            <p className="font-medium">{agency.user.name}</p>
                            <p className="text-sm text-gray-600">
                              {agency.user.email}
                            </p>
                          </div>

                          <div>
                            <Badge
                              variant={isRejected ? "destructive" : "outline"}
                              className={
                                isRejected ? "bg-red-100 text-red-800" : ""
                              }
                            >
                              {isRejected ? "Rejected" : "Pending"}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedAgency(agency);
                                setShowDetailModal(true);
                              }}
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </Button>

                            {/* Only show action buttons if still pending */}
                            {isPending ? (
                              <>
                                <Button
                                  variant="default"
                                  size="sm"
                                  onClick={() =>
                                    handleApprovalAgency(agency, "accept")
                                  }
                                >
                                  Accept
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    const reason = prompt(
                                      "Enter rejection reason:"
                                    );
                                    if (reason?.trim()) {
                                      handleApprovalAgency(
                                        agency,
                                        "reject",
                                        reason
                                      );
                                    }
                                  }}
                                >
                                  Reject
                                </Button>
                              </>
                            ) : (
                              <span className="text-sm text-gray-500 italic">
                                Action completed
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    {expandedRows.has(agency.id) && (
                      <div className="px-4 pb-4 border-t bg-gray-50">
                        <p>
                          <span className="font-medium">Owner:</span>{" "}
                          {agency.ownerName ?? "Not Defined"}
                        </p>
                        <p>
                          <span className="font-medium">License:</span>{" "}
                          {agency.licenseNumber ?? "Not Defined"}
                        </p>
                        <p>
                          <span className="font-medium">Website:</span>{" "}
                          <a
                            href={agency.websiteUrl}
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {agency.websiteUrl ?? "Not Defined"}
                          </a>
                        </p>
                        <p>
                          <span className="font-medium">Address:</span>{" "}
                          {agency.address ?? "Not Defined"}
                        </p>

                        {/* Show rejection reason if exists */}
                        {isRejected && agency.reason && (
                          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                            <p className="text-sm font-medium text-red-800">
                              Rejection Reason:
                            </p>
                            <p className="text-sm text-red-700 mt-1">
                              {agency.reason}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Agencies Table */
            <table className="w-full table-auto">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAgencies.map((agency) => (
                  <tr key={agency.user.id} className="border-b">
                    <td className="px-4 py-3">{agency.user.name}</td>
                    <td className="px-4 py-3">{agency.user.email}</td>
                    <td className="px-4 py-3">
                      <Badge
                        variant={
                          agency.user.isBlock ? "destructive" : "default"
                        }
                      >
                        {agency.user.isBlock ? "Blocked" : "Active"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setSelectedAgency(agency);
                          setShowDetailModal(true);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>

                      <Button
                        size="sm"
                        variant={
                          agency.user.isBlock ? "default" : "destructive"
                        }
                        onClick={() => {
                          // handleBlockAgency({
                          //   ...agency,
                          //   user: {
                          //     ...agency.user,
                          //     isBlock: !agency.user.isBlock,
                          //   },
                          // })
                          setAgencyToBlock(agency);
                          setBlockModalOpen(true);
                        }}
                      >
                        {loading
                          ? "Updating..."
                          : agency.user.isBlock
                          ? "Activate"
                          : "Deactivate"}
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
      <div className="flex justify-between items-center mt-4">
        <Button
          variant="outline"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </Button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <Button
          variant="outline"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </Button>
      </div>

      {/* Modal */}
      <AgencyDetailModal
        agency={selectedAgency}
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        handleApprovalAgency={handleApprovalAgency}
      />
      {/*Block/Unblock Confirmation Modal */}
      {blockModalOpen && agencyToBlock && (
        <BlockAgencyModal
          isOpen={blockModalOpen}
          agency={agencyToBlock}
          loading={loading}
          onClose={() => {
            setBlockModalOpen(false);
            setAgencyToBlock(null);
          }}
          onConfirm={(updatedAgency) => {
            handleBlockAgency(updatedAgency);
            setBlockModalOpen(false);
            setAgencyToBlock(null);
          }}
        />
      )}
    </div>
  );
};

export default AgencyManagement;
