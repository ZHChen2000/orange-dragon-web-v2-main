import React from 'react';
import Link from 'next/link';

export default function Business() {
  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12 text-orange-600">主营业务</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link href="/business/llm" className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition block">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">大模型开发教学</h2>
            <p className="text-gray-600">涵盖大模型开发的教学书籍、教学视频及配套软件产品，助力人工智能领域人才培养。</p>
          </Link>
          <Link href="/business/embedded" className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition block">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">嵌入式开发教学</h2>
            <p className="text-gray-600">提供嵌入式开发相关的教学书籍、教学视频及配套软件产品，服务高校与企业培训。</p>
          </Link>
          <Link href="/business/publish" className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition block">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">科技出版与专利服务</h2>
            <p className="text-gray-600">专业的书籍出版、专利转让、技术推广、技术服务与咨询。</p>
          </Link>
        </div>
      </div>
    </main>
  );
} 