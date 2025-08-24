import { useMemo, useState } from "react";

export default function LiquidacionForm() {
  const initial = {
    placa: "Placa",
    confirmacionPlaca: "Confirmacion placa",
    tipoServicio: "Particular",
    modelo: "Modelos 123",
    tipoTramite: "Revisión TM",
    formaPago: "Contado",
    tipoDoc: "CC",
    numeroDoc: "",
    nombres: "",
    apellidos: "",
    direccion: "",
    telefono: "",
    correo: "",
    metodoPago: "PSE",
  };

  const [formData, setFormData] = useState(initial);
  const [step, setStep] = useState(1); // 👈 Te faltaba step aquí

  const placaRegex = /^[A-Z]{3}\d{2}[A-Z0-9]$/;
  const emailRegex = /^\S+@\S+\.\S+$/;

  // 🔹 Define las funciones que faltaban:
  const isStep1Complete = () => {
    const p = (formData.placa || "").toUpperCase().trim();
    const c = (formData.confirmacionPlaca || "").toUpperCase().trim();
    return placaRegex.test(p) && p === c;
  };

  const isStep2Complete = () => {
    return (
      formData.tipoDoc &&
      (formData.numeroDoc || "").trim() &&
      (formData.nombres || "").trim() &&
      (formData.apellidos || "").trim() &&
      (formData.direccion || "").trim() &&
      (formData.telefono || "").trim() &&
      emailRegex.test(formData.correo || "")
    );
  };

  const formatCOP = useMemo(
    () => new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP" }),
    []
  );

  const valores = {
    ANSV: 7000,
    Recaudo: 1.0591,
    SICOV: 99936,
    RUNT: 15900,
    "Valor servicio": 221943,
    "IVA Servicio": 42169.17,
  };
  const total = Object.values(valores).reduce((a, b) => a + b, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));

    // 🔹 Avanzar automáticamente de paso
    if (step === 1 && isStep1Complete()) setStep(2);
    if (step === 2 && isStep2Complete()) setStep(3);
  };

  const resetForm = () => setFormData(initial);

  // 🔹 Los circulitos con número y color
  const stepCircle = (num) => {
    const completed =
      (num === 1 && isStep1Complete()) ||
      (num === 2 && isStep2Complete()) ||
      (num < step);

    return `flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold
      ${completed || step === num ? "bg-blue-600 text-white" : "bg-gray-300 text-gray-600"}
    `;
  };// Función para enviar datos (último paso)
const handleSubmit = (e) => {
  e.preventDefault();
  console.log("Formulario enviado:", formData);
  // POST a backend
};

// Función para consultar (si tienes un botón de consulta en un paso específico)
const handleConsultar = () => {
  console.log("Consultar datos con:", formData);
  // GET/POST 
};

const handleContinuar = () => {
  if (step < 4) { // ajusta según pasos 
    setStep(step + 1);
  }
};

  const metodoPagoBtn = (value, label) => (
    <button
      type="button"
      onClick={() => setFormData((s) => ({ ...s, metodoPago: value }))}
      className={`flex-1 border rounded-2xl p-4 text-center shadow-sm transition
        ${formData.metodoPago === value ? "border-blue-600 ring-2 ring-blue-300" : "border-gray-300"}
      `}
    >
      <div className="font-medium">{label}</div>
    </button>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-6 space-y-8 bg-white">
      {/* Información general */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
          <span className={stepCircle(1)}>1</span>
          <b>Información general</b>
        </h2>


        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-600">Placa</label>
            <input
              type="text"
              name="placa"
              value={formData.placa}
              onChange={handleChange}
              placeholder="Ingresa la placa"
              pattern="^[A-Z]{3}[0-9]{2}[A-Z0-9]{1}$"
              title="Formato válido: AAA00A o AAA000"
              className="border rounded-md p-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-600">Confirmación de placa</label>
            <input
              type="text"
              name="confirmacionPlaca"
              value={formData.confirmacionPlaca}
              onChange={handleChange}
              placeholder="Confirma la placa"
              pattern="^[A-Z]{3}[0-9]{2}[A-Z0-9]{1}$"
              title="Formato válido: AAA00A o AAA000"
              className="border rounded-md p-2"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-600">Modelo</label>
            <select
              name="modelo"
              value={formData.modelo}
              onChange={handleChange}
              className="border rounded-md p-2"
            >
              <option>Modelos 123</option>
              <option>Modelos 456</option>
              <option>Modelos 789</option>
            </select>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-600">Tipo de vehiculo</label>
            <select
              name="tipoServicio"
              value={formData.tipoServicio}
              onChange={handleChange}
              className="border rounded-md p-2"
            >
              <option>Particular</option>
              <option>Público</option>
              <option>Otro</option>
            </select>
          </div>



          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-600">Tipo de servicio</label>
            <select
              name="tipoTramite"
              value={formData.tipoTramite}
              onChange={handleChange}
              className="border rounded-md p-2"
            >
              <option>Revisión TM</option>
              <option>Inscripción RUNT</option>
              <option>ActualizaciónRUNT</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-xs text-gray-600">Forma de pago:</div>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="formaPago"
              value="Contado"
              checked={formData.formaPago === "Contado"}
              onChange={handleChange}
            />
            <span>Contado</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="formaPago"
              value="Tío Paco"
              checked={formData.formaPago === "Tío Paco"}
              onChange={handleChange}
            />
            <span>Tío Paco</span>
          </label>

          <button
            type="button"
            onClick={handleConsultar}
            className="ml-auto px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Consultar
          </button>
        </div>
      </section>

      {/* Liquidación */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
          <span className={stepCircle(2)}>2</span>
          <b>Liquidación</b>
        </h2>

        <h3 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
          Información del cliente
        </h3>

        {/* Solo 2 columnas principales */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* Columna izquierda: formulario */}
          <div className="space-y-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">Tipo de documento</label>
              <select
                name="tipoDoc"
                value={formData.tipoDoc}
                onChange={handleChange}
                className="border rounded-md p-2"
              >
                <option value="CC">Cédula de ciudadanía</option>
                <option value="CE">Cédula de extranjería</option>
                <option value="TI">Tarjeta de identidad</option>
              </select>
            </div>

            <div className="grid md:grid-cols-1 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">Número de documento</label>
                <input
                  type="text"
                  name="numeroDoc"
                  value={formData.numeroDoc}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">Teléfono</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-1 gap-3">
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">Nombre</label>
                <input
                  type="text"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">Apellidos</label>
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos}
                  onChange={handleChange}
                  className="border rounded-md p-2"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-600">Correo</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="border rounded-md p-2"
              />
            </div>
          </div>

          {/* Columna derecha: liquidación */}
          <aside className="border rounded-md p-4 bg-gray-50 h-fit">
            <h3 className="text-sm font-semibold mb-3">Valor de liquidación</h3>
            <ul className="text-sm space-y-2">
              {Object.entries(valores).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span>{k}</span>
                  <span>{formatCOP.format(v)}</span>
                </li>
              ))}
              <li className="pt-3 mt-3 border-t flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatCOP.format(total)}</span>
              </li>
            </ul>
          </aside>
        </div>

        {/* Botón */}
        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleContinuar}
            className="ml-auto px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
          >
            Continuar
          </button>
        </div>
      </section>


      {/* Pago */}
      <section className="space-y-4">
        <h2 className="text-sm font-semibold text-gray-600 flex items-center gap-2">
          <span className={stepCircle(3)}>3</span>
          <b>Pago</b>
        </h2>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { id: "efectivo", label: "Efectivo", icon: "💵" },
            { id: "pse", label: "PSE", icon: "💳" },
            { id: "corresponsal", label: "Corresponsal bancario", icon: "🏦" },
            { id: "datafono", label: "Datáfono", icon: "📟" },
          ].map((option) => (
            <label
              key={option.id}
              className="flex flex-col items-center justify-center border rounded-lg p-4 cursor-pointer hover:border-blue-400 peer-checked:border-blue-500 peer-checked:ring-2 peer-checked:ring-blue-200 transition"
            >
              <input
                type="radio"
                name="metodoPago"
                value={option.id}
                className="hidden peer"
                checked={formData.metodoPago === option.id}
                onChange={handleChange}
              />
              <div className="text-3xl mb-2">{option.icon}</div>
              <span className="text-sm font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Acciones */}
      <div className="flex justify-end gap-3">
        <button type="button" onClick={resetForm} className="px-4 py-2 rounded-md bg-gray-200">
          Cancelar
        </button>
        <button type="submit" className="px-4 py-2 rounded-md bg-red-600 text-white">
          Generar
        </button>
      </div>
    </form>
  );
}
