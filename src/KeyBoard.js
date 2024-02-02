import React from 'react'
import Key from './Key'

const KeyBoard = ({calcData ,handleInput}) => {
  return (
    <>
        {calcData.map((key)=>
        (<Key key={key.id} keyData={key} handleInput={handleInput} />)
        )}
    </>
  )
}

export default KeyBoard