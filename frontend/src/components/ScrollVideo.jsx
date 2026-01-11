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
  const currentFrameRef = useRef(0)
  const needResizeRef = useRef(true)
  const lastSizeRef = useRef({ w: 0, h: 0, dpr: 0 })
  const [isActiveFixed, setIsActiveFixed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load all frames
  useEffect(() => {
    let cancelled = false
    const loadAll = async () => {
      const promises = []
      for (let i = 1; i <= 50; i++) {
        const num = String(i).padStart(2, "0")
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
          })
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

  // Ensure canvas matches container size
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

    const ctx = canvas.getContext("2d", { alpha: false })
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = "high"
    }
  }

  // Draw image with object-fit: cover
  const drawImageCover = (ctx, img, cw, ch) => {
    if (!img) return

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

  // Render exact frame - Direct 1:1 control
  const renderFrame = (frameIndex) => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const imgs = imagesRef.current

    if (!canvas || !container || imgs.length === 0) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    const cw = container.clientWidth
    const ch = container.clientHeight

    // Round to nearest integer for crisp frames
    const index = Math.round(frameIndex)
    const clampedIndex = clamp(index, 0, imgs.length - 1)

    // Only render if frame actually changed
    if (currentFrameRef.current === clampedIndex) return
    currentFrameRef.current = clampedIndex

    // Clear and draw single frame
    ctx.fillStyle = "#000"
    ctx.fillRect(0, 0, cw, ch)
    ctx.globalAlpha = 1
    drawImageCover(ctx, imgs[clampedIndex], cw, ch)
  }

  // Continuous render loop
  const startRafLoop = () => {
    if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)

    const loop = () => {
      if (needResizeRef.current) {
        ensureCanvasSize()
      }
      rafIdRef.current = requestAnimationFrame(loop)
    }

    rafIdRef.current = requestAnimationFrame(loop)
  }

  // Start animation when loaded
  useEffect(() => {
    if (!isLoading && imagesRef.current.length > 0) {
      needResizeRef.current = true
      currentFrameRef.current = 0
      startRafLoop()
    }
    return () => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
        rafIdRef.current = null
      }
    }
  }, [isLoading])

  // Handle scroll with direct frame control
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
        const frameCount = imagesRef.current.length || 1

        // Direct scroll to frame mapping with speed multiplier
        const scrolled = clamp(scrollY - startTop, 0, spacerHeight)
        const progress = spacerHeight > 0 ? scrolled / spacerHeight : 0
        
        // Frame speed multiplier - increase for more frames per scroll
        const frameSpeedMultiplier = 1 // Adjust this value (higher = more frames per scroll)
        
        // Calculate exact frame based on scroll position
        let targetFrame = progress * (frameCount - 1) * frameSpeedMultiplier
        targetFrame = clamp(targetFrame, 0, frameCount - 1)
        
        // Render immediately - no easing, direct control
        renderFrame(targetFrame)

        // Calculate release fade
        const releaseStart = startTop + spacerHeight
        const after = clamp((scrollY - releaseStart) / releaseRangePx, 0, 1)

        // Determine if fixed
        const active =
          scrollY >= startTop &&
          scrollY < releaseStart + releaseRangePx + releaseBufferPx
        setIsActiveFixed(active)

        // Apply fade/transform on release with smooth animation
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

    currentFrameRef.current = -1 // Force initial render
    needResizeRef.current = true

    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onResize)
    }
  }, [isLoading])

  // Manage body class
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

  // Cleanup
  useEffect(() => {
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current)
      const c = containerRef.current
      if (c) {
        c.style.opacity = ""
        c.style.transform = ""
        c.style.pointerEvents = ""
        c.style.background = ""
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