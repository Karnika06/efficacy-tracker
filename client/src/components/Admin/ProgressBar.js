import { colors } from "../Styles"

const ProgressBar = ({bgcolor,progress,height, label}) => {
     
    const Parentdiv = {
        height: height,
        width: '100%',
        backgroundColor: colors.light2,
        borderRadius: '5px',
        
      }
      
      const Childdiv = {
        height: '100%',
        width: progress ? `${progress}%` : '0',
        backgroundColor: bgcolor,
       borderRadius: '5px',
        textAlign: 'right',
        display: 'flex',
        justifyContent: 'end',
        alignItems: 'center',

        ':after': {
            content: 'asdx'
        }

      }

    //   const Childdiv::after = {

    //   }
      
      const progresstext = {
        padding: '10px',
        color: 'black',
        fontWeight: 900,
        
      }
        
    return (<>
    <div style={{margin: '2% 0' }}>

        <span>{label }</span>
    <div style={Parentdiv}>
            
      <div style={Childdiv}>
        
        <span style={progresstext}>{progress ? `${progress}%` : '0'}</span>
      </div>
      
    </div>
    </div>
    </>
    )
}
  
export default ProgressBar;