import { TagIcon } from "lucide-react";

const FormGoalsPage = () => {
  return (
    <div className="flex-1 flex flex-col gap-10 mt-10">
      <div className="w-full">
        <p className="text-sm">
          Tentukan goals yang ingin dicapai beserta besaran nominal
        </p>
        <p className="font-semibold text-lg">
          Silahkan melengkapi data perencanaan untuk melanjutkan
        </p>
      </div>
      {/* Add form fields for goals here */}
      <div className="grid grid-cols-1 gap-5">
        <div className="flex flex-col gap-3">
          <label
            htmlFor=""
            className="text-sm font-semibold text-zinc-600 uppercase">
            NAMA PERENCANAAN <span className="text-red-500">*</span>
          </label>
          <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
            <button className="flex bg-white">
              <TagIcon className="size-4 mr-3" color="#3B82F6" />
            </button>
            <input
              type="text"
              className="outline-none text-sm w-full"
              placeholder="Pilih porsi"
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <label
            htmlFor=""
            className="text-sm font-semibold text-zinc-600 uppercase">
            NOMINAL PERENCANAAN <span className="text-red-500">*</span>
          </label>
          <div className="border border-blue-300 rounded-full px-4.5 py-3 flex flex-row items-center">
            <button className="flex bg-white">
              <span className="text-sm font-semibold text-blue-500 mr-2">
                Rp.
              </span>
            </button>
            <input
              type="number"
              className="outline-none text-sm w-full"
              placeholder="Pilih porsi"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormGoalsPage;
