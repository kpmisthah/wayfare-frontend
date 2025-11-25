interface StepProgressProps {
  steps: { id: number; name: string; icon: any }[];
  currentStep: number;
}

export const StepProgress: React.FC<StepProgressProps> = ({ steps, currentStep }) => (
  <div className="flex flex-wrap items-center justify-center gap-6 max-w-4xl mx-auto mb-8">
    {steps.map((step, index) => {
      const Icon = step.icon;
      const isActive = currentStep === step.id;
      const isCompleted = currentStep > step.id;

      return (
        <div key={step.id} className="flex items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
              isActive
                ? "bg-blue-500 border-blue-500 text-white"
                : isCompleted
                ? "bg-green-500 border-green-500 text-white"
                : "bg-white border-gray-300 text-gray-400"
            }`}
          >
            <Icon className="w-5 h-5" />
          </div>
          <span
            className={`ml-2 text-sm font-medium ${
              isActive
                ? "text-blue-600"
                : isCompleted
                ? "text-green-600"
                : "text-gray-400"
            }`}
          >
            {step.name}
          </span>
          {index < steps.length - 1 && (
            <div
              className={`hidden lg:block w-16 h-1 mx-4 rounded-full ${
                isCompleted ? "bg-green-300" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);
