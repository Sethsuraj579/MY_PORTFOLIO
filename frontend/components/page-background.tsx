import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import * as THREE from "three"

gsap.registerPlugin(ScrollTrigger)

export function PageBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer | null
    scene: THREE.Scene | null
    camera: THREE.PerspectiveCamera | null
    manGroup: THREE.Group | null
    light: THREE.PointLight | null
    coneMaterial: THREE.MeshStandardMaterial | null
  }>({
    renderer: null,
    scene: null,
    camera: null,
    manGroup: null,
    light: null,
    coneMaterial: null,
  })

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current

    if (!container || !canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0b0b14, 6, 20)

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
    camera.position.set(0, 1.8, 5)

    const ambient = new THREE.AmbientLight(0x7b7b8d, 0.25)
    scene.add(ambient)

    const streetLight = new THREE.PointLight(0xfff2cc, 2, 25, 2)
    streetLight.position.set(2, 4, 1)
    scene.add(streetLight)

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 60),
      new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.95 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.3
    scene.add(ground)

    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0.15, 5, 16),
      new THREE.MeshStandardMaterial({ color: 0x2c2d3a, roughness: 0.6 })
    )
    pole.position.set(2, 2, 1)
    scene.add(pole)

    const lampHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 0.25, 0.5),
      new THREE.MeshStandardMaterial({ color: 0x3b3f52, roughness: 0.4 })
    )
    lampHead.position.set(2, 4, 1)
    scene.add(lampHead)

    const coneMaterial = new THREE.MeshStandardMaterial({
      color: 0xffe6b0,
      transparent: true,
      opacity: 0.3,
      emissive: 0xffe1a3,
      emissiveIntensity: 0.5,
      roughness: 0.2,
    })

    const lightCone = new THREE.Mesh(new THREE.ConeGeometry(2, 4, 32, 1, true), coneMaterial)
    lightCone.position.set(2, 1.5, 1)
    lightCone.rotation.x = Math.PI
    scene.add(lightCone)

    // Man figure
    const manGroup = new THREE.Group()

    const torso = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.8, 0.25),
      new THREE.MeshStandardMaterial({ color: 0x1f2937 })
    )
    torso.position.y = 0.8

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x111827 })
    )
    head.position.y = 1.35

    const leftLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.6, 0.15),
      new THREE.MeshStandardMaterial({ color: 0x0f172a })
    )
    leftLeg.position.set(-0.12, 0.2, 0)

    const rightLeg = leftLeg.clone()
    rightLeg.position.set(0.12, 0.2, 0)

    manGroup.add(torso, head, leftLeg, rightLeg)
    manGroup.position.set(-3, 0, 0)
    scene.add(manGroup)

    // Walking animation
    const walkTimeline = gsap.timeline({ repeat: -1, yoyo: false })
    walkTimeline
      .to(leftLeg.rotation, { x: 0.8, duration: 0.4, ease: "sine.inOut" }, 0)
      .to(rightLeg.rotation, { x: -0.8, duration: 0.4, ease: "sine.inOut" }, 0)
      .to(manGroup.position, { x: 5, duration: 3, ease: "none" }, 0)
      .to(leftLeg.rotation, { x: -0.8, duration: 0.4, ease: "sine.inOut" }, 0.4)
      .to(rightLeg.rotation, { x: 0.8, duration: 0.4, ease: "sine.inOut" }, 0.4)

    sceneRef.current = {
      renderer,
      scene,
      camera,
      manGroup,
      light: streetLight,
      coneMaterial,
    }

    const resize = () => {
      const { clientWidth, clientHeight } = container
      renderer.setSize(clientWidth, clientHeight, false)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
    }

    resize()
    window.addEventListener("resize", resize)

    let frameId: number
    const renderScene = () => {
      frameId = requestAnimationFrame(renderScene)
      renderer.render(scene, camera)
    }

    renderScene()

    // Scroll parallax effect
    gsap.to(manGroup.position, {
      y: window.innerHeight * 0.5,
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        onUpdate: (self) => {
          const progress = self.progress
          manGroup.position.y = progress * window.innerHeight * 0.3
          streetLight.intensity = 2 + progress * 0.5
        },
      },
    })

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(frameId)
      walkTimeline.kill()
      scene.clear()
      renderer.dispose()
      ground.geometry.dispose()
      ;(ground.material as THREE.Material).dispose()
      pole.geometry.dispose()
      ;(pole.material as THREE.Material).dispose()
      lampHead.geometry.dispose()
      ;(lampHead.material as THREE.Material).dispose()
      lightCone.geometry.dispose()
      coneMaterial.dispose()
      torso.geometry.dispose()
      ;(torso.material as THREE.Material).dispose()
      head.geometry.dispose()
      ;(head.material as THREE.Material).dispose()
      leftLeg.geometry.dispose()
      ;(leftLeg.material as THREE.Material).dispose()
      rightLeg.geometry.dispose()
      ;(rightLeg.material as THREE.Material).dispose()
    }
  }, [])

  return (
    <div ref={containerRef} className="page-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="page-bg__overlay" />
    </div>
  )
}
