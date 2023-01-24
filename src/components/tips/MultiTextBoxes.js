import MultiTextBox from './MultiTextBox'

const MultiTextBoxes = ({tip}) => {
  return (
    <section className="flex gap-4 flex-col ml-0 w-full mb-auto">
            {tip.sections.map((object, index) => (
                <MultiTextBox key={index} object={object} />
            ))}

    </section>
  )
}

export default MultiTextBoxes