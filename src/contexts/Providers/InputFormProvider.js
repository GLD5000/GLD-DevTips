import { createContext, useContext, useReducer } from "react";
import { useTipsContext } from "./TipsProvider";
import formattedDate from "../../utilities/formattedDate"

const dataStarter = {
  title: null,
  id: null,
  sections: [{ type: "text", content: "" }],
  tags: [],
};
const metadataStarter = {
  preview: false,
  editing: false,
  existingTagsSet: new Set(),
  newTagsArray: [],
  date: null,
  currentTipId: -1
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
      case "SAVE_TIP": {
        console.log(dispatchTips);
        return;
      }
      case "PREVIEW_TIP": {
        console.log(dispatchTips);
        return;
      }
      case "TOGGLE_TAG": {
        if (action.payload.active) oldMetadata.existingTagsSet.add(action.payload.id);
        if (!action.payload.active) oldMetadata.existingTagsSet.delete(action.payload.id);
        oldData.tags = [...oldMetadata.existingTagsSet, ...oldMetadata.newTagsArray];
        return { data: oldData, metadata: oldMetadata };
      }
      case "CLEAR_TAGS": {
        oldMetadata.existingTagsSet.clear();
        oldData.tags = [...oldMetadata.existingTagsSet, ...oldMetadata.newTagsArray];
        return { data: oldData, metadata: oldMetadata };
      }
      case "UPDATE_NEW_TAGS": {
        const newString = action.payload;
        oldData.newTagsArray =
          newString.length === 0 ? [] : newString.split(" ");

        return { data: oldData, metadata: oldMetadata };
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
      case "CANCEL_EDIT": {
        return {
          data: dataStarter,
          metadata: {
            ...oldMetadata,
            inputPointer: -1,
            editing: false,
          },
        };
      }
    }
  }
}
const InputFormContext = createContext();

export function useInputFormContext() {
  return useContext(InputFormContext);
}
