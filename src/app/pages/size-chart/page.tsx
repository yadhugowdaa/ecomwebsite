export default function SizeChartPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">SIZE CHART</h1>

        {/* T-Shirts Size Chart */}
        <div className="max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6">OVERSIZED T-SHIRTS</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-2 border-black">
              <thead className="bg-black text-white">
                <tr>
                  <th className="border border-white px-4 py-3">SIZE</th>
                  <th className="border border-white px-4 py-3">CHEST (inches)</th>
                  <th className="border border-white px-4 py-3">LENGTH (inches)</th>
                  <th className="border border-white px-4 py-3">SHOULDER (inches)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-2 border-black px-4 py-3 font-semibold text-center">S</td>
                  <td className="border-2 border-black px-4 py-3 text-center">40</td>
                  <td className="border-2 border-black px-4 py-3 text-center">27</td>
                  <td className="border-2 border-black px-4 py-3 text-center">20</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-black px-4 py-3 font-semibold text-center">M</td>
                  <td className="border-2 border-black px-4 py-3 text-center">42</td>
                  <td className="border-2 border-black px-4 py-3 text-center">28</td>
                  <td className="border-2 border-black px-4 py-3 text-center">21</td>
                </tr>
                <tr>
                  <td className="border-2 border-black px-4 py-3 font-semibold text-center">L</td>
                  <td className="border-2 border-black px-4 py-3 text-center">44</td>
                  <td className="border-2 border-black px-4 py-3 text-center">29</td>
                  <td className="border-2 border-black px-4 py-3 text-center">22</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border-2 border-black px-4 py-3 font-semibold text-center">XL</td>
                  <td className="border-2 border-black px-4 py-3 text-center">46</td>
                  <td className="border-2 border-black px-4 py-3 text-center">30</td>
                  <td className="border-2 border-black px-4 py-3 text-center">23</td>
                </tr>
                <tr>
                  <td className="border-2 border-black px-4 py-3 font-semibold text-center">XXL</td>
                  <td className="border-2 border-black px-4 py-3 text-center">48</td>
                  <td className="border-2 border-black px-4 py-3 text-center">31</td>
                  <td className="border-2 border-black px-4 py-3 text-center">24</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* How to Measure */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">HOW TO MEASURE</h2>
          <div className="space-y-4 text-gray-700">
            <p><strong>CHEST:</strong> Measure under your arms, around the fullest part of your chest.</p>
            <p><strong>LENGTH:</strong> Measure from the highest point of the shoulder to the bottom hem.</p>
            <p><strong>SHOULDER:</strong> Measure from one shoulder point to the other across the back.</p>
          </div>

          <div className="mt-8 p-6 bg-gray-100">
            <h3 className="font-bold text-lg mb-2">SIZE RECOMMENDATION</h3>
            <p className="text-gray-700">
              For an oversized fit, choose your regular size. For a more relaxed fit, size up. 
              If you're between sizes, we recommend going with the larger size.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

