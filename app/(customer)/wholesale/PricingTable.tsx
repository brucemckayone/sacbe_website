import React from "react";
import Image from "next/image";

export function WholesalePricingTable() {
  return (
    <div>
      <div>
        <h3>Retail Orders</h3>
        <p>Branded Beautiful Pouches sold by the case 1 case = 6 pouches</p>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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

export function PricingTable() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 grid-rows-1 gap-5 md:gap-10 ">
      <div className="md:col-span-2 flex flex-col justify-center">
        <h2>Why Work With Us</h2>
        <p>
          At Sacbe We Beleieve in nuturing equal partnerships and helping one
          and other grow together
        </p>
        <div className="h-0.5 bg-tertiary w-full"></div>
        <ol>
          <li>
            <div className="flex">
              <Image
                src={"/icons/customer_service_icon.svg"}
                width={80}
                height={80}
                alt="customer service icon"
                className="p-1 bg-primaryContainer rounded-md m-3"
              />
              <div className="flex flex-col justify-center">
                <h4>Excellent Customer Service</h4>
                <p>We strive to help in anyway we can </p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex">
              <Image
                src={"/icons/dollar_icon.svg"}
                width={80}
                height={80}
                alt="customer service icon"
                className="p-1 bg-primaryContainer rounded-md m-3"
              />
              <div className="flex flex-col justify-center">
                <h4>Competative Pricing</h4>
                <p>You wont find better Quality or care for any price</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex">
              <Image
                src={"/icons/customer_portal.svg"}
                width={80}
                height={80}
                alt="customer service icon"
                className="p-1 bg-primaryContainer rounded-md m-3"
              />
              <div className="flex flex-col justify-center">
                <h4>Customer Portal</h4>
                <p>Manage your orders in your custom wholesale portal</p>
              </div>
            </div>
          </li>
          <li>
            <div className="flex">
              <Image
                src={"/icons/customer_portal.svg"}
                width={80}
                height={80}
                alt="customer service icon"
                className="p-1 bg-primaryContainer rounded-md m-3"
              />
              <div className="flex flex-col justify-center">
                <h4>Customer Portal</h4>
                <p>
                  Manage your orders in your custom wholesale portal coming
                  soon!
                </p>
              </div>
            </div>
          </li>
        </ol>
      </div>
      <div className="md:col-span-4 md:col-start-3 p-5 bg-surfaceVarient my-10 rounded-lg shadow-xl hover:shadow-2xl duration-200">
        <WholesalePricingTable></WholesalePricingTable>
      </div>
    </div>
  );
}
