import { useEffect, useState } from "react";
import {
  InitialFormData,
  Itinerary,
  PackageData,
  packageList,
} from "../types/package.type";
import {
  addPackage,
  fetchPackages,
  updatedPackage,
} from "../services/package.api";
import { getAgencyProfile } from "../services/agency.api";
import { PackageStatus } from "../types/package.enum";

export const useAddPackage = (
  setPackages?: React.Dispatch<React.SetStateAction<PackageData[]>>
) => {
  const [agency, setAgency] = useState(null);
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [editingPackage, setEditingPackage] = useState<PackageData | null>({
    id: "",
    description: "",
    destination: "",
    details: "",
    drop_point: "",
    duration: "",
    highlights: "",
    itinerary: [],
    pickup_point: "",
    picture: [],
    price: "",
    title: "",
    vehicle: "",
    status: PackageStatus.ACTIVE,
  });
  const initialFormData = {
    title: "",
    destination: "",
    pricePerPerson: "",
    totalDays: "",
    itineraries: [""],
    summary: "",
    highlights: [""],
    pickupPoint: "",
    dropPoint: "",
    transportationDetails: "",
    gallery: [""],
    bookings: [],
    vehicle: "",
  };
  const [formData, setFormData] = useState<InitialFormData>({
    title: "",
    destination: "",
    pricePerPerson: "",
    totalDays: "",
    itineraries: [],
    summary: "",
    highlights: [],
    pickupPoint: "",
    dropPoint: "",
    transportationDetails: "",
    gallery: [],
    bookings: [],
    vehicle: "",
  });
  const [showForm, setShowForm] = useState(false);

  const [packageData, setPackageData] = useState<PackageData>({
    title: "",
    itinerary: [],
    description: "",
    destination: "",
    duration: "",
    highlights: "",
    picture: [],
    price: "",
    status: PackageStatus.ACTIVE,
    vehicle: "",
    pickup_point: "",
    drop_point: "",
    details: "",
    // bookings: [],
    id: "",
  });

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const response = await getAgencyProfile();
        console.log(response, "response");

        setAgency(response);
      } catch (error) {
        setAgency(null);
      }
    };
    fetchAgency();
  }, []);
  useEffect(() => {
    console.log(agency);
  }, []);
  const [currentStep, setCurrentStep] = useState(1);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    console.log(name, "name");
    console.log(value, "value");
    setPackageData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log(files, "fileesssss");
    if (!files) return;
    const fileArray = Array.from(files);
    console.log(fileArray, "fileArraaaaaaaaaaaaaaayy");
    setPackageData((prev) => ({ ...prev, picture: fileArray }));
  };
  const handleAddHighlight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setPackageData((prev) => ({
      ...prev,
      highlights: value,
    }));
  };

  const removePhoto = (index: number) => {
    setPackageData((prev) => ({
      ...prev,
      photos: prev.picture.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addDay = () => {
    console.log(packageData.itinerary.length, "before adding new day");

    const newDay: Itinerary = {
      day: packageData?.itinerary.length + 1,
      activities: "",
      meals: "",
      accommodation: "",
    };
    setPackageData((prev) => ({
      ...prev,
      duration: prev.duration + 1,
      itinerary: [...prev.itinerary, newDay],
    }));
  };
  const handleItineraryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    dayIndex: number
  ) => {
    const { name, value } = e.target;
    setPackageData((prev) => {
      let updateItinerary = [...prev.itinerary];
      updateItinerary[dayIndex] = {
        ...updateItinerary[dayIndex],
        [name]: value,
      };
      return { ...prev, itinerary: updateItinerary };
    });
  };
  const handleTotalDaysChange = (newTotalDays: number) => {
    if (newTotalDays < 1) return;
    setPackageData((prev) => ({ ...prev, duration: String(newTotalDays) }));
    setCurrentDayIndex(0); // Reset to first day
  };

  const goToNextDay = () => {
    if (packageData && currentDayIndex < packageData.itinerary.length - 1) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const goToPreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const goToDay = (dayIndex: React.SetStateAction<number>) => {
    setCurrentDayIndex(dayIndex);
  };
  // Initialize itinerary when component mounts or totalDays changes
  useEffect(() => {
    if (
      packageData?.itinerary.length === 0 ||
      packageData?.itinerary.length !== Number(packageData?.duration)
    ) {
      const newItinerary = Array.from(
        { length: Number(packageData?.duration) },
        (_, index) => ({
          day: index + 1,
          activities: "",
          meals: "",
          accommodation: "",
        })
      );
      setPackageData((prev) => ({ ...prev, itinerary: newItinerary }));
    }
  }, [packageData?.duration]);
  const handlePublish = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      console.log(packageData, "packagedata before adding");
      try {
        if (!editingPackage) {
          console.log("atho ivde aano");
          setIsPublishing(true);
          setIsPublished(false);
          const newPackage = await addPackage({
            title: packageData.title,
            description: packageData.description,
            highlights: packageData.highlights,
            picture: packageData.picture,
            duration: packageData.duration,
            price: packageData.price,
            destination: packageData.destination,
            itinerary: packageData.itinerary,
            vehicle: packageData.vehicle,
            pickup_point: packageData.pickup_point,
            drop_point: packageData.drop_point,
            details: packageData.details,
          });
          setPackages && setPackages((prev) => [...prev, newPackage]);
          setShowForm(false);
        } else {
          console.log("videe else case work aavndooo");
          let updatePackage = await updatedPackage(packageData, editingPackage.id);
          setPackages && setPackages((prev)=>
          prev.map((pkg)=>pkg.id == editingPackage.id?updatePackage:pkg)
          )
          setShowForm(false)
        }
        setIsPublished(true);
      } catch (error) {
        console.log(error);
      } finally {
        setIsPublishing(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  //.....................

  const handleEdit = (pkg: PackageData) => {
    setEditingPackage(pkg);
    setPackageData(pkg);
    setShowForm(true);
  };
  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure you want to delete this package?")) {
  //     const updatedPackages = packages.filter((pkg) => pkg.id !== id);
  //     saveData(updatedPackages);
  //   }
  // };

  const addArrayField = (field) => {
    setPackageData({
      ...packageData,
      [field]: [...packageData[field], ""],
    });
  };
  const updateArrayField = (field, index, value) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  const removeArrayField = (field, index) => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData({
      ...formData,
      [field]: newArray,
    });
  };

  
  return {
    packageData,
    setPackageData,
    currentStep,
    setCurrentStep,
    previewImages,
    setPreviewImages,
    handleInputChange,
    handleFileChange,
    handleAddHighlight,
    removePhoto,
    handlePublish,
    addDay,
    handleTotalDaysChange,
    goToNextDay,
    goToPreviousDay,
    goToDay,
    currentDayIndex,
    handleItineraryChange,
    agency,
    isPublished,
    isPublishing,
    showForm,
    editingPackage,
    setFormData,
    removeArrayField,
    setShowForm,
    setEditingPackage,
    initialFormData,
    // handleDelete,
    handleEdit,
    formData,

  };
};
