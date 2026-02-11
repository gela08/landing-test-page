
import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, ArrowRight, Loader2, Wand2, Smartphone, Monitor, ChevronRight, Github } from 'lucide-react';
import { generateLandingPageContent, generateHeroImage } from './services/gemini';
import { GeneratorState, LandingPageContent } from './types';
import { IconRenderer } from './components/IconRenderer';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [state, setState] = useState<GeneratorState>({
    isLoading: false,
    error: null,
    content: null,
    heroImageUrl: null
  });
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const previewRef = useRef<HTMLDivElement>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const [content, image] = await Promise.all([
        generateLandingPageContent(prompt),
        generateHeroImage(prompt)
      ]);

      setState({
        isLoading: false,
        error: null,
        content,
        heroImageUrl: image
      });

      // Scroll to preview after a short delay
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (err: any) {
      console.error(err);
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: err.message || 'Something went wrong while generating.' 
      }));
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-indigo-600 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Lumina AI
              </span>
            </div>
            <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
              <a href="#" className="hover:text-white transition-colors">How it works</a>
              <a href="#" className="hover:text-white transition-colors">Examples</a>
              <a href="#" className="hover:text-white transition-colors">Pricing</a>
              <button className="px-4 py-2 bg-white text-slate-950 rounded-full font-semibold hover:bg-slate-200 transition-all flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8">
            <Wand2 className="w-4 h-4" /> Powered by Gemini 3.0 & 2.5
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Instant Landing Pages <br />
            <span className="text-slate-500">for Your Next Idea.</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
            Describe your product and let our AI handle the copy, the imagery, and the design. Go from zero to launched in seconds.
          </p>

          <form onSubmit={handleGenerate} className="max-w-3xl mx-auto relative">
            <div className="p-1.5 bg-slate-900 border border-white/10 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl">
              <input 
                type="text" 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="A SaaS platform for independent pet sitters..."
                className="flex-1 bg-transparent px-6 py-4 text-white focus:outline-none placeholder:text-slate-600"
                disabled={state.isLoading}
              />
              <button 
                type="submit"
                disabled={state.isLoading || !prompt.trim()}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                {state.isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    Build My Page <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
            {state.error && (
              <p className="text-red-400 text-sm mt-4">{state.error}</p>
            )}
          </form>
        </div>
      </section>

      {/* Feature Showcase Grid */}
      {!state.content && !state.isLoading && (
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Wand2 className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">AI Copywriting</h3>
                <p className="text-slate-400">Gemini 3 generates persuasive headlines and feature lists tailored to your niche.</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Smartphone className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Image Generation</h3>
                <p className="text-slate-400">Stunning high-res imagery generated on the fly using Gemini 2.5 Flash Image.</p>
              </div>
              <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                  <Monitor className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">Export Ready</h3>
                <p className="text-slate-400">Download your generated design as a clean React component or plain HTML/Tailwind.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Generated Preview */}
      <div ref={previewRef} className="flex-1 pb-24 px-4 sm:px-6 lg:px-8">
        {(state.content || state.isLoading) && (
          <div className="max-w-7xl mx-auto">
            {/* Preview Controls */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-bold text-white">Live Preview</h2>
                {state.isLoading && (
                  <span className="flex items-center gap-2 text-sm text-indigo-400 animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin" /> Refining details...
                  </span>
                )}
              </div>
              <div className="flex bg-slate-900 p-1 rounded-lg border border-white/10">
                <button 
                  onClick={() => setViewMode('desktop')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'desktop' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  <Monitor className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => setViewMode('mobile')}
                  className={`p-2 rounded-md transition-all ${viewMode === 'mobile' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                >
                  <Smartphone className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Preview Container */}
            <div className={`mx-auto transition-all duration-500 ease-in-out border border-white/10 rounded-2xl overflow-hidden bg-white text-slate-900 shadow-2xl ${viewMode === 'desktop' ? 'w-full' : 'max-w-sm'}`}>
              <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="bg-white border border-slate-200 px-12 py-1 rounded text-xs text-slate-400 truncate max-w-xs">
                  {state.content ? state.content.headline.toLowerCase().replace(/\s+/g, '-') : 'your-awesome-project'}.lumina.ai
                </div>
                <div className="w-12"></div>
              </div>

              {state.isLoading ? (
                <div className="h-[800px] bg-white flex flex-col items-center justify-center p-12 text-center">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                    <Sparkles className="w-8 h-8 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Architecting your vision...</h3>
                  <p className="text-slate-500 max-w-md">Our AI is drafting high-conversion copy and painting professional imagery tailored to your requirements.</p>
                </div>
              ) : state.content && (
                <GeneratedLandingPage content={state.content} heroImage={state.heroImageUrl} />
              )}
            </div>
          </div>
        )}
      </div>

      <footer className="mt-auto border-t border-white/5 py-12 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-lg text-white">Lumina AI</span>
          </div>
          <p className="text-slate-500 text-sm">
            &copy; 2024 Lumina AI Landing Pages. Built with Gemini 3.0 Pro.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-500 hover:text-white transition-colors"><Github className="w-5 h-5" /></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

interface GeneratedLandingPageProps {
  content: LandingPageContent;
  heroImage: string | null;
}

const GeneratedLandingPage: React.FC<GeneratedLandingPageProps> = ({ content, heroImage }) => {
  return (
    <div className="bg-white font-sans scroll-smooth">
      {/* Dynamic Nav */}
      <nav className="flex items-center justify-between px-6 py-6 border-b border-slate-100">
        <div className="font-extrabold text-xl flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="tracking-tighter">BRAND.</span>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-slate-600">
          <a href="#features" className="hover:text-indigo-600">Features</a>
          <a href="#about" className="hover:text-indigo-600">About</a>
          <a href="#pricing" className="hover:text-indigo-600">Pricing</a>
        </div>
        <button className={`px-5 py-2.5 bg-indigo-600 text-white rounded-full font-semibold shadow-lg shadow-indigo-600/20 hover:scale-105 transition-transform`}>
          {content.ctaText}
        </button>
      </nav>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              {content.headline}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
              {content.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors">
                Get Started Now <ArrowRight className="w-5 h-5" />
              </button>
              <button className="px-8 py-4 bg-slate-100 text-slate-900 rounded-xl font-bold hover:bg-slate-200 transition-colors">
                View Demo
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-600/5 rounded-[2rem] blur-2xl"></div>
            {heroImage ? (
              <img 
                src={heroImage} 
                alt="Product Hero" 
                className="relative rounded-3xl shadow-2xl border border-slate-200 w-full object-cover aspect-video"
              />
            ) : (
              <div className="relative w-full aspect-video bg-slate-100 rounded-3xl flex items-center justify-center border-2 border-dashed border-slate-300">
                <span className="text-slate-400 font-medium">Generating visual context...</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-slate-50 py-12 px-6 border-y border-slate-100">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
          {['Microsoft', 'Google', 'Airbnb', 'Spotify', 'Linear'].map(brand => (
            <span key={brand} className="text-2xl font-black tracking-tighter">{brand}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Everything you need, nothing you don't.</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">Powerful features built for performance and growth.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.features.map((feature, idx) => (
            <div key={idx} className="p-8 rounded-3xl border border-slate-100 bg-white hover:shadow-xl transition-shadow group">
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <IconRenderer name={feature.iconName} className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-24 px-6 bg-slate-950 text-white rounded-[3rem] mx-4 mb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 blur-[100px] -z-0"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-8">
            <div className="flex gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => <Sparkles key={i} className="w-5 h-5 fill-current" />)}
            </div>
          </div>
          <blockquote className="text-2xl md:text-4xl font-medium mb-10 leading-tight italic">
            "{content.testimonial.quote}"
          </blockquote>
          <div>
            <div className="font-bold text-xl">{content.testimonial.author}</div>
            <div className="text-indigo-400">{content.testimonial.role}</div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">Ready to transform your workflow?</h2>
          <p className="text-xl text-slate-600 mb-12">Join 10,000+ teams who are building the future with our platform.</p>
          <button className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 transition-colors">
            {content.ctaText}
          </button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="py-12 border-t border-slate-100 px-6 text-center text-slate-400 text-sm">
        <p>&copy; 2024 Your Brand Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
