import { PackageData } from "./package.type"

export interface AgencyProfile {
    name: string,
    email: string,
    phone: string,
    address: string,
    specialization: string[],
    description: string
    licenseNumber: string
    ownerName: string
    websiteUrl: string
    profileImage?: string
    bannerImage?: string
}

export interface updateAgency {
    name?: string,
    email?: string,
    phone?: string,
    address?: string,
    specialization?: string[],
    description?: string
    licenseNumber?: string
    ownerName?: string
    websiteUrl?: string
}


export interface RenderStepProps {
    packageData?: PackageData
    handleInputChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleAddHighlight?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    handleFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export interface RenderStepProps2 {
    packageData: PackageData
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    addDay: () => void
    handleTotalDaysChange: (newTotalDays: number) => void
    goToNextDay: () => void
    goToPrevDay: () => void
    goToday: (dayIndex: number) => void
    currentDayIndex: number,
    handleItineraryChange: (dayIndex: number, field: string, value: string) => void
}