"use client";
import { WholeSaleForm } from "@/components/customer/wholesale/WholeSaleForm";
import { useUser } from "@/components/shared/auth/UserProvider";
import PrimaryButton from "@/components/shared/buttons/primaryButton";
import CardLoader from "@/components/shared/loaders/CardLoader";
import { fetchPostJSON } from "@/utils/http/fetchPostJson";
import { fetchGetJSON } from "@/utils/http/fetchGetJSON";
import { Checkbox, Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import TextInput from "@/components/shared/form/inputs/TextInput";
import { useDisclosure } from "@mantine/hooks";

import homeUrl from "@/lib/constants/urls";
import toast from "react-hot-toast";

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

  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");

  const [shippingCost, setshippingGost] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [cacaoCost, setCacaoCost] = useState(0);
  const [addCustomEmail, setAddCustomEmail] = useState(false);
  const [email, setEmail] = useState("");
  const [isSendingOrder, setIsSendingOrder] = useState(false);

  const { isLoading, user } = useUser();

  let shipping = {
    line1: line1,
    line2: line2,
    country: country,
    state: state,
    postcode: postcode,
    city: city,
  };

  let orderDetails = {
    extraEmail: email,
    user: user,
    bulk: { qty: bulkQty },
    retail: { qty: retailQty },
    shipping: {
      fixed_amount: shippingCost,
      address: {
        city: city,
        country: country,
        line1: line1,
        line2: line2 ?? " ",
        state: state ?? "",
        postal_code: postcode,
      },
    },
  };

  function calculate() {
    calculateShipping();
    calculateTotalCost();
    calculateCacaoCost();
  }

  useEffect(() => {
    calculate();
  }, [bulkQty, retailQty, hasBulk, hasRetail, calculate]);

  function handleRetailOnChange() {
    setHasRetail(!hasRetail);
  }
  function handleBulkOnChange() {
    setHasBulk(!hasBulk);
  }

  let bulkCost = bulkQty * 65;
  let retailCost = retailQty * 25 * 6;

  if (isLoading) return <CardLoader />;

  if (!user.wholesale)
    return (
      <div className="p-4 sm:ml-64">
        <WholeSaleForm />
      </div>
    );

  return (
    <div className="p-4 sm:ml-64">
      <Modal opened={opened} onClose={close} title="Enter Shipping Details">
        <form className="p-4">
          <div className="flex justify-between">
            <TextInput
              placeHolder="line 1"
              value={line1}
              update={setLine1}
              type="address-line1"
              label="Address Line 1"
              key={"eg. Flat A"}
            />
            <TextInput
              placeHolder="line 2"
              value={line2}
              update={setLine2}
              type="address-line2"
              label="Address Line 1"
              key={"eg. Cacao Road"}
            />
          </div>
          <TextInput
            placeHolder="eg. Cacao Town"
            value={city}
            update={setCity}
            type="city"
            key={"city"}
            label={"City"}
          />

          <TextInput
            label="State/County"
            value={state}
            update={setState}
            type="state"
            placeHolder={"Cacaoshire"}
            key={"state"}
          />
          <TextInput
            label="Country"
            value={country}
            update={setCountry}
            type="country"
            placeHolder={"United Cacaoingdom"}
            key={"Country"}
          />
          <TextInput
            label="Postcode"
            value={postcode}
            update={setPostcode}
            type="postal-code"
            placeHolder={"CAC70 2A"}
            key={"postcode"}
          />
          <Checkbox
            label="Send invoice to a different email address"
            checked={addCustomEmail}
            onChange={() => {
              setAddCustomEmail(!addCustomEmail);
            }}
          ></Checkbox>
          {addCustomEmail && (
            <TextInput
              className="animate-zoom_in_fade mt-2"
              value={email}
              update={setEmail}
              type="email"
              placeHolder={"cacaolover@gmail.com"}
              key={"email"}
            />
          )}
        </form>
        <div>
          <PrimaryButton
            onClicked={async () => {
              setIsSendingOrder(true);
              if (addCustomEmail) user.email = email;
              const isOK = await fetchPostJSON(
                "api/stripe/billing/invoice",
                orderDetails
              );
              if (isOK) {
                setIsSendingOrder(false);

                close();
              } else {
                setIsSendingOrder(false);
              }
            }}
            text={isSendingOrder ? "Loading" : "Confirm order"}
            isPrimary={true}
            key={"confirm order button"}
          />
        </div>
      </Modal>
      <div>
        <h1 className="my-10">Place An Wholesale Order</h1>
        <div>
          <h3>Retail Orders</h3>
          <div className="flex flex-col md:flex-row justify-between">
            <p>
              Branded Beautiful Pouches sold by the case.6 pouches to a case
            </p>
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
                    <div className="flex items-center">Unit Cost (pouch)</div>
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
                    <p>£25 x {retailQty * 6}</p>
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
                      £
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

          <div
            className={`overflow-auto rounded-md shadow-xl border   ${
              !hasBulk && "opacity-10"
            }`}
          >
            <table
              className={`w-full text-sm text-left text-bg-surfaceVarient shadow-lg`}
            >
              <thead className="text-xs text-bg-surface uppercase bg-surfaceVarient dark:bg-bg-surface ">
                <tr className="bg-surface border-b-2">
                  <th scope="col" className="px-6 py-3">
                    Quantity
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <div className="flex items-center">Unit Cost (1kg)</div>
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
                    <p>£65</p>
                  </td>

                  <td className="px-6 py-4 w-2.50 border-r">
                    <p>{`£${bulkCost.toFixed(2)}`}</p>
                  </td>
                  <td className="px-6 py-4 w-2.50">
                    <p>35%</p>
                  </td>
                  <td className="px-6 py-4 w-2.50">
                    <p>
                      £
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

        <div
          className={`${!hasBulk && !hasRetail && "opacity-10"} flex flex-col`}
        >
          <PrimaryButton
            text="Place Order"
            onClicked={async () => {
              if (hasBulk || hasRetail) open();
            }}
            isPrimary={true}
            key={"send invoice button "}
          />
          <PrimaryButton
            text="Pay in 4 Installments"
            className={`${totalCost >= 1000 && "opacity-20"}`}
            onClicked={async () => {
              if ((hasBulk || hasRetail) && totalCost <= 1000) {
                const url = await fetchGetJSON(
                  `${homeUrl}/api/stripe/checkout/wholesale_pay_in_4?bulkQty=${
                    hasBulk && bulkQty
                  }&retailQty=${hasRetail && retailQty}&customerId=${
                    user.customerId
                  }&shippingCost=${shippingCost}`
                );
                window.location.href = url.url;
              } else {
                toast.error(
                  "You can only use installements for orders £1000 and under"
                );
              }
            }}
            isPrimary={totalCost <= 1000 ? true : false}
            key={"send pay in 4 button "}
          />
        </div>
      </div>
    </div>
  );

  function calculateCacaoCost() {
    let total = 0;
    if (hasBulk) {
      total = total + bulkCost;
    }
    if (hasRetail) {
      total = total + retailCost;
    }
    setCacaoCost(total);
  }
  function calculateTotalCost() {
    let total = 0;
    if (hasBulk) {
      total = total + bulkCost;
    }
    if (hasRetail) {
      total = total + retailCost;
    }
    total = total + shippingCost;
    setTotalCost(total);
  }

  function calculateShipping() {
    let bulkShipping = 0;
    if (hasBulk) {
      if (bulkQty >= 5 && bulkQty <= 7) {
        bulkShipping = 35;
      } else if (bulkQty > 7 && bulkQty <= 10) {
        bulkShipping = 43;
      } else if (bulkQty > 10 && bulkQty <= 15) {
        bulkShipping = 53;
      } else if (bulkQty > 15 && bulkQty <= 20) {
        bulkShipping = 100;
      } else {
        bulkCost = 110;
      }
    }
    let retailShipping = 0;
    if (hasRetail) {
      if (retailQty >= 5 && retailQty <= 7) {
        retailShipping = 35;
      } else if (retailQty > 7 && retailQty <= 10) {
        retailShipping = 43;
      } else if (retailQty > 10 && retailQty <= 15) {
        retailShipping = 53;
      } else if (retailQty > 15 && retailQty <= 20) {
        retailShipping = 70;
      } else {
        retailShipping = 110;
      }
    }
    setshippingGost(bulkShipping + retailShipping);
  }
}
