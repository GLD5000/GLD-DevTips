import SvgButton from "../../../elements/SvgButton";
import { useInputFormContext } from "../../../contexts/Providers/InputFormProvider";

function getReturnArray(type, index, AddToTextarea) {
  if (type === "code") return null;
  const buttonArraySelector = {
    text: [
      "header",
      "bold",
      "italic",
      "quote",
      "code",
      "link",
      "bullet",
      "numbered",
      "table",
      "hint",
    ],
    table: ["header", "bold", "italic", "link"],
    hint: ["header", "bold", "italic", "quote", "link", "bullet", "numbered"],
  };

  const buttonObject = {
    header: {
      type: "header",
      text: "Header",
      onClick: (e) => {
        AddToTextarea(e, ["\n##", "Header", ""]);
      },
    },
    bold: {
      type: "bold",
      text: "Bold",
      onClick: (e) => {
        AddToTextarea(e, ["**", "Bold", "**"]);
      },
    },
    italic: {
      type: "italic",
      text: "Italic",
      onClick: (e) => {
        AddToTextarea(e, ["_", "Italic", "_"]);
      },
    },
    quote: {
      type: "quote",
      text: "Quote",
      onClick: (e) => {
        AddToTextarea(e, ["\n>", "Block Quote", ""]);
      },
    },
    code: {
      type: "code",
      text: "Code",
      onClick: (e) => {
        AddToTextarea(e, ["\n```", "Code\n\n  \n\n\n", "```\n"]);
      },
    },
    link: {
      type: "link",
      text: "Link",
      onClick: (e) => {
        AddToTextarea(e, ["[", "Link Name", "](url)"]);
      },
    },

    bullet: {
      type: "bullet",
      text: "Bullet Point",
      onClick: (e) => {
        AddToTextarea(e, ["\n - ", "Bullet Point", ""]);
      },
    },
    numbered: {
      type: "numbered",
      text: "Numbered List",
      onClick: (e) => {
        AddToTextarea(e, ["\n n. ", "Numbered List", ""]);
      },
    },
    table: {
      type: "table",
      text: "Table",
      onClick: (e) => {
        AddToTextarea(e, [
          "\n|||\n",
          "HeaderA,HeaderB\nRow1a,Row1b",
          "\n|||\n",
        ]);
      },
    },
    hint: {
      type: "hint",
      text: "hint",
      onClick: (e) => {
        AddToTextarea(e, ["\n???\n", "Hint", "\n???\n"]);
      },
    },
  };


  const returnArray = buttonArraySelector[type].map((name) => {
    const btn = buttonObject[name];
    return (
      <SvgButton
        wide="false"
        type={btn.type}
        color="whitesmoke"
        backgroundColor="transparent"
        id={index + "-" + btn.text}
        key={btn.text}
        name={btn.text}
        text={btn.text}
        clickFunction={btn.onClick}
        hoverFunction={btn.onHover}
        marginLeft="0"
        showText={false}
        buttonClasses={`w-fit grid grid-cols-autoAuto`}
      />
    );
  });

  return <div className="flex gap-2 h-fit flex-wrap flex-row col-span-2 items-start">{returnArray}</div>;
}

const selection = {};
export default function SectionMarkdown({
  index,
  type,
  onHover,
}) {
  const {
    dispatchInputForm,
  } = useInputFormContext();

  const extraButtons = getReturnArray(type, index, AddToTextarea);
  return (<div className="h-min">
      {extraButtons}
  </div>
  );

  function AddToTextarea(e, textToAdd) {
    const sectionIndex = getSectionIndexFromId(e);
    updateSelection(sectionIndex);
    insertTextArea(selection, textToAdd);
  }
  function updateSelection(sectionNumber) {
    selection.start = document.getElementById(
      sectionNumber + "-SectionField"
    ).selectionStart;
    selection.end = document.getElementById(
      sectionNumber + "-SectionField"
    ).selectionEnd;
    selection.index = sectionNumber;
  }
  function insertTextArea(selection, textToAdd) {
    const inputElement = document.getElementById(
      selection.index + "-SectionField"
    );
    const currentValue = inputElement.value;
    const oldContent = splitContent(selection, currentValue);
    const newContent = toggleFlags(textToAdd, oldContent, selection);

    updateTextArea(selection, newContent);
    addTextareaToState(selection.index, newContent);
  }
  function getSectionIndexFromId(e) {
    return parseInt(e.target.id.split("-")[0]);
  }
  function addTextareaToState(index, newContent) {
    dispatchInputForm({
      type: "REPLACE_SECTION_DATA_FIELD",
      payload:{

        field: "content",
        index: index,
        value: newContent,
      }
    });
  }



  function updateTextArea({ index, start, end }, content) {
    const inputElement = document.getElementById(index + "-SectionField");
    inputElement.select();
    inputElement.setRangeText(content);
    inputElement.selectionStart = start;
    inputElement.selectionEnd = end;
    inputElement.focus();
  }
  function removeFlags(oldContent, textToAdd, index) {
    const preSelection = oldContent[0].slice(0, index);
    const selectedText = oldContent[1] === textToAdd[1] ? "" : oldContent[1];
    const postSelection = oldContent[2].slice(textToAdd[2].length);
    selection.start = index;
    selection.end = selection.start + selectedText.length;

    return [preSelection, selectedText, postSelection].join("");
  }
  function addFlags(oldContent, textToAdd) {
    const preSelection = oldContent[0] + textToAdd[0];
    const selectedText = oldContent[1] === "" ? textToAdd[1] : oldContent[1];
    const postSelection = textToAdd[2] + oldContent[2];
    selection.start = preSelection.length;
    selection.end = selection.start + selectedText.length;
    return [preSelection, selectedText, postSelection].join("");
  }

  function addHash(oldContent, textToAdd) {
    const preSelection = oldContent[0] + "#";
    const selectedText = oldContent[1] === "" ? textToAdd[1] : oldContent[1];
    const postSelection = oldContent[2];
    selection.start = preSelection.length;
    selection.end = selection.start + selectedText.length;

    return [preSelection, selectedText, postSelection].join("");
  }
  function findFlagIndex(string, flag) {
    const index = string.lastIndexOf(flag);
    const flagIsPresent = index > -1 && index === string.length - flag.length;
    return [flagIsPresent, index];
  }

  function toggleHeaderFlags(textToAdd, oldContent, selection) {
    const notAtStart = selection.start > 4;
    const finalFlag = notAtStart ? "\n####" : "####";

    const [finalFlagIsPresent, indexOfFinalFlag] = findFlagIndex(
      oldContent[0],
      finalFlag
    );

    if (finalFlagIsPresent) {
      return removeFlags(oldContent, textToAdd, indexOfFinalFlag);
    }

    const shortFlag = "##";
    let indexOfFirstFlag = oldContent[0].lastIndexOf(textToAdd[0]);
    const indexOfShortFlag = oldContent[0].lastIndexOf(shortFlag);
    if (indexOfFirstFlag === -1 && indexOfShortFlag > -1) {
      indexOfFirstFlag = indexOfShortFlag;
      textToAdd[0] = shortFlag;
    }
    const shouldRemoveLineBreak =
      selection.start === 0 ||
      indexOfFirstFlag === 0 ||
      oldContent[0][oldContent[0].length - 1] === "\n";
    if (shouldRemoveLineBreak) textToAdd[0] = shortFlag;
    const firstFlagIsPresent =
      finalFlagIsPresent === false &&
      indexOfFirstFlag > -1 &&
      indexOfFirstFlag === oldContent[0].length - textToAdd[0].length;

    const intermediateFlag = "###";
    const indexOfIntermediateFlag = oldContent[0].lastIndexOf(intermediateFlag);
    const intermediateFlagIsPresent =
      finalFlagIsPresent === false &&
      indexOfIntermediateFlag > -1 &&
      indexOfIntermediateFlag ===
        oldContent[0].length - intermediateFlag.length;

    if (firstFlagIsPresent || intermediateFlagIsPresent) {
      return addHash(oldContent, textToAdd);
    }
    if (
      textToAdd[0].length < 3 &&
      selection.start !== 0 &&
      oldContent[0][oldContent[0].length - 1] !== "\n"
    )
      textToAdd[0] = "\n" + textToAdd[0];
    return addFlags(oldContent, textToAdd);
  }

  function toggleLinkFlags(textToAdd, oldContent, selection) {
    // could have selection or not
    // [text](url)
    // [title](title=title)
    // [tag1 tag2](tags=tag1,tag2)

    const indexOfFirstFlag = oldContent[0].lastIndexOf(textToAdd[0]);
    const firstFlagIsPresent =
      indexOfFirstFlag > -1 &&
      indexOfFirstFlag === oldContent[0].length - textToAdd[0].length;
    const SecondFlagIsPresent =
      oldContent[2].indexOf(textToAdd[2]) === 0 || textToAdd[2].length === 0;

    if (firstFlagIsPresent && SecondFlagIsPresent) {
      return removeFlags(oldContent, textToAdd, indexOfFirstFlag);
    }
    return addFlags(oldContent, textToAdd);
  }
  function toggleFlags(textToAdd, oldContent, selection) {
    if (textToAdd[1] === "Header") {
      return toggleHeaderFlags(textToAdd, oldContent, selection);
    }

    if (textToAdd[1] === "Link Name") {
      return toggleLinkFlags(textToAdd, oldContent, selection);
    }

    const indexOfFirstFlag = oldContent[0].lastIndexOf(textToAdd[0]);
    const firstFlagIsPresent =
      indexOfFirstFlag > -1 &&
      indexOfFirstFlag === oldContent[0].length - textToAdd[0].length;
    const SecondFlagIsPresent =
      oldContent[2].indexOf(textToAdd[2]) === 0 || textToAdd[2].length === 0;

    if (firstFlagIsPresent && SecondFlagIsPresent) {
      return removeFlags(oldContent, textToAdd, indexOfFirstFlag);
    }
    return addFlags(oldContent, textToAdd);
  }
  function splitContent(selection, string) {
    return [
      string.slice(0, selection.start),
      string.slice(selection.start, selection.end),
      string.slice(selection.end),
    ];
  }





}
