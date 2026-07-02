import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateQuiz } from '@/api/llm';
import { getApiErrorMessage } from '@/api/errors';
import { useTranslation } from 'react-i18next';

export default function UploadPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState<'pdf' | 'text'>('text');
  const [pdf, setPdf] = useState<File | null>(null);
  const [sourceText, setSourceText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const quiz = await generateQuiz({
        title,
        language: i18n.language,
        pdf: mode === 'pdf' ? (pdf ?? undefined) : undefined,
        source_text: mode === 'text' ? sourceText : undefined,
      });
      navigate(`/quiz/${quiz.id}`);
    } catch (err) {
      setError(getApiErrorMessage(err, t('upload.error', 'Échec de la génération.')));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('upload.title')}</h1>
      <p className="text-slate-600 mb-6">{t('upload.subtitle')}</p>

      {error && (
        <div 
          role="alert" 
          aria-live="assertive" 
          className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-4">
        <div>
          <label htmlFor="upload-title" className="block text-sm font-medium text-slate-700 mb-1">
            {t('upload.label_title')}
          </label>
          <input
            id="upload-title"
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('upload.placeholder_title')}
            className="input"
            aria-required="true"
          />
        </div>

        <div>
          <div className="flex gap-2 mb-3">
            <button
              type="button"
              onClick={() => setMode('text')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                mode === 'text'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              aria-pressed={mode === 'text'}
            >
              {t('upload.btn_text_mode')}
            </button>
            <button
              type="button"
              onClick={() => setMode('pdf')}
              className={`px-3 py-1 rounded text-sm font-medium ${
                mode === 'pdf'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              aria-pressed={mode === 'pdf'}
            >
              {t('upload.btn_pdf_mode')}
            </button>
          </div>

          {mode === 'text' ? (
            <textarea
              id="upload-text"
              required
              rows={10}
              minLength={200}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder={t('upload.placeholder_text')}
              className="input"
              aria-required="true"
            />
          ) : (
            <input
              id="upload-pdf"
              type="file"
              accept=".pdf,application/pdf"
              required
              onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
              className="input"
              aria-required="true"
            />
          )}
          {mode === 'text' && (
            <p className="text-xs text-slate-500 mt-1">
              {t('upload.char_count', { count: sourceText.length })}
            </p>
          )}
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <>
              <span className="animate-spin" role="img" aria-label="chargement">⏳</span> {t('upload.loading_gen')}
            </>
          ) : (
            <> {t('upload.btn_generate')} </>
          )}
        </button>

        <p className="text-xs text-slate-500 text-center">
          {t('upload.footer_gen_info')}
        </p>
      </form>
    </div>
  );
}
