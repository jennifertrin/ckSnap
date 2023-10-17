interface EmptyContainerProps {
  pageTitle: string;
  pageMessage: string;
  children?: JSX.Element;
}

export default function EmptyContainer({
  pageTitle,
  pageMessage,
  children
}: EmptyContainerProps) {
  return (
    <>
      <div className="flex h-screen bg-white w-full">
        <div className="text-center m-auto border-2 p-8 rounded-lg">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
            {pageTitle}
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            {pageMessage}
          </p>
          <div className="flex">
          {children}
          </div>
        </div>
      </div>
    </>
  );
}
