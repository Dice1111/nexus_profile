export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center  h-fit">
      <div className="border-t-4 border-primary-foreground border-solid rounded-full w-7 h-7 animate-spin"></div>
    </div>
  );
}
