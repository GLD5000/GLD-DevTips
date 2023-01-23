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
  focusId: -1,
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
            focusId: -1,
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
            editing: true,
            existingTagsSet: new Set(tipToEdit.tags)
          },
        };
      }
      case "CANCEL_TIP": {
        return {
          data: {
            title: "",
            id: "",
            sections: [{ type: "text", content: "" }],
            tags: [],
          },
          metadata: {
            ...oldMetadata,
            editing: false,
          },
        };
      }
      case "SAVE_TIP": {
        if (tips[oldData.id] !== undefined) {
            let text = `
            This will overwrite tip id:    ${oldData.id}

            Are you sure you wish to continue?`;
            if (window.confirm(text) === true) {
              alert("You pressed OK!");
            } else {
             alert("You canceled!");
        }
      }
        console.log(oldData, formattedDate(), nextTipId);
        return { data: oldData, metadata: oldMetadata };
      }
      case "PREVIEW_TIP": {
        console.log(oldData, formattedDate(), nextTipId);
        return { data: oldData, metadata: oldMetadata };
      }
      case "REPLACE_FIELD": {
        oldData[action.payload.field] = action.payload.value;
        const focusId = action.payload.focusId;
        if (focusId !== undefined) {
          oldMetadata.focusId = focusId;
        }

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
      case "ADD_SECTION": {
        oldData.sections = [...oldData.sections, { type: "text", content: "" }];
        oldMetadata.focusId = oldData.sections.length -1;
        return { data: oldData, metadata: oldMetadata };
      }
    }
  }
}
const InputFormContext = createContext();

export function useInputFormContext() {
  return useContext(InputFormContext);
}
