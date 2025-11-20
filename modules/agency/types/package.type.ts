import { PackageStatus } from "./package.enum";

export interface Itinerary {
  day: number;
  activities: string;
  meals: string;
  accommodation: string;
}
export interface PackageData {
  id: string;
  // bookings: never[];
  title: string;
  destination: string;
  description: string;
  highlights: string;
  duration: string;
  picture: File[];
  price: string;
  itinerary: Itinerary[];
  status?: PackageStatus;
  vehicle: string;
  pickup_point: string;
  drop_point: string;
  details: string;
}
export interface PackageListing {
  id: string;
  itineraryName: string;
  destination: string;
  duration: string;
  status: PackageStatus;
  createdAt: string;
  [key: string]: string;
}
export interface packageList {
  id: string;
  bookings: never[];
  title: string;
  destination: string;
  description: string;
  highlights: string;
  duration: string;
  picture: string[];
  price: string;
  itinerary: Itinerary[];
  status?: "ACTIVE";
  vehicle: string;
  pickup_point: string;
  drop_point: string;
  details: string;
}
export interface Package {
  id: string;
  title: string;
  destination: string;
  duration: string;
  status: PackageStatus;
}
export interface InitialFormData {
  title: string;
  destination: string;
  pricePerPerson: string;
  totalDays: string;
  itineraries: string[];
  summary: string;
  highlights: string[];
  pickupPoint: string;
  dropPoint: string;
  transportationDetails: string;
  gallery: string[];
  bookings: any[];
  vehicle: string;
}

export interface AddPackageFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  editingPackage: PackageData | null;
  // setEditingPackage: React.Dispatch<React.SetStateAction<PackageData>>;
  formData: InitialFormData;
  setFormData: React.Dispatch<React.SetStateAction<InitialFormData>>;
  handlePublish: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  packageData: PackageData;
  setPackageData: React.Dispatch<React.SetStateAction<PackageData>>;
  handleItineraryChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    dayIndex: number
  ) => void;
  removeArrayField: (field: keyof InitialFormData, index: number) => void;
  initialFormData: InitialFormData;
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  isPublishing:boolean
}
