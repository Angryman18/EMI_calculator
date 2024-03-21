import React from "react";

const Table = ({ data, priceFormat }) => {
  return (
    <div className="border-2 overflow-auto w-96 sm:w-auto">
      <table className="text-sm sm:text-base text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="font-mono">
            <th scope="col" className="px-1 py-3">
              Month
            </th>
            <th scope="col" className="px-3 py-3">
              Interst
            </th>
            <th scope="col" className="px-3 py-3">
              GST
            </th>
            <th scope="col" className="px-3 py-3">
              Principal
            </th>
            <th scope="col" className="px-3 py-3">
              Outstanding
            </th>
            <th scope="col" className="px-3 py-3">
              EMI
            </th>
            <th scope="col" className="px-6 py-3">
              Final_EMI
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, idx) => {
            return (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                key={idx}
              >
                <td className="px-1 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.period}
                </td>
                <td className="px-3 text-center py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {priceFormat(item.int)}
                </td>
                <td className="px-3 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {priceFormat(item.gstInt)}
                </td>
                <td className="px-3 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {priceFormat(item.principalAmt)}
                </td>
                <td className="px-3 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {priceFormat(item.outstanding)}
                </td>
                <td className="px-3 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {priceFormat(item.emi)}
                </td>
                <td className="px-6 py-4 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {priceFormat(item.finalEMI)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Table);
