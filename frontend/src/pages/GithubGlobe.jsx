"use client"

import { useEffect, useRef } from "react"
import Globe from "globe.gl"

const GlobeGithubTheme = () => {
  const globeEl = useRef()
  const globeInstance = useRef(null)

  useEffect(() => {
    if (!globeInstance.current && globeEl.current) {
      const globe = Globe({ animateIn: true })(globeEl.current)

      // GitHub dark-mode style
      globe
        .showGraticules(false)
        .backgroundColor("#0d1117") // GitHub dark background
        .showAtmosphere(true)
        .atmosphereColor("#1f6feb") // GitHub blue glow
        .atmosphereAltitude(0.15)

      // Ocean color (GitHub dark slate)
      globe.globeMaterial().color.set("#161b22")

      // Countries
      fetch(
        "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson"
      )
        .then((res) => res.json())
        .then((geojson) => {
          globe
            .polygonsData(geojson.features)
            .polygonAltitude(0.008)
            .polygonCapColor(() => "#21262d") // GitHub surface gray
            .polygonSideColor(() => "#30363d") // subtle side shading
            .polygonStrokeColor(() => "#1f6feb") // GitHub blue stroke
        })
        .catch((err) => console.error("[v0] Error loading GeoJSON:", err))

      // Sample arc (China → Sri Lanka)
      const chinaCoords = { lat: 39.9526, lng: 116.4074 }
      const sriLankaCoords = { lat: 6.9271, lng: 80.7789 }

      const arcsData = [
        {
          startLat: chinaCoords.lat,
          startLng: chinaCoords.lng,
          endLat: sriLankaCoords.lat,
          endLng: sriLankaCoords.lng,
          color: ["#1f6feb", "#58a6ff"], // GitHub blues
          labels: { start: "China", end: "Sri Lanka" },
        },
      ]

      globe
        .arcsData(arcsData)
        .arcColor((d) => d.color)
        .arcAltitude(0.35)
        .arcStroke(2)
        .arcDashLength(0.15)
        .arcDashGap(0.03)
        .arcDashAnimateTime(1800)

      // Camera
      globe.pointOfView({ lat: 20, lng: 0, altitude: 2.7 })

      // Controls
      globe.controls().autoRotate = true
      globe.controls().autoRotateSpeed = 0.35
      globe.controls().enableZoom = true

      globeInstance.current = globe
    }
  }, [])

  return (
    <div
      ref={globeEl}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#0d1117", // GitHub page dark-bg
        overflow: "hidden",
      }}
    ></div>
  )
}

export default GlobeGithubTheme
