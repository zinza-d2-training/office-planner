import { ToolKitType } from '@client/components/DesignBoard'
import styles from './Navbar.module.scss'

export const Navbar = ({
  selectedToolkit,
  setToolkit,
  isDrawing,
  setIsDrawing,
}: {
  selectedToolkit: ToolKitType
  setToolkit: React.Dispatch<React.SetStateAction<ToolKitType>>
  isDrawing: boolean
  setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>
  
}) => {
  return (
    <div id={styles.navbar}>
      <ul>
        <li className={
          selectedToolkit === "move" ? styles.active : ""
        }
        onClick={() => {
          setToolkit("move")
        }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="30px" height="30px" viewBox="0 0 24 24">
            <path d="M8.85355339,19.8535534 C8.58780599,20.1193008 8.13485879,20.0078536 8.02276001,19.6491375 L3.02276001,3.6491375 C2.90244119,3.26411727 3.26411727,2.90244119 3.6491375,3.02276001 L19.6491375,8.02276001 C20.0078536,8.13485879 20.1193008,8.58780599 19.8535534,8.85355339 L16.2071068,12.5 L20.8535534,17.1464466 C21.0488155,17.3417088 21.0488155,17.6582912 20.8535534,17.8535534 L17.8535534,20.8535534 C17.6582912,21.0488155 17.3417088,21.0488155 17.1464466,20.8535534 L12.5,16.2071068 L8.85355339,19.8535534 Z M4.26195703,4.26195703 L8.73076159,18.5621316 L12.1464466,15.1464466 C12.3417088,14.9511845 12.6582912,14.9511845 12.8535534,15.1464466 L17.5,19.7928932 L19.7928932,17.5 L15.1464466,12.8535534 C14.9511845,12.6582912 14.9511845,12.3417088 15.1464466,12.1464466 L18.5621316,8.73076159 L4.26195703,4.26195703 Z" />
          </svg>
        </li>
        <li className={
          selectedToolkit === "retangle" ? styles.active : ""
        }
        onClick={() => {
          setToolkit("retangle")
          setIsDrawing(true)
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" fill="#ffffff" ><path d="M1 21h22V3H1zM2 4h20v16H2z" /><path fill="none" d="M0 0h24v24H0z" /></svg>
        </li>
        <li className={
          selectedToolkit === "circle" ? styles.active : ""
        }
        onClick={() => {
          setToolkit("circle")
          setIsDrawing(true)
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" width="30px" height="30px" viewBox="0 0 32 32" version="1.1">
            <title>circle</title>
            <path d="M16 1.25c-8.146 0-14.75 6.604-14.75 14.75s6.604 14.75 14.75 14.75c8.146 0 14.75-6.604 14.75-14.75v0c-0.010-8.142-6.608-14.74-14.749-14.75h-0.001zM16 29.25c-7.318 0-13.25-5.932-13.25-13.25s5.932-13.25 13.25-13.25c7.318 0 13.25 5.932 13.25 13.25v0c-0.008 7.314-5.936 13.242-13.249 13.25h-0.001z" />
          </svg>
        </li>
      </ul>
    </div>
  )
}