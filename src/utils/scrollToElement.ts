export const handleScrollToTickets = (
  ref: React.MutableRefObject<HTMLElement | null>
) => {
  ref.current?.scrollIntoView({ behavior: "smooth" });
};
