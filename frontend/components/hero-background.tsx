import { useEffect, useRef } from "react"
import gsap from "gsap"
import * as THREE from "three"

type HeroBackgroundProps = {
  isActive: boolean
}

export function HeroBackground({ isActive }: HeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<{
    walkTimeline: gsap.core.Timeline | null
    light: THREE.PointLight | null
    coneMaterial: THREE.MeshStandardMaterial | null
  }>({
    walkTimeline: null,
    light: null,
    coneMaterial: null,
  })

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current

    if (!container || !canvas) {
      return
    }

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x0b0b14, 4, 14)

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 2.4, 6.5)

    const ambient = new THREE.AmbientLight(0x7b7b8d, 0.35)
    scene.add(ambient)

    const streetLight = new THREE.PointLight(0xfff2cc, 2.2, 20, 2)
    streetLight.position.set(1.4, 3.4, 0.5)
    scene.add(streetLight)

    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 12),
      new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.9 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.2
    scene.add(ground)

    const pole = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.12, 4, 16),
      new THREE.MeshStandardMaterial({ color: 0x2c2d3a, roughness: 0.6 })
    )
    pole.position.set(1.4, 1.6, 0.5)
    scene.add(pole)

    const lampHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.2, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x3b3f52, roughness: 0.4 })
    )
    lampHead.position.set(1.4, 3.2, 0.5)
    scene.add(lampHead)

    const coneMaterial = new THREE.MeshStandardMaterial({
      color: 0xffe6b0,
      transparent: true,
      opacity: 0.35,
      emissive: 0xffe1a3,
      emissiveIntensity: 0.6,
      roughness: 0.2,
    })

    const lightCone = new THREE.Mesh(new THREE.ConeGeometry(1.6, 3.2, 32, 1, true), coneMaterial)
    lightCone.position.set(1.4, 1.4, 0.5)
    lightCone.rotation.x = Math.PI
    scene.add(lightCone)

    const manGroup = new THREE.Group()

    const torso = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.7, 0.2),
      new THREE.MeshStandardMaterial({ color: 0x1f2937 })
    )
    torso.position.y = 0.7

    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.17, 16, 16),
      new THREE.MeshStandardMaterial({ color: 0x111827 })
    )
    head.position.y = 1.2

    const leftLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.5, 0.12),
      new THREE.MeshStandardMaterial({ color: 0x0f172a })
    )
    leftLeg.position.set(-0.1, 0.15, 0)

    const rightLeg = leftLeg.clone()
    rightLeg.position.set(0.1, 0.15, 0)

    manGroup.add(torso, head, leftLeg, rightLeg)
    manGroup.position.set(-1.4, 0, 0.2)
    scene.add(manGroup)

    const walkTimeline = gsap.timeline({ repeat: -1, yoyo: true })
    walkTimeline
      .to(leftLeg.rotation, { x: 0.7, duration: 0.35, ease: "sine.inOut" }, 0)
      .to(rightLeg.rotation, { x: -0.7, duration: 0.35, ease: "sine.inOut" }, 0)
      .to(manGroup.position, { x: -1.1, duration: 0.7, ease: "sine.inOut" }, 0)

    const idleTimeline = gsap.timeline({ repeat: -1, yoyo: true })
    idleTimeline.to(manGroup.rotation, { y: 0.12, duration: 2.5, ease: "sine.inOut" })

    animationRef.current = {
      walkTimeline,
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

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(frameId)
      walkTimeline.kill()
      idleTimeline.kill()
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

  useEffect(() => {
    const { walkTimeline, light, coneMaterial } = animationRef.current
    if (!walkTimeline || !light || !coneMaterial) {
      return
    }

    if (isActive) {
      gsap.to(light, { intensity: 3.6, duration: 0.4, ease: "power2.out" })
      gsap.to(coneMaterial, { opacity: 0.55, duration: 0.4, ease: "power2.out" })
      walkTimeline.timeScale(1.6)
    } else {
      gsap.to(light, { intensity: 2.2, duration: 0.5, ease: "power2.out" })
      gsap.to(coneMaterial, { opacity: 0.35, duration: 0.5, ease: "power2.out" })
      walkTimeline.timeScale(1)
    }
  }, [isActive])

  return (
    <div ref={containerRef} className="hero-bg" aria-hidden="true">
      <canvas ref={canvasRef} />
      <div className="hero-bg__overlay" />
    </div>
  )
}
