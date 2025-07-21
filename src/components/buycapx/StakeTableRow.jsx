const StakeTableRow = ({ data, onBuyClick }) => {
  return (
    <tr className="bg-[#EDE6FF] ">
      <td className="rounded-l-xl py-4  md:py-6 px-4 text-center">
        <div className="font-medium flex items-center gap-2 justify-center">
          <span className="text-sm font-medium">
            {data.tokenName}
          </span>
          <p className="font-medium text-xl">({data.symbol})</p>
        </div>
      </td>
      <td className="font-semibold py-4 md:py-6 px-4 text-center">{data.availableBalance}</td>
      <td className="font-semibold py-4 md:py-6 px-4 text-center">{data.apy}</td>
      <td className="font-semibold py-4 md:py-6 px-4 text-center">{data.lockPeriod}</td>
      <td className="rounded-r-xl py-4 md:py-6 px-4 text-center">
        <button
          onClick={onBuyClick}
          className="px-6 py-2 font-semibold text-white rounded-xl shadow"
          style={{
            background: 'linear-gradient(to right, #37009A, #B500EF)',
            backgroundImage: 'linear-gradient(to right, #37009A, #B500EF) !important'
          }}
        >
          {data.buttonText}
        </button>
      </td>
    </tr>
  );
};

export default StakeTableRow;
