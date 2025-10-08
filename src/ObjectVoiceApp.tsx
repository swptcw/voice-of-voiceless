import React, { useState } from 'react';
import { Feather, Book, Sparkles, Loader } from 'lucide-react';

export default function ObjectVoiceApp() {
  const [object, setObject] = useState('');
  const [context, setContext] = useState('');
  const [narrative, setNarrative] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateVoice = async () => {
    if (!object.trim()) {
      setError('Please enter an object to give voice to');
      return;
    }

    setLoading(true);
    setError('');
    setNarrative('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          object: object,
          context: context
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate narrative');
      }

      const data = await response.json();
      setNarrative(data.narrative);
    } catch (err: any) {
      setError(err.message || 'Unable to generate narrative. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateVoice();
    }
  };

  const examples = [
    { obj: 'an old compass', ctx: 'carried through three wars' },
    { obj: 'a wedding ring', ctx: 'found in a pawn shop' },
    { obj: 'a train ticket', ctx: 'never used' },
    { obj: 'a broken violin string', ctx: '' },
    { obj: 'a lighthouse', ctx: 'automated and abandoned' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #2c3e37 0%, #3a4a3e 100%)',
      padding: '40px 20px',
      fontFamily: 'Georgia, serif'
    }}>
      <div style={{
        maxWidth: '900px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '50px',
          color: '#f4e8d8'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <Feather size={40} color="#d4c4b4" />
            <h1 style={{
              fontSize: '48px',
              margin: 0,
              fontWeight: 'normal',
              letterSpacing: '2px'
            }}>
              Voice of the Voiceless
            </h1>
          </div>
          <p style={{
            fontSize: '18px',
            color: '#d4c4b4',
            fontStyle: 'italic',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Where silent objects find their narrative breath—an instrument for granting consciousness to the inanimate world
          </p>
        </div>

        {/* Input Section */}
        <div style={{
          background: 'rgba(244, 232, 216, 0.05)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '30px',
          marginBottom: '30px',
          border: '1px solid rgba(212, 196, 180, 0.2)'
        }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              color: '#f4e8d8',
              fontSize: '16px',
              marginBottom: '10px',
              fontWeight: 'normal'
            }}>
              <Book size={18} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
              What object shall speak?
            </label>
            <input
              type="text"
              value={object}
              onChange={(e) => setObject(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="a pocket watch, a typewriter key, a bookmark..."
              style={{
                width: '100%',
                padding: '15px',
                fontSize: '18px',
                fontFamily: 'Georgia, serif',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '2px solid #8b7355',
                borderRadius: '8px',
                color: '#2c3e37',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              color: '#f4e8d8',
              fontSize: '16px',
              marginBottom: '10px',
              fontWeight: 'normal'
            }}>
              Context (optional)
            </label>
            <input
              type="text"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="its history, location, relationship to someone..."
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '16px',
                fontFamily: 'Georgia, serif',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '2px solid #8b7355',
                borderRadius: '8px',
                color: '#2c3e37',
                outline: 'none'
              }}
            />
          </div>

          <button
            onClick={generateVoice}
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              fontSize: '18px',
              fontFamily: 'Georgia, serif',
              background: loading ? '#6a5847' : '#8b7355',
              color: '#f4e8d8',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px'
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.background = '#a08968')}
            onMouseOut={(e) => !loading && (e.currentTarget.style.background = '#8b7355')}
          >
            {loading ? (
              <>
                <Loader size={20} style={{ animation: 'spin 1s linear infinite' }} />
                Awakening consciousness...
              </>
            ) : (
              <>
                <Sparkles size={20} />
                Grant Voice
              </>
            )}
          </button>

          {error && (
            <div style={{
              marginTop: '15px',
              padding: '12px',
              background: 'rgba(255, 100, 100, 0.1)',
              border: '1px solid rgba(255, 100, 100, 0.3)',
              borderRadius: '6px',
              color: '#ffcccc',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}
        </div>

        {/* Examples */}
        {!narrative && !loading && (
          <div style={{
            marginBottom: '30px',
            color: '#d4c4b4'
          }}>
            <p style={{
              fontSize: '14px',
              marginBottom: '12px',
              opacity: 0.8
            }}>
              Try these examples:
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px'
            }}>
              {examples.map((ex, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setObject(ex.obj);
                    setContext(ex.ctx);
                  }}
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(212, 196, 180, 0.1)',
                    border: '1px solid rgba(212, 196, 180, 0.3)',
                    borderRadius: '20px',
                    color: '#d4c4b4',
                    fontSize: '13px',
                    cursor: 'pointer',
                    fontFamily: 'Georgia, serif',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 196, 180, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(212, 196, 180, 0.5)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(212, 196, 180, 0.1)';
                    e.currentTarget.style.borderColor = 'rgba(212, 196, 180, 0.3)';
                  }}
                >
                  {ex.obj}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Narrative Output */}
        {narrative && (
          <div style={{
            background: 'rgba(244, 232, 216, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '40px',
            border: '2px solid #8b7355',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '25px',
              paddingBottom: '20px',
              borderBottom: '1px solid #8b7355'
            }}>
              <Feather size={24} color="#8b7355" />
              <h2 style={{
                fontSize: '24px',
                margin: 0,
                color: '#2c3e37',
                fontWeight: 'normal',
                fontStyle: 'italic'
              }}>
                {object}
              </h2>
            </div>
            
            <div style={{
              fontSize: '18px',
              lineHeight: '1.8',
              color: '#2c3e37',
              textAlign: 'justify',
              whiteSpace: 'pre-wrap',
              fontFamily: 'Georgia, serif'
            }}>
              {narrative}
            </div>

            <button
              onClick={() => {
                setNarrative('');
                setObject('');
                setContext('');
              }}
              style={{
                marginTop: '30px',
                padding: '12px 24px',
                background: '#8b7355',
                color: '#f4e8d8',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px',
                fontFamily: 'Georgia, serif'
              }}
            >
              Give Voice to Another
            </button>
          </div>
        )}

        {/* Footer */}
        <div style={{
          marginTop: '50px',
          textAlign: 'center',
          color: '#a89885',
          fontSize: '14px',
          fontStyle: 'italic'
        }}>
          <p>Inspired by the anthropomorphic tradition of literary narration</p>
          <p style={{ marginTop: '5px' }}>
            "Sometimes the bravest act is simply to bear witness"
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
