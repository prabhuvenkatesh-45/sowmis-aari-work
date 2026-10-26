import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Trash2, ArrowLeft, Sparkles, MessageCircle } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import SectionTitle from '../components/common/SectionTitle';
import Button from '../components/common/Button';

const WishlistPage = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInquireAll = () => {
    const itemNames = wishlist.map((i) => i.title).join(', ');
    const msg = `Hello Sowmis Aari Work! I have curated these designs in my wishlist: ${itemNames}. Could I request order & pricing details?`;
    window.open(`https://wa.me/918838877100?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="aari-page-padding" style={{ paddingTop: '7.5rem', minHeight: '80vh', paddingBottom: '5rem' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
          <Link to="/" style={{ color: 'var(--gold-primary)' }}>Home</Link>
          <span>/</span>
          <span>Curated Wishlist</span>
        </div>

        <SectionTitle
          badge="Personal Keepsake"
          title="Your Curated"
          highlight="Bridal Inspirations"
          subtitle="Review and consult on your hand-picked Aari hand embroidery silhouettes."
        />

        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', background: 'var(--surface)', borderRadius: 'var(--radius-lg)', maxWidth: '540px', margin: '0 auto', border: '1px dashed var(--border-gold)' }}>
            <Heart size={48} strokeWidth={1.2} style={{ color: 'var(--gold-primary)', marginBottom: '1rem', opacity: 0.8 }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>Your Atelier Keepsake is Empty</h3>
            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '1.75rem' }}>
              Explore our collections and tap the heart icon on any design to save your inspirations.
            </p>
            <Button variant="gold" size="md" to="/#collection">
              Explore Bridal Collections
            </Button>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--gold-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {wishlist.length} Saved {wishlist.length === 1 ? 'Design' : 'Designs'}
              </span>
              <button
                onClick={clearWishlist}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem' }}
              >
                <Trash2 size={14} /> Clear Board
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
              {wishlist.map((item) => (
                <div key={item.id} className="stitched-card" style={{ padding: '1.25rem', background: 'var(--surface)' }}>
                  <div style={{ width: '100%', height: '280px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1rem' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--gold-primary)', fontWeight: 700 }}>
                    {item.categoryLabel || item.category}
                  </span>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', margin: '0.3rem 0 0.5rem' }}>
                    {item.title}
                  </h4>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '0.75rem 0', fontSize: '0.85rem' }}>
                    <span style={{ color: 'var(--text-muted)' }}>{item.hours}</span>
                    <span style={{ fontWeight: 700, color: 'var(--gold-primary)' }}>{item.price}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-subtle)' }}>
                    <Button
                      variant="gold"
                      size="sm"
                      style={{ flex: 1 }}
                      onClick={() => navigate('/custom-order', { state: { preselectedItem: item } })}
                    >
                      Commission &rarr;
                    </Button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      style={{ background: 'var(--tag-bg)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '0 0.75rem', color: 'var(--text-muted)', cursor: 'pointer' }}
                      title="Remove"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <Button
                variant="primary"
                size="lg"
                icon={MessageCircle}
                onClick={handleInquireAll}
              >
                Inquire on All Saved Designs via WhatsApp
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
