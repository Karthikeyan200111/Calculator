const Display=({input,output})=>{
    return(
      <>
        <span className="block text-right text-xl">{output}</span>
        <span className="block text-right text-xl">{input}</span>
      </>
    )

}
export default Display;