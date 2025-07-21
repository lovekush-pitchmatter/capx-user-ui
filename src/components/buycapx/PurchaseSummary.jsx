import { FaRegCircleCheck } from "react-icons/fa6"; 

const PurchaseSummary = ({onBack}) => { 
  return (
    <div className="bg-[#F8F3FF] dark:bg-zinc-800 sm:p-6 p-2 rounded-2xl shadow max-w-5xl w-full mx-auto text-center">
      <h2 className="md:text-4xl dark:text-white text-2xl font-semibold mb-6">
        Purchase Successful!
      </h2>
      <div className="bg-white dark:bg-gray-200 flex flex-col gap-6 max-w-sm mx-auto border-2 border-[#7A44FF] rounded-xl md:p-10 p-6 ">
        <div>
          <div className="text-[#7A44FF] flex items-center justify-center w-full  mb-2">
            <FaRegCircleCheck size={50} />
          </div>
          <h3 className="text-3xl font-semibold">40 tokens</h3>
          <p className="text-xs text-[#7A44FF] font-medium mb-4">CAPX purchased</p>
        </div>

        <div className="grid grid-cols-2 gap-4  text-left mb-4">
          <div className="border border-[#7A44FF] rounded-md p-2">
            <p className="text-[#7A44FF] font-medium text-xs">Amount Invested</p>
            <p className="font-semibold">100 USD</p>
          </div>
          <div className="border border-[#7A44FF] rounded-md p-2">
            <p className="text-[#7A44FF] font-medium text-xs">TGE Unlock</p>
            <p className="font-semibold">20%</p>
          </div>
          <div className="col-span-2 border border-[#7A44FF] rounded-md p-2">
            <p className="text-[#7A44FF] font-medium text-xs">Lock Period</p>
            <p className="font-semibold">12 months cliff, 10% monthly</p>
          </div>
        </div>

        <div className="flex max-sm:flex-col justify-center gap-3">
          <button 
            className="font-semibold text-sm text-white px-4 py-2 rounded-lg"
            style={{ 
              background: 'linear-gradient(to right, #37009A, #B500EF)',
              backgroundImage: 'linear-gradient(to right, #37009A, #B500EF) !important'
            }}
          >
            View Purchases
          </button>
          <button 
            onClick={onBack} 
            className="font-semibold text-sm text-white px-4 py-2 rounded-lg"
            style={{ 
              background: 'linear-gradient(to right, #37009A, #B500EF)',
              backgroundImage: 'linear-gradient(to right, #37009A, #B500EF) !important'
            }}
          >
            Buy More CAPX
          </button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSummary;
