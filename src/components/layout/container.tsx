
const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="  lg:max-w-4/5 mx-auto px-4 sm:px-6 lg:px-8">
        {children}
    </div>
  )
}

export default Container