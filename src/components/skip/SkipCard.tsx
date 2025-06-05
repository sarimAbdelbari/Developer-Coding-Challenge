import React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertTriangle, Clock, Truck, XCircle } from 'lucide-react'
import fourYardSkip from '@/assets/images/4-yarder-skip.jpg';
import sixYardSkip from '@/assets/images/6-yarder-skip.jpg';
import twentyYardSkip from '@/assets/images/20-yarder-skip.jpg';
import type { Skip } from '@/types/skip';

interface SkipCardProps {
  skip: Skip;
  isSelected?: boolean;
  onSelect: (skip: Skip) => void;
  isDisabled?: boolean;
  displayWithVAT: boolean; 
}

export const SkipCard: React.FC<SkipCardProps> = ({ 
  skip, 
  isSelected = false, 
  onSelect, 
  isDisabled: externallyDisabled = false,
  displayWithVAT
}) => {
  const displayPrice = displayWithVAT ? skip.price_before_vat + skip.vat : skip.price_before_vat;
  const isUnselectableByRestrictions = !skip.allowed_on_road && !skip.allows_heavy_waste;
  const isDisabled = externallyDisabled || isUnselectableByRestrictions || skip.forbidden;
  const isClickable = !isDisabled;

 

  const getSkipDescription = (size: number) => {
    if (size <= 2) return "Small gardens & DIY"; 
    if (size <= 4) return "Home renovations"; 
    if (size <= 8) return "Large projects"; 
    return "Commercial work"; 
  };

  const getPopularBadge = () => {
    return isClickable && skip.size === 4 ? (
      <Badge variant="default" className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-primary text-primary-foreground text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 z-20"> {/* Adjusted size/padding */}
        Popular
      </Badge>
    ) : null;
  };
  


  return (
    <Card 
      className={cn(
        "relative transition-all duration-200 flex flex-col h-full group",
        isClickable ? "cursor-pointer" : "cursor-not-allowed",
        isSelected && isClickable && "ring-2 ring-primary border-primary bg-accent shadow-lg",
        isUnselectableByRestrictions 
          ? "opacity-50 border-dashed border-destructive bg-destructive/5"
          : skip.forbidden
            ? "opacity-60 bg-muted border-dashed" 
            : externallyDisabled
              ? "opacity-70 bg-muted"
              : "hover:-translate-y-1 hover:shadow-xl"
      )}
      onClick={() => isClickable && onSelect(skip)}
    >
      {getPopularBadge()}
      
      {isSelected && isClickable && (
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 w-6 h-6 sm:w-7 sm:h-7 bg-primary rounded-full flex items-center justify-center shadow z-20"> {/* Adjusted size/pos */}
          <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-foreground" /> 
        </div>
      )}

      {isUnselectableByRestrictions && (
        <div className="absolute inset-0 bg-destructive/20 flex items-center justify-center rounded-md z-10 p-2 sm:p-4"> 
          <div className="p-2 sm:p-3 bg-background/95 rounded-lg shadow-xl text-center border border-destructive/50">
            <XCircle className="w-6 h-6 sm:w-8 sm:h-8 text-destructive mx-auto mb-1 sm:mb-2" /> 
            <p className="text-[10px] sm:text-xs text-muted-foreground leading-tight px-1">Not for road & heavy waste.</p> 
          </div>
        </div>
      )}

      <CardHeader className="pb-2 sm:pb-3 pt-3 sm:pt-4 px-3 sm:px-4"> 
          <div className="mb-2 sm:mb-3 overflow-hidden rounded-md aspect-video">
           <img 
              src={skip.size <= 6 ? sixYardSkip  : skip.size <= 12 ?  fourYardSkip : twentyYardSkip} 
              alt={`${skip.size} Yard Skip`} 
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105" 
            />
          </div>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-tight"> 
                {skip.size} Yards
              </h3>
              <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground"> 
                {getSkipDescription(skip.size)}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 sm:space-y-3 flex-grow flex flex-col justify-between pt-0 pb-3 sm:pb-4 px-3 sm:px-4"> 
        <div> 
          <div className="space-y-0.5 sm:space-y-1 mb-2 sm:mb-3">
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-muted-foreground"> 
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              {skip.hire_period_days} day hire
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-muted-foreground"> 
              <Truck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              Delivery service
            </div>
          </div>

          <div className="bg-muted p-2 sm:p-3 rounded-md border mb-2 sm:mb-3">
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary mb-0 sm:mb-0.5"> 
              £{displayPrice.toFixed(2)}
            </div>
            <div className="text-[10px] sm:text-xs text-muted-foreground leading-tight"> 
              {displayWithVAT ? `inc. VAT (£${skip.price_before_vat.toFixed(2)} + £${skip.vat.toFixed(2)} VAT)` : `ex. VAT (VAT: £${skip.vat.toFixed(2)})`}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 sm:gap-1.5"> 
          <Badge 
            variant={skip.allowed_on_road ? "default" : "destructive"}
            className={cn(
              "text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5", 
              skip.allowed_on_road 
                ? "bg-green-100 text-green-700 border-green-200" 
                : "bg-red-100 text-red-700 border-red-200"
            )}
          >
            {skip.allowed_on_road ? (
              <>
                <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" /> 
                Road OK
              </>
            ) : (
              <>
                <AlertTriangle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" /> 
                No Road
              </>
            )}
          </Badge>

          <Badge 
            variant={skip.allows_heavy_waste ? "default" : "secondary"}
            className={cn(
              "text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5", 
              skip.allows_heavy_waste 
                ? "bg-green-100 text-green-700 border-green-200" 
                : "bg-yellow-100 text-yellow-700 border-yellow-200"
            )}
          >
            {skip.allows_heavy_waste ? (
              <> 
                <CheckCircle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" /> 
                Heavy OK
              </>
            ) : (
              <>
                <AlertTriangle className="w-2.5 h-2.5 sm:w-3 sm:h-3 mr-0.5 sm:mr-1" /> 
                Light Only
              </>
            )}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}