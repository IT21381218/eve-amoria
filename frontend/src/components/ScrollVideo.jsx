import React, { useEffect, useRef, useState } from "react"
import "../styles/scrollvideo.css"

const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

const ScrollVideo = () => {
  const wrapperRef = useRef(null)
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const spacerRef = useRef(null)
  const imagesRef = useRef([])
  const rafIdRef = useRef(null)
  const latestFrameRef = useRef(0)
  const displayedFrameRef = useRef(0)
  const needResizeRef = useRef(true)
  const lastSizeRef = useRef({ w: 0, h: 0, dpr: 0 })
  const [isActiveFixed, setIsActiveFixed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const loadAll = async () => {
      const promises = []
      // load 002.png .. 120.png
      for (let i = 2; i <= 51; i++) {
        const num = String(i).padStart(3, "0")
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.src = `/frames/${num}.png`
        promises.push(
          new Promise((resolve) => {
            img.onload = () => resolve(img)
            img.onerror = () => {
              console.error(`Failed to load frame: ${num}.png`)
              resolve(null)
            }
          }),
        )
      }
      const loaded = await Promise.all(promises)
      if (cancelled) return
      imagesRef.current = loaded.filter(Boolean)
      setIsLoading(false)
    }

    loadAll()
    return () => {
      cancelled = true
    }
  }, [])

  const ensureCanvasSize = () => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const dpr = window.devicePixelRatio || 1
    const cw = container.clientWidth
    const ch = container.clientHeight
    if (
      lastSizeRef.current.w === cw &&
      lastSizeRef.current.h === ch &&
      lastSizeRef.current.dpr === dpr &&
      !needResizeRef.current
    ) {
      return
    }
    needResizeRef.current = false
    lastSizeRef.current = { w: cw, h: ch, dpr }

    canvas.style.width = `${cw}px`
    canvas.style.height = `${ch}px`
    canvas.width = Math.round(cw * dpr)
    canvas.height = Math.round(ch * dpr)

    const ctx = canvas.getContext("2d")
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.imageSmoothingEnabled = true
    ctx.clearRect(0, 0, cw, ch)
  }

  const drawImageCover = (ctx, img, cw, ch) => {
    const imgRatio = img.width / img.height
    const canvasRatio = cw / ch
    let drawWidth, drawHeight
    if (imgRatio > canvasRatio) {
      drawHeight = ch
      drawWidth = imgRatio * drawHeight
    } else {
      drawWidth = cw
      drawHeight = drawWidth / imgRatio
    }
    const dx = (cw - drawWidth) / 2
    const dy = (ch - drawHeight) / 2
    ctx.drawImage(img, dx, dy, drawWidth, drawHeight)
  }

  const startRafLoop = () => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)

    const loop = () => {
      if (needResizeRef.current) ensureCanvasSize()

      const imgs = imagesRef.current
      const frameCount = imgs.length || 1

      const displayed = displayedFrameRef.current
      const target = latestFrameRef.current
      const ease = 0.12
      const nextDisplayed = displayed + (target - displayed) * ease

      // snap to final if target is last and close enough
      if (target >= frameCount - 1 - 1e-6 && Math.abs(target - nextDisplayed) < 0.01) {
        displayedFrameRef.current = frameCount - 1
      } else {
        displayedFrameRef.current = nextDisplayed
      }

      const clamped = clamp(displayedFrameRef.current, 0, Math.max(0, frameCount - 1))
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      const container = containerRef.current
      if (ctx && container && imgs.length > 0) {
        const cw = container.clientWidth
        const ch = container.clientHeight

        // black background to avoid page white showing through
        ctx.clearRect(0, 0, cw, ch)
        ctx.fillStyle = "#000"
        ctx.fillRect(0, 0, cw, ch)

        const i0 = Math.floor(clamped)
        const i1 = Math.min(i0 + 1, frameCount - 1)
        const t = clamped - i0

        ctx.globalAlpha = 1
        drawImageCover(ctx, imgs[i0], cw, ch)

        if (i1 !== i0 && t > 0) {
          ctx.globalAlpha = t
          drawImageCover(ctx, imgs[i1], cw, ch)
        }
        ctx.globalAlpha = 1
      }

      rafIdRef.current = requestAnimationFrame(loop)
    }

    rafIdRef.current = requestAnimationFrame(loop)
  }

  useEffect(() => {
    if (!isLoading && imagesRef.current.length > 0) {
      needResizeRef.current = true
      displayedFrameRef.current = 0
      latestFrameRef.current = 0
      startRafLoop()
    }
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      rafIdRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading])

  useEffect(() => {
    if (isLoading) return
    const wrapper = wrapperRef.current
    const container = containerRef.current
    const spacer = spacerRef.current
    if (!wrapper || !container || !spacer) return

    const onResize = () => {
      needResizeRef.current = true
    }
    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onResize)

    let ticking = false
    const startTop = wrapper.offsetTop
    const releaseRangePx = Math.max(120, Math.round(window.innerHeight * 0.5))
    const releaseBufferPx = 12

    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const scrollY = window.scrollY
        const spacerHeight = spacer.offsetHeight

        // scrolled inside animation region: 0 .. spacerHeight
        const scrolled = clamp(scrollY - startTop, 0, spacerHeight)
        const progress = spacerHeight > 0 ? scrolled / spacerHeight : 0
        const frameCount = imagesRef.current.length || 1

        // set target frames; snap to final frame at end
        if (progress >= 1) {
          latestFrameRef.current = frameCount - 1
          displayedFrameRef.current = frameCount - 1
        } else if (progress <= 0) {
          latestFrameRef.current = 0
        } else {
          latestFrameRef.current = progress * (frameCount - 1)
        }

        const releaseStart = startTop + spacerHeight
        const after = clamp((scrollY - releaseStart) / releaseRangePx, 0, 1)

        // keep fixed until slightly after release end so next section paints under canvas
        const active = scrollY >= startTop && scrollY < (releaseStart + releaseRangePx + releaseBufferPx)
        setIsActiveFixed(active)

        // apply smooth fade/translate while releasing (0..1)
        if (container) {
          container.style.background = "#000"
          if (after > 0 && after < 1) {
            container.style.opacity = String(1 - after)
            container.style.transform = `translateY(-${after * 28}px)`
            container.style.pointerEvents = "none"
            container.style.willChange = "opacity, transform"
          } else if (after >= 1) {
            container.style.opacity = "0"
            container.style.transform = `translateY(-28px)`
            container.style.pointerEvents = "none"
          } else {
            container.style.opacity = ""
            container.style.transform = ""
            container.style.pointerEvents = ""
            container.style.willChange = ""
          }
        }

        ticking = false
      })
    }

    latestFrameRef.current = 0
    displayedFrameRef.current = 0
    needResizeRef.current = true

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onResize)
    }
  }, [isLoading])

  // keep body background dark while animation active to avoid white flash
  useEffect(() => {
    const className = "scrollvideo-active-bg"
    if (isActiveFixed) {
      document.body.classList.add(className)
    } else {
      document.body.classList.remove(className)
    }
    return () => {
      document.body.classList.remove(className)
    }
  }, [isActiveFixed])

  // cleanup RAF on unmount and clear inline styles
  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      const c = containerRef.current
      if (c) {
        c.style.opacity = ""
        c.style.transform = ""
        c.style.pointerEvents = ""
        c.style.background = ""
        c.style.willChange = ""
      }
      document.body.classList.remove("scrollvideo-active-bg")
    }
  }, [])

  return (
    <div className="scroll-video-root">
      <div ref={wrapperRef} className="scroll-video-wrapper">
        <div
          ref={containerRef}
          className={`scroll-video-container ${isActiveFixed ? "fixed-active" : ""}`}
        >
          {isLoading && (
            <div className="scroll-video-loader">
              <div className="spinner" />
              <p>Loading animation...</p>
            </div>
          )}
          <canvas
            ref={canvasRef}
            className="scroll-video-canvas"
            style={{ display: isLoading ? "none" : "block", background: "#000" }}
          />
        </div>
      </div>

      <div ref={spacerRef} className="scroll-video-spacer" />
    </div>
  )
}

export default ScrollVideo