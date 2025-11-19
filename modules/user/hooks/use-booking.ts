"use client";

import React, { useEffect, useState } from "react";
import { fetchPackagesById } from "../services/agency-packages.api";
import { Package } from "../types/package.type";
import { useSearchParams } from "next/navigation";
import { bookPackage } from "@/modules/agency/services/booking.api";
import { loadStripe } from "@stripe/stripe-js";
import { Elements,CardElement,useStripe,useElements } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
export const useBooking = (id: string) => {
  const [packages, setPackages] = useState<Package | null>(null);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router= useRouter()
  const searchParams = useSearchParams();
  const startDate = searchParams.get("startDate");
  console.log(startDate, "strtDate");
  const travelers = searchParams.get("travelers");
  console.log(travelers, "travelers");

  useEffect(() => {
    const fetchPackages = async () => {
      const result = await fetchPackagesById(id);
      setPackages(result);
    };
    fetchPackages();
  }, [id]);


  const handleSubmit = async(e:React.FormEvent,paymentType:'card'|'wallet') => {
    e.preventDefault();
    if (!packages) return;
    setLoading(true);
    try {
      if(packages){
      let data = {
        packageId:packages.id,
        travelDate:startDate,
        peopleCount:Number(travelers),
        totalAmount:Number(packages?.price),
        paymentType
      }
      const result = await bookPackage(data) 
      console.log(result,'booking successful');
      if(paymentType == 'card'){
      setClientSecret(result.clientSecret);
      }
      if(paymentType == 'wallet'){    
        console.log("Ivide paymetType wallet kk verndooo nokaaaaanm");
        router.push('/booking/success?booking_id='+result.booking.id+'&payment_method=wallet')
      }
      return result
    }
   
    } catch (error) {
      console.error(error);
    }finally{
      setLoading(false);
    }
    

  };

  return {
    packages,
    handleSubmit,
    startDate,
    travelers,
    clientSecret
  };
};
