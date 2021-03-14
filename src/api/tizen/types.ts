export interface CommonError {
  name: string
  message: string
}

export type ResultCallbackReadFiles = (text: string | null) => void
export type ResultCallbackWriteToFile = (text: string | boolean) => void
