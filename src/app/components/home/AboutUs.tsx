import AnimatedButton from "../AnimatedButton";

export default function AboutUs() {
  return (
    <section className="mx-4 py-6 xl:py-12">
      <div className="grid md:grid-cols-2 gap-24 justify-between">
        {/* Left text */}
        <div className="space-y-6 hidden md:flex">
          <p className="text-lg md:text-xl font-medium max-w-xl">
            A global team of search-first content marketers <br />
            engineering semantic relevancy & category <br />
            signals for both the internet and people
          </p>
        </div>

        {/* Right heading */}
        <div className="space-y-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium">
            Driving Demand & <br />
            <span>Discovery</span>
          </h2>

          <div className="space-y-6 md:hidden">
            <p className="text-lg md:text-xl font-medium max-w-xl">
              A global team of search-first content marketers <br />
              engineering semantic relevancy & category <br />
              signals for both the internet and people
            </p>
          </div>

          <div className="flex flex-col md:flex-row">
            <AnimatedButton variant="solid">Our Story</AnimatedButton>

            <AnimatedButton>Our Services</AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
}
