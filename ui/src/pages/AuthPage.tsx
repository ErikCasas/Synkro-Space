import { useEffect, useRef, useState } from "react"
import { Spinner } from "@heroui/react";

export const AuthPage = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login:", { email, password }) //TODO
  }

  const texts = [
    "Optimiza tus espacios de trabajo.",
    "Organiza tus reuniones fácilmente.",
    "Descubre la eficiencia colaborativa.",
    "Sincroniza tus equipos en tiempo real.",
  ];

  const typewriter = useRef<HTMLElement>(null)
  let i = 0
  let j = 0
  let isDeleting = false
  let currentText = texts[i]

  const speed = 200
  const eraseSpeed = 100
  const delayBetweenTexts = 2000
  useEffect(() => {


    const type = () => {
      const el = typewriter.current
      if (!el) return

      if (isDeleting) {
        j--
        el.textContent = currentText.substring(0, j)
      } else {
        j++
        el.textContent = currentText.substring(0, j)
      }

      // Controlar el ciclo de escritura/borrado
      if (!isDeleting && j === currentText.length) {
        isDeleting = true
        setTimeout(type, delayBetweenTexts)
      } else if (isDeleting && j === 0) {
        isDeleting = false
        i = (i + 1) % texts.length
        currentText = texts[i]
        setTimeout(type, speed)
      } else {
        setTimeout(type, isDeleting ? eraseSpeed : eraseSpeed)
      }
    }

    type()
  }, [])


  return (
    <div className="flex flex-col md:flex-row w-full h-screen text-white">
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 h-[200px] md:h-full p-6">
        <h1 className="text-5xl md:text-8xl font-bold tracking-tight whitespace-nowrap select-none opacity-90">
          Synkro&nbsp;Space
        </h1>
        <div className="text-2xl font-mono mt-4 text-center opacity-90">
          <span ref={typewriter} className="border-r-2 border-blue-400 pr-1"></span>
        </div>
      </div>

      <div className="flex flex-col justify-between items-center w-full md:w-1/2 h-full bg-black/20 backdrop-blur-xl border-r border-white/10 p-8 rounded-l-4xl">
        <div className="flex flex-col justify-center w-full h-full max-w-sm">

          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <h2 className="text-5xl font-semibold text-center mb-10">Iniciar sesión</h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className="p-3 rounded-lg bg-white/10 border border-white/20 placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="submit"
              className="w-full max-w-sm mt-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 font-semibold flex justify-center items-center"
            >
              {false ? "Sincronizar" : <Spinner variant="wave" color="white" />}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
