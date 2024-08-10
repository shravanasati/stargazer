import { useEffect, useState } from "react"
import { Loading } from "./Loading"

export function EventsBoard() {
  const [element, setElement] = useState(Loading())
  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("http://localhost:5000/api/events")
      const data = await response.json()
      setElement(
        <div className="m-2 p-2">
          {data.map((entry: any, idx: number) => {
            return (
              <div key={idx}>
                <h2 className="text-3xl my-4 font-bold text-white">{entry.name}</h2>
                <img src={entry.image} alt={entry.name} className="w-80 h-80" />
                <p className="text-white">{entry.description}</p>
              </div>
            )
          })}
        </div>
      )
    }

    fetchEvents()
  }, [])
  return element
}