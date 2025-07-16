const StakeTableRow = ({ data, onBuyClick }) => {
  return (
    <tr className="bg-[#EDE6FF] ">
      <td className="rounded-l-xl py-4  md:py-6 px-4 ">
        <div className="flex gap-2 items-center">
          <p className="w-10 h-10  bg-gray-300 rounded-full flex items-center justify-center text-[10px] font-semibold">
            Logo
          </p>
          <div className="font-medium flex flex-col">
            <span className="text-[10px] leading-none font-medium">
              {data.coin}
            </span>
            <p className="font-medium leading-none  text-xl">{data.symbol}</p>
          </div>
        </div>
      </td>
      <td className="font-semibold py-4 md:py-6 px-4">{data.apr}</td>
      <td className="font-semibold py-4 md:py-6 px-4">{data.duration}</td>
      <td className="font-semibold py-4 md:py-6 px-4">{data.minAmount}</td>
      <td className="rounded-r-xl py-4 md:py-6 px-4">
        <button
          onClick={onBuyClick}
          className="px-6 py-2 font-semibold bg-[#7A44FF] text-white rounded-xl shadow"
        >
          Subscribe
        </button>
      </td>
    </tr>
  );
};

export default StakeTableRow;
