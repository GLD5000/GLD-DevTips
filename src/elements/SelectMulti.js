import InputText from "./InputText";
import TagSet from "../components/header/TagSet";
import { useTagsContext } from "../contexts/Providers/TagsProvider";
import { useInputFormContext } from "../contexts/Providers/InputFormProvider";
let keyMod = 0;
export default function SelectMulti() {
  const {
    tags: { data: tags },
  } = useTagsContext();
  const {
    dispatchInputForm,
    inputForm: {
      data: { tags: activeTags },
    },
    inputForm: {
      metadata: { newTagsString },
    },
  } = useInputFormContext();

  return (
    <>
      <TagSet
        key={keyMod + "a"}
        title={"Choose Tags"}
        tags={tags}
        dispatchTags={dispatchInputForm}
        activeTags={activeTags}
      />

      <label className="label-box">
        Add new tags as a List (separated by spaces or commas)
        <InputText
          key={keyMod + "b"}
          placeholder=" E.G.: JavaScript, Fundamentals"
          onInput={updateCustomTags}
          defaultValue={newTagsString}
        />
      </label>
    </>
  );
  function updateCustomTags(value) {
    console.log(value);
    dispatchInputForm({ tpye: "UPDATE_NEW_TAGS", payload: value });
  }
}
