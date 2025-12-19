import React from "react";

export default function ReturnPolicy() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Intro */}
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-6">
          At <span className="font-semibold">Gentlehaus</span>, we are committed to
          ensuring a satisfying shopping experience. Please review the following
          policy to understand our guidelines on returns, refunds, and
          cancellations.
        </p>

        <hr className="border-gray-300 mb-10" />

        {/* Return Eligibility */}
        <section className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-light mb-6">
            Return Eligibility
          </h1>

          <div className="mb-6">
            <h2 className="font-semibold mb-1">Return Window</h2>
            <p className="text-gray-700">
              You may initiate a return request within{" "}
              <span className="font-semibold">
                3 days of receiving your order
              </span>.
            </p>
          </div>

          <div className="mb-6">
            <h2 className="font-semibold mb-2">Eligible Returns</h2>
            <p className="text-gray-700 mb-3">
              Returns are accepted only in the following cases:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Damaged item</li>
              <li>Defective product</li>
              <li>Wrong product received</li>
            </ul>
          </div>

          <p className="text-gray-700 mb-6">
            <span className="font-semibold">Please Note:</span> Returns are{" "}
            <span className="font-semibold">not</span> accepted for items
            delivered in perfect condition.
          </p>

          <div>
            <h2 className="font-semibold mb-2">Condition Requirements</h2>
            <p className="text-gray-700 mb-3">
              To qualify for a return:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Items must be unused, unwashed, and unworn</li>
              <li>Original tags and packaging must be intact</li>
              <li>Products must be in resalable condition</li>
            </ul>
          </div>
        </section>

        {/* Non-Returnable Orders */}
        <section className="mb-12">
          <h2 className="text-2xl font-light mb-4">
            Non-Returnable Orders
          </h2>
          <p className="text-gray-700 mb-3">
            We do not accept returns for:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Items purchased during sales or promotional offers</li>
            <li>Customized or personalized products</li>
            <li>Innerwear or hygiene-sensitive items</li>
            <li>
              Items used, worn, washed, or missing original tags and packaging
            </li>
          </ul>
        </section>

        <hr className="border-gray-300 mb-10" />

        {/* Return Process */}
        <section className="mb-12">
          <h2 className="text-3xl font-light mb-4">Return Process</h2>
          <p className="text-gray-700 mb-4">
            To initiate a return, contact us on WhatsApp at{" "}
            <span className="font-semibold">+91 74360 04465</span> with the
            following:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>The word “Return” or “Exchange”</li>
            <li>Your Order Number</li>
            <li>A brief reason for return</li>
            <li>
              Clear photo or video proof (mandatory for damaged or defective
              items)
            </li>
          </ul>

          <p className="text-sm text-gray-600 mt-4">
            <span className="font-semibold">Note:</span> Return requests made via
            Instagram, email, or other platforms will not be accepted.
          </p>
        </section>

        <hr className="border-gray-300 mb-10" />

        {/* Return Shipping */}
        <section className="mb-12">
          <h2 className="text-3xl font-light mb-4">Return Shipping</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Customers are responsible for return shipping charges.</li>
            <li>
              Use a reliable, trackable, and insured courier service.
            </li>
            <li>
              Gentlehaus is not liable for any loss or damage during return
              transit.
            </li>
          </ul>
        </section>

        <hr className="border-gray-300 mb-10" />

        {/* Refund Process */}
        <section className="mb-12">
          <h2 className="text-3xl font-light mb-4">Refund Process</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>
              After we receive and inspect the returned product, you will be
              notified via WhatsApp or email.
            </li>
            <li>
              If approved, the refund will be processed within{" "}
              <span className="font-semibold">
                5 to 7 business days
              </span>{" "}
              to the original payment method.
            </li>
            <li>
              For Cash on Delivery (COD) orders, refunds will be made via UPI or
              bank transfer.
            </li>
          </ul>
        </section>

        <hr className="border-gray-300 mb-10" />

        {/* Exchange Policy */}
        <section className="mb-12">
          <h2 className="text-3xl font-light mb-4">Exchange Policy</h2>
          <p className="text-gray-700">
            Gentlehaus does not offer direct exchanges.
            </p>
            <p className="text-gray-700">
             To receive a different
            product or size, complete the return process (if eligible) and place
            a new order.
          </p>
        </section>

        <hr className="border-gray-300 mb-10" />

        {/* Cancellation Policy */}
        <section className="mb-12">
          <h2 className="text-3xl font-light mb-4">
            Cancellation Policy
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Orders may be cancelled only before dispatch.</li>
            <li>
              Once an order has been shipped, it cannot be cancelled or changed.
            </li>
            <li>
              For prepaid orders, approved cancellations will be refunded to the
              original payment method within{" "}
              <span className="font-semibold">
                3 to 5 business days
              </span>.
            </li>
            <li>
              To request cancellation, contact us immediately on WhatsApp at{" "}
              <span className="font-semibold">+91 74360 04465</span>.
            </li>
          </ul>

          <p className="text-sm text-gray-600 mt-4">
            <span className="font-semibold">Note:</span> Cancellation is subject
            to the order’s processing status at the time of request.
          </p>
        </section>

        <hr className="border-gray-300 mb-10" />

        {/* Contact Us */}
        <section>
          <h2 className="text-3xl font-light mb-4">Contact Us</h2>
          <p className="text-gray-700 mb-4">
            For any questions or assistance, feel free to reach out:
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">Email:</span>{" "}
              contact.gentlehaus@gmail.com
            </li>
            <li>
              <span className="font-semibold">WhatsApp:</span> +91 74360 04465
            </li>
          </ul>
        </section>

      </div>
    </div>
  );
}
