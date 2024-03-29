import InputText from './InputText';
import TagSet from '../components/header/TagSet';
import { useTagsContext } from '../contexts/Providers/TagsProvider';
import { useInputFormContext } from '../contexts/Providers/InputFormProvider';

const keyMod = 0;
export default function InputTags() {
  const {
    tags: {
      metadata: { status },
    },
    tags: { data: tags },
  } = useTagsContext();
  const {
    dispatchInputForm,
    inputForm: {
      metadata: { existingTagsSet },
    },
    inputForm: {
      metadata: { newTagsArray },
    },
  } = useInputFormContext();
  const newTagsString = newTagsArray.join(' ');
  return (
    <>
      <TagSet
        key={`${keyMod}a`}
        tags={tags}
        dispatchTags={dispatchInputForm}
        activeTags={existingTagsSet}
        tagStatus={status}
      />

      <label className="grid w-full px-2">
        Add new tags as a List (separated by spaces or commas)
        <InputText
          key={`${keyMod}b`}
          placeholder=" E.G.: JavaScript, Fundamentals"
          onInput={updateCustomTags}
          value={newTagsString}
        />
      </label>
    </>
  );
  function updateCustomTags(value) {
    dispatchInputForm({ type: 'UPDATE_NEW_TAGS', payload: value });
  }
}
