import { useEffect, createContext, useContext, useReducer } from "react";
import { useTipsContext } from "./TipsProvider";

const inputFormStarter = {
  title: null,
  id: null,
  sections: [{ type: "text", content: "" }],
  tags: new Set(),
  newTagsArray: [],
  date: null,
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
    tips: { data: tips },
    tips: {
      metadata: { nextTipId },
    },
  } = useTipsContext();
  const [inputForm, dispatchInputForm] = useReducer(inputFormReducer, {
    data: inputFormStarter,
    metadata: {
      inputPointer: -1,
      editing: false,
      nextTipId: nextTipId,
      tips: tips,
    },
  });

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      dispatchInputForm({
        type: "UPDATE_TIPS",
        payload: { nextTipId: nextTipId, tips: tips },
      });
    }

    return () => {
      isMounted = false;
    };
  }, [nextTipId, tips]);

  return {
    inputForm,
    dispatchInputForm,
  };
}
const InputFormContext = createContext();

export function useInputFormContext() {
  return useContext(InputFormContext);
}

function inputFormReducer(state, action) {
  const oldData = { ...state.data };
  const oldMetadata = { ...state.metadata };

  switch (action.type) {
    case "TOGGLE_TAG": {
      if (action.payload.active) oldData.tags.add(action.payload.id);
      if (!action.payload.active) oldData.tags.delete(action.payload.id);
      return { data: oldData, metadata: oldMetadata };
    }
    case "CLEAR_TAGS": {
      oldData.tags.clear();
      return { data: oldData, metadata: oldMetadata };
    }
    case "UPDATE_NEW_TAGS": {
      const newString = action.payload;
      oldData.newTagsArray =
        newString.length === 0
          ? []
          : newString.split(" ");

      return { data: oldData, metadata: oldMetadata };
    }
    case "EDIT_TIP": {
      const tipToEdit = oldMetadata.tips[action.payload];
      return {
        data: tipToEdit,
        metadata: {
          ...oldMetadata,
          inputPointer: action.payload,
          editing: true,
        },
      };
    }
    case "UPDATE_TIPS": {
      return {
        data: oldData,
        metadata: {
          ...oldMetadata,
          nextTipId: action.payload.nextTipId,
          tips: action.payload.tips,
        },
      };
    }
    default:
    case "NEW_TIP": {
      return {
        data: inputFormStarter,
        metadata: {
          ...oldMetadata,
          inputPointer: -1,
          editing: true,
        },
      };
    }
    case "CANCEL_EDIT": {
      return {
        data: inputFormStarter,
        metadata: {
          ...oldMetadata,
          inputPointer: -1,
          editing: false,
        },
      };
    }
  }
}
