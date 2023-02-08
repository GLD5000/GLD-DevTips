import { useEffect } from 'react';
import SvgButton from '../../../elements/SvgButton';
import { useInputFormContext } from '../../../contexts/Providers/InputFormProvider';

export default function SectionControls({ index: key }) {
  const {
    dispatchInputForm,
    inputForm: {
      data: { sections },
    },
    inputForm: {
      metadata: { focusId },
    },
  } = useInputFormContext();
  useEffect(() => {
    let isMounted = true;
    if (isMounted && focusId > -1) {
      const inputElement = document.getElementById(`${focusId}-SectionField`);
      inputElement.focus();
    }

    return () => {
      isMounted = false;
    };
  }, [focusId]);

  return (
    <div className="flex h-min w-full flex-wrap gap-2">
      <SvgButton
        buttonClasses="w-auto h-10 place-content-center grid grid-cols-frAutoFr flex-grow flex-shrink"
        type="up"
        key={`${key}moveFieldUp`}
        text="Up"
        clickFunction={moveFieldUp}
        id={`${key}-moveFieldUp`}
      />
      <SvgButton
        buttonClasses="w-auto h-10 place-content-center grid grid-cols-frAutoFr flex-grow flex-shrink"
        type="down"
        key={`${key}moveFieldDown`}
        backgroundColor="bg-transparent"
        text="Down"
        clickFunction={moveFieldDown}
        id={`${key}-moveFieldDown`}
      />

      <SvgButton
        buttonClasses="w-auto h-10 place-content-center grid grid-cols-frAutoFr flex-grow flex-shrink"
        type="duplicate"
        key={`${key}duplicateField`}
        text="Copy"
        clickFunction={duplicateField}
        id={`${key}-duplicatefield`}
        svgClasses="stroke-1 stroke-current fill-neutral-800"
      />
      <SvgButton
        buttonClasses="w-auto h-10 place-content-center grid grid-cols-frAutoFr flex-grow flex-shrink"
        type="add"
        key="addField"
        text="Add"
        clickFunction={addField}
        id={`${key}-addField`}
      />
      {key > 0 && (
        <SvgButton
          buttonClasses="w-auto h-auto grid grid-cols-frAutoFr flex-grow flex-shrink"
          type="delete"
          key={`${key}deleteIndexedField`}
          text="Delete"
          clickFunction={deleteIndexedField}
          id={`${key}-deleteIndexedField`}
        />
      )}
    </div>
  );

  function moveFieldUp(e) {
    const index = getSectionIndexFromId(e);
    const newSections = swapArrayPositions(sections, index, 'up');
    if (newSections !== null) {
      dispatchInputForm({
        type: 'REPLACE_FIELD',
        payload: { field: 'sections', value: newSections, focusId: index - 1 },
      });
    }
  }
  function moveFieldDown(e) {
    const index = getSectionIndexFromId(e);
    const duplicateSections = sections.map((x) => ({ ...x }));
    const newSections = swapArrayPositions(duplicateSections, index, 'down');
    if (newSections !== null) {
      dispatchInputForm({
        type: 'REPLACE_FIELD',
        payload: { field: 'sections', value: newSections, focusId: index + 1 },
      });
    }
  }
  function getSectionIndexFromId(e) {
    return parseInt(e.target.id.split('-')[0], 10);
  }
  function deleteIndexedField(e) {
    const index = getSectionIndexFromId(e);
    const newSections = sections.filter((_, i) => index !== i);
    dispatchInputForm({
      type: 'REPLACE_FIELD',
      payload: { field: 'sections', value: newSections, focusId: -1 },
    });
  }

  function duplicateField(e) {
    const index = getSectionIndexFromId(e);
    const duplicateObject = { ...sections[index] };
    duplicateObject.title =
      sections[index].title === undefined
        ? `Copy of section ${index + 1}`
        : `${sections[index].title} (copy)`;
    dispatchInputForm({
      type: 'REPLACE_FIELD',
      payload: {
        field: 'sections',
        value: [...sections, duplicateObject],
        focusId: sections.length,
      },
    });
  }

  function swapArrayPositions(array, index, direction = 'up') {
    const arrayCopy = [...array];
    const indexModifier = direction === 'down' ? 1 : -1;
    const secondIndex = index + indexModifier;
    const indexLimit = arrayCopy.length - 1;
    if (secondIndex > indexLimit || secondIndex < 0) return null;
    [arrayCopy[index], arrayCopy[secondIndex]] = [arrayCopy[secondIndex], arrayCopy[index]];
    return arrayCopy;
  }

  function addField() {
    dispatchInputForm({ type: 'ADD_SECTION' });
  }
}
