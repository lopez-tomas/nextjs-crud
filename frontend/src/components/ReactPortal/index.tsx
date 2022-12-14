import { useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'

interface Props {
  wrapperId: string;
  children: React.ReactElement
}

const createWrapperElement = (wrapperId: string) => {
  if (!document) return null

  const wrapperElement = document.createElement('div')
  wrapperElement.setAttribute('id', wrapperId)
  document.body.appendChild(wrapperElement)

  return wrapperElement
}

const ReactPortal = ({ wrapperId, children }: Props) => {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement>()

  useLayoutEffect(() => {
    let element = document.getElementById(wrapperId)
    let systemCreated = false

    if (!element) {
      element = createWrapperElement(wrapperId)
      systemCreated = true
    }
    setWrapperElement(element!)

    return () => {
      if (systemCreated && element?.parentNode) {
        element.parentNode.removeChild(element)
      }
    }
  }, [wrapperId])

  if (!wrapperElement) return null

  return createPortal(children, wrapperElement)
}

export default ReactPortal
