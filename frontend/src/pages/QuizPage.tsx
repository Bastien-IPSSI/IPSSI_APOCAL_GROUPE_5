import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuiz, submitAnswers, type Quiz, type AnswerResult } from '@/api/quizzes';
import { useTranslation } from 'react-i18next';

export default function QuizPage() {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id);

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getQuiz(quizId)
      .then(setQuiz)
      .catch(() => setError(t('quiz.error')))
      .finally(() => setLoading(false));
  }, [quizId, t]);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (result) return;
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (!quiz || Object.keys(answers).length !== 10) return;
    setSubmitting(true);
    try {
      const payload = quiz.questions.map((q) => ({
        index: q.index,
        selected_index: answers[q.index]!,
      }));
      const res = await submitAnswers(quiz.id, payload);
      setResult(res);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError(t('common.error', 'Échec de la soumission.'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-slate-500" role="status">{t('common.loading')}</p>;
  if (error) return <p className="text-rose-600" role="alert">{error}</p>;
  if (!quiz) return null;

  const allAnswered = Object.keys(answers).length === 10;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div role="region" aria-labelledby="quiz-title">
        <h1 id="quiz-title" className="text-2xl font-bold text-slate-900">{quiz.title}</h1>
        <p className="text-sm text-slate-500">
          {t('quiz.subtitle', { id: quiz.id, count: quiz.questions.length })}
        </p>
      </div>

      {result && (
        <div
          role="alert"
          className={`card border-l-4 ${
            result.score >= 7
              ? 'border-emerald-500 bg-emerald-50'
              : result.score >= 4
                ? 'border-amber-500 bg-amber-50'
                : 'border-rose-500 bg-rose-50'
          }`}
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {t('quiz.result_title', { score: result.score, total: result.total })}
          </h2>
          <p className="text-slate-700">
            {result.score === 10
              ? t('quiz.result_perfect')
              : result.score >= 7
                ? t('quiz.result_good')
                : result.score >= 4
                  ? t('quiz.result_medium')
                  : t('quiz.result_bad')}
          </p>
          <Link to="/history" className="btn-secondary mt-4 inline-flex">
            {t('quiz.btn_history')}
          </Link>
        </div>
      )}

      <div className="space-y-6">
        {quiz.questions.map((q) => {
          const userChoice = answers[q.index];
          const detail = result?.details.find((d) => d.index === q.index);

          return (
            <article key={q.index} className="card">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-mono text-sm text-indigo-600">Q{q.index}</span>
                <h3 className="font-semibold text-slate-900">{q.prompt}</h3>
              </div>
              <div className="space-y-2" role="radiogroup" aria-labelledby={`q-${q.index}`}>
                {q.options.map((opt, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  const isCorrect = detail && q.correct_index === optIdx;
                  const isWrongPick = detail && isSelected && !detail.correct;

                  let cls = 'border-slate-200 hover:bg-slate-50';
                  if (result) {
                    if (isCorrect) cls = 'border-emerald-500 bg-emerald-50';
                    else if (isWrongPick) cls = 'border-rose-500 bg-rose-50';
                    else cls = 'border-slate-200 opacity-60';
                  } else if (isSelected) {
                    cls = 'border-indigo-500 bg-indigo-50';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={!!result}
                      onClick={() => handleSelect(q.index, optIdx)}
                      className={`w-full text-left p-3 border-2 rounded transition ${cls}`}
                      aria-checked={isSelected}
                      role="radio"
                    >
                      <span className="font-mono mr-2 text-slate-500">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      {opt}
                      {result && isCorrect && (
                        <span className="ml-2 text-emerald-600 font-bold" aria-label="Correct">✓</span>
                      )}
                      {result && isWrongPick && (
                        <span className="ml-2 text-rose-600 font-bold" aria-label="Wrong">✗</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      {!result && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          className="btn-signature w-full py-3 text-base"
        >
          {submitting
            ? t('quiz.btn_submit_loading')
            : allAnswered
              ? t('quiz.btn_submit')
              : t('quiz.btn_submit_pending', { count: Object.keys(answers).length })}
        </button>
      )}
    </div>
  );
}
