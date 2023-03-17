import SvgButton from '../../../elements/SvgButton';
import { useInputFormContext } from '../../../contexts/Providers/InputFormProvider';
import InputSelect from './InputSelect';

function getReturnArray(type, index, AddToTextarea) {
  if (type === 'code') return null;
  const buttonArraySelector = {
    text: [
      'header',
      'bold',
      'italic',
      'quote',
      'code',
      'link',
      'bullet',
      'numbered',
      'table',
      'hint',
    ],
    table: ['header', 'bold', 'italic', 'link'],
    hint: ['header', 'bold', 'italic', 'link', 'bullet', 'numbered'],
  };

  const buttonObject = {
    header: {
      type: 'header',
      text: 'Header',
      onClick: (e) => {
        AddToTextarea(e, ['\n##', 'Header', '']);
      },
    },
    bold: {
      type: 'bold',
      text: 'Bold',
      onClick: (e) => {
        AddToTextarea(e, ['**', 'Bold', '**']);
      },
    },
    italic: {
      type: 'italic',
      text: 'Italic',
      onClick: (e) => {
        AddToTextarea(e, ['_', 'Italic', '_']);
      },
    },
    quote: {
      type: 'quote',
      text: 'Quote',
      onClick: (e) => {
        AddToTextarea(e, ['\n>', 'Block Quote', '']);
      },
    },
    code: {
      type: 'code',
      text: 'Code',
      onClick: (e) => {
        AddToTextarea(e, ['\n```', 'Code\n\n  \n\n\n', '```\n']);
      },
    },
    link: {
      type: 'link',
      text: 'Link',
      onClick: (e) => {
        AddToTextarea(e, ['[', 'Link Name', '](url)']);
      },
    },

    bullet: {
      type: 'bullet',
      text: 'Bullet Point',
      onClick: (e) => {
        AddToTextarea(e, ['\n - ', 'Bullet Point', '']);
      },
    },
    numbered: {
      type: 'numbered',
      text: 'Numbered List',
      onClick: (e) => {
        AddToTextarea(e, ['\n n. ', 'Numbered List', '']);
      },
    },
    table: {
      type: 'table',
      text: 'Table',
      onClick: (e) => {
        AddToTextarea(e, ['\n|||\n', 'HeaderA,HeaderB\nRow1a,Row1b', '\n|||\n']);
      },
    },
    hint: {
      type: 'hint',
      text: 'hint',
      onClick: (e) => {
        AddToTextarea(e, ['\n???\n', 'Hint', '\n???\n']);
      },
    },
  };

  const returnArray = buttonArraySelector[type].map((name) => {
    const btn = buttonObject[name];
    return (
      <SvgButton
        wide="false"
        type={btn.type}
        color="current"
        backgroundColor="transparent"
        id={`${index}-${btn.text}`}
        key={btn.text}
        name={btn.text}
        text={btn.text}
        clickFunction={btn.onClick}
        marginLeft="0"
        showText={false}
        buttonClasses="w-12 h-10 grid grid-cols-autoAuto place-content-center"
      />
    );
  });

  return returnArray;
}

export default function SectionTextTools({ index: key, type, changeValue }) {
  const { dispatchInputForm } = useInputFormContext();

  const extraButtons = getReturnArray(type, key, AddToTextarea);
  return (
    <div className="flex h-fit flex-row flex-wrap gap-2 self-start">
      <label className="flex items-center gap-2 text-lg">
        Mode:
        <InputSelect
          key={`${key}InputSelect`}
          type={type}
          index={key}
          name={key}
          changeType={changeValue}
          value={type}
        />
      </label>

      {extraButtons}
    </div>
  );

  function AddToTextarea(e, textToAdd) {
    const sectionIndex = getSectionIndexFromId(e);
    const selection = getSelection(sectionIndex);
    insertTextArea(selection, textToAdd);
  }
  function getSelection(sectionNumber) {
    const selection = {};
    selection.start = document.getElementById(`${sectionNumber}-SectionField`).selectionStart;
    selection.end = document.getElementById(`${sectionNumber}-SectionField`).selectionEnd;
    selection.index = sectionNumber;
    return selection;
  }
  function insertTextArea(selection, textToAdd) {
    const inputElement = document.getElementById(`${selection.index}-SectionField`);
    const currentValue = inputElement.value;
    const oldContent = splitContent(selection, currentValue);
    const [newContent, updatedSelection] = toggleFlags(textToAdd, oldContent, selection);

    updateTextArea(updatedSelection, newContent);
    addTextareaToState(updatedSelection.index, newContent);
  }
  function getSectionIndexFromId(e) {
    return parseInt(e.target.id.split('-')[0], 10);
  }
  function addTextareaToState(index, newContent) {
    dispatchInputForm({
      type: 'REPLACE_SECTION_DATA_FIELD',
      payload: {
        field: 'content',
        index,
        value: newContent,
      },
    });
  }

  function updateTextArea({ index, start, end }, content) {
    const inputElement = document.getElementById(`${index}-SectionField`);
    inputElement.select();
    inputElement.setRangeText(content);
    inputElement.selectionStart = start;
    inputElement.selectionEnd = end;
    inputElement.focus();
  }
  function removeFlags(oldContent, textToAdd, index, selection) {
    const preSelection = oldContent[0].slice(0, index);
    const selectedText = oldContent[1] === textToAdd[1] ? '' : oldContent[1];
    const postSelection = oldContent[2].slice(textToAdd[2].length);
    const selectionCopy = { ...selection };
    selectionCopy.start = index;
    selectionCopy.end = selection.start + selectedText.length;

    return [[preSelection, selectedText, postSelection].join(''), selectionCopy];
  }
  function addFlags(oldContent, textToAdd, selection) {
    const preSelection = oldContent[0] + textToAdd[0];
    const selectedText = oldContent[1] === '' ? textToAdd[1] : oldContent[1];
    const postSelection = textToAdd[2] + oldContent[2];
    const selectionCopy = { ...selection };
    selectionCopy.start = preSelection.length;
    selectionCopy.end = selectionCopy.start + selectedText.length;
    return [[preSelection, selectedText, postSelection].join(''), selectionCopy];
  }

  function addHash(oldContent, textToAdd, selection) {
    const preSelection = `${oldContent[0]}#`;
    const selectedText = oldContent[1] === '' ? textToAdd[1] : oldContent[1];
    const postSelection = oldContent[2];
    const selectionCopy = { ...selection };
    selectionCopy.start = preSelection.length;
    selectionCopy.end = selectionCopy.start + selectedText.length;

    return [[preSelection, selectedText, postSelection].join(''), selectionCopy];
  }
  function findFlagIndex(string, flag) {
    const index = string.lastIndexOf(flag);
    const flagIsPresent = index > -1 && index === string.length - flag.length;
    return [flagIsPresent, index];
  }

  function toggleHeaderFlags(textToAddIn, oldContent, selectionIn) {
    const textToAdd = textToAddIn;
    const selectionObject = selectionIn;
    const notAtStart = selectionObject.start > 4;
    const finalFlag = notAtStart ? '\n####' : '####';

    const [finalFlagIsPresent, indexOfFinalFlag] = findFlagIndex(oldContent[0], finalFlag);

    if (finalFlagIsPresent) {
      return removeFlags(oldContent, textToAdd, indexOfFinalFlag, selectionIn);
    }

    const shortFlag = '##';
    let indexOfFirstFlag = oldContent[0].lastIndexOf(textToAdd[0]);
    const indexOfShortFlag = oldContent[0].lastIndexOf(shortFlag);
    if (indexOfFirstFlag === -1 && indexOfShortFlag > -1) {
      indexOfFirstFlag = indexOfShortFlag;
      textToAdd[0] = shortFlag;
    }
    const shouldRemoveLineBreak =
      selectionObject.start === 0 ||
      indexOfFirstFlag === 0 ||
      oldContent[0][oldContent[0].length - 1] === '\n';
    if (shouldRemoveLineBreak) textToAdd[0] = shortFlag;
    const firstFlagIsPresent =
      finalFlagIsPresent === false &&
      indexOfFirstFlag > -1 &&
      indexOfFirstFlag === oldContent[0].length - textToAdd[0].length;

    const intermediateFlag = '###';
    const indexOfIntermediateFlag = oldContent[0].lastIndexOf(intermediateFlag);
    const intermediateFlagIsPresent =
      finalFlagIsPresent === false &&
      indexOfIntermediateFlag > -1 &&
      indexOfIntermediateFlag === oldContent[0].length - intermediateFlag.length;

    if (firstFlagIsPresent || intermediateFlagIsPresent) {
      return addHash(oldContent, textToAdd, selectionIn);
    }
    if (
      textToAdd[0].length < 3 &&
      selectionObject.start !== 0 &&
      oldContent[0][oldContent[0].length - 1] !== '\n'
    )
      textToAdd[0] = `\n${textToAdd[0]}`;
    return addFlags(oldContent, textToAdd, selectionIn);
  }

  function toggleLinkFlags(textToAdd, oldContent, selectionIn) {
    // could have selection or not
    // [text](url)
    // [title](title=title)
    // [tag1 tag2](tags=tag1,tag2)

    const indexOfFirstFlag = oldContent[0].lastIndexOf(textToAdd[0]);
    const firstFlagIsPresent =
      indexOfFirstFlag > -1 && indexOfFirstFlag === oldContent[0].length - textToAdd[0].length;
    const SecondFlagIsPresent =
      oldContent[2].indexOf(textToAdd[2]) === 0 || textToAdd[2].length === 0;

    if (firstFlagIsPresent && SecondFlagIsPresent) {
      return removeFlags(oldContent, textToAdd, indexOfFirstFlag, selectionIn);
    }
    return addFlags(oldContent, textToAdd, selectionIn);
  }
  function toggleFlags(textToAddIn, oldContent, selectionIn) {
    const textToAdd = textToAddIn;
    if (textToAdd[1] === 'Header') {
      return toggleHeaderFlags(textToAdd, oldContent, selectionIn);
    }

    if (textToAdd[1] === 'Link Name') {
      return toggleLinkFlags(textToAdd, oldContent, selectionIn);
    }

    const indexOfFirstFlag = oldContent[0].lastIndexOf(textToAdd[0]);
    const firstFlagIsPresent =
      indexOfFirstFlag > -1 && indexOfFirstFlag === oldContent[0].length - textToAdd[0].length;
    const SecondFlagIsPresent =
      oldContent[2].indexOf(textToAdd[2]) === 0 || textToAdd[2].length === 0;

    if (firstFlagIsPresent && SecondFlagIsPresent) {
      return removeFlags(oldContent, textToAdd, indexOfFirstFlag, selectionIn);
    }
    return addFlags(oldContent, textToAdd, selectionIn);
  }
  function splitContent(selectionIn, stringIn) {
    return [
      stringIn.slice(0, selectionIn.start),
      stringIn.slice(selectionIn.start, selectionIn.end),
      stringIn.slice(selectionIn.end),
    ];
  }
}
