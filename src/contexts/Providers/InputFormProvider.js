import { createContext, useContext, useReducer } from 'react';
import { useTipsContext } from './TipsProvider';

const dataStarter = {
  title: '',
  id: '',
  sections: [{ type: 'text', content: '' }],
  tags: [],
};
const metadataStarter = {
  focusId: -1,
  preview: false,
  editing: false,
  existingTagsSet: new Set(),
  newTagsArray: [],
  date: null,
};

export default function InputFormProvider({ children }) {
  const data = useData();
  return <InputFormContext.Provider value={data}>{children}</InputFormContext.Provider>;
}

function useData() {
  const {
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
      case 'NEW_TIP': {
        return {
          data: {
            title: '',
            id: nextTipId,
            sections: [{ type: 'text', content: '' }],
            tags: [],
          },
          metadata: {
            focusId: -1,
            preview: false,
            editing: true,
            existingTagsSet: new Set(),
            newTagsArray: [],
            date: null,
          },
        };
      }
      case 'EDIT_TIP': {
        const tipToEdit = tips[action.payload];
        oldMetadata.editing = true;
        oldMetadata.existingTagsSet = new Set(tipToEdit.tags);
        return {
          data: tipToEdit,
          metadata: oldMetadata,
        };
      }
      case 'CANCEL_TIP': {
        return {
          data: {
            title: '',
            id: '',
            sections: [{ type: 'text', content: '' }],
            tags: [],
          },
          metadata: {
            focusId: -1,
            preview: false,
            editing: false,
            existingTagsSet: new Set(),
            newTagsArray: [],
            date: null,
          },
        };
      }
      case 'CLOSE_FORM': {
        oldMetadata.editing = false;
        return {
          data: {
            title: '',
            id: '',
            sections: [{ type: 'text', content: '' }],
            tags: [],
          },
          metadata: {
            focusId: -1,
            preview: false,
            editing: false,
            existingTagsSet: new Set(),
            newTagsArray: [],
            date: null,
          },
        };
      }
      case 'PREVIEW_TIP': {
        oldMetadata.preview = true;
        return { data: oldData, metadata: oldMetadata };
      }
      case 'REPLACE_FIELD': {
        const field = action.payload.field;
        const value = action.payload.value;

        oldData[field] = value;
        const focusId = action.payload.focusId;
        if (focusId !== undefined) {
          oldMetadata.focusId = focusId;
        }

        return { data: oldData, metadata: oldMetadata };
      }
      case 'TOGGLE_TAG': {
        if (action.payload.active) oldMetadata.existingTagsSet.add(action.payload.name);
        if (!action.payload.active) oldMetadata.existingTagsSet.delete(action.payload.name);
        oldData.tags = [...new Set([...oldMetadata.newTagsArray, ...oldMetadata.existingTagsSet])];

        return { data: oldData, metadata: oldMetadata };
      }
      case 'CLEAR_TAGS': {
        oldMetadata.existingTagsSet.clear();
        oldData.tags = [...new Set([...oldMetadata.newTagsArray, ...oldMetadata.existingTagsSet])];
        return { data: oldData, metadata: oldMetadata };
      }
      case 'UPDATE_NEW_TAGS': {
        const newString = action.payload;
        oldMetadata.newTagsArray = newString.length === 0 ? [] : [...new Set(newString.split(' '))];
        oldData.tags = [...new Set([...oldMetadata.newTagsArray, ...oldMetadata.existingTagsSet])];
        return { data: oldData, metadata: oldMetadata };
      }
      case 'REPLACE_SECTION_DATA_FIELD': {
        const index = action.payload.index;
        const value = action.payload.value;
        const field = action.payload.field;
        oldData.sections[index][field] = value;
        return { data: oldData, metadata: oldMetadata };
      }
      case 'ADD_SECTION': {
        oldData.sections = [...oldData.sections, { type: 'text', content: '' }];
        oldMetadata.focusId = oldData.sections.length - 1;
        return { data: oldData, metadata: oldMetadata };
      }
    }
  }
}
const InputFormContext = createContext();

export function useInputFormContext() {
  return useContext(InputFormContext);
}
