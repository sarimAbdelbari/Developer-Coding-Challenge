interface Skip {
    id: number;
    size: number; 
    hire_period_days: number; 
    transport_cost: number | null;
    per_tonne_cost: number | null; 
    price_before_vat: number; 
    vat: number; 
    postcode: string; 
    area: string; 
    forbidden: boolean; 
    created_at: string; 
    updated_at: string; 
    allowed_on_road: boolean; 
    allows_heavy_waste: boolean; 
}

 interface SkipWithDetails extends Skip {
    total_price: number; 
    is_popular: boolean; 
    description: string; 
    icon: React.ReactNode; 
}


export type { Skip, SkipWithDetails };