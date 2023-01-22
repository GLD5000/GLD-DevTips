import { createContext, useContext, useReducer } from "react";
import { useTipsContext } from "./TipsProvider";
import formattedDate from "../../utilities/formattedDate";

const dataStarter = {
  title: "",
  id: "",
  sections: [{ type: "text", content: "" }],
  tags: [],
};
const metadataStarter = {
  focusId: "",
  preview: false,
  editing: false,
  existingTagsSet: new Set(),
  newTagsArray: [],
  date: null,
  currentTipId: -1,
  keyIncrementer: 0,
};

export default function InputFormProvider({ children }) {
  const data = useData();
  return (
    <InputFormContext.Provider value={data}>
      {children}
    </InputFormContext.Provider>
  );
}

function useData() {
  const {
    // dispatchTips,
    tips: { data: tips },
    tips: {
      metadata: { nextTipId },
    },
  } = useTipsContext();
  const [inputForm, dispatchInputForm] = useReducer(inputFormReducer, {
    data: dataStarter,
    metadata: metadataStarter,
  });

  return {
    inputForm,
    dispatchInputForm,
  };

  function inputFormReducer(state, action) {
    const oldData = { ...state.data };
    const oldMetadata = { ...state.metadata };

    switch (action.type) {
      default:
      case "NEW_TIP": {
        return {
          data: { ...dataStarter, id: nextTipId },
          metadata: {
            focusId: "",
            preview: false,
            editing: true,
            existingTagsSet: new Set(),
            newTagsArray: [],
            date: null,
            currentTipId: -1,
          },
        };
      }
      case "EDIT_TIP": {
        const tipToEdit = tips[action.payload];
        return {
          data: tipToEdit,
          metadata: {
            ...oldMetadata,
            inputPointer: action.payload,
            editing: true,
          },
        };
      }
      case "CANCEL_TIP": {
        return {
          data: dataStarter,
          metadata: {
            ...oldMetadata,
            inputPointer: -1,
            editing: false,
          },
        };
      }
      case "SAVE_TIP": {
        console.log(oldData, formattedDate(), nextTipId);
        return { data: oldData, metadata: oldMetadata };
      }
      case "PREVIEW_TIP": {
        console.log(oldData, formattedDate(), nextTipId);
        return { data: oldData, metadata: oldMetadata };
      }
      case "REPLACE_FIELD": {
        oldData[action.payload.field] = action.payload.value;
        return { data: oldData, metadata: oldMetadata };
      }
      case "TOGGLE_TAG": {
        if (action.payload.active)
          oldMetadata.existingTagsSet.add(action.payload.name);
        if (!action.payload.active)
          oldMetadata.existingTagsSet.delete(action.payload.name);
        oldData.tags = [
          ...new Set([
            ...oldMetadata.newTagsArray,
            ...oldMetadata.existingTagsSet,
          ]),
        ];
        console.log(oldData.tags);

        return { data: oldData, metadata: oldMetadata };
      }
      case "CLEAR_TAGS": {
        oldMetadata.existingTagsSet.clear();
        oldData.tags = [
          ...new Set([
            ...oldMetadata.newTagsArray,
            ...oldMetadata.existingTagsSet,
          ]),
        ];
        return { data: oldData, metadata: oldMetadata };
      }
      case "UPDATE_NEW_TAGS": {
        const newString = action.payload;
        oldMetadata.newTagsArray =
          newString.length === 0
            ? []
            : [...new Set(newString.split(" ").filter((x) => x.length > 0))];
        oldData.tags = [
          ...new Set([
            ...oldMetadata.newTagsArray,
            ...oldMetadata.existingTagsSet,
          ]),
        ];
        console.log(oldData.tags);
        return { data: oldData, metadata: oldMetadata };
      }
      case "REPLACE_SECTION_DATA_FIELD": {
        const index = action.payload.index;
        const value = action.payload.value;
        const field = action.payload.field;
        oldData.sections[index][field] = value;
        return { data: oldData, metadata: oldMetadata };
      }
      case "DELETE_SECTION": {
        const index = action.payload.index;
        const array = [...oldData.sections];
        oldData.sections = array.filter((_, i) => index !== i);
        // oldMetadata.focusId = oldData.sections.length;
        oldMetadata.keyIncrementer++;
        return { data: oldData, metadata: oldMetadata };
      }
      case "ADD_SECTION": {
        // oldMetadata.focusId = oldData.sections.length;
        oldData.sections = [...oldData.sections, { type: "text", content: "" }];
        return { data: oldData, metadata: oldMetadata };
      }
      case "COPY_SECTION": {
        const index = action.payload.index;
        const copiedSection = { ...oldData.sections[index] };
        copiedSection.title =
          oldData.sections[index].title === undefined
            ? `Copy of section ${index + 1}`
            : `${oldData.sections[index].title} (copy)`;
        oldData.sections = [...oldData.sections, copiedSection];
        oldMetadata.keyIncrementer++;
        // oldMetadata.focusId = oldData.sections.length;
        return { data: oldData, metadata: oldMetadata };
      }

      //
      case "MOVE_SECTION": {
        const array = [...oldData.sections];
        if (array.length > 1 && action.payload.index !== false) {
          const index = action.payload.index;
          const direction = action.payload.direction;
          const indexModifier = direction === "down" ? 1 : -1;
          const secondIndex = index + indexModifier;
          const indexLimit = array.length - 1;
          if (secondIndex <= indexLimit && secondIndex > 0) {
            oldMetadata.keyIncrementer++;
            [oldData.sections[index], oldData.sections[secondIndex]] = [
              { ...array[secondIndex] },
              { ...array[index] },
            ];
            action.payload.index = false;
          }
          console.log(oldData.sections.map((x) => x.title));
        }
        return { data: oldData, metadata: oldMetadata };
      }
    }
  }
}
const InputFormContext = createContext();

export function useInputFormContext() {
  return useContext(InputFormContext);
}
