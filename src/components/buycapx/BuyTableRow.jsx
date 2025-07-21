const BuyTableRow = ({ data, onBuyClick }) => {
  return (
    <tr className="bg-[#EDE6FF]">
      {data.minimum_investment < 200 ? (
        <td className="font-semibold rounded-l-xl py-4 md:py-6 px-4 text-center">
          ${data.minimum_investment} - ${data.maximum_investment}
        </td>
      ) : (
        <td className="font-semibold rounded-l-xl py-4 md:py-6 px-4 text-center">
          <p>More than ${data.minimum_investment}</p>
        </td>
      )}
      <td className="font-semibold py-4 md:py-6 px-4 text-center">${data.issued_price}</td>
      <td className="font-semibold py-4 md:py-6 px-4 text-center">{data.tge_unlock}%</td>
      <td className="font-semibold py-4 md:py-6 px-4 text-center">{data.duration_months} months</td>
      <td className="font-semibold py-4 md:py-6 px-4 text-center">{data.vesting_period}% monthly X 10</td>
      <td className="font-semibold rounded-r-xl py-4 md:py-6 px-4 text-center">
        <button
          onClick={onBuyClick}
          className="px-6 py-2 font-semibold text-white rounded-xl shadow"
          style={{ 
            background: 'linear-gradient(to right, #37009A, #B500EF)',
            backgroundImage: 'linear-gradient(to right, #37009A, #B500EF) !important'
          }}
        >
          Buy CAPX
        </button>
      </td>
    </tr>
  );
};

export default BuyTableRow;
