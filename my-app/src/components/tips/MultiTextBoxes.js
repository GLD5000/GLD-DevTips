import MultiTextBox from './MultiTextBox'

const MultiTextBoxes = ({tip}) => {
  return (
    <section className="MultiTextContainer">
            {tip.sections.map((object, index) => (
                <MultiTextBox key={index} object={object} />
            ))}

    </section>
  )
}

export default MultiTextBoxes