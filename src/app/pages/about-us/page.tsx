export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">ABOUT LUNOX</h1>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="prose prose-lg mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed">
              LUNOX is a premium streetwear brand that brings bold, trend-setting unisex styles to fashion enthusiasts. 
              We believe in creating clothing that speaks to individuality and self-expression.
            </p>
            
            <h2 className="text-3xl font-bold mt-12 mb-6">OUR STORY</h2>
            <p className="text-gray-700 leading-relaxed">
              Founded with a vision to redefine streetwear, LUNOX combines contemporary design with quality craftsmanship. 
              Every piece is thoughtfully designed to reflect the spirit of modern street culture.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">OUR MISSION</h2>
            <p className="text-gray-700 leading-relaxed">
              To create premium, sustainable streetwear that empowers individuals to express themselves freely. 
              We're committed to quality, comfort, and cutting-edge design.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">WHY CHOOSE LUNOX?</h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>Premium quality fabrics (200+ GSM)</li>
              <li>Unique, bold designs</li>
              <li>Unisex sizing for everyone</li>
              <li>Sustainable production practices</li>
              <li>Fast shipping across India</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

