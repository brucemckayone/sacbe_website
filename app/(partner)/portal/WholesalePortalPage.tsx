"use client";
import { WholeSaleForm } from "@/app/(customer)/wholesale/WholeSaleForm.1";
import { useUser } from "@/components/auth/affiliate_auth_context";
import PrimaryButton from "@/components/buttons/primaryButton";
import CardLoader from "@/components/loaders/CardLoader";
import { fetchGetJSON, fetchPostJSON } from "@/utils/stripe/fetchPostJson";
import { Checkbox, Modal, Button, Group } from "@mantine/core";
import { useSession } from "next-auth/react";
import PageLoader from "next/dist/client/page-loader";
import { totalmem } from "os";
import React, { useEffect, useState } from "react";

import { useDisclosure } from "@mantine/hooks";

function WholeSalePortalSignUpForm() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="mx-36">
        <WholeSaleForm key={"hey"} />
      </div>
    </div>
  );
}

export function WholesalePortalPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const [retailQty, setRetailQty] = useState(5);
  const [bulkQty, setBulkQty] = useState(5);
  const [hasBulk, setHasBulk] = useState(false);
  const [hasRetail, setHasRetail] = useState(false);

  const [shippingCost, setshippingGost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [cacaoCost, setCacaoCost] = useState(0);

  const { isError, isLoading, setUser, user } = useUser();

  useEffect(() => {
    calculate();
  }, [bulkQty, retailQty, hasBulk, hasRetail]);

  function handleRetailOnChange() {
    setHasRetail(!hasRetail);
  }
  function handleBulkOnChange() {
    setHasBulk(!hasBulk);
  }

  let bulkCost = bulkQty * 21.25 * 6;
  let retailCost = retailQty * 21.25 * 6;

  if (isLoading) return <CardLoader />;

  if (!user.wholesale)
    return <WholeSalePortalSignUpForm></WholeSalePortalSignUpForm>;

  return (
    <div className="p-4 sm:ml-64">
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>
      <div>
        <h1 className="my-10">Place An Wholesale Order</h1>
        <div>
          <h3>Retail Orders</h3>
          <div className="flex flex-col md:flex-row justify-between">
            <p>Branded Beautiful Pouches sold by the case 1 case = 6 pouches</p>
            <div
              onClick={handleRetailOnChange}
              className={`p-4 my-5 rounded-lg shadow-lg border duration-300 ${
                hasRetail ? "bg-sacbeBrandColor" : "bg-tertiaryContainer"
              } hover:shadow-2xl`}
            >
              <Checkbox
                checked={hasRetail}
                label="Include Retail In Order"
              ></Checkbox>
            </div>
          </div>
          <div
            className={`relative overflow-x-auto shadow-xl rounded-md border ${
              !hasRetail && "opacity-10 "
            }`}
          >
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
                <tr className="bg-surface  ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    <div className="flex justify-between flex-row">
                      <p className="p-3 rounded-lg border shadow items-baseline">
                        {retailQty} Cases
                      </p>
                      <div className="self-center">
                        <button
                          className="py-2 px-3 rounded-lg bg-sacbeBrandColor mx-2 hover:bg-primaryContainer shadow-md"
                          onClick={() => {
                            if (retailQty > 5) {
                              const newValue = retailQty - 1;
                              setRetailQty(newValue);
                              calculate();
                            }
                          }}
                        >
                          -
                        </button>
                        <button
                          className="py-2 px-3 rounded-lg bg-sacbeBrandColor mx-2 hover:bg-primaryContainer shadow-md"
                          onClick={() => {
                            const newValue = retailQty + 1;
                            setRetailQty(newValue);
                            calculate();
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 w-2.50">
                    <p>£21.25</p>
                  </td>
                  <td className="px-6 py-4 w-2.50">
                    <p>£35</p>
                  </td>
                  <td className="px-6 py-4 w-2.50 border-r ">
                    <p>{`£${retailCost.toFixed(2)}`}</p>
                  </td>
                  <td className="px-6 py-4 w-2.50 ">
                    <p>35%</p>
                  </td>
                  <td className="px-6 py-4 w-2.50">
                    <p>
                      $
                      {`${(retailQty * 35 * 6 - retailQty * 21.25 * 6).toFixed(
                        2
                      )}`}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3 className="mt-10">Bulk Orders</h3>
          <div className="flex flex-col md:flex-row justify-between">
            <p>None Branded Pure Ceremonial Cacao Perfect For Facilitators</p>
            <div
              onClick={handleBulkOnChange}
              className={`p-4 my-4 rounded-lg border duration-300 ${
                hasBulk ? "bg-sacbeBrandColor" : "bg-tertiaryContainer"
              } shadow-xl `}
            >
              <Checkbox
                checked={hasBulk}
                label="Include Bulk In Order"
              ></Checkbox>
            </div>
          </div>

          <div className="overflow-auto rounded-md shadow-xl">
            <table
              className={`w-full text-sm text-left text-bg-surfaceVarient shadow-lg border  ${
                !hasBulk && "opacity-10"
              }`}
            >
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
                <tr className="bg-surface  ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium  whitespace-nowrap "
                  >
                    <div className="flex justify-between flex-row">
                      <p className="p-3 rounded-lg border shadow items-baseline">
                        {bulkQty} Cases
                      </p>
                      <div className="self-center">
                        <button
                          className="py-2 px-3 rounded-lg bg-sacbeBrandColor mx-2 hover:bg-primaryContainer shadow-md"
                          onClick={() => {
                            if (bulkQty > 5) {
                              const newValue = bulkQty - 1;
                              setBulkQty(newValue);
                            }
                          }}
                        >
                          -
                        </button>
                        <button
                          className="py-2 px-3 rounded-lg bg-sacbeBrandColor mx-2 hover:bg-primaryContainer shadow-md"
                          onClick={() => {
                            const newValue = bulkQty + 1;
                            setBulkQty(newValue);
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 w-2.50">
                    <p>£21.25</p>
                  </td>
                  <td className="px-6 py-4 w-2.50">
                    <p>£35</p>
                  </td>
                  <td className="px-6 py-4 w-2.50 border-r">
                    <p>{`£${bulkCost.toFixed(2)}`}</p>
                  </td>
                  <td className="px-6 py-4 w-2.50">
                    <p>35%</p>
                  </td>
                  <td className="px-6 py-4 w-2.50">
                    <p>
                      $
                      {`${(bulkQty * 35 * 6 - bulkQty * 21.25 * 6).toFixed(2)}`}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className=" overflow-auto border-y mt-10 shadow-lg rounded-md border">
          <table className="w-full text-sm text-left text-bg-surfaceVarient ">
            <thead className="text-xs text-bg-surface uppercase  dark:bg-bg-surface ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  <span className="flex items-center"></span>
                </th>

                <th scope="col" className="px-6 py-3">
                  <span className="flex items-center">Shipping Cost</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="flex items-center">Cacao Cost</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="flex items-center">Total Cost</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <td className="px-6 py-4 w-2.50">
                <p>BREAKDOWN</p>
              </td>
              <td className="px-6 py-4 w-2.50">
                <p>{`£${shippingCost}`}</p>
              </td>
              <td className="px-6 py-4 w-2.50">
                <p>{`£${cacaoCost}`}</p>
              </td>
              <td className="px-6 py-4 w-2.50">
                <p>{`£${totalCost}`}</p>
              </td>
            </tbody>
          </table>
        </div>

        <PrimaryButton
          text="Place Order"
          onClicked={() => {
            fetchPostJSON("api/stripe/invoice", {
              user: user,
              bulk: { qty: bulkQty },
              retail: { qty: retailQty },
            });
          }}
          isPrimary={true}
          key={"send invoice button "}
        ></PrimaryButton>
      </div>
    </div>
  );

  function calculate() {
    calculateShipping();
    calculateTotalCost();
    calculateCacaoCost();
  }

  function calculateCacaoCost() {
    let total = 0;
    if (hasBulk) {
      console.log("has bulk cacao cost");

      total = total + bulkCost;
    }
    if (hasRetail) {
      console.log("has retail cacao cost");
      total = total + retailCost;
    }
    setCacaoCost(total);
  }
  function calculateTotalCost() {
    let total = 0;
    if (hasBulk) {
      console.log("has bulk total cost");
      total = total + bulkCost;
    }
    if (hasRetail) {
      console.log("has retail total cost");
      total = total + retailCost;
    }
    total = total + shippingCost;
    setTotalCost(total);
  }

  function calculateShipping() {
    let bulkShipping = 0;
    if (hasBulk) {
      console.log("has bulk shippping cost");
      if (bulkQty == 5) {
        bulkShipping = 35;
      } else if (bulkQty > 5 && bulkQty < 7) {
        bulkShipping = 43;
      } else if (bulkQty > 7 && bulkQty < 9) {
        bulkShipping = 53;
      } else if (bulkQty > 9 && bulkQty < 12) {
        bulkShipping = 70;
      }
    }
    let retailShipping = 0;
    if (hasRetail) {
      console.log("has retail shipping cost");
      if (retailQty == 5) {
        retailShipping = 35;
      } else if (retailQty > 5 && retailQty < 7) {
        retailShipping = 43;
      } else if (retailQty > 7 && retailQty < 9) {
        retailShipping = 53;
      } else if (retailQty > 9 && retailQty < 12) {
        retailShipping = 70;
      }
    }
    setshippingGost(bulkShipping + retailShipping);
  }
}
