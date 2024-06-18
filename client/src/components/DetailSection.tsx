interface DetailSectionProps {
  header: string;
  Content: JSX.Element;
  cols?: string;
  rows?: string;
}

export function DetailSection({
  header,
  Content,
  cols,
  rows,
}: DetailSectionProps) {
  if (!cols) cols = "";
  if (!rows) rows = "";
  return (
    <section className={`${cols} ${rows}`}>
      <h2 className={"text-2xl font-semibold"}>{header}:</h2>
      {Content}
    </section>
  );
}

export default DetailSection;
