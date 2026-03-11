export default function AboutSection() {
  return (
    <section className="py-20 bg-background">
        <h2 className="text-5xl text-center font-bold mb-6">
            About Us
          </h2>
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1584515933487-779824d29309"
            alt="Care Service"
            className="rounded-xl shadow-lg w-full object-cover"
          />

          {/* Floating Stat */}
          <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
            <p className="text-2xl font-bold">500+</p>
            <p className="text-sm">Trusted Caregivers</p>
          </div>
        </div>

        {/* Text Content */}
        <div>

          <h2 className="text-4xl font-bold mb-6">
            Caring for Your Loved Ones with Trust & Compassion
          </h2>

          <p className="mb-4">
            Care.xyz is a trusted caregiving platform designed to help families
            find reliable and professional caretakers for children, elderly
            family members, and sick individuals. Our mission is to make
            caregiving simple, secure, and accessible for everyone.
          </p>

          <p className="mb-6">
            Whether you need a babysitter, elderly care assistant, or home care
            support, our platform connects you with trained caregivers who are
            committed to providing compassionate and dependable service.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">

            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">✔</span>
              <p>Verified Caregivers</p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">✔</span>
              <p>Secure Booking System</p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">✔</span>
              <p>Flexible Scheduling</p>
            </div>

            <div className="flex items-start gap-3">
              <span className="text-blue-600 text-xl">✔</span>
              <p>24/7 Customer Support</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}