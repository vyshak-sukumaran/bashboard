import { drawWithDataURL } from '@/lib/utils'
import { useCallback, useEffect, useRef, useState } from 'react'

interface IPoint {
  x: number
  y: number
}
export interface IDrawProps {
  ctx: CanvasRenderingContext2D,
  currentPoint: IPoint,
  prevPoint: IPoint | undefined
}

type OnDraw = (draw: IDrawProps) => void

interface IUseDrawResult {
  canvasRef: React.RefObject<HTMLCanvasElement>,
  onInteractionStart: () => void,
  clear: () => void,
  undo: (undoPoint: string) => void
}

const useDraw = (onDraw: OnDraw) : IUseDrawResult => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const prevPointRef = useRef<IPoint>()

  const [mouseDown, setMouseDown] = useState<boolean>(false)

  const onInteractionStart = useCallback(() => {
    setMouseDown(true)
  }, [])

  const undo = useCallback((undoPoint: string) => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return

    const ctx = canvasElement.getContext("2d")
    if (!ctx) return

    drawWithDataURL(undoPoint, ctx, canvasElement)

  }, [])

  const clear = useCallback(() => {
    const canvasElement = canvasRef.current
    if (!canvasElement) return

    const ctx = canvasElement.getContext("2d")
    if (!ctx) return

    ctx.clearRect(0, 0, canvasElement.width, canvasElement.height)
  }, [])

  useEffect(() => {
    const computePointInCanvas = (clientX: number, clientY: number) => {
      const canvasElement = canvasRef.current
      if (!canvasElement) return
      const rect = canvasElement.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      return { x, y }
    }

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!mouseDown) return

      const canvasElement = canvasRef.current
      if (!canvasElement) return

      const ctx = canvasElement.getContext("2d")

      let currentPoint;
      if (e instanceof MouseEvent) {
        currentPoint = computePointInCanvas(e.clientX, e.clientY)
      } else {
        const { clientX, clientY } = e.touches[0]
        currentPoint = computePointInCanvas(clientX, clientY)
      }
      
      if (!ctx || !currentPoint) return

      onDraw({ ctx, currentPoint, prevPoint: prevPointRef.current})
      prevPointRef.current = currentPoint
      
    }
    const handleInteractionEnd = () => {
      setMouseDown(false)
      prevPointRef.current = undefined
    }

    window.addEventListener("mousemove", handleMove)
    window.addEventListener("mouseup", handleInteractionEnd)
    window.addEventListener("touchmove", handleMove)
    window.addEventListener("touchend", handleInteractionEnd)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("mouseup", handleInteractionEnd)
      window.removeEventListener("touchmove", handleMove)
      window.removeEventListener("touchend", handleInteractionEnd)
    }

  }, [mouseDown, onDraw])
  return {
    canvasRef,
    onInteractionStart,
    clear,
    undo
  }
}

export default useDraw