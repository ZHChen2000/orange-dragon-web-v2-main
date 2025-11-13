"use client";

import React from 'react';
import Image from 'next/image';
import BackToHomeButton from '@/components/BackToHomeButton';
import Navigation from '../../components/Navigation';

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <Navigation />

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">🤝 公司合作伙伴</h1>
          <p className="text-xl text-gray-600 mb-6">携手优质合作伙伴，共创科技教育新未来</p>
        </div>

        {/* 出版社合作伙伴 */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">📚 出版社合作伙伴</h2>
            <p className="text-gray-600">与国内顶级出版社建立长期合作关系，为作者提供专业的出版服务</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="text-4xl mb-4">🏛️</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">清华大学出版社</h3>
                <p className="text-sm text-gray-600">合作出版技术类教材与学术专著，覆盖人工智能、计算机科学等领域</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="text-4xl mb-4">📖</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">电子工业出版社</h3>
                <p className="text-sm text-gray-600">专注于电子信息技术类图书出版，在嵌入式系统、软件开发等领域深度合作</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="text-4xl mb-4">⚙️</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">机械工业出版社</h3>
                <p className="text-sm text-gray-600">在机械工程、自动化控制、嵌入式开发等专业领域开展出版合作</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="text-4xl mb-4">📰</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">人民邮电出版社</h3>
                <p className="text-sm text-gray-600">在通信技术、计算机科学、网络工程等领域建立稳定的出版合作关系</p>
              </div>
            </div>
          </div>
        </section>

        {/* 院校合作伙伴 */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">🎓 院校合作伙伴</h2>
            <p className="text-gray-600">与多所高等院校建立合作关系，支持学术研究与成果转化</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="flex justify-center mb-4 h-16 items-center">
                  <Image 
                    src="/university-logos/njust.png" 
                    alt="南京理工大学校徽"
                    width={80}
                    height={80}
                    className="object-contain"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'block';
                    }}
                  />
                  <div className="hidden text-4xl">🏫</div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">南京理工大学</h3>
                <p className="text-sm text-gray-600">在嵌入式系统、人工智能等领域开展学术论文发表与专利申请合作</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="flex justify-center mb-4 h-16 items-center">
                  <Image 
                    src="/university-logos/bit.png" 
                    alt="北京理工大学校徽"
                    width={80}
                    height={80}
                    className="object-contain"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'block';
                    }}
                  />
                  <div className="hidden text-4xl">🏫</div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">北京理工大学</h3>
                <p className="text-sm text-gray-600">在计算机科学、自动化控制、人工智能等领域进行学术交流与技术合作</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="flex justify-center mb-4 h-16 items-center">
                  <Image 
                    src="/university-logos/buaa.png" 
                    alt="北京航空航天大学校徽"
                    width={80}
                    height={80}
                    className="object-contain"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'block';
                    }}
                  />
                  <div className="hidden text-4xl">🏫</div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">北京航空航天大学</h3>
                <p className="text-sm text-gray-600">在航空航天电子、嵌入式控制、人工智能等领域开展技术合作与学术论文发表</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="flex justify-center mb-4 h-16 items-center">
                  <Image 
                    src="/university-logos/seu.png" 
                    alt="东南大学校徽"
                    width={80}
                    height={80}
                    className="object-contain"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'block';
                    }}
                  />
                  <div className="hidden text-4xl">🏫</div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">东南大学</h3>
                <p className="text-sm text-gray-600">在计算机科学与技术、电子工程等专业领域进行学术交流与成果转化</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="flex justify-center mb-4 h-16 items-center">
                  <Image 
                    src="/university-logos/tsinghua.png" 
                    alt="清华大学校徽"
                    width={80}
                    height={80}
                    className="object-contain"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'block';
                    }}
                  />
                  <div className="hidden text-4xl">🏫</div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">清华大学</h3>
                <p className="text-sm text-gray-600">在人工智能、计算机科学、大模型开发等领域开展深度学术合作与成果转化</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="flex justify-center mb-4 h-16 items-center">
                  <Image 
                    src="/university-logos/nju.png" 
                    alt="南京大学校徽"
                    width={80}
                    height={80}
                    className="object-contain"
                    unoptimized
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const placeholder = target.nextElementSibling as HTMLElement;
                      if (placeholder) placeholder.style.display = 'block';
                    }}
                  />
                  <div className="hidden text-4xl">🏫</div>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">南京大学</h3>
                <p className="text-sm text-gray-600">在计算机科学、人工智能、软件工程等领域进行学术研究与技术合作</p>
              </div>
            </div>
          </div>
        </section>

        {/* 企业培训合作伙伴 */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">💼 企业培训合作伙伴</h2>
            <p className="text-gray-600">为中小企业提供专业的技术培训服务，助力企业数字化转型</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">南京某大模型开发相关公司</h3>
                <p className="text-sm text-gray-600 mb-3">大模型开发培训</p>
                <p className="text-xs text-gray-500">为该公司技术团队提供大模型应用开发、模型微调等专业培训服务</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">苏州某嵌入式开发相关公司</h3>
                <p className="text-sm text-gray-600 mb-3">嵌入式开发培训</p>
                <p className="text-xs text-gray-500">为该公司工程师提供嵌入式系统设计、RTOS应用等专业技术培训</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">无锡某智能科技相关公司</h3>
                <p className="text-sm text-gray-600 mb-3">大模型开发培训</p>
                <p className="text-xs text-gray-500">协助该公司开展AI技术应用培训，提升团队在自然语言处理领域的实践能力</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">常州某自动化设备相关公司</h3>
                <p className="text-sm text-gray-600 mb-3">嵌入式开发培训</p>
                <p className="text-xs text-gray-500">为该公司提供工业控制、嵌入式软件开发等领域的系统化培训服务</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="text-center">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">镇江某数据智能相关公司</h3>
                <p className="text-sm text-gray-600 mb-3">大模型开发培训</p>
                <p className="text-xs text-gray-500">支持该公司在大模型应用场景开发、模型部署优化等方面的技术能力提升</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
      <div className="text-center">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">扬州某电子科技相关公司</h3>
                <p className="text-sm text-gray-600 mb-3">嵌入式开发培训</p>
                <p className="text-xs text-gray-500">为该公司技术团队提供嵌入式硬件设计、驱动开发等专业培训课程</p>
              </div>
            </div>
          </div>
        </section>

        {/* 公司业绩展示 */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">📊 合作业绩</h2>
            <p className="text-gray-600">基于真实合作数据，展示我们的服务成果</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">出版服务业绩</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-orange-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">📚 图书出版</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    截至目前，我们已协助作者与四大出版社合作出版了100余本技术类教材和学术专著。这些出版物涵盖了人工智能、大模型开发、嵌入式系统、自动化控制、通信技术等多个技术领域。其中，与清华大学出版社合作出版了多本关于人工智能和大模型开发的教材；与电子工业出版社合作出版了多本嵌入式系统开发相关的技术书籍；与机械工业出版社合作出版了自动化控制领域的专业教材；与人民邮电出版社合作出版了通信技术类参考书。这些出版物均获得了良好的市场反馈，部分教材已被多所高校采用作为教学用书。
                  </p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">📝 学术论文</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    我们为合作院校的科研团队提供了学术论文撰写指导与发表服务。在过去一年中，协助南京理工大学、东南大学等院校的研究人员发表了8篇SCI/EI检索论文，涵盖嵌入式系统、人工智能、计算机视觉等领域。这些论文均发表在国内外知名学术期刊和会议上，为合作院校的科研工作提供了有力支持。
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">💡 专利申请</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    在知识产权服务方面，我们协助合作院校和企业完成了20余项专利申请工作。其中，发明专利15项，实用新型专利5项。这些专利主要涉及嵌入式系统设计、人工智能算法优化、工业自动化控制等技术领域。目前已有12项专利获得授权，8项专利处于实质审查阶段。我们提供的专利检索、分析、撰写等专业服务，有效提升了专利申请的成功率和质量。
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🔄 专利转让</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    我们积极推动技术成果的转化应用，已成功促成3项专利技术的转让合作。这些专利技术分别涉及智能控制系统、嵌入式通信模块、以及AI算法优化等领域。通过我们的专业服务，帮助技术持有方与需求企业建立了有效的对接渠道，实现了技术成果的市场化应用，为合作双方创造了实际价值。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">培训服务业绩</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="bg-amber-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🤖 大模型开发培训</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    我们为南京、无锡、镇江等地的3家大模型开发相关企业提供了大模型开发相关的技术培训服务。培训内容涵盖大模型基础理论、模型微调技术、应用场景开发、模型部署优化等核心知识点。累计培训技术人员约45人次，培训总时长超过120小时。通过系统化的培训，参训企业的技术团队在大模型应用开发能力方面得到了显著提升，部分企业已成功将大模型技术应用于实际业务场景中。
                  </p>
                </div>
                <div className="bg-cyan-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">📈 培训效果评估</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    根据培训后的跟踪调研，参训企业对我们的培训服务满意度达到90%以上。参训人员普遍反馈培训内容实用性强，能够直接应用于实际工作。其中，某南京大模型开发相关企业在培训后3个月内，成功开发了2个大模型应用项目；某无锡智能科技相关企业的技术团队在自然语言处理任务中的准确率提升了约15%。这些实际成果充分证明了我们培训服务的有效性和专业性。
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-teal-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🔧 嵌入式开发培训</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    我们为苏州、常州、扬州等地的3家嵌入式开发相关企业提供了嵌入式系统开发培训服务。培训内容包括嵌入式硬件设计、RTOS实时操作系统应用、驱动开发、系统调试等关键技术。累计培训工程师约38人次，培训总时长约100小时。通过理论与实践相结合的培训方式，参训企业的嵌入式开发能力得到了明显提升。例如，某常州自动化设备相关企业在培训后，其工业控制系统的稳定性和响应速度均有所改善。
                  </p>
                </div>
                <div className="bg-indigo-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🎯 持续服务</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    除了培训服务外，我们还为合作企业提供了持续的技术支持与咨询服务。在培训结束后，我们建立了技术交流群，定期为参训企业解答技术问题，分享行业最新动态。截至目前，我们已为合作企业提供了超过30次的技术咨询服务，协助解决了包括系统优化、故障排查、技术选型等多个方面的实际问题。这种持续的服务模式得到了合作企业的一致好评。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">📊 业绩数据总览</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
              <div>
                <div className="text-3xl font-bold mb-2">100+</div>
                <div className="text-sm opacity-90">合作出版图书</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">8</div>
                <div className="text-sm opacity-90">协助发表论文</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">20+</div>
                <div className="text-sm opacity-90">专利申请服务</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">83</div>
                <div className="text-sm opacity-90">培训人次</div>
              </div>
            </div>
          </div>
        </section>

        {/* 合作优势 */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-orange-600 mb-4">✨ 合作优势</h2>
            <p className="text-gray-600">为什么选择与我们合作</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">专业团队</h3>
              <p className="text-sm text-gray-600">拥有经验丰富的技术专家和出版顾问团队，确保服务质量</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">高效服务</h3>
              <p className="text-sm text-gray-600">快速响应客户需求，提供及时、准确的专业服务</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">长期合作</h3>
              <p className="text-sm text-gray-600">建立稳定的合作关系，提供持续的技术支持与服务</p>
            </div>
          </div>
        </section>

        {/* 联系方式 */}
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">📧 合作咨询</h2>
          <p className="text-lg mb-6">欢迎与我们建立合作关系</p>
          <div className="space-y-2 text-lg">
            <p>📧 邮箱：zhchen2000@foxmail.com</p>
            <p>📞 电话：+86 13201301067</p>
            <p>📍 地址：南京市秦淮区光华路127号3层304F室</p>
          </div>
        </div>
      </div>

      {/* 返回按钮 */}
      <div className="fixed bottom-6 right-6">
      <BackToHomeButton />
      </div>
    </div>
  );
} 