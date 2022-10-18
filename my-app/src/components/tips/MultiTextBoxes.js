import MultiTextBox from './MultiTextBox'

const MultiTextBoxes = ({tip}) => {
  return (
    <container className="MultiTextContainer">
            {tip.sections.map((object, index) => (
                <MultiTextBox key={index} object={object} />
            ))}

    </container>
  )
}

export default MultiTextBoxes