import './App.css'
import { ProgressSteps } from './components/main/ProgressSteps'
import SkipPage from './page/skipPage'

function App() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="text-center py-8 mb-6">
        <h1 className="text-4xl font-extrabold text-primary mb-2 tracking-tight">
          WeWantWaste
        </h1>
        <p className="text-muted-foreground text-lg">
          Professional Skip Hire Service
        </p>
      </div>

      <ProgressSteps currentStep={3} />
      <SkipPage />
    </div>
  )
}

export default App