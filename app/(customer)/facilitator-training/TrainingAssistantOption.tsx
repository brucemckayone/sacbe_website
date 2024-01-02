import { BulletPoints } from "./BulletPoints";

export default function TrainingAssistingRole() {
  return (
    <section className="w-11/12 md:w-6/12 m-auto bg-tertiaryContainer/80 border rounded-xl p-2 md:p-10 my-10 ">
      <div className="w-full rounded-xl bg-white p-2 md:p-5">
        <h2 className="text-2xl font-bold">Assistant Role</h2>
        <div className="space-y-4">
          <p>
            Ideal for those who are unable to afford the full cost of training.
            We are looking for someone who is efficient, organised + manages
            time well to help with various tasks such as setting up + clearing
            of spaces, making cacao + altar creation, building + tending fires.
            Luzura will contact those who express interest to arrange a call
            interview to assess suitability.
          </p>
          <BulletPoints
            bulletPoints={[
              {
                name: "Training Duration",
                effect: "1 week training + 3 months integration",
              },
              {
                name: "Meals",
                effect: "Includes 3 x daily plant-based meals",
              },
              {
                name: "Accommodation",
                effect: "Organize your own accommodation",
              },
              {
                name: "Transport",
                effect: "Organize your own transport to venue",
              },
              {
                name: "Cacao",
                effect: "Excludes 3kg Sacbe Cacao",
              },
            ]}
          />
          <p>*option to camp / campervan on site </p>
          <div className="flex flex-col items-center space-y-2">
            <a
              href="mailto:sacbe.cacao@thirdeyetribe.co.uk"
              className="px-5 py-2  bg-sacbeBrandColor border-2 rounded-lg "
            >
              <p className="font-display no-underline uppercase">Apply Now</p>
            </a>
            <p className="text-xs">For applications of interest</p>
          </div>
        </div>
      </div>
    </section>
  );
}
