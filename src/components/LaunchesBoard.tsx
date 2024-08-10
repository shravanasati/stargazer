import { useEffect, useState } from "react"
import { Loading } from "./Loading"

export function LaunchesBoard() {
  const [element, setElement] = useState(Loading())
  useEffect(() => {
    const fetchLaunches = async () => {
      const response = await fetch("http://localhost:5000/api/launches")
      const data = await response.json()
      console.log(data)
      setElement(
        <div className="m-2 p-2">
          {data.map((entry: any) => {
            return (
              <>
              <h2 className="text-3xl my-4 font-bold text-black">{entry.name}</h2>
              <h3 className="text-3xl my-4 font-bold text-black">{entry.rocket}</h3>
              <p className="text-black">{entry.time}</p>
              </>
            )
          })}
        </div>
      )
    }

    fetchLaunches()
  }, [])
  return element
}