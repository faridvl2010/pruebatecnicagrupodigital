import LiquidacionForm from "./components/LiquidacionForm";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="border-b bg-white">
        <div className="max-w-5xl mx-auto p-4">
          <h1 className="text-xl font-bold">Liquidaciones de pines</h1>
        </div>
      </header>

      <main className="py-6">
        <LiquidacionForm />
      </main>
    </div>
  );
}

export default App;
