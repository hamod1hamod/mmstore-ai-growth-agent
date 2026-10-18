import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Plus, 
  ExternalLink, 
  Tag, 
  CheckCircle2, 
  AlertTriangle,
  Sparkles,
  BarChart2
} from 'lucide-react';
import { Product } from '../types';

interface Props {
  products: Product[];
  onSelectForContent: (product: Product) => void;
}

export const ProductCatalogView: React.FC<Props> = ({ products, onSelectForContent }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = products.filter(p => selectedCategory === 'all' || p.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <ShoppingBag size={20} className="text-indigo-400" />
            MMStore Fashion Catalog &amp; Inventory
          </h2>
          <p className="text-xs text-slate-400">
            Real inventory, sizes, wholesale costs, retail prices, and profit margins. Prevents AI hallucination of fake discounts or out-of-stock items.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
            {['all', 't-shirts', 'hoodies', 'sneakers', 'pants', 'caps'].map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  selectedCategory === cat ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((prod) => (
          <div 
            key={prod.id}
            className="rounded-2xl bg-[#14171d] border border-[#252a36] overflow-hidden flex flex-col hover:border-slate-700 transition-all shadow-lg"
          >
            {/* Image Banner */}
            <div className="relative aspect-video bg-slate-900 overflow-hidden group">
              <img 
                src={prod.images[0] || 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=600'} 
                alt={prod.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur text-[10px] font-bold text-white uppercase tracking-wider">
                {prod.category}
              </div>
              <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                Margin: {prod.marginPercent}%
              </div>
            </div>

            {/* Content Details */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div className="space-y-1">
                <h3 className="text-xs font-bold text-white line-clamp-1">{prod.name}</h3>
                <h4 className="text-xs text-slate-300 font-arabic line-clamp-1" dir="rtl">{prod.titleArabic}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              {/* Sizes and Inventory Pills */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white">{prod.basePrice} {prod.currency}</span>
                  <span className="text-[11px] text-slate-400">Total Stock: <strong className="text-emerald-400">{prod.totalStock} units</strong></span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {prod.variants.map((v) => (
                    <span 
                      key={v.id} 
                      className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 font-mono"
                    >
                      {v.size} ({v.inventory})
                    </span>
                  ))}
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => onSelectForContent(prod)}
                className="w-full mt-2 py-2 rounded-xl bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Sparkles size={13} /> Generate Content &amp; Reels
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
