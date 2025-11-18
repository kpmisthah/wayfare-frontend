"use client";
import { useEffect, useState } from "react";
import { Agency, AgencyRequest } from "../../types/agency.type";
// import { useAgencies } from "./use-agency-management";
import { AgencyStatus } from "../../types/agency.status.enum";
import {approvalAgencies,getAgencies,updateAgencies} from "../../services/agency.service";

export const agencyActions = () => {
  // const { agencies, setAgencies, updateStatus,approvalAgent } = useAgencies();
  const [agencies, setAgencies] = useState<Agency[]>([]);
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getAgencies();
      console.log(data,'in fetchUser');
      
      setAgencies(data);
    };
    fetchUser();
  }, []);
  useEffect(()=>{
    console.log(agencies,'agencies in useEffect')
  },[agencies])

  // const updateStatus = async (
  //   id: string,
  //   isBlock: boolean,
  //   email: string,
  //   name: string
  // ) => {
  //   try {
  //     let updatedAgency = await updateAgencies(id, isBlock, email, name);
  //     setAgencies((prevAgency) =>
  //       prevAgency.map((agency) =>
  //         agency.id == id ? { ...agency, status } : agency
  //       )
  //     );
  //     return updatedAgency;
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };
  const [searchTerm, setSearchTerm] = useState("");
  // const [requests, setRequests] = useState<AgencyRequest[]>([]);
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<AgencyRequest | null>(
    null
  );
  const [agencyTab, setAgencyTab] = useState<"agencies" | "requests">(
    "agencies"
  );
  const [editAgencyOpen, setEditAgencyOpen] = useState(false);
  const [deleteAgencyOpen, setDeleteAgencyOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>("");
  const [editRequestOpen, setEditRequestOpen] = useState(false);
  const [editSaveLoadingId, setEditSaveLoadingId] = useState(false);
  const handleDeleteAgency = () => {
    if (selectedAgency) {
      setAgencies((prev) => prev.filter((a) => a.id !== selectedAgency.id));
      setDeleteAgencyOpen(false);
      setSelectedAgency(null);
    }
  };

  const handleApprovalAgency = async (updateAgency: Agency) => {
    try {
      // let verified = updateAgency.user.verified = true
      console.log(updateAgency,'updateagenyc wehecn click accept button');
      
      const newAGencies = await approvalAgencies(updateAgency.id);
      console.log(newAGencies, "newAgencies");
      setAgencies((prev) =>
        prev.map((agency) =>
          agency.id === updateAgency.id ? newAGencies : agency
        )
      );
      setEditAgencyOpen(false);
    } catch (error) {
      setEditSaveLoadingId(false);
    } finally {
      setEditSaveLoadingId(false);
    }
  };

  // const handleSaveAgency = async (updatedAgency: Agency) => {
  //   try {
  //     setEditSaveLoadingId(true);
  //     const newAGencies = await updateAgencies(
  //       updatedAgency.id,
  //       updatedAgency.user.isBlock,
  //       updatedAgency.user.email,
  //       updatedAgency.user.name
  //     );
  //     setAgencies((prev) =>
  //       prev.map((agency) =>
  //         agency.id === updatedAgency.id ? newAGencies : agency
  //       )
  //     );
  //     setEditAgencyOpen(false);
  //   } catch (error) {
  //     setEditSaveLoadingId(false);
  //   } finally {
  //     setEditSaveLoadingId(false);
  //   }
  // };

  const handleBlockAgency = async (updateAgency: Agency) => {
    console.log(updateAgency,'updateAGency');
    
    try {
      setLoading(updateAgency.id);
     let agencyStatus = await updateAgencies(
        updateAgency.id
      );
      setAgencies((prev)=>
      prev.map((agency)=>
      agency.id == updateAgency.id?{...agency,user:{...agency.user,isBlock:agencyStatus.isBlock}}:agency
      ))
    } catch (error) {
      setLoading(null);
    } finally {
      setLoading(null);
    }
    //  setEditAgencyOpen(false);
  };

  const handleSaveRequest = (updated: any) => {
    setAgencies((prev) => prev.map((r) => (r.id === updated.id ? updated : r)));
    setEditRequestOpen(false);
  };


  const filteredAgencies = agencies.filter(
    (agency) =>
      agency.user.isVerified == true &&
      (agency.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agency.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredRequests = agencies
    .filter((agency) => agency.user.isVerified == false)
    .filter(
      (agency) =>
        agency.user.name
          .toLocaleLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        agency.user.email.toLocaleLowerCase().includes(searchTerm.toLowerCase())
    );

  return {
    // handleRejectRequest,
    handleApprovalAgency,
    handleDeleteAgency,
    // handleSaveAgency,
    handleSaveRequest,
    filteredAgencies,
    filteredRequests,
    agencyTab,
    setAgencyTab,
    searchTerm,
    setSearchTerm,
    selectedAgency,
    setSelectedAgency,
    editAgencyOpen,
    setEditAgencyOpen,
    deleteAgencyOpen,
    setDeleteAgencyOpen,
    setSelectedRequest,
    setEditRequestOpen,
    selectedRequest,
    editRequestOpen,
    loading,
    handleBlockAgency,
    setEditSaveLoadingId,
    editSaveLoadingId,
    // handleApproveRequest,
  };
};
