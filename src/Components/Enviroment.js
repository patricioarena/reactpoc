import React, { useRef, useState } from "react"

function EnviromentCustom() {

  const [node_env, setEnv] = useState(process.env.NODE_ENV)
  window.process = node_env

  return (
    <div className="ribbon-box">
      <div className="ribbon-corner">{node_env}</div>
      <div className="ribbon-text"></div>
    </div>

  )

}

export default EnviromentCustom
