import { useRef, useState, useEffect } from 'react'
import ResizeObserver from 'resize-observer-polyfill'

export default function useMeasure(): [{ref: React.MutableRefObject<any>}, {left: number, top: number, width: number, height: number}] {
	const ref = useRef(null)
	const [bounds, set] = useState({ left: 0, top: 0, width: 0, height: 0 })
	const [ro] = useState(() => new ResizeObserver(([entry]) => set(entry.contentRect)))
	useEffect(() => (ro.observe(ref.current), ro.disconnect), [])
	return [{ ref }, bounds]
}