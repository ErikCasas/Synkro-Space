import { useEffect, useRef } from "react"
import './GradientBackGround.css'

export const GradientBackground = () => {

  const interBubble = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let curX = 0, curY = 0, tgX = 0, tgY = 0

    const move = () => {
      curX += (tgX - curX) / 20
      curY += (tgY - curY) / 20

      if (interBubble.current) {
        interBubble.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`
        requestAnimationFrame(move)
      }
    }

    window.addEventListener("mousemove", (e) => {
      tgX = e.clientX
      tgY = e.clientY
    })

    move()
    return () => window.removeEventListener("mousemove", () => { })
  }, [])

  return (
    <>
      <div
        className="fixed inset-0 -z-10 pointer-events-none"
      >
        <div className="gradient-bg w-full h-full">
          <svg className="fixed top-0 left-0 w-0 h-0" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="goo">
                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                <feColorMatrix
                  in="blur"
                  mode="matrix"
                  values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                  result="goo"
                />
                <feBlend in="SourceGraphic" in2="goo" />
              </filter>
            </defs>
          </svg>

          <div className="gradients-container w-full h-full">
            <div className="g g1"></div>
            <div className="g g2"></div>
            <div className="g g3"></div>
            <div className="g g4"></div>
            <div className="g g5"></div>
            <div className="interactive" ref={interBubble}></div>
          </div>
        </div>
      </div>
    </>
  )
}
