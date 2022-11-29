import SvgButton from "../../elements/SvgButton"

export default function WriteTipBtn({
    showAddTipForm,
    setShowAddTipForm,
    addObjectToInputFormState,
}) {

    
    function onClickAdd() {
        if (showAddTipForm === true) onClose();
        setShowAddTipForm((state) => !state);
    }
    function onClose() {
        addObjectToInputFormState(null);
    }
    const AddTipText = showAddTipForm
    ? "Cancel"
    : "Write Tip";
    const AddTipColour = showAddTipForm ? "pink" : "aquamarine";
    const type = showAddTipForm
    ? "cancelWrite"
    : "write";
    return (
        <div style={{width:"fit-content", gridColumn:"4"}}>

            <SvgButton
            type={type}
        color="black"
        backgroundColor={AddTipColour}
        text={AddTipText}
        clickFunction={onClickAdd}
      />
        </div>
)
}
