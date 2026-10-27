import { useEffect } from 'react'

/** Sets the browser tab title while the page is open. */
export const useDocumentTitle = (title?: string) => {
  useEffect(() => {
    if (!title) return
    const previous = document.title
    document.title = title
    return () => {
      document.title = previous
    }
  }, [title])
}