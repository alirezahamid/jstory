import "./preview.css"
import React, { useRef, useEffect } from "react"
interface PreviewProps {
  code: string
  bundlingStatus: String
}

const html = `
<html>
  <head>
    <style>
      html{background-color: white;}
    </style>
  </head>
  <body>
  <div id="root"></div>
  <script>
  const handleErorr = (err) =>{
      const root = document.querySelector('#root')
      root.innerHTML = '<div style="color: red"><h4>Runtime Error:</h4>' + err + '</div>'
      console.error(err);
  }
  window.addEventListener('error', (event)=>{
    event.preventdefault()
    handleErorr(event.error)
  })
    window.addEventListener('message', ()=>{
      try{
        eval(event.data)
      }
      catch(err){
        handleErorr(err)
      }
    }, false)
  </script>
  </body>
</html>
`

const Preview: React.FC<PreviewProps> = ({ code, bundlingStatus }) => {
  const iframe = useRef<any>()

  useEffect(() => {
    iframe.current.srcdoc = html
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*")
    }, 50)
  }, [code])
  return (
    <div className="preview-wrapper">
      <iframe
        ref={iframe}
        title="preview"
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {bundlingStatus && <div className="preview-error">{bundlingStatus}</div>}
    </div>
  )
}

export default Preview
