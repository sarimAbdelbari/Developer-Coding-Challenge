import React from 'react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { Check } from 'lucide-react'

interface Step {
  id: number;
  label: string;
  status: 'completed' | 'active' | 'pending';
}

interface ProgressStepsProps {
  currentStep?: number;
  className?: string;
}

export const ProgressSteps: React.FC<ProgressStepsProps> = ({ 
  currentStep = 3, 
  className 
}) => {
  const steps: Step[] = [
    { id: 1, label: 'Postcode', status: currentStep > 1 ? 'completed' : currentStep === 1 ? 'active' : 'pending' },
    { id: 2, label: 'Waste Type', status: currentStep > 2 ? 'completed' : currentStep === 2 ? 'active' : 'pending' },
    { id: 3, label: 'Skip Size', status: currentStep > 3 ? 'completed' : currentStep === 3 ? 'active' : 'pending' },
    { id: 4, label: 'Permit', status: currentStep > 4 ? 'completed' : currentStep === 4 ? 'active' : 'pending' },
    { id: 5, label: 'Date', status: currentStep > 5 ? 'completed' : currentStep === 5 ? 'active' : 'pending' },
    { id: 6, label: 'Payment', status: currentStep > 6 ? 'completed' : currentStep === 6 ? 'active' : 'pending' },
  ];

  return (
    <Card className={cn("p-4 sm:p-6 mb-8 sm:mb-10", className)}> {/* Adjusted padding */}
      <div className="flex justify-between items-start sm:items-center gap-1 xs:gap-2"> {/* Adjusted gap and items-start for mobile */}
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col sm:flex-row items-center text-center sm:text-left"> {/* Stack icon and label on mobile */}
            <div className="flex items-center">
              <div
                className={cn(
                  "flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200 shrink-0", // Adjusted size, added shrink-0
                  step.status === 'completed' && "bg-primary border-primary text-primary-foreground",
                  step.status === 'active' && "bg-primary border-primary text-primary-foreground ring-2 ring-primary/50 ring-offset-2", // Adjusted ring
                  step.status === 'pending' && "bg-muted border-border text-muted-foreground"
                )}
              >
                {step.status === 'completed' ? (
                  <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> // Adjusted icon size
                ) : (
                  <span className="text-xs sm:text-sm font-semibold">{step.id}</span> // Adjusted font size
                )}
              </div>
              <span
                className={cn(
                  "hidden sm:block ml-2 sm:ml-3 text-xs sm:text-sm text-nowrap font-medium transition-colors duration-200", // Adjusted font size, hidden on xs
                  step.status === 'completed' && "text-primary",
                  step.status === 'active' && "text-foreground font-semibold",
                  step.status === 'pending' && "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </div>
            {/* Label for very small screens, below the circle */}
            <span
              className={cn(
                "block sm:hidden mt-1 text-[10px] xs:text-xs leading-tight", // Smaller text for mobile label
                step.status === 'completed' && "text-primary",
                step.status === 'active' && "text-foreground font-semibold",
                step.status === 'pending' && "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
            
            {/* Connector line - hidden on last step */}
            {index < steps.length - 1 && (
              <div 
                className={cn(
                  "hidden sm:block w-4 md:w-8 lg:w-12 h-0.5 ml-2 sm:ml-2 sm:mr-0 transition-colors duration-200 flex-grow", // Adjusted margin, added flex-grow
                  step.status === 'completed' ? "bg-primary" : "bg-border"
                )}
              />
            )}
          </div>
        ))}
      </div>
    </Card>
  )
}