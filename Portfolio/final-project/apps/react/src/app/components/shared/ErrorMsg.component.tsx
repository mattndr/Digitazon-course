import { XMarkIcon } from '@heroicons/react/24/solid';

export default function ErrorMsg({
  message,
  customClasses = '',
  setPropFunction = null,
}) {
  return (
    <div
      className={`bg-red-100 pt-3 pb-5 px-4 my-4 border-l-8 border-red-400 text-lg text-center ${customClasses}`}
    >
      <div className="flex flex-col">
        {setPropFunction && (
          <button onClick={() => setPropFunction('')} className="self-end">
            <XMarkIcon className="h-4 w-4 text-gray-900" />
          </button>
        )}
        <div>{message}</div>
      </div>
    </div>
  );
}
