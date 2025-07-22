const BuyTableRow = ({ data, onBuyClick }) => {
  return ( 
    <tr className="bg-[#EDE6FF]">
      <td className="font-semibold py-4 md:py-6 px-4 text-center">CAPShield (CAPX)</td>
      {data.minimum_investment < 200 ? (
        <td className="font-semibold rounded-l-xl py-4 md:py-6 px-4 text-center">
          ${data.minimum_investment} - ${data.maximum_investment}
        </td>
      ) : (
        <td className="font-semibold rounded-l-xl py-4 md:py-6 px-4 text-center">
          <p>${data.minimum_investment + 1}+</p>
        </td>
      )}
      <td className="font-semibold py-4 md:py-6 px-4 text-center">${data.issued_price}</td>
      <td className="font-semibold py-4 md:py-6 px-4 text-center">{data.tge_unlock}%</td>
      <td className="font-semibold py-4 md:py-6 px-4 text-center">{data.duration_months} Months Post-TGE</td>
      <td className="font-semibold py-4 md:py-6 px-4 text-center">{data.vesting_period}%/month after cliff</td>
      <td className="font-semibold rounded-r-xl py-4 md:py-6 px-4 text-center">
        <button
          onClick={onBuyClick}
          className="px-6 py-2 font-semibold bg-[#7A44FF] text-white rounded-xl shadow"
        >
          Buy CAPX
        </button>
      </td>
    </tr>
  );
};

export default BuyTableRow;
