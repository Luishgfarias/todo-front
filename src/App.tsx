import { AppRoutes } from "./routes/routes"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <>
      <AppRoutes />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
    </>
  )
}

export default App
