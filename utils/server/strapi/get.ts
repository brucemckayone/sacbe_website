import strapiUrl from "./url";

interface getInterface {
  endpoint: string;
  filters?: string;
  populate?: string;
}

async function strapiGET({ endpoint, filters, populate }: getInterface) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append(
    "Authorization",
    "Bearer d5227425eebf78bd468e423320ea40583e4cf4fcb5a996c6db0cf959fafb36f554b71561385dadea3f05bec716625f6814641200015e69e5008b7192a77beb8b157612edca62178f57152ad7a1f55fb670ce7f1d0a81343850460889fdc753ea3cc04b9790d351282c1ef52d605ab582bbb28634c5eab24559379d37634dc121"
  );

  var raw = JSON.stringify({
    status: "pending",
    userId: "28wL0HMd7959AiWpRW8r",
  });

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    next: { revalidate: 0 },
  };

  const res = await fetch(
    `${strapiUrl}${endpoint}?${filters}&${populate}`,
    requestOptions
  );

  if (res.ok) {
    return res.json();
  } else {
    console.error(
      `Error fetching strapi at ${strapiUrl}/${endpoint}?${filters}&${populate}`
    );
  }
}

export default strapiGET;
