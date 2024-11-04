import FloatingShape from "./components/FloatingShape"

function App() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 from-40% via-slate-200 to-slate-50 flex items-center justify-center relative overflow-hidden">
      <FloatingShape
        color="bg-teal-500"
        size="w-64 h-64"
        top='65%'
        left='65%'
        delay={0}
      />
    </div>
  )
}

export default App
