import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          {t('home.hero_title')}
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          {t('home.hero_subtitle')}
        </p>

        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          {user ? (
            <>
              <Link to="/upload" className="btn-primary px-6 py-3 text-base">
                {t('home.btn_create_quiz')}
              </Link>
              <Link to="/history" className="btn-secondary px-6 py-3 text-base">
                {t('home.btn_view_history')}
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="btn-primary px-6 py-3 text-base">
                {t('home.btn_start_free')}
              </Link>
              <Link to="/login" className="btn-secondary px-6 py-3 text-base">
                {t('common.login')}
              </Link>
            </>
          )}
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <div className="card">
          <div className="text-2xl mb-2" role="img" aria-label="Document">📄</div>
          <h3 className="font-semibold text-slate-900 mb-2">{t('home.feature_upload_title')}</h3>
          <p className="text-sm">{t('home.feature_upload_desc')}</p>
        </div>
        <div className="card">
          <div className="text-2xl mb-2" role="img" aria-label="Robot">🤖</div>
          <h3 className="font-semibold text-slate-900 mb-2">{t('home.feature_gen_title')}</h3>
          <p className="text-sm">{t('home.feature_gen_desc')}</p>
        </div>
        <div className="card">
          <div className="text-2xl mb-2" role="img" aria-label="Graphique">📈</div>
          <h3 className="font-semibold text-slate-900 mb-2">{t('home.feature_progress_title')}</h3>
          <p className="text-sm">{t('home.feature_progress_desc')}</p>
        </div>
      </section>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded text-sm">
        <strong className="text-slate-900">Kit de démarrage APOCAL'IPSSI 2026.</strong> {t('home.kit_text')}
        <a
          href="https://github.com/melafrit/IPSSI_APOCAL_KIT"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline"
        >
          {t('home.kit_readme')}
        </a>.
      </div>
    </div>
  );
}
