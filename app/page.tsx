"use client"
import { useRef, useState } from "react"

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

export default function Home() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [started, setStarted] = useState(false)

    const start = () => {
        const audio = audioRef.current
        if (!audio) return

        const fadeIn = (target = 0.7, duration = 4000) => {
            const startTime = performance.now()
            audio.volume = 0

            const step = (now: number) => {
                const rawT = (now - startTime) / duration
                const t = clamp01(rawT)
                audio.volume = clamp01(t * target)
                if (t < 1) requestAnimationFrame(step)
            }

            requestAnimationFrame(step)
        }

        const playAudio = async () => {
            // pick a random start point (leave 10s buffer if possible)
            const duration = Number.isFinite(audio.duration) ? audio.duration : 0
            const maxStart = Math.max(0, duration - 10)
            audio.currentTime = maxStart > 0 ? Math.random() * maxStart : 0

            audio.loop = true
            audio.volume = 0

            try {
                await audio.play()
                fadeIn()
            } catch (e) {
                // If the browser still blocks playback for any reason,
                // you'll see it here instead of a silent failure.
                console.error("Audio play() failed:", e)
            }
        }

        if (audio.readyState >= 1) {
            void playAudio()
        } else {
            audio.onloadedmetadata = () => void playAudio()
        }

        setStarted(true)
    }

    return (
        <div className="scene">
            <img src="/img/scene.png" className="bg" alt="Scene" />
            <div className="scribble">Clo’s radio</div>


            {/* steam sprites you already have */}
            <div className="steam" aria-hidden="true">
                <img src="/img/steam1.png" className="steam-img s1" alt="" />
                <img src="/img/steam2.png" className="steam-img s2" alt="" />
                <img src="/img/steam3.png" className="steam-img s3" alt="" />
            </div>

            {/* ZzZ sprites (place them above the cat) */}
            <div className="zzz" aria-hidden="true">
                <img src="/img/z1.png" className="zzz-img zzz1" alt="" />
                <img src="/img/z2.png" className="zzz-img zzz2" alt="" />
                <img src="/img/z3.png" className="zzz-img zzz3" alt="" />
            </div>

            {!started && (
                <div className="start-overlay" onClick={start} role="button" tabIndex={0}>
                    <div className="start-button">Click to start ✨</div>
                </div>
            )}

            {/* make sure this matches your actual filename */}
            <audio ref={audioRef} src="/audio/guitars.mp3" preload="metadata" />
        </div>
    )
}
