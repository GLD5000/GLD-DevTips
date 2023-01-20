import { createContext, useContext, useReducer } from "react";
import { useTipsContext } from "./TipsProvider";
import formattedDate from "../../utilities/formattedDate";

const dataStarter = {
  title: null,
  id: null,
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
    dispatchTips,
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
          data: dataStarter,
          metadata: {
            ...oldMetadata,
            inputPointer: -1,
            editing: true,
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
        console.log(dispatchTips, formattedDate(), nextTipId);
        return;
      }
      case "PREVIEW_TIP": {
        console.log(dispatchTips);
        return;
      }
      case "REPLACE_TITLE": {
        oldData.title = action.payload.value;
        return { data: oldData, metadata: oldMetadata };
      }
      case "TOGGLE_TAG": {
        if (action.payload.active)
          oldMetadata.existingTagsSet.add(action.payload.id);
        if (!action.payload.active)
          oldMetadata.existingTagsSet.delete(action.payload.id);
        oldData.tags = [
          ...oldMetadata.existingTagsSet,
          ...oldMetadata.newTagsArray,
        ];
        console.log();
        return { data: oldData, metadata: oldMetadata };
      }
      case "CLEAR_TAGS": {
        oldMetadata.existingTagsSet.clear();
        oldData.tags = [
          ...oldMetadata.existingTagsSet,
          ...oldMetadata.newTagsArray,
        ];
        return { data: oldData, metadata: oldMetadata };
      }
      case "UPDATE_NEW_TAGS": {
        const newString = action.payload;
        oldData.newTagsArray =
          newString.length === 0 ? [] : newString.split(" ");

        return { data: oldData, metadata: oldMetadata };
      }
      case "REPLACE_SECTION_DATA_FIELD": {
        const index = action.payload.index;
        const value = action.payload.value;
        const field = action.payload.field;
        oldData.sections[index][field] = value;
        return { data: oldData, metadata: oldMetadata };
      }
      case "ADD_SECTION": {
        oldMetadata.focusId = oldData.sections.length;
        oldData.sections = [...oldData.sections, { type: "text", content: "" }];
        return { data: oldData, metadata: oldMetadata };
      }
    }
  }
}
const InputFormContext = createContext();

export function useInputFormContext() {
  return useContext(InputFormContext);
}
