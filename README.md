# WeWantWaste Skip Hire App

A modern, mobile-responsive React + TypeScript application for professional skip hire, built with Vite, Tailwind CSS, and Shadcn UI.

## Features

- **Step Progress Bar:** Visualizes the user's progress through the skip hire process.
- **Your Selections Summary:** Displays the user's current choices (location, waste type, and description).
- **Skip Selection:** Browse and filter available skips by price range and VAT inclusion.
- **Availability Filter:** Toggle to show/hide skips that are not available due to restrictions.
- **Responsive Design:** Fully mobile-friendly and accessible.
- **Custom Scrollbars:** The skip selection area is scrollable with styled scrollbars for a modern look.
- **Modern UI:** Built with Shadcn UI components and Tailwind CSS for a clean, consistent interface.

## Tech Stack

- **React** (with hooks)
- **TypeScript**
- **Vite** (for fast development)
- **Tailwind CSS** (utility-first styling)
- **Shadcn UI** (component library)
- **Lucide Icons** (for consistent iconography)

## Project Structure

```
src/
  components/
    main/          # ProgressSteps and other main UI components
    skip/          # SkipCard and related skip UI
    ui/            # Shadcn UI components (Button, Card, Input, etc.)
  page/
    skipPage.tsx   # Main skip selection page
  services/
    skipService.ts # API calls for skips
  assets/
    images/        # Skip images
  App.tsx          # App entry point
  index.css        # Tailwind and custom styles
```

## Implementation Overview

### 1. Service Layer (`skipService.ts`)
- Handles API communication for fetching skip data.
- Exposes `getAllSkips`, which returns an array of `Skip` objects from the backend.

### 2. Page Layer (`skipPage.tsx`)
- Manages state for skips, filters, selection, and loading/error.
- Fetches skips using the service on mount.
- Provides UI for filtering by price, VAT, and availability.
- Renders a summary of user selections and a scrollable grid of `SkipCard` components.
- Handles selection and navigation.

### 3. Component Layer (`SkipCard.tsx`)
- Displays individual skip details, price, and status badges.
- Handles selection logic and disables cards that are unavailable (not allowed on road and not for heavy waste).
- Shows a visual overlay for unavailable skips.

### How They Work Together
1. `SkipPage` calls the service to fetch skips on mount.
2. Skips are filtered and displayed as `SkipCard` components.
3. User can filter, scroll, and select a skip.
4. Unavailable skips can be toggled to show/hide using the availability filter.
5. The selected skip is highlighted and the user can proceed.

## How to Run

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open in your browser:**
   ```
   http://localhost:5173
   ```

## Customization

- **Skip Data/API:** Update `src/services/skipService.ts` to connect to your real API or mock data.
- **UI Customization:** Modify Tailwind classes or Shadcn UI components in `src/components/ui/` as needed.
- **Images:** Place skip images in `src/assets/images/` and update imports in `SkipCard.tsx`.

## Accessibility & Responsiveness

- All interactive elements are keyboard accessible.
- Layout adapts to mobile, tablet, and desktop screens.
- Scrollable skip grid with custom scrollbar styling for a better user experience.
