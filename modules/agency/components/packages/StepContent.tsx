import { RenderStep1 } from "./basic-info";
import { RenderStep2 } from "./Details";
import { RenderStep3 } from "./Package-details";
import { RenderStep4 } from "./Accommodation";
import { RenderStep5 } from "./Package-photo";
import { RenderStep6 } from "./Activities";
// import { RenderStep7 } from "./Media";
import { RenderStep7 } from "./Review";

interface StepContentProps {
  currentStep: number;
  packageData: any;
  handleInputChange: any;
  handleAddHighlight: any;
  handleFileChange: any;
  addDay:any
  handleTotalDaysChange:any
  goToNextDay:any
  goToPrevDay:any
  goToday:any
  currentDayIndex:any,
  handleItineraryChange:any
}

export const StepContent: React.FC<StepContentProps> = ({
  currentStep,
  packageData,
  handleInputChange,
  handleAddHighlight,
  handleFileChange,
  addDay,
  handleTotalDaysChange,
  goToNextDay,
  goToPrevDay,
  goToday,
  currentDayIndex,
  handleItineraryChange
}) => {
  switch (currentStep) {
    case 1:
      return <RenderStep1 packageData={packageData} handleInputChange={handleInputChange} />;
    case 2:
     

      return <RenderStep2 packageData = {packageData} handleInputChange = {handleInputChange} addDay = {addDay} handleTotalDaysChange={handleTotalDaysChange} goToNextDay = {goToNextDay} goToPrevDay = {goToPrevDay} goToday ={goToday} currentDayIndex = {currentDayIndex} handleItineraryChange={handleItineraryChange}/>
      
    case 3:
      return (
        <RenderStep3
          packageData={packageData}
          handleInputChange={handleInputChange}
          handleAddHighlight={handleAddHighlight}
        />
      );
    case 4:
      return <RenderStep4 packageData={packageData} handleInputChange={handleInputChange}/>;
    case 5:
      return <RenderStep5 handleFileChange={handleFileChange} />;
    case 6:
      return <RenderStep6 packageData={packageData} />;

    case 7:
      return <RenderStep7 packageData={packageData} />;
    default:
      return null;
  }
};
