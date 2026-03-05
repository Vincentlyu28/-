import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  Brain, 
  Activity, 
  Globe, 
  Lightbulb, 
  Mail, 
  Menu, 
  X, 
  ChevronRight,
  Stethoscope,
  Dna,
  Microscope
} from 'lucide-react';

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '关于我', href: '#about' },
    { name: '破界实验室', href: '#lab' },
    { name: 'AI医疗洞察', href: '#insights' },
    { name: '其他IP', href: '#ips' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      {/* Navigation */}
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <a href="#" className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <Brain className="w-6 h-6 text-emerald-600" />
            <span>破界<span className="text-emerald-600">实验室</span></span>
          </a>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-emerald-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-slate-900"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 hover:text-emerald-600"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-100 via-slate-50 to-slate-50"></div>
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                探索 AI 与医疗的无限可能
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                打破边界，<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  重塑医疗未来。
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl">
                我是 Vincent，破界实验室主理人。致力于将前沿的人工智能技术（LLM、计算机视觉等）与医疗健康深度融合，探索科技向善的实际落地路径。
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#about" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors">
                  了解更多 <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#insights" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 border border-slate-200 rounded-full font-medium hover:bg-slate-50 transition-colors">
                  阅读洞察
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">关于我</h2>
                <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                  <p>
                    你好，我是 Vincent。我是一名跨界探索者，深耕于人工智能与医疗健康的交叉领域。
                  </p>
                  <p>
                    我相信，AI 不仅仅是提高效率的工具，更是能够从根本上改变疾病诊断、新药研发和患者管理的革命性力量。我的背景涵盖了技术研发与医疗业务洞察，这让我能够站在"破界"的视角，看到单一学科难以发现的机会。
                  </p>
                  <p>
                    在这里，我记录我的思考，分享我的项目，并寻找志同道合的伙伴一起探索未知。
                  </p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden bg-slate-100 relative">
                  <img 
                    src="https://picsum.photos/seed/vincent/800/800" 
                    alt="Vincent" 
                    className="object-cover w-full h-full mix-blend-multiply opacity-90"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent mix-blend-overlay"></div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-emerald-100 rounded-full blur-2xl -z-10"></div>
                <div className="absolute -top-6 -right-6 w-32 h-32 bg-teal-100 rounded-full blur-2xl -z-10"></div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Lab Section */}
        <section id="lab" className="py-20 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-3xl mx-auto mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">破界实验室</h2>
              <p className="text-slate-400 text-lg">
                Boundary-Breaking Lab 是一个致力于打破学科壁垒、探索 AI 与前沿科技在医疗、生命科学等领域创新应用的独立研究与实践平台。
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Brain className="w-8 h-8 text-emerald-400" />,
                  title: "AI 医疗前沿探索",
                  desc: "研究大语言模型（LLM）、多模态 AI 在临床辅助决策、医学影像分析中的前沿应用。"
                },
                {
                  icon: <Activity className="w-8 h-8 text-emerald-400" />,
                  title: "数字健康产品孵化",
                  desc: "将技术洞察转化为实际的数字健康产品原型，探索改善患者体验与医疗效率的新模式。"
                },
                {
                  icon: <Globe className="w-8 h-8 text-emerald-400" />,
                  title: "跨界知识开源",
                  desc: "建立开源社区，分享医疗 AI 领域的数据集、模型评测标准及行业深度研究报告。"
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:bg-slate-800 transition-colors"
                >
                  <div className="mb-6 bg-slate-900/50 w-16 h-16 rounded-xl flex items-center justify-center border border-slate-700">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Insights Section */}
        <section id="insights" className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-2xl"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-4">AI 医疗洞察</h2>
                <p className="text-slate-600 text-lg">记录我对行业的观察、技术趋势的分析以及实践过程中的思考。</p>
              </motion.div>
              <a href="#" className="hidden md:flex items-center gap-2 text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                查看全部文章 <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  tag: "行业趋势",
                  title: "大模型在临床辅助诊断中的应用边界与挑战",
                  date: "2024-03-15",
                  readTime: "8 min read",
                  image: "https://picsum.photos/seed/medical1/600/400"
                },
                {
                  tag: "技术解析",
                  title: "医疗数据的隐私计算：如何在不泄露数据的前提下训练 AI",
                  date: "2024-02-28",
                  readTime: "12 min read",
                  image: "https://picsum.photos/seed/data/600/400"
                },
                {
                  tag: "创新实践",
                  title: "AI 驱动的新药研发：从靶点发现到分子生成的范式转移",
                  date: "2024-01-10",
                  readTime: "10 min read",
                  image: "https://picsum.photos/seed/dna/600/400"
                }
              ].map((post, i) => (
                <motion.article 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-md transition-shadow group cursor-pointer"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-xs font-semibold text-emerald-600 mb-3 uppercase tracking-wider">
                      {post.tag}
                    </div>
                    <h3 className="text-xl font-bold mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center text-sm text-slate-500 gap-4">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            <div className="mt-8 md:hidden">
              <a href="#" className="flex items-center justify-center gap-2 text-emerald-600 font-medium w-full py-3 bg-emerald-50 rounded-xl">
                查看全部文章 <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Other IPs Section */}
        <section id="ips" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">其他 IP 与项目</h2>
              <p className="text-slate-600 text-lg max-w-2xl">除了深耕医疗 AI，破界实验室还在孵化一系列跨界内容与工具产品。</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "AI+X 跨界播客",
                  desc: "对话不同领域的专家，探讨 AI 如何重塑各行各业。已上线 Apple Podcasts 与小宇宙。",
                  icon: <Lightbulb className="w-6 h-6 text-amber-500" />,
                  bg: "bg-amber-50",
                  border: "border-amber-100"
                },
                {
                  title: "MedTech Weekly",
                  desc: "一份专注于全球医疗科技前沿进展的独立 Newsletter，每周日晚准时推送。",
                  icon: <Mail className="w-6 h-6 text-blue-500" />,
                  bg: "bg-blue-50",
                  border: "border-blue-100"
                },
                {
                  title: "OpenMedData 计划",
                  desc: "致力于整理和开源高质量的中文医疗数据集，助力学术研究与模型训练。",
                  icon: <Dna className="w-6 h-6 text-purple-500" />,
                  bg: "bg-purple-50",
                  border: "border-purple-100"
                },
                {
                  title: "临床 AI 助手原型",
                  desc: "基于开源大模型微调的临床病历结构化提取工具，目前处于内部测试阶段。",
                  icon: <Stethoscope className="w-6 h-6 text-rose-500" />,
                  bg: "bg-rose-50",
                  border: "border-rose-100"
                }
              ].map((ip, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-8 rounded-3xl border ${ip.bg} ${ip.border} flex flex-col sm:flex-row gap-6 items-start hover:shadow-md transition-shadow cursor-pointer group`}
                >
                  <div className="bg-white p-4 rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                    {ip.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      {ip.title}
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{ip.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Contact */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/pattern/1920/1080')] opacity-5 mix-blend-overlay"></div>
          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">准备好一起破界了吗？</h2>
            <p className="text-xl text-slate-400 mb-10">
              如果你对 AI 医疗感兴趣，或者有好的想法想要交流，欢迎随时联系我。
            </p>
            <a href="mailto:vincentlyu28@gmail.com" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-emerald-500 text-white rounded-full font-bold text-lg hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40">
              <Mail className="w-5 h-5" /> 联系我
            </a>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <Brain className="w-5 h-5 text-emerald-500" />
            <span>破界实验室</span>
          </div>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Vincent. All rights reserved.
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors">
              <span className="sr-only">WeChat</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.5,13.5 C7.67157288,13.5 7,12.8284271 7,12 C7,11.1715729 7.67157288,10.5 8.5,10.5 C9.32842712,10.5 10,11.1715729 10,12 C10,12.8284271 9.32842712,13.5 8.5,13.5 Z M15.5,13.5 C14.6715729,13.5 14,12.8284271 14,12 C14,11.1715729 14.6715729,10.5 15.5,10.5 C16.3284271,10.5 17,11.1715729 17,12 C17,12.8284271 16.3284271,13.5 15.5,13.5 Z M12,3 C6.4771525,3 2,6.80557963 2,11.5 C2,14.1564312 3.42413146,16.5268266 5.62622143,18.005167 L4.5,21 L7.82842712,19.8994949 C9.11027492,20.5962049 10.5228475,21 12,21 C17.5228475,21 22,17.1944204 22,12.5 C22,7.80557963 17.5228475,3 12,3 Z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 hover:text-white transition-colors">
              <span className="sr-only">GitHub</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
