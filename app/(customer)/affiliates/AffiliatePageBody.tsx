import React from "react";
import Image from "next/image";
import affiliatePortalMockUp from "@/public/affiliate_portal_mock_up.png";
import dynamic from "next/dynamic";

export function AffiliatePageBody() {
  const ReasonToJoin = dynamic(() =>
    import("../../../components/affiliate/ReasonToJoin").then(
      (res) => res.ReasonToJoin
    )
  );
  return (
    <div className=" px-4 flex flex-row  w-full justify-center bg-tertiaryContainer">
      <div className=" w-fit lg:w-7/12 pt-20">
        <h2 className="text-7xl mt-10 mb-5">Spread The Medicine</h2>
        <p>
          What sets ceremonial cacao apart is its ability to create a profound
          connection between mind, body, and spirit. For centuries, ancient
          civilizations have revered this sacred elixir for its transformative
          properties and its capacity to facilitate inner exploration, healing,
          and spiritual growth. Now, you have the chance to be part of a
          movement that brings the power of ceremonial cacao to people
          worldwide.
        </p>
        <Image
          src={affiliatePortalMockUp}
          width={1080}
          height={800}
          alt={"affiliate portal mock up "}
          className=" m-auto rounded-lg"
        />
        <div>
          <h3 className="text-5xl mb-10 mt-5">
            Embrace the Spiritual Connection: Enter our Cacao Affiliate Portal
          </h3>
          <p className="mb-20">
            Discover a dedicated space crafted exclusively for our spiritual
            affiliates. Our cacao affiliate portal serves as a platform to
            foster a deeper spiritual connection and share the profound benefits
            of ceremonial cacao. Engage effortlessly by generating personalized
            affiliate links, enabling you to offer the transformative power of
            cacao to others. Gain valuable insights into the impact of your
            efforts through intuitive tracking and analytics. Connect with a
            community of like-minded individuals, exchanging knowledge and
            experiences to fuel your spiritual growth. Our committed support
            team is readily available to address your questions and provide
            guidance. Step onto the path of selling cacao with a spiritual
            intention, as our portal supports your spiritual journey and
            amplifies your impact.
          </p>
        </div>
        <h2 className="text-7xl my-10">Why Join Our Affiliate Program?</h2>
        <ReasonToJoin
          header={"A Sacred Partnership"}
          imageUrl={"/home_header/home_page_header_image_9.jpg"}
          body={`Join our affiliate program and become a valued partner in
                spreading the transformative magic of ceremonial cacao
                worldwide. Together, we elevate consciousness, foster deep
                connection, and inspire personal growth. Align with our mission
                to preserve ancient traditions, support fair trade and
                sustainability, and empower communities. As an affiliate, you'll
                receive unwavering support, guidance, and captivating marketing
                resources. Let's create a ripple of positive change, sharing the
                wonders of ceremonial cacao with those seeking profound
                experiences and spiritual awakening.`}
        />
        <ReasonToJoin
          header={"Exceptional Product Quality:"}
          imageUrl={"/home_header/home_page_header_image_18.jpg"}
          body={` Experience the pinnacle of ceremonial cacao perfection. Our
                affiliate program offers you the opportunity to share the utmost
                excellence in cacao sourcing. We take great pride in selecting
                only the finest ceremonial cacao, ensuring its embodiment of
                ancient traditions and unparalleled purity. Every sip reflects
                meticulous craftsmanship and the legacy of time-honored rituals.
                Partner with us to champion exceptional product quality,
                allowing your audience to indulge in the transformative power of
                this extraordinary elixir. Join our program and become a
                purveyor of excellence, sharing the remarkable flavors and
                profound experiences that define our exceptional ceremonial
                cacao.`}
        />
        <ReasonToJoin
          header={"Lucrative Commission Rates"}
          imageUrl={"/home_header/home_page_header_image_16.jpg"}
          body={` We deeply value your commitment and dedication as an affiliate
                partner. Your outstanding efforts are recognized and rewarded
                through our generous commission rates. Each sale you generate is
                met with financial appreciation, reflecting the exceptional
                value you bring. Our thoughtfully designed commission structure
                aligns your hard work with substantial incentives. Join our
                rewarding partnership, where your dedication is duly
                compensated. As an affiliate, you have the opportunity to earn
                substantial rewards for your exceptional contributions. Trust
                that your efforts will be recognized, fostering financial
                success.`}
        />
        {/* <ReasonToJoin
          header={
            " Captivating & Professionally Designed: Empowering Your Marketing Journey"
          }
          imageUrl={"/sacbe_media_packet.jpg"}
          body={`Unlock the power of our affiliate program with an array of
            captivating, professionally designed marketing materials. Elevate
            your promotional efforts and captivate your audience using our
            curated resources. From stunning visuals to compelling content, our
            materials leave a lasting impression. Tailored to resonate with your
            audience, our assets drive conversions. Effortlessly convey our
            unique value and appeal with our resources. We believe in your
            potential to showcase our brand, providing you with this treasure
            trove. Join our program and access captivating, professionally
            designed marketing materials. Amplify your impact as you inspire
            transformative journeys with our products.`}
        /> */}
        {/* <ReasonToJoin
          header={"Access to Exclusive Offers"}
          imageUrl={"/home_header/home_page_header_image_1.jpg"}
          body={` Elevate your affiliate game with our exclusive offers and promotions available solely to our valued affiliates. Gain a competitive edge and captivate your audience with unique deals and incentives that cannot be found elsewhere. By partnering with us, you unlock a world of exclusive opportunities that set you apart from the crowd. These special offers allow you to offer added value to your customers, enticing them to choose our ceremonial cacao products. Be the first to share exciting promotions, limited-time discounts, and captivating campaigns that create a buzz in the market. Stand out as an affiliate by delivering unparalleled benefits and captivating your audience with exclusive opportunities.`}
        /> */}
        <ReasonToJoin
          header={"Deeply Committed to Ethics, Fair Trade, and Sustainability"}
          imageUrl={"/home_header/home_page_header_image_5.jpg"}
          body={`Ethics, fair trade, and sustainability lie at the core of our values. We are dedicated to sourcing our ceremonial cacao through ethical channels, promoting fair trade practices, and ensuring sustainability throughout our supply chain. Our commitment to these principles is unwavering, driving every aspect of our business. By choosing to partner with us, you join a movement that prioritizes social responsibility and environmental consciousness. We are proud to support the communities and farmers who cultivate our cacao, ensuring fair wages and working conditions. Together, we can make a positive impact and contribute to a more sustainable future.`}
        />
      </div>
    </div>
  );
}
