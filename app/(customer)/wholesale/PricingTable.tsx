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
                <td className="px-6 py-4 ">£21.25</td>
                <td className="px-6 py-4">£35</td>
                <td className="px-6 py-4">£1,050</td>
                <td className="px-6 py-4">35%</td>
                <td className="px-6 py-4 text-right">£288.75</td>
              </tr>
              <tr className="bg-surface border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  10 Cases
                </th>
                <td className="px-6 py-4">£21.25</td>
                <td className="px-6 py-4">£35</td>
                <td className="px-6 py-4">£2,100</td>
                <td className="px-6 py-4">35%</td>
                <td className="px-6 py-4 text-right">£577.50</td>
              </tr>
              <tr className="bg-surface border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  15 Cases
                </th>
                <td className="px-6 py-4">£21.25</td>
                <td className="px-6 py-4">£35</td>
                <td className="px-6 py-4">£1,050</td>
                <td className="px-6 py-4">35%</td>
                <td className="px-6 py-4 text-right">£866.25</td>
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
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  5 Cases
                </th>
                <td className="px-6 py-4">£21.25</td>
                <td className="px-6 py-4">£35</td>
                <td className="px-6 py-4">£1,050</td>
                <td className="px-6 py-4">35%</td>
                <td className="px-6 py-4 text-right">£288.75</td>
              </tr>
              <tr className="bg-surface border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  10 Cases
                </th>
                <td className="px-6 py-4">£21.25</td>
                <td className="px-6 py-4">£35</td>
                <td className="px-6 py-4">£2,100</td>
                <td className="px-6 py-4">35%</td>
                <td className="px-6 py-4 text-right">£577.50</td>
              </tr>
              <tr className="bg-surface border-b ">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium  whitespace-nowrap "
                >
                  15 Cases
                </th>
                <td className="px-6 py-4">£21.25</td>
                <td className="px-6 py-4">£35</td>
                <td className="px-6 py-4">£1,050</td>
                <td className="px-6 py-4">35%</td>
                <td className="px-6 py-4 text-right">£866.25</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
