import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold font-handwritten text-primary mb-6">
            Our Story 🌱
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From a small family farm to delivering fresh organic produce to your doorstep.
          </p>
        </div>

        {/* Simplified Content Sections */}
        <div className="space-y-12">
          {/* Mission */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We started in 2019 with a simple goal: provide genuinely organic, chemical-free produce
              to Indian families. Unlike most "organic" stores, we actually grow our own produce on
              carefully maintained farms using traditional organic methods.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">25</div>
                <div className="text-sm text-muted-foreground">Acres of Organic Farms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">2000+</div>
                <div className="text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">5</div>
                <div className="text-sm text-muted-foreground">Years of Excellence</div>
              </div>
            </div>
          </section>

          {/* Sustainability */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-6">Sustainable Farming</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              We're committed to environmental stewardship. Our farming practices enrich soil health,
              conserve water, and support local ecosystems. Every product you buy helps us maintain
              these sustainable practices for future generations.
            </p>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">100% Organic Certification</h3>
              <p className="text-green-700">
                All our produce is certified organic by independent third-party auditors.
                No synthetic pesticides, herbicides, or chemical fertilizers - ever.
              </p>
            </div>
          </section>

          {/* Team */}
          <section>
            <h2 className="text-3xl font-bold text-primary mb-6">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Anand Kapoor</h3>
                <p className="text-gray-600 mb-2">Founder & CEO</p>
                <p className="text-sm text-muted-foreground">
                  With over 15 years in organic farming, Anand established our first farm
                  to provide chemical-free produce to Indian families.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">Priya Sharma</h3>
                <p className="text-gray-600 mb-2">Head Farmer</p>
                <p className="text-sm text-muted-foreground">
                  Expert in organic cultivation techniques, Priya ensures every harvest
                  meets our rigorous quality standards.
                </p>
              </div>
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-primary text-white p-8 rounded-2xl text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Eat Clean?</h2>
            <p className="mb-6 text-white/90">
              Join thousands of Indians who choose organic, sustainable produce.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-colors"
              >
                Shop Our Products
              </Link>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors">
                Download Catalog
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
