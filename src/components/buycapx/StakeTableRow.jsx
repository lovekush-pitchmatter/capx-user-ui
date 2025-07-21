const StakeTableRow = ({ data, onBuyClick }) => {
  return (
    <tr className="bg-[#EDE6FF] ">
      <td className="rounded-l-xl py-4  md:py-6 px-4 ">
        <div className="font-medium flex flex-col">
          <span className="text-[10px] leading-none font-medium">
            {data.tokenName}
          </span>
          <p className="font-medium leading-none  text-xl">{data.symbol}</p>
        </div>
      </td>
      <td className="font-semibold py-4 md:py-6 px-4">{data.availableBalance}</td>
      <td className="font-semibold py-4 md:py-6 px-4">{data.apy}</td>
      <td className="font-semibold py-4 md:py-6 px-4">{data.lockPeriod}</td>
      <td className="rounded-r-xl py-4 md:py-6 px-4">
        <button
          onClick={onBuyClick}
          className="px-6 py-2 font-semibold text-white rounded-xl shadow"
          style={{
            background: 'linear-gradient(135deg, #37009A 0%, #B500EF 100%)'
          }}
        >
          {data.buttonText}
        </button>
      </td>
    </tr>
  );
};

export default StakeTableRow;
