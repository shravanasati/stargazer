import { useEffect, useState } from "react"
import { Loading } from "./Loading"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion"

export function POTD() {
  const [element, setElement] = useState(Loading())
  useEffect(() => {
    const fetchPOTD = async () => {
      const response = await fetch("/api/potd")
      const data = await response.json()
      setElement(
        <div>
          <h2 className="text-3xl my-4 font-bold text-black">{data.title}</h2>

          <img src={data.url} alt={data.title} className="w-80 h-80" />

          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Description</AccordionTrigger>
              <AccordionContent>
                <p className="text-black">{data.description}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </div>
      )
    }

    fetchPOTD()
  }, [])
  return element
}