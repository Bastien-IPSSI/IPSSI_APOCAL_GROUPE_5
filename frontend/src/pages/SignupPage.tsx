import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '@/api/auth';
import { useAuth } from '@/contexts/AuthContext';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import { getApiErrorMessage } from '@/api/errors';
import { useTranslation } from 'react-i18next';

export default function SignupPage() {
  const { refresh } = useAuth();
  const { config } = useSiteConfig();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await signup({
        email,
        password,
        first_name: firstName || undefined,
        last_name: lastName || undefined,
      });
      await refresh();
      navigate('/upload', { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, 'Inscription impossible.'));
    } finally {
      setLoading(false);
    }
  };

  if (!config.allow_signups) {
    return (
      <div className="max-w-md mx-auto">
        <div className="card text-center">
          <div className="text-4xl mb-3" role="img" aria-label="Cadenas">🔒</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {t('common.signups_closed', 'Inscriptions fermées')}
          </h1>
          <p className="text-sm text-slate-500 mb-4">
            {t('common.signups_closed_msg', 'Les inscriptions sont actuellement désactivées. Revenez plus tard.')}
          </p>
          <Link to="/login" className="text-indigo-600 hover:underline">
            {t('common.already_account', 'Déjà un compte ? Se connecter')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          {t('common.create_account', 'Créer un compte')}
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          {t('common.already_account', 'Déjà inscrit ?')} {' '}
          <Link to="/login" className="text-indigo-600 hover:underline">
            {t('common.login')}
          </Link>
        </p>

        {error && (
          <div 
            role="alert" 
            aria-live="assertive" 
            className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="signup-email" className="block text-sm font-medium text-slate-700 mb-1">
              Email
            </label>
            <input
              id="signup-email"
              type="email"
              required
              autoFocus
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              aria-required="true"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="signup-first-name" className="block text-sm font-medium text-slate-700 mb-1">
                Prénom <span className="text-slate-400 font-normal">(facultatif)</span>
              </label>
              <input
                id="signup-first-name"
                type="text"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label htmlFor="signup-last-name" className="block text-sm font-medium text-slate-700 mb-1">
                Nom <span className="text-slate-400 font-normal">(facultatif)</span>
              </label>
              <input
                id="signup-last-name"
                type="text"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="signup-password" className="block text-sm font-medium text-slate-700 mb-1">
              Mot de passe
              <span className="text-slate-400 font-normal"> (≥ 8 caractères)</span>
            </label>
            <input
              id="signup-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              aria-required="true"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? t('common.creating_account', 'Création du compte…') : t('common.create_account_btn', 'Créer mon compte')}
          </button>
        </form>
      </div>
    </div>
  );
}
