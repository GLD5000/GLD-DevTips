function SectionTitle({ title = null, type }) {
  return (
    <h3 className=" w-full px-2 pt-2 pb-4 text-center underline decoration-neutral-300 decoration-solid decoration-1">
      {title}
    </h3>
  );
}

export default SectionTitle;
