import { useState, useEffect, useMemo } from 'react'
import { Card, CardHeader, CardTitle } from '@/components/ui/card' // Removed CardContent from here if not used as main wrapper
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { SkipCard } from '@/components/skip/SkipCard'
import { getAllSkips } from '@/services/skipService'
import type { Skip } from '@/types/skip'
import { Lightbulb, ArrowLeft, ArrowRight, Loader2, Filter, RefreshCw, MapPin, Trash2 } from 'lucide-react' // Added MapPin, Trash2

const SkipPage = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [selectedSkip, setSelectedSkip] = useState<Skip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [includeVAT, setIncludeVAT] = useState(true);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [appliedMinPrice, setAppliedMinPrice] = useState<number | null>(null);
  const [appliedMaxPrice, setAppliedMaxPrice] = useState<number | null>(null);

  const userSelections = {
    location: "NR32, Lowestoft",
    wasteType: "Garden Waste",
    wasteDescription: "Green waste and landscaping materials"
  };

  useEffect(() => {
    fetchSkips();
  }, []);

  const fetchSkips = async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedSkips = await getAllSkips();
      const availableSkips = fetchedSkips.filter(skip => !skip.forbidden);
      setSkips(availableSkips);
    } catch (error) {
      console.error('Error fetching skips:', error);
      setError('Failed to load skip options. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSkipSelect = (skip: Skip) => {
    setSelectedSkip(skip);
  };

  const calculatePrice = (skip: Skip, withVAT: boolean): number => {
    return withVAT ? skip.price_before_vat + skip.vat : skip.price_before_vat;
  };

  const handleApplyPriceFilter = () => {
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    setAppliedMinPrice(isNaN(min) || min < 0 ? null : min);
    setAppliedMaxPrice(isNaN(max) || max < 0 ? null : max);
  };

  const handleClearPriceFilter = () => {
    setMinPrice('');
    setMaxPrice('');
    setAppliedMinPrice(null);
    setAppliedMaxPrice(null);
  };

  const filteredSkips = useMemo(() => {
    return skips.filter(skip => {
      const currentPrice = calculatePrice(skip, includeVAT);
      const minMatch = appliedMinPrice === null || currentPrice >= appliedMinPrice;
      const maxMatch = appliedMaxPrice === null || currentPrice <= appliedMaxPrice;
      return minMatch && maxMatch; 
    });
  }, [skips, includeVAT, appliedMinPrice, appliedMaxPrice]);

  return (
    <Card className="flex flex-col flex-grow p-4 sm:p-6 md:p-8 overflow-hidden mb-4">
      <CardHeader className="px-0 pt-0 shrink-0">
        <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3">
          Choose Your Skip Size
        </CardTitle>
        <p className="text-sm sm:text-md md:text-lg text-muted-foreground mb-4 sm:mb-6">
          Select the perfect skip size for your project. All prices include a {skips[0]?.hire_period_days || 14}-day hire period.
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 p-3 sm:p-4 bg-muted rounded-lg border mb-6 sm:mb-8">
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="w-9 h-9 sm:w-11 sm:h-11 bg-primary rounded-lg flex items-center justify-center">
              <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
          </div>
          <div className="text-center sm:text-left">
            <h4 className="font-semibold text-foreground mb-0.5 sm:mb-1 text-sm sm:text-base">Need help choosing?</h4>
            <p className="text-xs sm:text-sm text-muted-foreground">
              Mini skips for garden waste, larger for renovations & construction.
            </p>
          </div>
        </div>
      </CardHeader>

      <div className="mb-4 sm:mb-6 shrink-0 border-t border-b py-4">
        <h3 className="text-lg sm:text-xl font-semibold mb-3 text-foreground">Your Selections</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3 text-sm">
          <div className="flex items-start">
            <MapPin className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-muted-foreground">Location</p>
              <p className="text-foreground">{userSelections.location}</p>
            </div>
          </div>
          <div className="flex items-start">
            <Trash2 className="w-4 h-4 text-primary mr-2 mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-muted-foreground">Waste Type</p>
              <p className="text-foreground">{userSelections.wasteType}</p>
              <p className="text-gray-500 dark:text-gray-400 text-xs">{userSelections.wasteDescription}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="mb-4 sm:mb-6 p-3 sm:p-4 border rounded-lg bg-card shadow-sm shrink-0">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-end">
            <div className="lg:col-span-1">
              <label htmlFor="vatToggle" className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1">Price Display</label>
              <Button
                id="vatToggle"
                variant="outline"
                onClick={() => setIncludeVAT(!includeVAT)}
                className="w-full text-xs sm:text-sm py-2 cursor-pointer"
              >
                {includeVAT ? "Price Includes VAT" : "Price Excludes VAT"} (Toggle)
              </Button>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-end">
              <div>
                <label htmlFor="minPrice" className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1">Min Price (£)</label>
                <Input id="minPrice" type="number" placeholder="e.g., 100" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} min="0" className="text-xs sm:text-sm h-9 sm:h-10"/>
              </div>
              <div>
                <label htmlFor="maxPrice" className="block text-xs sm:text-sm font-medium text-muted-foreground mb-1">Max Price (£)</label>
                <Input id="maxPrice" type="number" placeholder="e.g., 500" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} min="0" className="text-xs sm:text-sm h-9 sm:h-10"/>
              </div>
              <div className="flex flex-row sm:flex-col gap-2 mt-2 sm:mt-0">
                <Button onClick={handleApplyPriceFilter} className="w-full flex-1 text-xs sm:text-sm py-2">
                  <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2" /> Apply
                </Button>
                {(appliedMinPrice !== null || appliedMaxPrice !== null) && (
                  <Button onClick={handleClearPriceFilter} variant="ghost" className="w-full sm:w-auto flex-1 sm:flex-none px-2 sm:px-3 py-2" title="Clear price filter">
                    <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
      </div>

      {selectedSkip && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 animate-in slide-in-from-top duration-300 shrink-0">
          <div className="flex items-center gap-2 mb-1 sm:mb-2">
            <Badge variant="default" className="bg-green-600 text-xs sm:text-sm">✓ Selected Skip</Badge>
          </div>
          <p className="text-xs sm:text-sm text-green-700">
            <strong>{selectedSkip.size} Yard Skip</strong> - £{calculatePrice(selectedSkip, includeVAT).toFixed(2)} ({includeVAT ? "inc." : "ex."} VAT)
            for {selectedSkip.hire_period_days} days
          </p>
        </div>
      )}

      {/* Skip Grid - Scrollable Area */}
      <div className="flex-grow overflow-y-auto custom-scrollbar pr-1 sm:pr-2 min-h-[200px]"> 
        {loading && (
          <div className="flex flex-col justify-center items-center py-10 h-full">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
            <span className="text-muted-foreground mt-2">Loading skip options...</span>
          </div>
        )}
        {!loading && error && (
          <div className="text-center py-10 h-full flex flex-col justify-center items-center">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={fetchSkips} variant="outline">Try Again</Button>
          </div>
        )}
        {!loading && !error && filteredSkips.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredSkips.map((skip) => (
              <SkipCard
                key={skip.id}
                skip={skip}
                isSelected={selectedSkip?.id === skip.id}
                onSelect={handleSkipSelect}
                isDisabled={skip.forbidden}
                displayWithVAT={includeVAT}
              />
            ))}
          </div>
        )}
        {!loading && !error && filteredSkips.length === 0 && (
          <div className="text-center py-10 h-full flex flex-col justify-center items-center">
            <p className="text-md sm:text-lg mb-2 text-muted-foreground">No skips match your current filters.</p>
            <p className="text-xs sm:text-sm text-muted-foreground">Try adjusting the price range or VAT inclusion.</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="pt-4 sm:pt-6 border-t mt-auto shrink-0"> 
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto text-xs sm:text-sm py-2">
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Back
            </Button>
            <Button disabled={!selectedSkip} className="flex items-center gap-2 px-6 sm:px-8 w-full sm:w-auto text-xs sm:text-sm py-2">
                Continue to Permit Check
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
        </div>
      </div>
    </Card>
  )
}

export default SkipPage