import React from "react";
export function WholesalePricingTable() {
  return (
    <div>
      <div>
        <h3>Retail Orders</h3>
        <p>Branded Beautiful Pouches sold by the case 1 case = 6 pouches</p>
        <div className="relative overflow-x-auto drop-shadow-xl rounded-lg">
          <table className="w-full text-sm text-left text-bg-surfaceVarient ">
            <thead className="text-bg-surface uppercase bg-surfaceVarient ">
              <tr className="bg-surface border-b-2">
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Unit Cost</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">RRP</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Total</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Margin</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="flex items-center">Profit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-surface border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap  "
                >
                  5 Cases
                </th>
                <td className="px-6 py-4 ">£25.00</td>
                <td className="px-6 py-4">£35</td>
                <td className="px-6 py-4">£750</td>
                <td className="px-6 py-4">28.6%</td>
                <td className="px-6 py-4 text-right">£1,050</td>
              </tr>
              <tr className="bg-surface border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  10 Cases
                </th>
                <td className="px-6 py-4">£25.00</td>
                <td className="px-6 py-4">£35</td>
                <td className="px-6 py-4">£2,100</td>
                <td className="px-6 py-4">28.6%</td>
                <td className="px-6 py-4 text-right">£600</td>
              </tr>
              <tr className="bg-surface border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  15 Cases
                </th>
                <td className="px-6 py-4">£25.00</td>
                <td className="px-6 py-4">£35</td>
                <td className="px-6 py-4">£3,150</td>
                <td className="px-6 py-4">28.6%</td>
                <td className="px-6 py-4 text-right">£900</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h3 className="mt-5">Bulk Orders</h3>
        <p>Non-Branded Bulk cacao in its purest form ideal for facilitators</p>
        <div className="relative overflow-x-auto drop-shadow-xl rounded-lg">
          <table className="w-full text-sm text-left text-bg-surfaceVarient ">
            <thead className="text-xs text-bg-surface uppercase bg-surfaceVarient dark:bg-bg-surface ">
              <tr className="bg-surface border-b-2">
                <th scope="col" className="px-6 py-3">
                  Quantity
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Unit Cost</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">RRP</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Total</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Savings</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-surface border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  5 kg
                </th>
                <td className="px-6 py-4">£65</td>
                <td className="px-6 py-4">£35</td>
                <td className="px-6 py-4">£325</td>
                <td className="px-6 py-4">£258.33</td>
              </tr>
              <tr className="bg-surface border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  10 kg
                </th>
                <td className="px-6 py-4">£65</td>
                <td className="px-6 py-4">£35</td>
                <td className="px-6 py-4">£650</td>
                <td className="px-6 py-4">£516.66</td>
              </tr>
              <tr className="bg-surface border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  15 kg
                </th>
                <td className="px-6 py-4">£65</td>
                <td className="px-6 py-4">£35</td>
                <td className="px-6 py-4">£975</td>
                <td className="px-6 py-4">£775.00</td>
              </tr>
              <tr className="bg-surface border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  20 kg
                </th>
                <td className="px-6 py-4">£65</td>
                <td className="px-6 py-4">£35</td>
                <td className="px-6 py-4">£1300</td>
                <td className="px-6 py-4">£1,033.33</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
