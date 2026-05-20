interface FAQ {
  question: string;
  answer: string;
}

export default function FAQSection({ faqs }: { faqs: FAQ[] }) {
  return (
    <div className="mb-16">
      <h2 className="text-2xl font-serif text-[#2C2C24] mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="bg-white rounded-3xl shadow-sm border border-[#D9D1C7] p-8">
            <h3 className="text-xl font-bold text-[#2C2C24] mb-2">{faq.question}</h3>
            <p className="text-[#7A756C] leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
